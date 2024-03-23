import "../src/lib/env.js";
import createDump from "./create-dump.js";
import { prisma } from "../src/lib/api.js";
import { upload } from "./yndex-disk.js";

const PREPEND = `DO $$ BEGIN

DELETE FROM \`authors\`;
`;

const TABLES = ["authors", "books", "bookPages", "bookPageParts"];

try {
	const entities = await Promise.all([
		prisma.authors.findMany({ orderBy: { id: "asc" } }),
		prisma.books.findMany({ orderBy: { id: "asc" } }),
		prisma.bookPages.findMany({ orderBy: { id: "asc" } }),
		prisma.bookPageParts.findMany({ orderBy: { id: "asc" } })
	]);

	const dumpedEntities = entities.map((entity, i) => createDump([TABLES[i], entity])).filter((str) => str);
	const dataJson = entities.reduce((acc, entity, i) => ({ ...acc, [TABLES[i]]: entity }), {});

	const filename = `dump/${Date.now()}`;
	await Promise.all([
		upload(`${filename}.json`, JSON.stringify(dataJson)),
		upload(`${filename}.sql`, `${PREPEND}\n${dumpedEntities.join("\n\n")}\n\nEND $$;`)
	]);

	console.log("OK");
} catch (err) {
	console.error(err);
}
