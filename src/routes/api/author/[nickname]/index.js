import { ReplyHandler, prisma } from "$lib/api";

export async function get({ params: { nickname } }) {
	const author = await prisma.authors.findFirst({
		where: { nickname },
		include: {
			books: {
				select: {
					name: true,
					title: true,
					titleDescription: true,
					order: true
				},
				orderBy: [
					{
						order: "asc"
					},
					{
						id: "asc"
					}
				]
			}
		}
	});

	if (author) {
		return {
			body: author
		};
	}

	return ReplyHandler.NOT_FOUND(`Автора <em>${nickname}</em> в библиотеке нет.`);
}
