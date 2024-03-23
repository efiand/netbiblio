<script context="module">
	import { heading } from "$lib/stores";
	import ToC from "$components/ToC.svelte";

	const authors = [
		{ href: "https://proza.ru/avtor/lubasha1", title: "Skromnaia" },
		{ href: "https://proza.ru/avtor/koloev", title: "Александр Колоев" },
		{ href: "https://stihi.ru/avtor/aleteya2", title: "Александриец" },
		{ href: "https://stihi.ru/avtor/hoholist", title: "Алексей Горбатюк" },
		{ href: "https://stihi.ru/avtor/pravednik1985", title: "Алексей Сыманович" },
		{ href: "https://stihi.ru/avtor/korovenkov", title: "Андрей Коровёнков" },
		{ href: "https://stihi.ru/avtor/annyyatskiv", title: "Анна Яцкив" },
		{ href: "https://proza.ru/avtor/buryan", title: "Борис Хантаев" },
		{ href: "https://stihi.ru/avtor/krishon", title: "Вадим Странник" },
		{ href: "https://stihi.ru/avtor/valartulkas", title: "Валерий Березин" },
		{ href: "https://proza.ru/avtor/galamala", title: "Галина Беззубова" },
		{ href: "https://stihi.ru/avtor/denver2018", title: "Денис Туленцев" },
		{ href: "https://stihi.ru/avtor/yyyyyy", title: "Евгений Капустин" },
		{ href: "https://stihi.ru/avtor/strelec16", title: "Екатерина Бородич" },
		{ href: "https://proza.ru/avtor/mouse", title: "Елена Мухамадеева" },
		{ href: "https://stihi.ru/avtor/vslava2009", title: "Елена Севрюгина" },
		{ href: "https://stihi.ru/avtor/icecreamhater", title: "Иван Захаров" },
		{ href: "https://stihi.ru/avtor/kutepova1961", title: "Ирина Кутепова" },
		{ href: "https://proza.ru/avtor/familla", title: "Камилла Ф." },
		{ href: "/author/lidija_seljagina", title: "Лидия Селягина" },
		{ href: "https://proza.ru/avtor/mobile", title: "Роман Кузнецов" },
		{ href: "https://stihi.ru/avtor/peugeot93", title: "Руслан Лукьянов" },
		{ href: "https://stihi.ru/avtor/lanadar25", title: "Светлана Дар" },
		{ href: "https://proza.ru/avtor/gusar", title: "Тамара Гусарова-Матвеева" },
		{ href: "https://stihi.ru/avtor/taniacet", title: "Татьяна Соната" },
		{ href: "https://stihi.ru/avtor/sicistanapaea", title: "Татьяна Шеина" },
		{ href: "https://proza.ru/avtor/avgustina", title: "Юлия Зябрева" }
	];

	export async function load() {
		heading.set({
			title: "Авторы"
		});

		return {
			props: { list: authors }
		};
	}
</script>

<script>
	export let list;
</script>

<ToC {list} columns={2} />
