<script context="module">
	export async function load({ page, fetch, session, context }) {
		var offset = page.query.get("offset");
		var limit = page.query.get("limit");
		var tab = page.query.get("tab");

		if (offset == null) {
			offset = 0;
		}
		if (limit == null) {
			limit = 5;
		}
		if (tab == null) {
			tab = "synopsis";
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
						tab: tab,
						limit: limit,
						offset: offset,
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
	import { page } from "$app/stores";

	console.log($page);
	export let limit;
	export let offset;
	export let tab;
	export let game;
	export let reviews;
</script>

<svelte:head>
	<title>TFGS Interface - {game.title}</title>
</svelte:head>

<div class="wrapper">
	<div class="drac-box drac-card drac-bg-purple drac-p-xs header">
		<div class="drac-box drac-m-xs">
			<h2 class="drac-heading drac-heading-xl drac-text-white">
				{game.title}
			</h2>
			<span class="drac-text drac-line-height drac-text-black"
				>{Object.keys(game.authors).sort()}</span
			>
		</div>
		<div class="drac-box drac-m-xs">
			<span class="drac-text drac-line-height drac-text-white"
				>{game.likes} Likes</span
			>
		</div>
	</div>
	<div class="drac-box drac-card drac-bg-purple drac-p-xs sidebar">
		<div class="drac-box drac-m-xs">
			<table class="drac-table drac-table-striped drac-table-cyan">
				<!-- <thead>
				<tr>
					<th class="drac-text drac-text-white">Name</th>
					<th class="drac-text drac-text-white">Bio</th>
				</tr>
			</thead> -->
				<tbody>
					<tr>
						<td class="drac-text drac-text-white">Likes</td>
						<td class="drac-text drac-text-white">{game.likes}</td>
					</tr>
					{#if game.play_online}
						<tr>
							<td class="drac-text drac-text-white"
								>Play Online</td
							>
							<td class="drac-text drac-text-white"
								><a
									class="custom_link"
									href={game.play_online}
									target="_blank">{game.play_online}</a
								></td
							>
						</tr>
					{/if}
					<tr>
						<td class="drac-text drac-text-white">Engine</td>
						<td class="drac-text drac-text-white"
							>{game.game_engine}</td
						>
					</tr>
					<tr>
						<td class="drac-text drac-text-white">Rating</td>
						<td class="drac-text drac-text-white"
							>{game.content_rating}</td
						>
					</tr>
					<tr>
						<td class="drac-text drac-text-white">Language</td>
						<td class="drac-text drac-text-white"
							>{game.language.toLowerCase()}</td
						>
					</tr>
					<tr>
						<td class="drac-text drac-text-white">Version</td>
						<td class="drac-text drac-text-white">{game.version}</td
						>
					</tr>
					<tr>
						<td class="drac-text drac-text-white">Dev. Stage</td>
						<td class="drac-text drac-text-white"
							>{game.development_stage.toLowerCase()}</td
						>
					</tr>
					<tr>
						<td class="drac-text drac-text-white"
							>Orig. PC Gender</td
						>
						<td class="drac-text drac-text-white"
							>{game.orig_pc_gender.toLowerCase()}</td
						>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="drac-box drac-card drac-bg-pink-purple drac-p-xs content">
		<div class="drac-box drac-m-xs">
			<ul class="drac-tabs drac-tabs-cyan">
				{#if game.synopsis["text"]}
					<li
						class="drac-tab"
						class:drac-tab-active={tab == "synopsis"}
					>
						<a
							sveltekit:noscroll
							class="drac-tab-link drac-text"
							href={`?offset=${offset}&limit=${limit}&tab=synopsis`}
							>Synopsis</a
						>
					</li>
				{/if}
				{#if game.plot["text"]}
					<li class="drac-tab" class:drac-tab-active={tab == "plot"}>
						<a
							sveltekit:noscroll
							class="drac-tab-link drac-text"
							href={`?offset=${offset}&limit=${limit}&tab=plot`}
							>Plot</a
						>
					</li>
				{/if}
				{#if game.characters["text"]}
					<li
						class="drac-tab"
						class:drac-tab-active={tab == "characters"}
					>
						<a
							sveltekit:noscroll
							class="drac-tab-link drac-text"
							href={`?offset=${offset}&limit=${limit}&tab=characters`}
							>Characters</a
						>
					</li>
				{/if}
				{#if game.walkthrough["text"]}
					<li
						class="drac-tab"
						class:drac-tab-active={tab == "walkthrough"}
					>
						<a
							sveltekit:noscroll
							class="drac-tab-link drac-text"
							href={`?offset=${offset}&limit=${limit}&tab=walktrhough`}
							>Walkthrough</a
						>
					</li>
				{/if}
				{#if game.changelog["text"]}
					<li
						class="drac-tab"
						class:drac-tab-active={tab == "changelog"}
					>
						<a
							sveltekit:noscroll
							class="drac-tab-link drac-text"
							href={`?offset=${offset}&limit=${limit}&tab=changelog`}
							>Changelog</a
						>
					</li>
				{/if}
			</ul>
			{#if tab == "synopsis"}
				<div>
					<p class="drac-text drac-line-height drac-text-black">
						{game.synopsis["text"]}
					</p>
				</div>
			{:else if tab == "plot"}
				<div>
					<p class="drac-text drac-line-height drac-text-black">
						{game.plot["text"]}
					</p>
				</div>
			{:else if tab == "characters"}
				<div>
					<p class="drac-text drac-line-height drac-text-black">
						{game.characters["text"]}
					</p>
				</div>
			{:else if tab == "walkthrough"}
				<div>
					<p class="drac-text drac-line-height drac-text-black">
						{game.walkthrough["text"]}
					</p>
				</div>
			{:else if tab == "changelog"}
				<div>
					<p class="drac-text drac-line-height drac-text-black">
						{game.changelog["text"]}
					</p>
				</div>
			{/if}
		</div>
	</div>
	<div class="drac-box drac-card drac-bg-purple drac-p-xs review">
		<div class="drac-box drac-m-xs">
			<h2 class="drac-heading drac-heading-xl drac-text-white">
				Reviews
			</h2>
			{#if reviews["result"].length > 0}
				<div class="drac-box">
					{#if reviews["previous"]["url"] != null}
						<a
							sveltekit:prefetch
							sveltekit:noscroll
							href={`?offset=${reviews["previous"]["offset"]}&limit=${reviews["previous"]["limit"]}&tab=${tab}`}
							class="custom_link">Previous</a
						>
					{:else}
						<span class="drac-text drac-line-height drac-text-black"
							>Previous</span
						>
					{/if}

					<span class="drac-text drac-line-height drac-text-black">
						| {reviews["page_num"]} / {reviews["total_pages"]} |
					</span>

					{#if reviews["next"]["url"] != null}
						<a
							sveltekit:prefetch
							sveltekit:noscroll
							href={`?offset=${reviews["next"]["offset"]}&limit=${reviews["next"]["limit"]}&tab=${tab}`}
							class="custom_link">Next</a
						>
					{:else}
						<span class="drac-text drac-line-height drac-text-black"
							>Next</span
						>
					{/if}
				</div>
				<ul class="drac-list drac-list-unordered drac-list-purple">
					{#each reviews["result"] as review}
						<li class="drac-text drac-text-black">
							{review.text}
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</div>

<style>
	.review {
		grid-area: review;
	}

	.sidebar {
		grid-area: sidebar;
	}

	.content {
		grid-area: content;
	}

	.header {
		grid-area: header;
	}

	.wrapper {
		display: grid;
		grid-gap: 10px;
		grid-template-columns: 25% auto;
		grid-template-areas:
			"header  header  header"
			"sidebar content content"
			"sidebar review  review";
	}
</style>
