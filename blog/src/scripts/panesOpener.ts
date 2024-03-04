import { zIndex, blogExpanded, blogHeight, blogWidth, blogPositionLeft, blogPositionTop, blogPositionDefault } from '../store.js';
import { saveObjectPosition } from './windowMover.js'

export function activatePanel(myElement: HTMLElement | string) {
    if (typeof myElement === "string") {
        openPanelWithId(myElement);
    } else {
        openOrWigglePanel(myElement);
    }
}

export function openOrWigglePanel(myElement: HTMLElement) {
    if (myElement.classList.contains("invisible")) {
        openPanel(myElement);
    } else {
        myElement.style.setProperty('--animate-duration', '0.4s');
        const animationTriggerClass = "animate__pulse"
        myElement.classList.add(animationTriggerClass);
        setTimeout(function () {
            myElement.classList.remove(animationTriggerClass);
        }, 410);
    }
    showPanelOnTop(myElement)
}

export function closePanel(myElement: HTMLElement) {
    myElement.style.setProperty('--animate-duration', '0.4s');
    const animationTriggerClass = "animate__zoomOut"
    myElement.classList.add(animationTriggerClass);
    setTimeout(function () {
        myElement.classList.add("invisible");
        myElement.classList.remove(animationTriggerClass);
    }, 410);
}

export function openPanel(myElement: HTMLElement) {
    myElement.style.setProperty('--animate-duration', '0.2s');
    myElement.classList.remove("invisible");

    myElement.classList.add("animate__zoomIn");
    setTimeout(function () {
        myElement.classList.remove("animate__zoomIn");
    }, 210);
}

export function openPanelWithId(id: string) {
    const panel = <HTMLElement>document.querySelector(`[data-windowName='${id}']`)
    console.log(`opening ${id}`);
    openOrWigglePanel(panel);
}

export function showPanelOnTop(myElement: HTMLElement) {
    const currentIndex = zIndex.get() + 1
    zIndex.set(currentIndex);
    myElement.style.zIndex = currentIndex.toString();
}

export function expandPanel(panel: HTMLElement, savePosition = false, isBlogPost = false) {
    const fullScreenClass = "full-screen";
    const menuHeight = 36;

    panel.style.transition = "all 0.3s ease-in-out";
    if (panel.classList.contains(fullScreenClass)) {
        panel.classList.remove(fullScreenClass);

        if (isBlogPost) {
            // or should I use values from store?
            if (blogPositionDefault.get()) {
                panel.style.height = "90vh";
                panel.style.width = "80vw";
                panel.style.left = "calc(20vw - 20px)";
                panel.style.top = `56px`;
            } else {
                panel.style.height = blogHeight.get() + "px";
                panel.style.width = blogWidth.get() + "px";
                panel.style.left = blogPositionLeft.get() + "px";
                panel.style.top = blogPositionTop.get() + "px";
            }
        } else {
            panel.style.height = "40vh";
            panel.style.width = "40vw";
            panel.style.left = "calc(50vw - 20vw)";
            panel.style.top = `calc(50vh - 20vh + ${menuHeight}px)`;
        }

        if (savePosition) {
            blogExpanded.set(false);
            // saveObjectPosition(panel);
        }
    } else {
        panel.classList.add(fullScreenClass);
        panel.style.width = "100vw";
        panel.style.left = "0px";
        panel.style.top = `${menuHeight}px`;
        panel.style.height = `calc(100vh - ${menuHeight}px)`;
        if (savePosition) {
            blogExpanded.set(true);
        }
    }

    setTimeout(function () {
        panel.style.transition = "none";
    }, 400);
}