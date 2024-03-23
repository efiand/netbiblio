<script>
	export let list;
</script>

<ul class="cards">
	{#each list as { name, nickname, books }}
		<li class="card">
			{#if name && nickname}
				<a class="author" href="/author/{nickname}">{name}</a>
			{/if}
			<ul class="book-wrap">
				{#each books as { name, title, titleDescription }}
					<li>
						<a class="book" href="/book/{name}">
							<span class="title">{title}</span>
							{#if titleDescription}
								<span class="description">({titleDescription})</span>
							{/if}
						</a>
					</li>
				{/each}
			</ul>
		</li>
	{/each}
</ul>

<style>
	.cards {
		margin: 1.5rem 0 0;
	}

	.card {
		margin-bottom: 1px;
		padding: 1.5rem 2rem;
		font-size: 1rem;
		background-color: var(--color-back);
	}

	.card:first-child {
		border-top-left-radius: 0.5rem;
		border-top-right-radius: 0.5rem;
	}

	.card:last-child {
		border-bottom-left-radius: 0.5rem;
		border-bottom-right-radius: 0.5rem;
	}

	a {
		margin-left: -0.5rem;
		text-indent: -1rem;
		padding: 0 0.5rem 0 1.5rem;
		text-decoration: none;
	}

	a:not(:hover):not(:focus):not(:active) {
		color: var(--color-text);
	}

	.author {
		display: table;
		font-style: italic;
		font-size: 1.0625rem;
		line-height: 1.5rem;
	}

	.book-wrap {
		display: grid;
		gap: 0.25rem;
		justify-items: start;
	}

	.author + .book-wrap {
		margin-top: 0.3125rem;
		padding-left: 1rem;
	}

	.book {
		display: block;
	}

	.title {
		color: var(--color-brand);
	}

	a:active .title {
		color: inherit;
	}

	span {
		transition: inherit;
	}
</style>
