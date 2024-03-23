import { ReasonPhrases } from "http-status-codes";

export const BAD_STATUSES = ["NOT_FOUND", "INTERNAL_SERVER_ERROR", "BAD_REQUEST", "METHOD_NOT_ALLOWED"];

export const ReasonMessages = {
	...ReasonPhrases,
	NOT_FOUND: "Страница не найдена.",
	INTERNAL_SERVER_ERROR: "Произошла ошибка. Попробуйте перезагрузить страницу."
};
