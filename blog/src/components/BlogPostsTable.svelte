<script>
    export let posts;
    import { Button } from "flowbite-svelte";
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

    let items = [
        { id: 1, maker: "Toyota", type: "ABC", make: 2017 },
        { id: 2, maker: "Ford", type: "CDE", make: 2018 },
        { id: 3, maker: "Volvo", type: "FGH", make: 2019 },
        { id: 4, maker: "Saab", type: "IJK", make: 2020 },
    ];

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
</script>

<Table hoverable={true} striped={true}>
    <TableHead>
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
            <TableBodyRow>
                <TableBodyCell
                    class="text-black dark:text-black whitespace-normal"
                    >{post.title}</TableBodyCell
                >
                <TableBodyCell
                    class="text-black dark:text-black whitespace-normal"
                    >{post.description}</TableBodyCell
                >
                <TableBodyCell
                    class="text-black dark:text-black whitespace-normal"
                    >{post.pubDate}</TableBodyCell
                >
                <TableBodyCell>
                    <a
                        href="/tables"
                        class="font-medium text-primary-600 hover:underline"
                        >Edit</a
                    >
                </TableBodyCell>
            </TableBodyRow>
        {/each}
    </TableBody>
</Table>

<!-- const sections = {
		"Title 1": "paragraph",
  	"Title 2": "paragraph",
		"Title 3": "paragraph",
		"Title 4": "paragraph",
		"Title 5": "paragraph"
	} -->
<!-- {#each Object.entries(sections) as [title, paragraph]}
  <h1>{title}</h1>
  <p>{paragraph}</p>
{/each} -->
