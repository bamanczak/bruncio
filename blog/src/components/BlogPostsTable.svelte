<script>
    export let posts;
    import { Button } from "flowbite-svelte";
    import GithubSlugger from "github-slugger";
    const slugger = new GithubSlugger();

    import {
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
        Checkbox,
        TableSearch,
    } from "flowbite-svelte";
    console.log(posts);

    import { writable } from "svelte/store";
    const sortKey = writable("pubDate"); // default sort key
    const sortDirection = writable(1); // default sort direction (ascending)
    const sortItems = writable(posts.slice()); // make a copy of the items array

    // Define a function to sort the items
    const sortTable = (key) => {
        // If the same key is clicked, reverse the sort direction
        if ($sortKey === key) {
            sortDirection.update((val) => -val);
        } else {
            sortKey.set(key);
            sortDirection.set(1);
        }
    };

    $: {
        const key = $sortKey;
        const direction = $sortDirection;
        const sorted = [...$sortItems].sort((a, b) => {
            const aVal = a[key];
            const bVal = b[key];
            if (aVal < bVal) {
                return -direction;
            } else if (aVal > bVal) {
                return direction;
            }
            return 0;
        });
        sortItems.set(sorted);
    }

    const dateOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    };
</script>

<Table hoverable={true} striped={true}>
    <TableHead class="bg-black text-white">
        <TableHeadCell on:click={() => sortTable("title")}>Title</TableHeadCell>
        <TableHeadCell on:click={() => sortTable("description")}
            >Description</TableHeadCell
        >
        <TableHeadCell on:click={() => sortTable("pubDate")}
            >Pub. date</TableHeadCell
        >
        <TableHeadCell>
            <span class="sr-only">Edit</span>
        </TableHeadCell>
    </TableHead>
    <TableBody class="divide-y ">
        <!-- {#each Object.entries(posts) as [key, value], index (key)} -->
        {#each $sortItems as post}
            <TableBodyRow class="bg-mywhite">
                <TableBodyCell
                    class="text-black dark:text-black whitespace-normal"
                    >{post.title}</TableBodyCell
                >
                <TableBodyCell
                    class="text-black dark:text-black whitespace-normal"
                    >{post.description}</TableBodyCell
                >
                <TableBodyCell
                    class="text-black dark:text-black whitespace-nowrap"
                    >{post.pubDate
                        .toISOString()
                        .substring(0, 10)}</TableBodyCell
                >
                <TableBodyCell>
                    <a
                        href={"blog/" + slugger.slug(post.title)}
                        class="font-medium text-primary-600 hover:underline"
                        >Open</a
                    >
                </TableBodyCell>
            </TableBodyRow>
        {/each}
    </TableBody>
</Table>
