import fetch from "cross-fetch";

const { YADISK_TOKEN } = process.env;

const Append = {
	download: "fields=href",
	upload: "overwrite=true&fields=href"
};

const getUrl = async (filename, mode) => {
	const { href } = await fetch(
		`https://cloud-api.yandex.net/v1/disk/resources/${mode}?path=app:/netbiblio/${filename}&${Append[mode]}`,
		{
			headers: {
				Authorization: `OAuth ${YADISK_TOKEN}`
			}
		}
	).then((response) => response.json());

	return href;
};

export const download = async (filename) => {
	const url = await getUrl(filename, "download");

	return await fetch(url).then((response) => response.arrayBuffer());
};

export const upload = async (filename, payload) => {
	const url = await getUrl(filename, "upload");

	return await fetch(url, {
		body: Buffer.from(payload),
		method: "PUT"
	});
};
