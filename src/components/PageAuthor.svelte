<script>
	export let author;
</script>

<p>
	<a href="/author/{author.nickname}">{author.name}</a>
</p>

<style>
	p {
		margin: 3rem 0;
		text-align: right;
	}

	a {
		display: inline-block;
		vertical-align: top;
		margin: 0 -0.5rem;
		padding: 0 0.5rem;
		font: italic 1.0625rem/1.5rem var(--font-sans-serif);
	}

	a:not(:hover):not(:focus):not(:active) {
		color: inherit;
	}

	@media print {
		:global(#app) a[href]::after {
			content: none;
		}
	}
</style>
