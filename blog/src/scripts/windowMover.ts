import { blogHeight, blogWidth, blogPositionDefault, blogPositionLeft, blogPositionTop } from "../store.ts"

const menuHeight = 36;
const margin = 10;
const fullScreenClass = "full-screen";

export function moveObject(myObject: HTMLElement, myEvent: MouseEvent, savePosition = false) {
    let startY = myEvent.pageY;
    let startX = myEvent.pageX;
    let screenWidth = document.documentElement.clientWidth;
    let screenHeight = document.documentElement.clientHeight;
    let offsetTop = myObject.offsetTop;
    let offsetLeft = myObject.offsetLeft;

    const drag = (event: MouseEvent) => {
        event.preventDefault();
        let newValueLeft = offsetLeft + (event.pageX - startX);
        if (newValueLeft < 0) {
            newValueLeft = 0;
        }
        let newValueTop = offsetTop + (event.pageY - startY);
        let paneHeight = myObject.clientHeight;
        if (newValueTop < menuHeight) {
            newValueTop = menuHeight;
        } else if (newValueTop + paneHeight > screenHeight) {
            newValueTop = screenHeight - paneHeight - margin;
        }

        let paneWidth = myObject.clientWidth;
        if (newValueLeft + paneWidth > screenWidth - margin) {
            newValueLeft = screenWidth - myObject.clientWidth - margin;
        }
        myObject.style.left = newValueLeft + "px";
        myObject.style.top = newValueTop + "px";

        if (savePosition) {
            saveObjectPosition(myObject, {
                savedPositionLeft: newValueLeft,
                savedPositionTop: newValueTop,
            })
        }
    };

    const mouseup = () => {
        (
            myObject.querySelector(".change-on-drag") as HTMLElement
        ).classList.remove("is-dragging");
        myObject.classList.remove("is-dragging");

        document.removeEventListener("mousemove", drag);
        document.removeEventListener("mouseup", mouseup);
    };

    let clash = false;
    const panelButtons = myObject.querySelectorAll(".beautiful-button");
    panelButtons.forEach((button) => {
        if (button.contains(myEvent.target as Element)) {
            clash = true;
        }
    })
    if (!clash) {
        myObject.classList.add("is-dragging");
        document.addEventListener("mousemove", drag);
        document.addEventListener("mouseup", mouseup);
    }
}

export function resizeObject(myObject: HTMLElement, event: MouseEvent, savePosition = false) {
    let startY = event.pageY;
    let startX = event.pageX;
    let screenWidth = document.documentElement.clientWidth;
    let screenHeight = document.documentElement.clientHeight;
    let offsetTop = myObject.offsetTop;
    let offsetLeft = myObject.offsetLeft;
    let objectWidth = myObject.clientWidth;
    let objectHeight = myObject.clientHeight;

    const drag = (event: MouseEvent) => {
        event.preventDefault();

        document.body.style.cursor = "nwse-resize";

        let newWidth = objectWidth + (event.pageX - startX);
        let newHeight = objectHeight + (event.pageY - startY);

        if (newWidth + offsetLeft > screenWidth - margin / 2) {
            newWidth = screenWidth - offsetLeft - margin / 2;
        }
        if (newHeight + offsetTop > screenHeight) {
            newHeight = screenHeight - offsetTop;
        }

        myObject.style.width = newWidth + "px";
        myObject.style.height = newHeight + "px";
        if (myObject.classList.contains(fullScreenClass)) {
            myObject.classList.remove(fullScreenClass);
        }
        if (savePosition) {
            saveObjectPosition(myObject, {
                savedWidth: newWidth,
                savedHeight: newHeight
            })
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

export function saveObjectPosition(myObject: HTMLElement, options?: {
    savedWidth?: number,
    savedHeight?: number,
    savedPositionLeft?: number,
    savedPositionTop?: number,
}) {
    blogPositionDefault.set('false');
    if (options?.savedWidth) {
        blogWidth.set(options.savedWidth.toString());
    } else {
        blogWidth.set(myObject.clientWidth.toString())
    }
    if (options?.savedHeight) {
        blogHeight.set(options.savedHeight.toString());
    } else {
        blogHeight.set(myObject.clientHeight.toString());
    }
    if (options?.savedPositionLeft) {
        blogPositionLeft.set(options.savedPositionLeft.toString());
    } else {
        // I do not know why I need to parseInt and back to string. 
        // Maybe it's because of floats? Anyway: it works this way.
        blogPositionLeft.set(parseInt(myObject.style.left).toString());
    }
    if (options?.savedPositionTop) {
        blogPositionTop.set(options.savedPositionTop.toString());
    } else {
        // I do not know why I need to parseInt and back to string. 
        // Maybe it's because of floats? Anyway: it works this way.
        blogPositionTop.set(parseInt(myObject.style.top).toString());
    }
}