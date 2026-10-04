/* First-page PDF previews: compressed images, memory cache, and optional IndexedDB cache. */
(() => {
  "use strict";
  const LIBRARY_BASE = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/";
  const CACHE_REVISION = "first-page-webp-v1";
  const MAX_EDGE = 2400;
  const QUALITY = 0.9;
  const TTL = 30 * 24 * 60 * 60 * 1000;
  const MEMORY_LIMIT = 12 * 1024 * 1024;
  const DISK_LIMIT = 24 * 1024 * 1024;
  const memory = new Map();
  const pending = new Map();
  let memoryBytes = 0,
    databasePromise = null,
    libraryPromise = null;
  let activeRenders = 0;
  const renderQueue = [];

  function keyFor(item) {
    const source = new URL(item.src, document.baseURI).href;
    return `${CACHE_REVISION}|${item.previewVersion || 1}|${source}`;
  }
  function valid(record) {
    return (
      record &&
      record.blob instanceof Blob &&
      record.blob.size > 0 &&
      Date.now() - record.createdAt < TTL
    );
  }
  function remember(key, record) {
    if (record.blob.size > MEMORY_LIMIT) return;
    if (memory.has(key)) memoryBytes -= memory.get(key).blob.size;
    memory.delete(key);
    memory.set(key, record);
    memoryBytes += record.blob.size;
    while (memory.size > 24 || memoryBytes > MEMORY_LIMIT) {
      const oldest = memory.keys().next().value;
      memoryBytes -= memory.get(oldest).blob.size;
      memory.delete(oldest);
    }
  }
  function recall(key) {
    const record = memory.get(key);
    if (!record) return null;
    if (!valid(record)) {
      memoryBytes -= record.blob.size;
      memory.delete(key);
      return null;
    }
    memory.delete(key);
    memory.set(key, record);
    return record.blob;
  }
  function openDatabase() {
    if (databasePromise) return databasePromise;
    databasePromise = new Promise((resolve) => {
      let request,
        settled = false;
      const finish = (value) => {
        if (settled) {
          if (value) value.close();
          return;
        }
        settled = true;
        clearTimeout(timer);
        resolve(value);
      };
      const timer = setTimeout(() => finish(null), 1200);
      try {
        if (!window.indexedDB) {
          finish(null);
          return;
        }
        request = window.indexedDB.open("rodrigo-portfolio-pdf-previews", 1);
        request.onupgradeneeded = () => {
          const db = request.result;
          if (!db.objectStoreNames.contains("previews")) {
            db.createObjectStore("previews", { keyPath: "key" });
          }
        };
        request.onsuccess = () => {
          const db = request.result;
          db.onversionchange = () => {
            db.close();
            databasePromise = null;
          };
          finish(db);
        };
        request.onerror = request.onblocked = () => finish(null);
      } catch (_) {
        finish(null);
      }
    });
    return databasePromise;
  }
  async function readDisk(key) {
    const db = await openDatabase();
    if (!db) return null;
    return new Promise((resolve) => {
      let done = false;
      const finish = (result) => {
        if (!done) {
          done = true;
          clearTimeout(timer);
          resolve(result);
        }
      };
      const timer = setTimeout(() => finish(null), 1200);
      try {
        const tx = db.transaction("previews", "readonly");
        const request = tx.objectStore("previews").get(key);
        request.onsuccess = () =>
          finish(valid(request.result) ? request.result : null);
        request.onerror = tx.onabort = () => finish(null);
      } catch (_) {
        finish(null);
      }
    });
  }
  function pruneDisk(db) {
    try {
      const tx = db.transaction("previews", "readwrite");
      const store = tx.objectStore("previews");
      const request = store.getAll();
      request.onsuccess = () => {
        const records = request.result.sort(
          (a, b) => b.createdAt - a.createdAt,
        );
        let bytes = 0,
          count = 0;
        records.forEach((record) => {
          if (
            !valid(record) ||
            count >= 32 ||
            bytes + record.blob.size > DISK_LIMIT
          ) {
            store.delete(record.key);
          } else {
            bytes += record.blob.size;
            count++;
          }
        });
      };
    } catch (_) {}
  }
  async function writeDisk(key, blob) {
    if (blob.size > DISK_LIMIT) return;
    const db = await openDatabase();
    if (!db) return;
    try {
      const tx = db.transaction("previews", "readwrite");
      tx.objectStore("previews").put({ key, blob, createdAt: Date.now() });
      tx.oncomplete = () => pruneDisk(db);
      tx.onerror = tx.onabort = () => {};
    } catch (_) {}
  }
  function loadLibrary() {
    if (!libraryPromise) {
      libraryPromise = import(LIBRARY_BASE + "build/pdf.min.mjs")
        .then((library) => {
          library.GlobalWorkerOptions.workerSrc =
            LIBRARY_BASE + "build/pdf.worker.min.mjs";
          return library;
        })
        .catch((error) => {
          libraryPromise = null;
          throw error;
        });
    }
    return libraryPromise;
  }
  function encode(canvas, type) {
    return new Promise((resolve, reject) => {
      try {
        canvas.toBlob(
          (blob) =>
            blob ? resolve(blob) : reject(new Error("Image encoding failed")),
          type,
          QUALITY,
        );
      } catch (error) {
        reject(error);
      }
    });
  }
  async function compressedImage(canvas) {
    try {
      const webp = await encode(canvas, "image/webp");
      if (webp.type === "image/webp") return webp;
    } catch (_) {}
    try {
      const jpeg = await encode(canvas, "image/jpeg");
      if (jpeg.type === "image/jpeg") return jpeg;
    } catch (_) {}
    return encode(canvas, "image/png");
  }
  async function withRenderSlot(work) {
    if (activeRenders >= 2)
      await new Promise((resolve) => renderQueue.push(resolve));
    else activeRenders++;
    try {
      return await work();
    } finally {
      const next = renderQueue.shift();
      if (next) next();
      else activeRenders--;
    }
  }
  async function renderFirstPage(item) {
    return withRenderSlot(async () => {
      let task = null;
      try {
        const library = await loadLibrary();
        task = library.getDocument({
          url: new URL(item.src, document.baseURI).href,
          cMapUrl: LIBRARY_BASE + "cmaps/",
          cMapPacked: true,
          standardFontDataUrl: LIBRARY_BASE + "standard_fonts/",
          isEvalSupported: false,
        });
        const pdf = await task.promise;
        const page = await pdf.getPage(1);
        const original = page.getViewport({ scale: 1 });
        const viewport = page.getViewport({
          scale: MAX_EDGE / Math.max(original.width, original.height),
        });
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.ceil(viewport.width));
        canvas.height = Math.max(1, Math.ceil(viewport.height));
        const context = canvas.getContext("2d", { alpha: false });
        if (!context) throw new Error("Canvas is unavailable");
        await page.render({
          canvasContext: context,
          viewport,
          background: "rgb(255,255,255)",
        }).promise;
        const blob = await compressedImage(canvas);
        canvas.width = canvas.height = 0;
        return blob;
      } finally {
        if (task) {
          try {
            await task.destroy();
          } catch (_) {}
        }
      }
    });
  }
  function get(item) {
    const key = keyFor(item);
    const cached = recall(key);
    if (cached) return Promise.resolve(cached);
    if (pending.has(key)) return pending.get(key);
    const work = (async () => {
      const stored = await readDisk(key);
      if (stored) {
        remember(key, stored);
        return stored.blob;
      }
      const blob = await renderFirstPage(item);
      remember(key, { blob, createdAt: Date.now() });
      // Persistent storage failure must never stop the image from being displayed.
      writeDisk(key, blob).catch(() => {});
      return blob;
    })();
    pending.set(key, work);
    const cleanup = () => pending.delete(key);
    work.then(cleanup, cleanup);
    return work;
  }
  window.portfolioPdfPreviews = Object.freeze({ get });
})();
