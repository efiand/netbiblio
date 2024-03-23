import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js"; // Расширение нужно для сборки node-приложения
import { StatusCodes } from "http-status-codes";
import Prisma from "@prisma/client";
import { BAD_STATUSES, ReasonMessages } from "./const.js";

dayjs.extend(utc);

export let prisma;

if (Prisma === undefined) {
	import("@prisma/client").then(({ PrismaClient }) => {
		prisma = new PrismaClient();
	});
} else {
	prisma = new Prisma.PrismaClient();
}

export const ReplyHandler = {
	...[...BAD_STATUSES, "OK"].reduce((obj, KEY) => {
		return {
			...obj,
			[KEY]: (message = null) => ({
				status: StatusCodes[KEY],
				body: {
					message: message || ReasonMessages[KEY]
				}
			})
		};
	})
};
