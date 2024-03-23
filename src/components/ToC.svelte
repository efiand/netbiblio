<script>
	export let list,
		id = null,
		columns = 1,
		flex = false,
		book = false;
</script>

<div class="wrap" class:book>
	<ul class:flex class:columns={columns > 1} {id} style="--column-count: {columns}">
		{#each list as { href, title, titleDescription, number = null, active = false, nofollow = false }}
			<li>
				<a class:active {href} rel={nofollow ? "nofollow" : null}>
					{#if book && number !== null}
						<span class="number">{number}</span>
					{/if}

					<span class="title">
						{@html title}

						{#if titleDescription}
							<span class="description">({@html titleDescription})</span>
						{/if}
					</span>
				</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	.wrap {
		/* Требуется для гибкой мультиколоночности */
		display: table;
		margin: 0 auto;
	}

	.book {
		position: relative;
	}

	ul {
		margin: 0 auto;
		font-size: 0.9375rem;
	}

	.description {
		line-height: 1;
		text-indent: 0;
	}

	a {
		display: block;
		margin: 0 0 1px;
		padding: 0.5rem 1rem 0.5rem 2rem;
		text-indent: -1rem;
		text-decoration: none;
	}

	a:not(:hover):not(:focus):not(:active):not(.active) {
		color: var(--color-text);
	}

	@media (max-width: 767px) {
		a {
			border-radius: 0;
		}

		a:not(:hover):not(:focus):not(:active):not(.active) {
			padding-bottom: calc(0.5rem - 1px);
			background-color: var(--color-back);
		}

		a:hover,
		a:focus,
		a:active,
		a.active {
			margin: 0;
		}

		li:first-child a {
			border-radius: 0.25rem 0.25rem 0 0;
		}

		li:last-child a {
			margin: 0;
			border-radius: 0 0 0.25rem 0.25rem;
		}

		li:last-child a:not(:hover):not(:focus):not(:active):not(.active) {
			padding-bottom: 0.5rem;
		}

		li:only-child a {
			border-radius: 0.25rem;
		}
	}

	@media (max-width: 767px) {
		.number {
			display: none;
		}
	}

	@media (min-width: 768px) {
		.book {
			display: block;
		}

		.columns {
			column-count: var(--column-count);
			column-gap: 5rem;
		}

		.flex {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
		}

		.flex li {
			margin-right: 1rem;
			margin-left: 1rem;
		}

		a {
			display: inline-block;
			margin: 0 -0.5rem;
			padding: 0 0.5rem 0 1.5rem;
			vertical-align: baseline;
		}

		.book a {
			position: relative;
			display: flex;
			align-items: flex-end;
			padding: 0 0.5rem;
			text-indent: 0;
		}

		.book a:not(:hover):not(:focus):not(:active):not(.active) {
			background-color: var(--color-paper);
		}

		.number {
			position: absolute;
			right: 0.5rem;
			bottom: 0.25rem;
			z-index: 1;
			padding: 0 0 0 0.25rem;
			font-size: 1rem;
			line-height: 1;
			text-indent: 0;
			background-color: inherit;
		}

		.title {
			text-align-last: right;
		}

		.book .description {
			line-height: 1.375rem;
		}

		.book a::after {
			content: "";
			flex-grow: 1;
			min-width: 3rem;
			height: 1.125rem;
			margin: 0 0 0 0.25rem;
			border-bottom: dotted 1px;
			transform: translateY(-0.375rem);
		}
	}

	@media (min-width: 840px) {
		.flex li {
			margin-right: 1.5rem;
			margin-left: 1.5rem;
		}
	}

	@media print {
		:global(#app) ul {
			display: table;
			margin: 0 auto;
			column-count: 1;
		}

		.wrap,
		.flex {
			display: block;
		}

		:global(#app) li {
			margin: 0;
		}
	}
</style>
