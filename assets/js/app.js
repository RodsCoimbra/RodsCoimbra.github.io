/* Interface behaviour. Card descriptions and media belong in content.js. */
(() => {
  const $ = id => document.getElementById(id);
  const root = document.documentElement;
  const systemTheme = matchMedia("(prefers-color-scheme: dark)");
  let explicitTheme = null;
  try { explicitTheme = localStorage.getItem("theme"); } catch (_) {}
  function updateThemeButton() {
    const dark = root.classList.contains("dark");
    $("theme-toggle").setAttribute("aria-pressed", String(dark));
    const label = dark ? "Switch to light mode" : "Switch to dark mode";
    $("theme-toggle").setAttribute("aria-label", label);
    $("theme-toggle").title = label;
    $("sun-icon").toggleAttribute("hidden", !dark);
    $("moon-icon").toggleAttribute("hidden", dark);
  }
  updateThemeButton();
  $("theme-toggle").addEventListener("click", () => {
    explicitTheme = root.classList.toggle("dark") ? "dark" : "light";
    try { localStorage.setItem("theme", explicitTheme); } catch (_) {}
    updateThemeButton();
  });
  systemTheme.addEventListener("change", event => {
    if (explicitTheme === "light" || explicitTheme === "dark") return;
    root.classList.toggle("dark", event.matches);
    updateThemeButton();
  });

  const menu = $("mobile-menu"), menuButton = $("menu-button");
  function closeMenu() {
    menu.hidden = true;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  }
  menuButton.addEventListener("click", () => {
    menu.hidden = !menu.hidden;
    menuButton.setAttribute("aria-expanded", String(!menu.hidden));
    menuButton.setAttribute("aria-label", menu.hidden ? "Open navigation" : "Close navigation");
  });
  menu.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !menu.hidden) { closeMenu(); menuButton.focus(); }
  });
  matchMedia("(min-width: 1200px)").addEventListener("change", event => { if (event.matches) closeMenu(); });

  const dialog = $("detail-dialog"), stage = $("media-stage"), gallery = $("detail-gallery");
  const dots = $("media-dots"), caption = $("media-caption");
  const previous = $("previous-media"), next = $("next-media");
  let activeEntry = null, mediaIndex = 0, returnFocus = null;
  let previousOverflow = "", previousPadding = "", swipeStart = null;
  const icons = {"robot": "<rect x=\"6\" y=\"7\" width=\"12\" height=\"12\" rx=\"3\"/><path d=\"M12 3v4M3 11v5M21 11v5M9 15h6\"/><circle cx=\"9\" cy=\"11\" r=\".7\"/><circle cx=\"15\" cy=\"11\" r=\".7\"/>", "mountain": "<path d=\"m2 20 7-13 5 8 3-5 5 10H2Z\"/><path d=\"m7 11 2 2 2-2\"/><circle cx=\"18\" cy=\"5\" r=\"2\"/>", "volleyball": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 3c-3 3-4 6-3 9M3 12h6l6 8M9 12l9-5M21 13l-6-3M7 19l2-7\"/>"};

  function clearMedia() {
    stage.querySelectorAll("video").forEach(video => {
      video.pause(); video.removeAttribute("src"); video.load();
    });
    stage.querySelectorAll("iframe").forEach(frame => frame.remove());
    stage.replaceChildren();
  }
  function showError(text) {
    const p = document.createElement("p"); p.className = "media-message"; p.textContent = text;
    stage.replaceChildren(p);
  }
  function renderMedia() {
    clearMedia();
    if (!activeEntry || !activeEntry.media.length) return;
    const item = activeEntry.media[mediaIndex];
    caption.textContent = item.caption || item.alt || "";
    $("media-count").textContent = `${mediaIndex + 1} / ${activeEntry.media.length}`;
    Array.from(dots.children).forEach((dot, i) => dot.setAttribute("aria-current", String(i === mediaIndex)));
    if (item.type === "image") {
      const img = document.createElement("img"); img.alt = item.alt || item.caption || activeEntry.title;
      img.decoding = "async";
      img.addEventListener("error", () => { if (stage.contains(img)) showError("This image could not be loaded. Check its filename and path."); }, { once:true });
      img.src = item.src; stage.append(img);
    } else if (item.type === "video") {
      const video = document.createElement("video");
      video.controls = true; video.playsInline = true; video.preload = "metadata";
      video.setAttribute("aria-label", item.caption || activeEntry.title);
      if (item.poster) video.poster = item.poster;
      (item.tracks || []).forEach(info => {
        const track = document.createElement("track"); track.kind = "captions"; track.src = info.src;
        track.srclang = info.srclang || "en"; track.label = info.label || "English";
        track.default = Boolean(info.default); video.append(track);
      });
      video.addEventListener("error", () => { if (stage.contains(video)) showError("This video could not be loaded. Check its path and encoding."); }, { once:true });
      video.src = item.src; stage.append(video);
    } else if (item.type === "youtube") {
      if (!/^[a-zA-Z0-9_-]{11}$/.test(item.id || "")) { showError("Add a valid 11-character YouTube video ID."); return; }
      const box = document.createElement("div"); box.className = "media-message";
      const note = document.createElement("p"); note.textContent = "Load this video to connect to YouTube’s embedded player.";
      const load = document.createElement("button"); load.type = "button"; load.className = "button button-primary"; load.textContent = "Load YouTube video";
      const link = document.createElement("a"); link.href = `https://www.youtube.com/watch?v=${item.id}`;
      link.target = "_blank"; link.rel = "noopener noreferrer"; link.textContent = "Open on YouTube ↗";
      box.append(note,load,link); stage.append(box);
      load.addEventListener("click", () => {
        const frame = document.createElement("iframe");
        frame.src = `https://www.youtube-nocookie.com/embed/${item.id}?playsinline=1`;
        frame.title = item.caption || `${activeEntry.title} video`;
        frame.allow = "accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen";
        frame.allowFullscreen = true; frame.referrerPolicy = "strict-origin-when-cross-origin";
        stage.replaceChildren(frame);
        if (next.hidden) $("close-detail").focus(); else next.focus();
      });
    } else if (item.type === "placeholder") {
      const box = document.createElement("div"); box.className = "illustration";
      const svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
      svg.setAttribute("viewBox","0 0 24 24"); svg.setAttribute("fill","none");
      svg.setAttribute("stroke","currentColor"); svg.setAttribute("stroke-width","1.4"); svg.setAttribute("aria-hidden","true");
      svg.innerHTML = icons[item.kind] || icons.mountain;
      const label = document.createElement("span"); label.textContent = "Your photo here";
      box.append(svg,label); stage.append(box);
    } else { showError("Unsupported media type. Use image, video, or youtube."); }
  }
  function changeMedia(offset) {
    if (!activeEntry || activeEntry.media.length < 2) return;
    mediaIndex = (mediaIndex + offset + activeEntry.media.length) % activeEntry.media.length;
    renderMedia();
  }
  function openDetails(key, trigger) {
    const entry = portfolioDetails[key];
    if (!entry) return;
    activeEntry = { ...entry, media: entry.media || [] }; mediaIndex = 0; returnFocus = trigger;
    $("detail-title").textContent = entry.title; $("detail-meta").textContent = entry.meta;
    $("detail-description").replaceChildren();
    (entry.paragraphs || []).forEach(text => {
      const p = document.createElement("p"); p.textContent = text; $("detail-description").append(p);
    });
    const links = $("detail-links"); links.replaceChildren(); links.hidden = !entry.link;
    if (entry.link) {
      const a = document.createElement("a"); a.className = "button"; a.href = entry.link.href;
      a.textContent = entry.link.label + " ↗"; a.target = "_blank"; a.rel = "noopener noreferrer"; links.append(a);
    }
    const media = activeEntry.media;
    gallery.hidden = !media.length;
    previous.hidden = next.hidden = media.length < 2;
    $("gallery-row").classList.toggle("single", media.length < 2);
    $("gallery-help").hidden = media.length < 2;
    dots.replaceChildren(); dots.hidden = media.length < 2;
    media.forEach((item,i) => {
      const dot = document.createElement("button"); dot.type = "button"; dot.className = "gallery-dot";
      dot.setAttribute("aria-label", `Show media ${i + 1}: ${item.caption || item.alt || item.type}`);
      dot.addEventListener("click", () => { mediaIndex = i; renderMedia(); }); dots.append(dot);
    });
    previousOverflow = document.body.style.overflow; previousPadding = document.body.style.paddingRight;
    const scrollbar = innerWidth - document.documentElement.clientWidth;
    if (scrollbar) document.body.style.paddingRight = `${scrollbar}px`;
    document.body.style.overflow = "hidden";
    dialog.showModal(); dialog.scrollTop = 0; renderMedia();
  }
  document.querySelectorAll("[data-detail]").forEach(button => {
    button.addEventListener("click", () => openDetails(button.dataset.detail,button));
  });
  previous.addEventListener("click", () => changeMedia(-1));
  next.addEventListener("click", () => changeMedia(1));
  $("close-detail").addEventListener("click", () => dialog.close());
  let backdropPress = false;
  dialog.addEventListener("pointerdown", event => { backdropPress = event.target === dialog; });
  dialog.addEventListener("click", event => { if (backdropPress && event.target === dialog) dialog.close(); backdropPress = false; });
  dialog.addEventListener("close", () => {
    clearMedia(); activeEntry = null; swipeStart = null;
    document.body.style.overflow = previousOverflow; document.body.style.paddingRight = previousPadding;
    if (returnFocus) returnFocus.focus({ preventScroll:true });
  });
  dialog.addEventListener("keydown", event => {
    if (!activeEntry || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.target.closest("video,iframe,input,textarea,select")) return;
    if (event.key === "ArrowLeft") { event.preventDefault(); changeMedia(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); changeMedia(1); }
  });
  // Images and captions accept swipes. Do not capture video-control gestures.
  gallery.addEventListener("touchstart", event => {
    swipeStart = null;
    if (event.touches.length !== 1 || event.target.closest("video,iframe,button,a")) return;
    swipeStart = { x:event.touches[0].clientX, y:event.touches[0].clientY };
  },{passive:true});
  gallery.addEventListener("touchend", event => {
    if (!swipeStart || !event.changedTouches.length) return;
    const dx = event.changedTouches[0].clientX - swipeStart.x;
    const dy = event.changedTouches[0].clientY - swipeStart.y;
    swipeStart = null;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) changeMedia(dx < 0 ? 1 : -1);
  },{passive:true});
  gallery.addEventListener("touchcancel", () => { swipeStart = null; });
})();
