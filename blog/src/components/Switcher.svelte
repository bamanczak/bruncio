<script lang="ts">
    import { navigate } from "astro:transitions/client";
    import Icon from "@iconify/svelte";
    import { useFunMode } from "../store.ts";

    export let isChecked: boolean;
    export let pathname: string;
    export let is404: boolean;

    function switchFunMode() {
        if (isChecked) {
            useFunMode.set("false");
            if (pathname === "/fun" || pathname === "/fun/") {
                navigate("/blog");
            } else if (is404) {
                navigate("/404");
            } else {
                navigate(pathname.replace(/^\/fun/, "") || "/");
            }
        } else {
            useFunMode.set("true");
            if (pathname === "/") {
                navigate("/fun");
            } else if (is404) {
                navigate("/fun/404");
            } else {
                navigate(`/fun${pathname}`);
            }
        }
    }

    function checkIfCorrectMode() {
        if (pathname.startsWith("/fun")) {
            if (useFunMode.get() != "true") {
                useFunMode.set("true");
            }
        } else {
            if (useFunMode.get() == "true") {
                if (pathname === "/") {
                    navigate("/fun");
                } else {
                    navigate(`/fun${pathname}`);
                }
            }
        }
    }

    checkIfCorrectMode();
</script>

<!-- max-md:hidden -->
<div
    class="switcher-container rounded-full border-black grid place-items-center
    md:border-4 md:bottom-5 md:left-5 md:bg-mywhite
    max-md:border-0 max-md:bg-transparent max-md:top-0.5 max-md:right-16"
>
    <label
        for="fun-mode"
        class="flex gap-2 items-center text-sm cursor-pointer"
    >
        <div
            class="relative inline-block w-12 h-6 align-middle select-none transition duration-200 ease-in"
        >
            <input
                type="checkbox"
                name="fun-mode"
                id="fun-mode"
                class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-mywhite border-4 border-black appearance-none cursor-pointer"
                checked={isChecked}
                on:change={() => switchFunMode()}
            />
            <span
                class="toggle-label block overflow-hidden h-6 rounded-full bg-black cursor-pointer"
            ></span>
            <div class="absolute left-1 top-1 pointer-events-none">
                {#if isChecked}
                    <Icon
                        icon="pixelarticons:cake"
                        class="text-myyellow w-4 h-4"
                    />
                {:else}
                    <Icon
                        icon="pixelarticons:briefcase"
                        class="text-mywhite w-4 h-4"
                    />
                {/if}
            </div>
        </div>
        Fun mode
    </label>
</div>

<style>
    .switcher-container {
        position: fixed;
        padding: 5px;
        z-index: 9970;
    }
    .toggle-checkbox:checked {
        right: 0;
        border-color: #ecb337; /* myyellow */
        background-color: #ecb337;
    }
    .toggle-checkbox:checked + .toggle-label {
        background-color: #000;
    }
    .toggle-checkbox {
        right: calc(100% - 1.5rem);
        transition: all 0.3s;
    }
</style>
