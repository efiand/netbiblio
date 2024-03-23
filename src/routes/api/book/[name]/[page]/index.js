import { ReplyHandler, prisma } from "$lib/api";

export async function get({ params: { name, page } }) {
	const number = parseInt(page);
	if (isNaN(number)) {
		return ReplyHandler.BAD_REQUEST(`<em>${page}</em> — некорректный номер страницы.`);
	}

	const body = await prisma.bookPages.findFirst({
		where: {
			number,
			book: {
				name
			}
		},
		select: {
			number: true,
			title: true,
			titleDescription: true,
			body: true,
			isPoem: true,
			writedAt: true,
			writeDate: true,
			writedIn: true,
			bookPageParts: {
				select: {
					number: true,
					title: true,
					description: true,
					content: true,
					signature: true,
					isPoem: true,
					isSecondary: true,
					isCite: true,
					inRightSide: true,
					isCentered: true
				},
				orderBy: {
					number: "asc"
				}
			},
			book: {
				select: {
					name: true,
					title: true,
					titleDescription: true,
					bookPages: {
						select: {
							number: true,
							title: true
						},
						orderBy: {
							number: "asc"
						}
					},
					author: {
						select: {
							name: true,
							nickname: true
						}
					}
				}
			}
		}
	});

	if (body) {
		return {
			body
		};
	}

	return ReplyHandler.NOT_FOUND(`Страница № <em>${number}</em> из книги <em>${name}</em> не найдена.`);
}
