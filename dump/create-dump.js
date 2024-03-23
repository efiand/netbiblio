const normalizeValue = (value) => {
	if (value === null) {
		return "null";
	}

	if (typeof value === "string") {
		// Особенности одинарных кавычек в SQL
		const safeValue = value.trim().replace(/(?<apos>')/gu, "$<apos>$<apos>");

		return `'${safeValue}'`;
	}

	if (value instanceof Date) {
		const data = value.toISOString().replace("T", " ").slice(0, -1);
		return `'${data}'`;
	}

	if (value instanceof Buffer) {
		return value.toString();
	}

	return value;
};

export default ([tableName, rows]) => {
	if (!rows.length) {
		return "";
	}

	const values = rows.map((row) => Object.values(row).map(normalizeValue).join(", ")).join("),\n(");
	const columns = Object.keys(rows[0]).join("`, `");
	const dataSql = `INSERT INTO \`${tableName}\` (\`${columns}\`) VALUES\n(${values});`;

	return dataSql;
};
