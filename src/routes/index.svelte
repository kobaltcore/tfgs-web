<script context="module">
	export async function load({ page, fetch, session, context }) {
		return Promise.all([
			fetch(`https://tfgs-api.student-transfer.com/games/list/trending`),
			fetch(`https://tfgs-api.student-transfer.com/games/list/updated`),
			fetch(`https://tfgs-api.student-transfer.com/games/list/new`),
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
						trending_games: data[0],
						updated_games: data[1],
						new_games: data[2],
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
	<title>TFGS Interface - Home</title>
</svelte:head>

<script>
	export let trending_games;
	export let updated_games;
	export let new_games;
</script>

<div
	variant="subtle"
	class="drac-box drac-card drac-card-subtle drac-border-pink drac-bg-pink drac-p-md drac-m-md"
>
	<h2 class="drac-heading drac-heading-xl drac-text-white">Trending</h2>

	<ul class="drac-list drac-list-unordered drac-list-purple">
		{#each trending_games as game}
			<li>
				<a sveltekit:prefetch href="game/{game.id}" class="custom_link"
					>{game.title}</a
				>
			</li>
		{/each}
	</ul>
</div>

<div
	variant="subtle"
	class="drac-box drac-card drac-card-subtle drac-border-pink drac-bg-pink drac-p-md drac-m-md"
>
	<h2 class="drac-heading drac-heading-xl drac-text-white">Updated</h2>
	<ul class="drac-list drac-list-unordered drac-list-purple">
		{#each updated_games as game}
			<li>
				<a sveltekit:prefetch href="game/{game.id}" class="custom_link"
					>{game.title}</a
				>
			</li>
		{/each}
	</ul>
</div>

<div
	variant="subtle"
	class="drac-box drac-card drac-card-subtle drac-border-pink drac-bg-pink drac-p-md drac-m-md"
>
	<h2 class="drac-heading drac-heading-xl drac-text-white">New</h2>
	<ul class="drac-list drac-list-unordered drac-list-purple">
		{#each new_games as game}
			<li>
				<a sveltekit:prefetch href="game/{game.id}" class="custom_link"
					>{game.title}</a
				>
			</li>
		{/each}
	</ul>
</div>
