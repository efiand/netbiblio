<script context="module">
	import { getDates } from "$lib/client";
	import { hasHTMLBlocks, typography } from "$lib/text";
</script>

<script>
	export let content = "",
		id = null,
		isCite = false,
		isPoem = false,
		isSecondary = false,
		inRightSide = false,
		isCentered = false,
		noprint = false,
		signature = null;

	function prepareContent(text) {
		text = text.trim();
		if (!text) {
			return text;
		}

		// Обрабатываем контент без блочных тегов
		if (!hasHTMLBlocks(text)) {
			text = `<p>${text.replace(/\n/g, "</p><p>").replace(/<p><\/p><p>/g, '<p class="separated">')}</p>`;
		}

		return typography(text);
	}

	function prepareSignature(text) {
		const { datetime, visualDate } = getDates(text);
		if (datetime) {
			return `<time datetime="${datetime}">${visualDate}</time>`;
		}
		return text;
	}
</script>

{#if isCite}
	<blockquote
		{id}
		class="content"
		class:noindent={isCentered || isPoem}
		class:centered={isCentered}
		class:poem={isPoem}
		class:secondary={isSecondary}
		class:right={inRightSide}
	>
		{#if $$slots.default}
			<slot />
		{:else}
			{@html prepareContent(content)}
		{/if}

		{#if signature}
			<cite class="cite right">{@html prepareSignature(signature)}</cite>
		{/if}
	</blockquote>
{:else}
	<div
		{id}
		class="content"
		class:noindent={isCentered || isPoem}
		class:centered={isCentered}
		class:poem={isPoem}
		class:secondary={isSecondary}
		class:right={inRightSide}
		class:noprint
	>
		{#if $$slots.default}
			<slot />
		{:else}
			{@html prepareContent(content)}
		{/if}

		{#if signature}
			<p class="cite right">{@html prepareSignature(signature)}</p>
		{/if}
	</div>
{/if}

<style>
	.content {
		margin: 1.5rem 0;
		font-family: var(--font-serif);
	}

	.centered {
		text-align: center;
	}

	.content :global(small) {
		font-size: 0.8125rem;
		font-family: var(--font-sans-serif);
	}

	.content:not(.noindent) :global(p:not(.right)) {
		text-indent: 2rem;
		hyphens: auto;
	}

	.poem {
		display: table;
		margin-right: auto;
		margin-left: auto;
	}

	.poem :global(p:not([style])) {
		padding-left: 2rem;
		min-height: 1.5rem;
		text-indent: -2rem;
	}

	.secondary,
	.secondary :global(p) {
		font-size: 1rem;
	}

	:global(.separated) {
		margin-top: 1.5rem;
	}

	:global(.acute::after) {
		/* span нужен для исправления шрифта ударения */
		/* Явная передача мнемоники в span делает разметку невалидной */
		content: "\0301";
		line-height: 1rem;
		font-family: var(--font-sans-serif);
	}

	.right {
		display: table;
		margin-right: 0;
		margin-left: auto;
	}

	blockquote.right {
		max-width: 80%;
	}

	.cite,
	.secondary .cite {
		margin-top: 1rem;
		font-style: italic;
		font-size: 0.875rem;
		font-family: var(--font-sans-serif);
	}

	:global(.toc) {
		display: table;
		margin-right: auto;
		margin-left: auto;
	}

	:global(.toc a) {
		display: inline-block;
		vertical-align: baseline;
		padding: 0 0.5rem;
		font-family: var(--font-sans-serif);
		text-decoration: none;
	}

	@media (min-width: 768px) {
		.content:not(.noindent) :global(p:not(.right)) {
			text-align: justify;
		}

		blockquote.right {
			max-width: 60%;
		}
	}

	@media print {
		.content:not(.noindent) :global(p:not(.right)) {
			text-align: justify;
		}
	}
</style>
