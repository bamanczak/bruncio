const panes = document.querySelectorAll('.pane');
let z = 1;
const margin = 10;

panes.forEach((pane) => {
  const title = pane.querySelector('.title');
  const corner = pane.querySelector('.corner');
  const button = pane.querySelector(".baton");
  button.addEventListener("click", () => {
    console.log("Hello, on client");
    pane.classList.add("invisible");
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
      if (newValueTop < 44) {
        newValueTop = 44;
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
