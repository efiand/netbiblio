<script context="module">
	import Logo from "$components/Logo.svelte";
</script>

<script>
	import { isHomePage } from "$lib/stores";
</script>

<footer>
	<nav>
		<div class="logo-wrap">
			<a class="logo-link" href={isHomePage ? "/" : null}>
				<span class="visually-hidden">Логотип «Netbiblio», ссылка на главную страницу</span>
				<Logo />
			</a>
		</div>
	</nav>
</footer>

<style>
	footer {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
		width: 100%;
		user-select: none;
	}

	footer::before {
		position: fixed;
		top: 0;
		left: 0;
		display: block;
		width: 100%;
		height: 3rem;
		background-image: linear-gradient(
			to right,
			var(--color-brand) 0%,
			var(--color-brand-semitransparent) 40%,
			var(--color-brand-semitransparent) 60%,
			var(--color-brand) 100%
		);
		pointer-events: none;
	}

	.logo-wrap {
		top: 0;
		left: 0;
		width: 100%;
		min-height: 3rem;
		box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.5);
	}
	a {
		position: relative;
		display: block;
		min-width: 1rem;
		min-height: 1rem;
		padding: 1rem;
		text-align: center;
		color: var(--color-paper);
		text-decoration: none;
	}

	a[href]:hover,
	a:focus {
		color: var(--color-brand);
	}

	a:focus-visible {
		color: var(--color-paper);
		box-shadow: inset 0 0 0 2px var(--color-paper);
	}

	a[href]:active {
		color: var(--color-paper);
		background-color: transparent;
		box-shadow: inset -2px 2px 0 0 rgba(0, 0, 0, 0.3), -1px 1px 1px 0 rgba(255, 255, 255, 0.5);
	}

	a::before {
		content: "";
		display: block;
		width: 0.5rem;
		height: 0.5rem;
		margin: 0.15rem 0 0 0.1rem;
		border-bottom: 2px solid currentColor;
		border-left: 2px solid currentColor;
		transform: rotate(-135deg);
	}

	.logo-link {
		display: table;
		width: 200px;
		margin: 0 auto;
		padding: 6px 1rem;
	}

	.logo-link::before {
		content: none;
	}

	@media (max-width: 767px) {
		.logo-wrap {
			position: absolute;
			background-color: var(--color-brand);
		}
	}

	@media (min-width: 768px) {
		footer::before {
			content: "";
		}

		.logo-wrap {
			position: fixed;
			background-color: transparent;
			pointer-events: none;
		}

		.logo-link {
			position: absolute;
			top: 0;
			left: 0;
			padding: 9px 1rem;
		}

		a::before {
			margin: 0.1rem 0 0 0.1rem;
		}
	}

	@media print {
		footer {
			margin: 0 0 3rem;
		}

		footer::before {
			display: none;
		}

		.logo-wrap {
			text-align: center;
		}

		.logo-link {
			position: static;
			width: 20rem;
			max-width: 100%;
			height: 66.66666%;
		}

		:global(#app) .logo-link::after {
			display: none;
		}
	}
</style>
