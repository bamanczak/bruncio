<script>
    import { navigate } from "astro:transitions/client";

    export let posts;
    export let linksPrefix = "/blog";
    import GithubSlugger from "github-slugger";
    const slugger = new GithubSlugger();
    import Icon from "@iconify/svelte";

    import { Tooltip } from "flowbite-svelte";

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
    sortTable("pubDate");

    const dateOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    };

    function isEven(number) {
        if (number % 2 == 0) {
            return true;
        } else {
            return false;
        }
    }

    function setRowClass(number) {
        let baseClasses =
            "text-justify pl-3 group-hover:bg-black group-focus:bg-black group-hover:text-white dark:text-black dark:group-focus:text-white group-focus:text-white dark:group-hover:text-white";
        if (isEven(number)) {
            return baseClasses;
        } else {
            return baseClasses + " bg-white dark:bg-white";
        }
    }

    function openPost(url) {
        navigate(`${linksPrefix}/${url}`);
    }
</script>

<table>
    <thead
        class="text-lg bg-black dark:bg-black text-mywhite dark:text-mywhite sticky p-0"
    >
        <th class="icon-column"></th>
        <th on:click={() => sortTable("title")} class="text-left">Post</th>
        <th
            on:click={() => sortTable("pubDate")}
            class="text-left date-column max-md:hidden">Date</th
        >
        <th class="empty-column p-0"></th>
    </thead>

    <tbody>
        {#each $sortItems as post, index}
            <tr
                id={"post-no-" + index}
                class="group cursor-pointer"
                on:click={() => openPost(slugger.slug(post.id))}
            >
                <td class={"text-2xl content-center" + setRowClass(index)}>
                    <div class="icon-container">
                        <Icon class="icon" icon={post.icon} />
                    </div>
                </td>
                <td class={setRowClass(index) + " text-balance text-lg"}>
                    <span class="mb-0">{post.title}</span>
                    <p class="text-base md:hidden mt-1">
                        {post.pubDate.toISOString().substring(0, 10)}
                    </p>
                </td>
                <td
                    class={setRowClass(index) +
                        " date-column text-nowrap max-md:hidden text-lg"}
                    >{post.pubDate.toISOString().substring(0, 10)}</td
                >
                <td class={setRowClass(index) + "empty-column p-0"}></td>
            </tr>
            <Tooltip
                placement="bottom"
                type="custom"
                defaultClass=""
                class="p-1 text-base text-mywhite dark:text-mywhite dark:bg-black bg-black border-black border-4 max-md:hidden"
                arrow={false}
                triggeredBy={"#post-no-" + index}
            >
                {post.description}
            </Tooltip>
        {/each}
    </tbody>
</table>

<style>
    .inline-icon {
        font-size: 3rem !important;
    }
    .sticky {
        position: -webkit-sticky;
        position: sticky;
        top: 0;
    }
    .date-column {
        min-width: 150px;
    }

    .icon-column {
        min-width: 25px;
    }
    .icon-container {
        width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .icon {
        width: 100%;
        height: 100%;
    }

    tr td:first-child,
    thead th:first-child {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }

    tr td:last-child,
    thead th:last-child {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    td:not(:first-child) {
        padding-top: 16px;
        padding-bottom: 16px;
        padding-right: 16px;
    }
    td.date-column {
        padding-right: 0px;
    }

    table {
        text-align: center;
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        font-size: 16px;
    }
    thead {
        /* background: #fff; */
        height: 32px;
        position: sticky;
        inset-block-start: 0;
    }
    th {
        border-bottom: 1px solid #e0e0e0;
        border-top: 1px solid #e0e0e0;
    }

    .icon-container {
        width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .icon {
        width: 100%;
        height: 100%;
    }
</style>
