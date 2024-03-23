<script context="module">
	import { getDates } from "$lib/client";
</script>

<script>
	export let writedAt = null,
		writeDate = null,
		writedIn = null;

	let datetime = null,
		date = "",
		text = "";

	$: {
		if (writedAt) {
			let dateObject = getDates(writedAt);
			datetime = dateObject.datetime;
			date = dateObject.visualDate;
		} else {
			// Если нет параметрической даты, показываем кастомную
			date = writeDate;
			datetime = null;

			if (date) {
				let yearMatch = date.match(/\d{4}/);
				if (yearMatch) {
					datetime = yearMatch[0];
				}
			}
		}

		text = [date, writedIn].filter(Boolean).join(", ");
	}
</script>

{#if text}
	{#if datetime}
		<time {datetime}>{text}</time>
	{:else}
		<p>{text}</p>
	{/if}
{/if}

<style>
	time,
	p {
		display: block;
		margin: 1.5rem 0 0;
		font-style: italic;
		font-size: 1rem;
		text-align: right;
	}
</style>
