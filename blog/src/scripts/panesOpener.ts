import { zIndex } from '../store.js';

export function closePanel(myElement: HTMLElement) {
    myElement.style.setProperty('--animate-duration', '0.4s');
    myElement.classList.add("animate__zoomOut");
    setTimeout(function () {
        myElement.classList.add("invisible");
        myElement.classList.remove("animate__zoomOut");
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

export function showPanelOnTop(myElement: HTMLElement) {
    const currentIndex = zIndex.get() + 1
    zIndex.set(currentIndex);
    myElement.style.zIndex = currentIndex.toString();
}