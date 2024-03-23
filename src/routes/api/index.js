import { prisma } from "$lib/api";

export async function get() {
	const authors = await prisma.authors.findMany({
		select: {
			name: true,
			nickname: true,
			books: {
				select: {
					name: true,
					title: true
				}
			}
		},
		orderBy: {
			name: "asc"
		}
	});

	const books = await prisma.books.findMany({
		select: {
			name: true,
			title: true,
			titleDescription: true,
			author: {
				select: {
					nickname: true,
					name: true
				}
			}
		},
		orderBy: [
			{
				order: "asc"
			},
			{
				title: "asc"
			}
		]
	});

	return {
		body: { authors, books }
	};
}
