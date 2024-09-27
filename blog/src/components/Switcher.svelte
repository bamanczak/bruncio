<script lang="ts">
    import { navigate } from "astro:transitions/client";
    import { Switch } from "svelte-ux";
    import Icon from "@iconify/svelte";
    export let isChecked: boolean;
    export let pathname: string;

    function switchFunMode() {
        if (isChecked) {
            const newPath = `/simple${pathname}`;
            console.log("New path: " + newPath);
            navigate(`/simple${pathname}`);
        } else {
            navigate(`${pathname.replace("simple/", "")}`);
        }
    }
    console.log("Pathname is:" + pathname);
</script>

<div
    class="switcher-container rounded-full border-4 border-black bg-mywhite grid place-items-center"
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
                // data-[checked=false]:bg-my-yellow data-[checked=true]:bg-success
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
    }
</style>
