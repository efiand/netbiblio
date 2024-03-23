// Проверяем, что блоки контента - это HTML
// Нужно обычно для проверки, что дополнительно не нуждается в том, чтобы обернуть в параграфы
// <small> используется для маленьких ремарок
export const hasHTMLBlocks = (text) => /<(p|div|small|li)/.test(text);

export const typography = (str) => {
	// "Типограф"
	// Внутри есть разного типа пробелы и ударения в явном виде!
	return (
		str
			// Висячие предлоги
			.replace(/( |\(|>){1}([№а-уА-У]{1}|\d+) /gu, "$1$2 ")
			// Тонкие пробелы вокруг длинного тире
			.replace(/( | | )—/g, " —")
			// Тонкие пробелы вокруг длинного тире
			.replace(/—( | | )/g, "— ")
			// Ударение
			.replace(/́|&#769;/g, `<span class="acute"></span>`)
	);
};
