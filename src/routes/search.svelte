<script context="module">
    export async function load({ page, fetch, session, context }) {
        var query = page.query.get("query");
        var offset = page.query.get("offset");
        var limit = page.query.get("limit");

        if (query == null || query == "") {
            return {
                props: {
                    results: {
                        result: [],
                    },
                    query: "",
                },
            };
        }
        if (offset == null) {
            offset = 0;
        }
        if (limit == null) {
            limit = 10;
        }

        return await fetch(
            `https://tfgs-api.student-transfer.com/search?query=${query}&offset=${offset}&limit=${limit}`
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                return {
                    props: {
                        results: data,
                        query: query,
                    },
                };
            })
            .catch(function (error) {
                return {
                    error: error,
                };
            });
    }
</script>

<script>
    import { goto } from "$app/navigation";

    export let query;
    export let results;

    function onKeyPress(event) {
        if (event.charCode === 13) {
            goto(`search?query=${query}`);
        }
    }
</script>

<input
    placeholder="Search..."
    bind:value={query}
    on:keypress={onKeyPress}
    class="drac-input drac-input-white drac-text-white"
/>

{#if results["suggestion"] != null}
    <p class="drac-text drac-line-height drac-text-white">
        Did you mean <a class="custom_link" href={`search?query=${results["suggestion"]}`}
            >{results["suggestion"]}</a
        >?
    </p>
{/if}

{#if results["result"].length > 0}
    <h2 class="drac-heading drac-heading-xl drac-text-white">Results</h2>
    <div class="drac-box">
        {#if results["previous"]["url"] != null}
            <a
                sveltekit:prefetch
                href={`search?query=${query}&offset=${results["previous"]["offset"]}&limit=${results["previous"]["limit"]}`}
                class="custom_link">Previous</a
            >
        {:else}
            <span class="drac-text drac-line-height drac-text-white"
                >Previous</span
            >
        {/if}

        <span class="drac-text drac-line-height drac-text-white">
            | {results["page_num"]} / {results["total_pages"]} |
        </span>

        {#if results["next"]["url"] != null}
            <a
                sveltekit:prefetch
                href={`search?query=${query}&offset=${results["next"]["offset"]}&limit=${results["next"]["limit"]}`}
                class="custom_link">Next</a
            >
        {:else}
            <span class="drac-text drac-line-height drac-text-white">Next</span>
        {/if}
    </div>
    <div
        variant="subtle"
        class="drac-box drac-card drac-card-subtle drac-border-pink drac-bg-pink drac-p-xs drac-m-xs"
    >
        <ul class="drac-list drac-list-unordered drac-list-purple">
            {#each results["result"] as game}
                <li>
                    <a
                        sveltekit:prefetch
                        href="game/{game.id}"
                        class="custom_link">{game.title}</a
                    >
                </li>
            {/each}
        </ul>
    </div>
{/if}
