// Lazy load
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("img").forEach(img => {
    img.setAttribute("loading", "lazy");
  });

  document.querySelectorAll("video").forEach(video => {
    video.setAttribute("loading", "lazy");
  });
});
