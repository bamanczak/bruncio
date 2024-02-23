const desktopIcons = document.querySelectorAll('.desktop-icon-container');
let z = 1;
const margin = 10;

desktopIcons.forEach((desktopIcon) => {
  const pane = desktopIcon.querySelector('.pane');
  const icon = desktopIcon.querySelector('.desktop-icon-sub-container')
  icon.addEventListener("dblclick", () => {
    if (pane.classList.contains("invisible")) {
      pane.style.setProperty('--animate-duration', '0.2s');
      pane.classList.remove("invisible");

      pane.classList.add("animate__zoomIn");
      setTimeout(function () {
        pane.classList.remove("animate__zoomIn");
      }, 210);
    }
  });

})
