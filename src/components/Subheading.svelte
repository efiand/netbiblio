<script context="module">
	import { typography } from "$lib/text";
</script>

<script>
	export let id = null,
		title,
		child = false,
		description = null;

	let asterism;

	$: asterism = /^«.+…»$/.test(title) || title === "***";
</script>

{#if child}
	<h3 {id}>
		{#if asterism}
			<span class:asterism aria-hidden="true">✽✽✽</span>
			<span class="visually-hidden">{title}</span>
		{:else}
			{@html typography(title)}
		{/if}
	</h3>
{:else}
	<h2 {id}>
		{#if asterism}
			<span class:asterism aria-hidden="true">✽✽✽</span>
			<span class="visually-hidden">{title}</span>
		{:else}
			{@html typography(title)}
		{/if}
	</h2>
{/if}
{#if description}
	<p class:description>({@html typography(description)})</p>
{/if}

<style>
	h3 {
		font-weight: 400;
		font-style: italic;
		font-size: 1.375rem;
		font-family: var(--font-serif);
	}

	.asterism {
		display: block;
		font-style: normal;
		font-size: 1.25rem;
		line-height: 1;
		letter-spacing: 0.125rem;
	}

	h3 .asterism {
		font-size: 1rem;
	}

	.description {
		margin-top: -1rem;
	}
</style>
