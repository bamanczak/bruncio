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

});

const draggableIcons = document.querySelectorAll('.draggable-icon');

draggableIcons.forEach((draggableIcon) => {
  draggableIcon.addEventListener('mousedown', (event) => {

    let l = draggableIcon.offsetLeft;
    let t = draggableIcon.offsetTop;
    let startX = event.pageX;
    let startY = event.pageY;
    let screenWidth = document.documentElement.clientWidth;

    const drag = (event) => {
      event.preventDefault();

      let newValueLeft = l + (event.pageX - startX);
      if (newValueLeft < 0) {
        newValueLeft = 0;
      }

      let newValueTop = t + (event.pageY - startY);
      if (newValueTop < 48) {
        newValueTop = 48;
      }

      let paneWidth = draggableIcon.clientWidth
      if ((newValueLeft + paneWidth) > screenWidth - margin) {
        newValueLeft = screenWidth - draggableIcon.clientWidth - margin;
      }

      draggableIcon.style.left = newValueLeft + 'px';
      draggableIcon.style.top = newValueTop + 'px';
    }

    const mouseup = () => {
      draggableIcon.classList.remove('is-dragging');
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', mouseup);
    }

    draggableIcon.classList.add('is-dragging');
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', mouseup);
  })
})