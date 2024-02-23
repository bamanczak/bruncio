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


// tu
const draggableIcons = document.querySelectorAll('.draggable-icon');

draggableIcons.forEach((pane) => {
  const corner = pane.querySelector('.corner');

  pane.addEventListener('mousedown', (event) => {

    let l = pane.offsetLeft;
    let t = pane.offsetTop;

    let startX = event.pageX;
    let startY = event.pageY;
    let screenWidth = document.documentElement.clientWidth;

    let clashX = false;
    let clashY = false;

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

      let paneWidth = pane.clientWidth //- (startX)
      if ((newValueLeft + paneWidth) > screenWidth - margin) {
        newValueLeft = screenWidth - pane.clientWidth - margin;
      }
      pane.style.left = newValueLeft + 'px';
      pane.style.top = newValueTop + 'px';
    }

    const mouseup = () => {
      // pane.querySelector('.change-on-drag').classList.remove('is-dragging');
      pane.classList.remove('is-dragging');

      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', mouseup);
    }

    let canDrag = true;
    if (clashX && clashY) {
      canDrag = false;
    }
    if (canDrag) {
      pane.classList.add('is-dragging');
      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseup', mouseup);

    }

  })

  corner.addEventListener('mousedown', (event) => {
    let w = pane.clientWidth;
    let h = pane.clientHeight;

    let startX = event.pageX;
    let startY = event.pageY;

    const drag = (event) => {
      event.preventDefault();

      pane.style.width = w + (event.pageX - startX) + 'px';
      pane.style.height = h + (event.pageY - startY) + 'px';
    }

    const mouseup = () => {
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', mouseup);
    }

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', mouseup);
  })
})
