<script context="module">
	export async function load({ page, fetch, session, context }) {
		var offset = page.query.get("offset");
		var limit = page.query.get("limit");

		if (offset == null) {
			offset = 0;
		}
		if (limit == null) {
			limit = 10;
		}

		return Promise.all([
			fetch(
				`https://tfgs-api.student-transfer.com/games/${page.params.id}`
			),
			fetch(
				`https://tfgs-api.student-transfer.com/reviews/list/${page.params.id}?&offset=${offset}&limit=${limit}`
			),
		])
			.then(function (responses) {
				return Promise.all(
					responses.map(function (response) {
						return response.json();
					})
				);
			})
			.then(function (data) {
				return {
					props: {
						game: data[0],
						reviews: data[1],
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

<svelte:head>
	<title>TFGS Interface - {game.title}</title>
</svelte:head>

<script>
	export let game;
	export let reviews;
</script>

<h2 class="drac-heading drac-heading-xl drac-text-white">{game.title}</h2>

<span class="drac-text drac-line-height drac-text-white"
	>Likes: {game.likes}</span
>

<p class="drac-text drac-line-height drac-text-white">
	Play Online: <a class="custom_link" href={game.play_online} target="_blank"
		>{game.play_online}</a
	>
</p>

<p class="drac-text drac-line-height drac-text-white">
	{game.synopsis["text"]}
</p>

<h2 class="drac-heading drac-heading-xl drac-text-white">Reviews</h2>
{#if reviews["result"].length > 0}
	<div class="drac-box">
		{#if reviews["previous"]["url"] != null}
			<a
				sveltekit:prefetch
				sveltekit:noscroll
				href={`?offset=${reviews["previous"]["offset"]}&limit=${reviews["previous"]["limit"]}`}
				class="custom_link">Previous</a
			>
		{:else}
			<span class="drac-text drac-line-height drac-text-white"
				>Previous</span
			>
		{/if}

		<span class="drac-text drac-line-height drac-text-white">
			| {reviews["page_num"]} / {reviews["total_pages"]} |
		</span>

		{#if reviews["next"]["url"] != null}
			<a
				sveltekit:prefetch
				sveltekit:noscroll
				href={`?offset=${reviews["next"]["offset"]}&limit=${reviews["next"]["limit"]}`}
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
			{#each reviews["result"] as review}
				<li class="drac-text drac-text-white">
					{review.text}
				</li>
			{/each}
		</ul>
	</div>
{/if}
