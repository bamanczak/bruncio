<script>
    export let title;
    export let pubDate;
    import { TableBodyCell, TableBodyRow } from "flowbite-svelte";
</script>

<TableBodyRow class="text-black">
    <TableBodyCell>{title}</TableBodyCell>
    <TableBodyCell>{pubDate}</TableBodyCell>
    <TableBodyCell>Laptop PC</TableBodyCell>
    <TableBodyCell>$1999</TableBodyCell>
    <TableBodyCell>
        <a
            href="/tables"
            class="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >Edit</a
        >
    </TableBodyCell>
</TableBodyRow>

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
