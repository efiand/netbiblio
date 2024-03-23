<script context="module">
	import { heading } from "$lib/stores";
	import { handleLoad } from "$lib/client";
	import PageAuthor from "$components/PageAuthor.svelte";
	import ToC from "$components/ToC.svelte";

	export async function load(request) {
		const { name } = request.page.params;

		return handleLoad(
			request,
			`/api/book/${name}`,
			(book) => {
				const author = book.author;

				heading.set({
					title: book.title,
					description: book.titleDescription
				});

				return {
					book,
					author
				};
			},
			({ bookPages }) => (bookPages.length === 1 ? `/book/${name}/1` : null)
		);
	}
</script>

<script>
	export let book, author;

	const createToc = (list) =>
		list.map(({ number, title, titleDescription }) => ({
			href: `/book/${book.name}/${number}`,
			title,
			titleDescription,
			number
		}));
</script>

<PageAuthor {author} />

<h2>Содержание</h2>
<ToC book={true} list={createToc(book.bookPages)} />
