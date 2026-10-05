/* Interface behaviour. Expanded content remains in the existing content.js. */
(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const root = document.documentElement;
  const systemTheme = matchMedia("(prefers-color-scheme: dark)");
  let explicitTheme = null;
  try {
    explicitTheme = localStorage.getItem("theme");
  } catch (_) {}
  function updateThemeButton() {
    const dark = root.classList.contains("dark");
    const button = $("theme-toggle");
    const label = dark ? "Switch to light mode" : "Switch to dark mode";

    button.setAttribute("aria-pressed", String(dark));
    button.setAttribute("aria-label", label);
    button.title = label;

    // Dark mode: show sun. Light mode: show moon.
    $("sun-icon").toggleAttribute("hidden", !dark);
    $("moon-icon").toggleAttribute("hidden", dark);
  }
  updateThemeButton();
  $("theme-toggle").addEventListener("click", () => {
    explicitTheme = root.classList.toggle("dark") ? "dark" : "light";
    try {
      localStorage.setItem("theme", explicitTheme);
    } catch (_) {}
    updateThemeButton();
  });
  systemTheme.addEventListener("change", (event) => {
    if (explicitTheme === "light" || explicitTheme === "dark") return;
    root.classList.toggle("dark", event.matches);
    updateThemeButton();
  });
  const menu = $("mobile-menu"),
    menuButton = $("menu-button");
  function closeMenu() {
    menu.hidden = true;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  }
  menuButton.addEventListener("click", () => {
    menu.hidden = !menu.hidden;
    menuButton.setAttribute("aria-expanded", String(!menu.hidden));
    menuButton.setAttribute(
      "aria-label",
      menu.hidden ? "Open navigation" : "Close navigation",
    );
  });
  menu
    .querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) {
      closeMenu();
      menuButton.focus();
    }
  });
  document.addEventListener("pointerdown", (event) => {
    if (!menu.hidden && !event.target.closest(".site-header")) closeMenu();
  });
  matchMedia("(min-width: 1200px)").addEventListener("change", (event) => {
    if (event.matches) closeMenu();
  });

  const dialog = $("detail-dialog"),
    gallery = $("detail-gallery"),
    stage = $("media-stage");
  const dots = $("media-dots"),
    caption = $("media-caption");
  const previous = $("previous-media"),
    next = $("next-media");
  let activeEntry = null,
    mediaIndex = 0,
    returnFocus = null;
  let previousOverflow = "",
    previousPadding = "",
    swipeStart = null;
  let mediaEpoch = 0,
    previewObjectUrl = null;
  function makeLink(href, label, button = false) {
    const link = document.createElement("a");
    if (button) link.className = "button";
    link.href = href;
    link.textContent = label;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    return link;
  }
  function clearMedia() {
    mediaEpoch++;
    stage.querySelectorAll("video").forEach((player) => {
      player.pause();
      player.removeAttribute("src");
      player.load();
    });
    stage.querySelectorAll("iframe").forEach((frame) => frame.remove());
    stage.replaceChildren();
    if (previewObjectUrl) {
      URL.revokeObjectURL(previewObjectUrl);
      previewObjectUrl = null;
    }
  }
  function showError(message, src) {
    const box = document.createElement("div");
    box.className = "media-message";
    const note = document.createElement("p");
    note.textContent = message;
    box.append(note);
    if (src) box.append(makeLink(src, "Open original file ↗"));
    stage.replaceChildren(box);
  }
  function renderImage(item, epoch, onError) {
    const image = document.createElement("img");
    image.alt = item.alt || item.label || item.caption || activeEntry.title;
    image.decoding = "async";
    if (item.fit === "cover" || item.fit === "contain")
      image.style.objectFit = item.fit;
    image.addEventListener(
      "error",
      () => {
        if (epoch !== mediaEpoch || !stage.contains(image)) return;
        if (onError) onError();
        else
          showError(
            "This image could not be loaded. Check its filename and path.",
            item.src,
          );
      },
      { once: true },
    );
    image.src = item.src;
    stage.replaceChildren(image);
  }
  async function renderPdfImage(item, epoch) {
    const loading = document.createElement("p");
    loading.className = "media-loading";
    loading.setAttribute("role", "status");
    loading.textContent = "Loading certificate…";
    stage.replaceChildren(loading);
    try {
      const blob = await window.portfolioPdfPreviews.get(item);
      if (epoch !== mediaEpoch) return;
      previewObjectUrl = URL.createObjectURL(blob);
      renderImage(
        {
          src: previewObjectUrl,
          alt: (item.label || item.caption || "Certificate") + " — first page",
          fit: "contain",
        },
        epoch,
        () =>
          showError(
            "The certificate preview could not be displayed.",
            item.src,
          ),
      );
    } catch (error) {
      if (epoch !== mediaEpoch) return;
      console.warn("Certificate preview unavailable:", item.src, error);
      showError(
        "The certificate preview could not be loaded. You can still open the original PDF.",
        item.src,
      );
    }
  }
  function renderYouTube(item, epoch) {
    if (!/^[a-zA-Z0-9_-]{11}$/.test(item.id || "")) {
      showError("Add a valid 11-character YouTube video ID.");
      return;
    }

    const title = item.caption || item.label || `${activeEntry.title} video`;

    const preview = document.createElement("button");
    preview.type = "button";
    preview.className = "youtube-preview";
    preview.setAttribute("aria-label", `Play ${title}`);

    const thumbnail = document.createElement("img");
    thumbnail.alt = "";
    thumbnail.decoding = "async";
    thumbnail.loading = "eager";
    thumbnail.referrerPolicy = "no-referrer";

    const thumbnails = [
      item.poster,
      `https://i.ytimg.com/vi/${item.id}/maxresdefault.jpg`,
      `https://i.ytimg.com/vi/${item.id}/mqdefault.jpg`,
    ].filter(Boolean);

    let thumbnailIndex = 0;

    function tryNextThumbnail() {
      if (epoch !== mediaEpoch || !stage.contains(preview)) return;

      thumbnailIndex++;

      if (thumbnailIndex < thumbnails.length) {
        thumbnail.src = thumbnails[thumbnailIndex];
      } else {
        // Keep the play button usable if no thumbnail loads.
        thumbnail.hidden = true;
      }
    }

    thumbnail.addEventListener("error", tryNextThumbnail);

    thumbnail.addEventListener("load", () => {
      // Some unavailable thumbnails return a tiny placeholder image.
      if (thumbnail.naturalWidth <= 120) {
        tryNextThumbnail();
      }
    });

    const play = document.createElement("span");
    play.className = "youtube-play";
    play.setAttribute("aria-hidden", "true");

    preview.append(thumbnail, play);
    stage.replaceChildren(preview);

    thumbnail.src = thumbnails[thumbnailIndex];

    preview.addEventListener(
      "click",
      () => {
        if (epoch !== mediaEpoch || !stage.contains(preview)) return;

        const frame = document.createElement("iframe");
        frame.title = title;
        frame.allow =
          "autoplay; accelerometer; encrypted-media; gyroscope; " +
          "picture-in-picture; fullscreen";
        frame.allowFullscreen = true;
        frame.referrerPolicy = "strict-origin-when-cross-origin";

        frame.src =
          `https://www.youtube-nocookie.com/embed/${item.id}` +
          "?autoplay=1&playsinline=1&controls=1";

        stage.replaceChildren(frame);

        (next.hidden ? $("close-detail") : next).focus({
          preventScroll: true,
        });
      },
      { once: true },
    );
  }
  function renderMedia() {
    clearMedia();
    if (!activeEntry || !activeEntry.media.length) return;
    const epoch = mediaEpoch,
      item = activeEntry.media[mediaIndex];
    caption.textContent = item.caption || item.alt || item.label || "";
    if (item.type === "document") {
      const original = makeLink(item.src, "Open PDF ↗");
      original.className = "gallery-original";
      caption.append(" · Page 1 · ", original);
    }
    $("media-count").textContent =
      `${mediaIndex + 1} / ${activeEntry.media.length}`;
    Array.from(dots.children).forEach((dot, index) =>
      dot.setAttribute("aria-current", String(index === mediaIndex)),
    );
    if (item.type === "image") renderImage(item, epoch);
    else if (item.type === "document") {
      if (item.preview)
        renderImage({ ...item, src: item.preview, fit: "contain" }, epoch, () =>
          renderPdfImage(item, epoch),
        );
      else renderPdfImage(item, epoch);
    } else if (item.type === "video") {
      const player = document.createElement("video");
      player.controls = true;
      player.playsInline = true;
      player.preload = "metadata";
      player.setAttribute("aria-label", item.caption || activeEntry.title);
      if (item.poster) player.poster = item.poster;
      (item.tracks || []).forEach((info) => {
        const track = document.createElement("track");
        track.kind = "captions";
        track.src = info.src;
        track.srclang = info.srclang || "en";
        track.label = info.label || "English";
        track.default = Boolean(info.default);
        player.append(track);
      });
      const fallback = document.createElement("p");
      fallback.append(
        "Your browser cannot play this video. ",
        makeLink(item.src, "Open video ↗"),
      );
      player.append(fallback);
      player.addEventListener(
        "error",
        () => {
          if (epoch === mediaEpoch && stage.contains(player))
            showError(
              "This video could not be played. Check its path and encoding, or open the original file.",
              item.src,
            );
        },
        { once: true },
      );
      player.src = item.src;
      stage.append(player);
    } else if (item.type === "youtube") renderYouTube(item, epoch);
    else
      showError(
        "Unsupported media type. Use image, video, document, or youtube.",
      );
  }
  function changeMedia(offset) {
    if (!activeEntry || activeEntry.media.length < 2) return;
    mediaIndex =
      (mediaIndex + offset + activeEntry.media.length) %
      activeEntry.media.length;
    renderMedia();
  }
  function openDetails(key, trigger) {
    const entry = portfolioDetails[key];
    if (!entry || dialog.open) return;
    closeMenu();
    activeEntry = { ...entry, media: entry.media || [] };
    mediaIndex = 0;
    returnFocus = trigger;
    $("detail-title").textContent = entry.title;
    $("detail-meta").textContent = entry.meta || "";
    const description = $("detail-description");
    description.replaceChildren();
    (entry.paragraphs || []).forEach((text) => {
      const p = document.createElement("p");
      p.textContent = text;
      description.append(p);
    });
    const links = $("detail-links");
    links.replaceChildren();
    links.hidden = !entry.link;
    if (entry.link)
      links.append(makeLink(entry.link.href, entry.link.label + " ↗", true));
    const media = activeEntry.media;
    gallery.hidden = !media.length;
    previous.hidden = next.hidden = media.length < 2;
    $("gallery-row").classList.toggle("single", media.length < 2);
    $("gallery-help").hidden = media.length < 2;
    dots.replaceChildren();
    dots.hidden = media.length < 2;
    media.forEach((item, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "gallery-dot";
      dot.setAttribute(
        "aria-label",
        `Show item ${index + 1}: ${item.caption || item.alt || item.label || item.type}`,
      );
      dot.addEventListener("click", () => {
        mediaIndex = index;
        renderMedia();
      });
      dots.append(dot);
    });
    previousOverflow = document.body.style.overflow;
    previousPadding = document.body.style.paddingRight;
    const scrollbar = innerWidth - root.clientWidth;
    if (scrollbar > 0)
      document.body.style.paddingRight = `${(parseFloat(getComputedStyle(document.body).paddingRight) || 0) + scrollbar}px`;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    dialog.scrollTop = 0;
    renderMedia();
    $("close-detail").focus({ preventScroll: true });
  }
  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-detail]");
    if (trigger) openDetails(trigger.dataset.detail, trigger);
  });
  previous.addEventListener("click", () => changeMedia(-1));
  next.addEventListener("click", () => changeMedia(1));
  $("close-detail").addEventListener("click", () => dialog.close());
  function outsidePanel(event) {
    const rect = dialog.getBoundingClientRect();
    return (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    );
  }
  let backdropPress = false;
  dialog.addEventListener("pointerdown", (event) => {
    backdropPress = event.target === dialog && outsidePanel(event);
  });
  dialog.addEventListener("click", (event) => {
    if (backdropPress && event.target === dialog && outsidePanel(event))
      dialog.close();
    backdropPress = false;
  });
  dialog.addEventListener("close", () => {
    clearMedia();
    activeEntry = null;
    swipeStart = null;
    backdropPress = false;
    document.body.style.overflow = previousOverflow;
    document.body.style.paddingRight = previousPadding;
    if (returnFocus && returnFocus.isConnected)
      returnFocus.focus({ preventScroll: true });
    returnFocus = null;
  });
  dialog.addEventListener("keydown", (event) => {
    if (
      !activeEntry ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.target.closest("video,iframe,input,textarea,select,a")
    )
      return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      changeMedia(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      changeMedia(1);
    }
  });
  gallery.addEventListener(
    "touchstart",
    (event) => {
      swipeStart = null;
      if (
        event.touches.length !== 1 ||
        event.target.closest("video,iframe,button,a")
      )
        return;
      swipeStart = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    },
    { passive: true },
  );
  gallery.addEventListener(
    "touchend",
    (event) => {
      if (!swipeStart || !event.changedTouches.length) return;
      const dx = event.changedTouches[0].clientX - swipeStart.x,
        dy = event.changedTouches[0].clientY - swipeStart.y;
      swipeStart = null;
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5)
        changeMedia(dx < 0 ? 1 : -1);
    },
    { passive: true },
  );
  gallery.addEventListener("touchcancel", () => {
    swipeStart = null;
  });
  // Cached certificate images resize in CSS; they never need a fresh PDF render on window resize.
})();
