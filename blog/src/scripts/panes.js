const panes = document.querySelectorAll('.pane');
let z = 1;
const margin = 10;
const menuHeight = 40;
const fullScreenClass = "full-screen";


panes.forEach((pane) => {
  const title = pane.querySelector('.title');
  const corner = pane.querySelector('.corner');
  const buttonClose = pane.querySelector(".button-close");
  const buttonExpand = pane.querySelector(".button-expand");

  buttonClose.addEventListener("click", () => {
    pane.style.setProperty('--animate-duration', '0.4s');
    pane.classList.add("animate__zoomOut");
    setTimeout(function () {
      pane.classList.add("invisible");
      pane.classList.remove("animate__zoomOut");
    }, 410);

  });

  buttonExpand.addEventListener("click", () => {
    pane.style.transition = "all 0.3s ease-in-out";
    if (pane.classList.contains(fullScreenClass)) {
      pane.classList.remove(fullScreenClass);
      console.log("TESTING!")

      pane.style.height = '40vh';
      pane.style.width = '40vw';
      pane.style.left = 'calc(50vw - 20vw)';
      pane.style.top = `calc(50vh - 20vh + ${menuHeight}px)`;


    } else {
      pane.classList.add(fullScreenClass);
      pane.style.width = "100%";
      console.log("TESTING2!")
      pane.style.left = '0px';
      pane.style.top = `${menuHeight}px`;
      // pane.style.width = document.documentElement.clientWidth
      pane.style.height = `calc(100vh - ${menuHeight}px)`;
      // pane.style.box - sizing = 'border-box;';
    }

    setTimeout(function () {
      pane.style.transition = "none";
    }, 400);

  });

  pane.addEventListener('mousedown', () => {
    z = z + 1;
    pane.style.zIndex = z;
  })

  title.addEventListener('mousedown', (event) => {
    const myButton = title.querySelector('.baton');

    let buttonLeft = myButton.offsetLeft;
    // Why figure out why calculations are wrong if I can just hardcode the missing pixels?
    let buttonTop = myButton.offsetTop + 2;
    let buttonWidth = myButton.offsetWidth + 3;
    let buttonHeight = myButton.offsetHeight;

    let l = pane.offsetLeft;
    let t = pane.offsetTop;

    let startX = event.pageX;
    let startY = event.pageY;
    let screenWidth = document.documentElement.clientWidth;
    let screenHeight = document.documentElement.clientHeight;

    let clashX = false;
    let clashY = false;
    if (startX > (buttonLeft + l) && startX < (buttonLeft + l + buttonWidth)) {
      clashX = true;
    }
    if (startY > (buttonTop + t) && startY < (buttonTop + t + buttonHeight)) {
      clashY = true;
    }

    const drag = (event) => {
      event.preventDefault();

      let newValueLeft = l + (event.pageX - startX);
      if (newValueLeft < 0) {
        newValueLeft = 0;
      }

      let newValueTop = t + (event.pageY - startY);
      let paneHeight = pane.clientHeight
      if (newValueTop < menuHeight) {
        newValueTop = menuHeight;
      } else if ((newValueTop + paneHeight) > screenHeight) {
        newValueTop = screenHeight - paneHeight - margin;
      }

      let paneWidth = pane.clientWidth //- (startX)
      if ((newValueLeft + paneWidth) > screenWidth - margin) {
        newValueLeft = screenWidth - pane.clientWidth - margin;
      }
      pane.style.left = newValueLeft + 'px';
      pane.style.top = newValueTop + 'px';
    }

    const mouseup = () => {
      pane.querySelector('.change-on-drag').classList.remove('is-dragging');
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
    let screenWidth = document.documentElement.clientWidth;
    let screenHeight = document.documentElement.clientHeight;
    let l = pane.offsetLeft;
    let t = pane.offsetTop;


    let startX = event.pageX;
    let startY = event.pageY;

    const drag = (event) => {
      event.preventDefault();

      document.body.style.cursor = "nwse-resize";


      let newWidth = w + (event.pageX - startX)
      let newHeight = h + (event.pageY - startY)

      if ((newWidth + l) > screenWidth - (margin / 2)) {
        newWidth = screenWidth - l - (margin / 2);
      }
      if ((newHeight + t) > (screenHeight)) {
        newHeight = screenHeight - t;
      }

      pane.style.width = newWidth + 'px';
      pane.style.height = newHeight + 'px';
      if (pane.classList.contains(fullScreenClass)) {
        pane.classList.remove(fullScreenClass);
      }
    }

    const mouseup = () => {
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', mouseup);
      document.body.style.cursor = "auto";
    }

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', mouseup);
  })
})
