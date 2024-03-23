<script context="module">
	import { heading } from "$lib/stores";
	import { handleLoad } from "$lib/client";
	import PageAuthor from "$components/PageAuthor.svelte";
	import Subheading from "$components/Subheading.svelte";
	import Content from "$components/Content.svelte";
	import PageDate from "$components/PageDate.svelte";

	export async function load(request) {
		const { name } = request.page.params;
		const rawPage = request.page.params.page;
		const page = parseInt(rawPage);

		return handleLoad(
			request,
			`/api/book/${name}/${page}`,
			(bookPage) => {
				const book = bookPage.book;
				const author = book.author;
				const pages = book.bookPages;
				const hideTitle = bookPage.title === book.title; // Название страницы совпадает с названием книги - убираем дубль
				const onlyPage = pages.length === 1; // Книга состоит из одной страницы

				// Соединяем редко встречающиеся опциональные части страницы с основным контентом
				if (bookPage.body) {
					bookPage.bookPageParts.push({
						number: 0,
						title: null,
						content: bookPage.body,
						isPoem: bookPage.isPoem
					});
				}

				// Части с отрицательным номером располагаются перед основным контентом
				const parts = bookPage.bookPageParts
					.sort((a, b) => a.number - b.number)
					.map((part) => {
						part.id = part.number < 1 ? null : `part-${part.number}`;
						delete part.number;
						delete part.description;
						return part;
					});

				heading.set({
					title: onlyPage ? book.title : `<a href="/book/${book.name}">${book.title}</a>`,
					additionalTitle: null,
					description: book.titleDescription || null
				});

				return {
					bookPage,
					book,
					author,
					hideTitle,
					parts
				};
			},
			() => (page != rawPage ? `/book/${name}/${page}` : null)
		);
	}
</script>

<script>
	export let bookPage, author, hideTitle, parts;
</script>

<PageAuthor {author} />

{#if !hideTitle}
	<Subheading title={bookPage.title} description={bookPage.titleDescription} />
{/if}

{#each parts as { title, id, ...part }}
	{#if title}
		<Subheading {id} {title} child={!hideTitle} />
	{/if}

	<Content id={title ? null : id} {...part} />
{/each}

<PageDate writedAt={bookPage.writedAt} writeDate={bookPage.writeDate} writedIn={bookPage.writedIn} />
