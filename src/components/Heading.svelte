<script context="module">
	import { heading } from "$lib/stores";
	import { typography } from "$lib/text";
</script>

{#if $heading.title}
	<h1 class="heading">{@html typography($heading.title)}</h1>

	{#if $heading.description}
		<p class="descr">({@html typography($heading.description)})</p>
	{/if}

	{#if $heading.additionalTitle}
		<p class="heading additional">{@html typography($heading.additionalTitle)}</p>
	{/if}
{/if}

<style>
	.heading {
		margin: 0 0 3rem;
		font: italic 2.5rem/3rem var(--font-serif);
		text-align: center;
		color: var(--color-brand);
	}

	.heading :global(a) {
		display: inline-block;
		vertical-align: baseline;
		padding: 0 0.5rem;
		text-decoration: none;
	}

	.descr {
		margin: -2.5rem 0 3rem;
		font-style: italic;
		font-size: 1.25rem;
		font-family: var(--font-serif);
		text-align: center;
	}

	.additional {
		margin-top: -1.5rem;
		font-size: 2rem;
	}

	@media print {
		:global(#app) .heading :global(a::after) {
			content: none;
		}
	}
</style>
