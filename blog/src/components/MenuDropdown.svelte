<script>
    import { Toggle, Button, MenuItem, Menu } from "svelte-ux";
    import { activatePanel } from "../scripts/panesOpener";
    import { navigate } from "astro:transitions/client";
</script>

<Toggle let:on={open} let:toggle>
    <Button on:click={toggle} class="p-0">
        <slot name="image" class="p-0" />
        <Menu
            {open}
            on:close={toggle}
            autoPlacement
            class="-mt-1 min-w-60 border-4 border-black bg-mywhite p-1 divide-y divide-black"
        >
            <MenuItem
                on:click={() => {
                    activatePanel("aboutComputer");
                }}
                class="flex items-center gap-x-0.5 py-2 px-3 text-sm text-black hover:text-mywhite hover:bg-black focus:outline-none focus:bg-black focus:text-mywhite"
                >About BruncIO</MenuItem
            >
            <hr class="h-px my-1 bg-black border-0" />

            <MenuItem
                on:click={() => {
                    navigate("/");
                }}
                class="flex items-center gap-x-0.5 py-2 px-3 text-sm text-black hover:text-mywhite hover:bg-black focus:outline-none focus:bg-black focus:text-mywhite"
                >Home</MenuItem
            >
            <MenuItem
                on:click={() => {
                    navigate("/blog");
                }}
                class="flex items-center gap-x-0.5 py-2 px-3 text-sm text-black hover:text-mywhite hover:bg-black focus:outline-none focus:bg-black focus:text-mywhite"
                >Blog</MenuItem
            >
            <MenuItem
                on:click={() => {
                    activatePanel("A11y");
                    activatePanel("CokkieNotice", 300);
                    activatePanel("EnvPolicy", 600);
                    activatePanel("TermsOfUse", 900);
                    activatePanel("PrivacyPolicy", 1200);
                }}
                class="legal-opener flex items-center gap-x-0.5 py-2 px-3 text-sm text-black hover:text-mywhite hover:bg-black focus:outline-none focus:bg-black focus:text-mywhite"
                >Legal</MenuItem
            >
        </Menu>
    </Button>
</Toggle>
