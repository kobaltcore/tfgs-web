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

<script>
	import moment from "moment";

	export let trending_games;
	export let updated_games;
	export let new_games;

	console.log(moment);

	function to_timedelta(date_str) {
		return moment(date_str).fromNow();
	}
</script>

<svelte:head>
	<title>TFGS Interface - Home</title>
</svelte:head>

<div
	variant="subtle"
	class="drac-box drac-card drac-card-subtle drac-border-pink drac-bg-pink drac-p-md drac-m-md"
>
	<h2 class="drac-heading drac-heading-xl drac-text-white">Trending</h2>

	<ul class="drac-list drac-list-unordered drac-list-purple">
		{#each trending_games as game}
			<li>
				<span class="drac-text drac-line-height drac-text-white">
					<a
						sveltekit:prefetch
						href="game/{game.id}"
						class="custom_link">{game.title}</a
					>
					for {game.game_engine} by {Object.keys(game.authors)}</span
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
				<span class="drac-text drac-line-height drac-text-white">
					<a
						sveltekit:prefetch
						href="game/{game.id}"
						class="custom_link">{game.title}</a
					>
					for {game.game_engine} by {Object.keys(game.authors)}
					{to_timedelta(game.last_update)}</span
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
				<span class="drac-text drac-line-height drac-text-white">
					<a
						sveltekit:prefetch
						href="game/{game.id}"
						class="custom_link">{game.title}</a
					>
					for {game.game_engine} by {Object.keys(game.authors)} {to_timedelta(game.release_date)}</span
				>
			</li>
		{/each}
	</ul>
</div>
