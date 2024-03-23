<script context="module">
	import { onMount, afterUpdate } from "svelte";
	import { handleLoad } from "$lib/client";
	import { authorsList, booksList } from "$lib/stores";
	import Footer from "$components/Footer.svelte";
	import Heading from "$components/Heading.svelte";

	export async function load(request) {
		return await handleLoad(request, "/api", (res) => {
			authorsList.set(res.authors);
			booksList.set(res.books);
		});
	}
</script>

<script>
	import "$css/index.css";

	let rootEl = null,
		tooltips = null,
		tabable = false; // UX клавиатурной навигации

	onMount(() => {
		// Узнаем ширину полосы прокрутки
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

		document.documentElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
		handleStartScroll();
	});

	afterUpdate(() => {
		tooltips = rootEl.querySelectorAll(".note:not(.note-right) > span");

		for (const tooltipOpener of rootEl.querySelectorAll("span.note, abbr.note")) {
			tooltipOpener.setAttribute("tabindex", 0);
		}
		handleTooltipsPosition();

		handleStartScroll();
	});

	function handleTooltipsPosition() {
		for (const tooltip of tooltips) {
			tooltip.style.left = 0;
			const rightPos = tooltip.getBoundingClientRect().right - window.innerWidth;

			if (rightPos > 0) {
				tooltip.style.left = `-${rightPos + 8}px`;
			}
		}
	}

	function handleKeydown(evt) {
		if (evt.key === "Tab") {
			tabable = true;
			window.removeEventListener("keydown", handleKeydown);
		}
	}

	function handleStartScroll() {
		// При клиентском роутинге нативный механизм не срабатывет
		const { hash = null } = window.location;
		if (hash) {
			const targetEl = rootEl.querySelector(hash);
			if (targetEl) {
				targetEl.scrollIntoView({ behavior: "smooth" });
			}
		} else {
			window.scrollTo(0, 0);
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} on:resize={handleTooltipsPosition} />

<div class:tabable bind:this={rootEl}>
	<main>
		<div>
			<!-- Обёртка нужна для схлопывания контентных маргинов внутри -->
			<header>
				<Heading />
			</header>

			<slot />
		</div>
	</main>
	<Footer />
</div>

<style global>
	main {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		max-width: 72rem;
		min-height: calc(100vh - 1px);
		margin: 0 auto 1px;
		padding: 0 0 4.5rem;
		color: var(--color-text);
		background-color: var(--color-paper);
	}

	@media (max-width: 767px) {
		main {
			padding: 6rem 1.5rem 4.5rem;
		}
	}

	@media (min-width: 768px) {
		main {
			padding: 6rem 3rem;
		}
	}

	@media (min-width: 1154px) {
		main {
			padding: 6rem;
			box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
		}
	}
</style>
