<script lang="ts">
    import { navigate } from "astro:transitions/client";
    import { Switch } from "svelte-ux";
    import Icon from "@iconify/svelte";
    import { useFunMode } from "../store.ts";
    export let isChecked: boolean;
    export let pathname: string;
    export let is404: boolean;

    function switchFunMode() {
        if (isChecked) {
            useFunMode.set("false");
            if (pathname == "/") {
                navigate("/boring/blog");
            } else {
                navigate(`/boring${pathname}`);
            }
        } else {
            useFunMode.set("true");
            navigate(`${pathname.replace("boring/", "")}`);
        }
    }

    function checkIf404AndVerifyPath() {
        if (useFunMode.get() != "true") {
            if (is404) {
                navigate("/boring/404");
            } else if (pathname == "/") {
                navigate("/boring/blog");
            }
        }
    }

    checkIf404AndVerifyPath();
</script>

<!-- max-md:hidden -->
<div
    class="switcher-container rounded-full border-black grid place-items-center
    md:border-4 md:bottom-5 md:left-5 md:bg-mywhite
    max-md:border-0 max-md:bg-transparent max-md:top-0.5 max-md:right-16"
>
    <label for="fun-mode" class="flex gap-2 items-center text-sm">
        <Switch
            on:change={() => switchFunMode()}
            id="fun-mode"
            let:checked
            checked={isChecked}
            color="success"
            classes={{
                switch: "bg-surface-100 border-black data-[checked=false]:bg-black data-[checked=false]:border-black data-[checked=true]:bg-myyellow data-[checked=true]:border-myyellow",
                toggle: "bg-mywhite",
            }}
        >
            {#if checked}
                <Icon icon="pixelarticons:cake" class="text-primary" />
            {:else}
                <Icon
                    icon="pixelarticons:briefcase"
                    class="text-surface-content"
                />
            {/if}
        </Switch>
        Fun mode
    </label>
</div>

<style>
    .switcher-container {
        position: fixed;
        padding: 5px;
        z-index: 9970;
    }
</style>
