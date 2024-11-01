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

<div
    class="switcher-container max-md:hidden rounded-full border-4 border-black bg-mywhite grid place-items-center"
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
        bottom: 20px;
        left: 20px;
        padding: 5px;
        z-index: 9989;
    }
</style>
