<script context="module">
	import { heading } from "$lib/stores";
	import { handleLoad } from "$lib/client";
	import Content from "$components/Content.svelte";
	import Books from "$components/Books.svelte";

	export async function load(request) {
		const { nickname } = request.page.params;

		return handleLoad(request, `/api/author/${nickname}`, (data) => {
			const [firstName, lastName = null] = data.name.split(" ");
			const author = {
				...data,
				firstName,
				lastName
			};

			heading.set({
				title: author.name
			});

			return {
				author
			};
		});
	}
</script>

<script>
	export let author;
</script>

<h2 id="books">Книги</h2>
<Books list={[{ books: author.books }]} />

{#if author.biography}
	<h2 id="biography">Об авторе</h2>
	<Content content={author.biography} />
{/if}
