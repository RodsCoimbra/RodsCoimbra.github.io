// Runs before the stylesheet to apply the saved theme without a light flash.
(() => {
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (_) {}
  const dark = saved === "dark" || (saved !== "light" && matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
})();
