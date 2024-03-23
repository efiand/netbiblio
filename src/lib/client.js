import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js"; // Расширение нужно для сборки node-приложения
import { StatusCodes } from "http-status-codes";
import { BAD_STATUSES, ReasonMessages } from "./const";

dayjs.extend(utc);

export const ReplyHandler = {
	...BAD_STATUSES.reduce((obj, KEY) => {
		const defaultMessage = ReasonMessages[KEY];
		return {
			...obj,
			[KEY]: (error = defaultMessage) => ({
				status: StatusCodes[KEY],
				error
			})
		};
	}, {}),
	OK: () => ({
		status: StatusCodes.OK
	}),
	MOVED_PERMANENTLY: (redirect = "/") => ({
		status: StatusCodes.MOVED_PERMANENTLY,
		redirect
	})
};

export async function handleLoad(request, fetchUrl, getProps, getRedirect = () => null) {
	try {
		const res = await request.fetch(fetchUrl);
		const data = await res.json();

		for (const status of BAD_STATUSES) {
			if (res.status === StatusCodes[status]) {
				return ReplyHandler[status](data.message);
			}
		}

		const redirectUrl = getRedirect(data);
		if (redirectUrl) {
			return ReplyHandler.MOVED_PERMANENTLY(redirectUrl);
		}

		return {
			props: getProps(data)
		};
	} catch (error) {
		return ReplyHandler.INTERNAL_SERVER_ERROR(error);
	}
}

export const getDates = (str) => {
	const dateObject = dayjs.utc(str);

	if (dateObject.isValid()) {
		return {
			datetime: dateObject.format("YYYY-MM-DD"),
			visualDate: dateObject.format("DD.MM.YYYY"),
			visualFullDate: dateObject.format("DD.MM.YYYY HH:mm")
		};
	}

	return {
		datetime: null,
		visualDate: str,
		visualFullDate: str
	};
};
