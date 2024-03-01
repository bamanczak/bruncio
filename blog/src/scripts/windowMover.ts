const menuHeight = 36;
const margin = 10;
const fullScreenClass = "full-screen";



export function moveObject(pane: HTMLElement, event: MouseEvent) {
    const myButton = pane.querySelector(".button-close") as HTMLElement;
    const pane2 = pane;
    const myEvent = event as MouseEvent;

    let buttonLeft = myButton.offsetLeft;
    // Why figure out why calculations are wrong if I can just hardcode the missing pixels?
    let buttonTop = myButton.offsetTop + 2;
    let buttonWidth = myButton.offsetWidth + 3;
    let buttonHeight = myButton.offsetHeight;

    let l = pane2.offsetLeft;
    let t = pane2.offsetTop;

    let startX = myEvent.pageX;
    let startY = myEvent.pageY;
    let screenWidth = document.documentElement.clientWidth;
    let screenHeight = document.documentElement.clientHeight;

    let clashX = false;
    let clashY = false;
    if (
        startX > buttonLeft + l &&
        startX < buttonLeft + l + buttonWidth
    ) {
        clashX = true;
    }
    if (
        startY > buttonTop + t &&
        startY < buttonTop + t + buttonHeight
    ) {
        clashY = true;
    }

    const drag = (event: MouseEvent) => {
        event.preventDefault();

        let newValueLeft = l + (event.pageX - startX);
        if (newValueLeft < 0) {
            newValueLeft = 0;
        }

        let newValueTop = t + (event.pageY - startY);
        let paneHeight = pane2.clientHeight;
        if (newValueTop < menuHeight) {
            newValueTop = menuHeight;
        } else if (newValueTop + paneHeight > screenHeight) {
            newValueTop = screenHeight - paneHeight - margin;
        }

        let paneWidth = pane2.clientWidth; //- (startX)
        if (newValueLeft + paneWidth > screenWidth - margin) {
            newValueLeft = screenWidth - pane2.clientWidth - margin;
        }
        pane2.style.left = newValueLeft + "px";
        pane2.style.top = newValueTop + "px";
    };

    const mouseup = () => {
        (
            pane2.querySelector(".change-on-drag") as HTMLElement
        ).classList.remove("is-dragging");
        pane2.classList.remove("is-dragging");

        document.removeEventListener("mousemove", drag);
        document.removeEventListener("mouseup", mouseup);
    };

    let canDrag = true;
    if (clashX && clashY) {
        canDrag = false;
    }
    if (canDrag) {
        pane2.classList.add("is-dragging");
        document.addEventListener("mousemove", drag);
        document.addEventListener("mouseup", mouseup);
    }
}

export function resizeObject(pane: HTMLElement, event: MouseEvent) {
    let w = pane.clientWidth;
    let h = pane.clientHeight;
    let screenWidth = document.documentElement.clientWidth;
    let screenHeight = document.documentElement.clientHeight;
    let l = pane.offsetLeft;
    let t = pane.offsetTop;

    let startX = event.pageX;
    let startY = event.pageY;

    const drag = (event: MouseEvent) => {
        event.preventDefault();

        document.body.style.cursor = "nwse-resize";

        let newWidth = w + (event.pageX - startX);
        let newHeight = h + (event.pageY - startY);

        if (newWidth + l > screenWidth - margin / 2) {
            newWidth = screenWidth - l - margin / 2;
        }
        if (newHeight + t > screenHeight) {
            newHeight = screenHeight - t;
        }

        pane.style.width = newWidth + "px";
        pane.style.height = newHeight + "px";
        if (pane.classList.contains(fullScreenClass)) {
            pane.classList.remove(fullScreenClass);
        }
    };

    const mouseup = () => {
        document.removeEventListener("mousemove", drag);
        document.removeEventListener("mouseup", mouseup);
        document.body.style.cursor = "auto";
    };

    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", mouseup);
}