import { ReplyHandler, prisma } from "$lib/api";

export async function get({ params: { name } }) {
	const book = await prisma.books.findFirst({
		where: {
			name
		},
		select: {
			name: true,
			title: true,
			titleDescription: true,
			author: {
				select: {
					name: true,
					nickname: true
				}
			},
			bookPages: {
				select: {
					number: true,
					title: true,
					titleDescription: true
				},
				orderBy: {
					number: "asc"
				}
			}
		}
	});

	if (book) {
		return {
			body: book
		};
	}

	return ReplyHandler.NOT_FOUND(`Книга <em>${name}</em> отсутствует в библиотеке.`);
}
