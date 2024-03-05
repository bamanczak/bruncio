import { activatePanel } from './panesOpener.ts'
import { navigate } from "astro:transitions/client";

const desktopIcons = document.querySelectorAll('.desktop-icon-container');
const margin = 10;
const menuHeight = 40;

desktopIcons.forEach((desktopIcon) => {
  const pane = desktopIcon.querySelector('.pane');
  const icon = desktopIcon.querySelector('.desktop-icon-sub-container')
  const panelName = desktopIcon.getAttribute("data-openWindow");
  const iconFunction = desktopIcon.getAttribute('data-iconFunction');

  desktopIcon.addEventListener("click", () => {
    console.log(iconFunction);
    if (iconFunction == "openPanel") {
      activatePanel(panelName);
    } else if (iconFunction == "navigate") {
      const navigateTo = desktopIcon.getAttribute('data-navigateTo')
      navigate(navigateTo);
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
    let screenHeight = document.documentElement.clientHeight;

    const drag = (event) => {
      event.preventDefault();

      let newValueLeft = l + (event.pageX - startX);
      if (newValueLeft < 0) {
        newValueLeft = 0;
      }

      let newValueTop = t + (event.pageY - startY);
      let iconHeight = draggableIcon.clientHeight;
      if (newValueTop < menuHeight) {
        newValueTop = menuHeight;
      } else if ((newValueTop + iconHeight) > screenHeight) {
        newValueTop = screenHeight - iconHeight - margin;
      }

      let iconWidth = draggableIcon.clientWidth
      if ((newValueLeft + iconWidth) > screenWidth - margin) {
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
