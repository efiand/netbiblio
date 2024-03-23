<script context="module">
	import { StatusCodes } from "http-status-codes";
	import { ReasonMessages } from "$lib/const";
	import { heading } from "$lib/stores";
	import Content from "$components/Content.svelte";

	export function load({ error: { stack, message }, status }) {
		const statusCode = Object.entries(StatusCodes).find((entry) => entry[1] === status);

		heading.set({
			title: `Ошибка ${status}`
		});

		return {
			props: {
				code: import.meta.env.DEV ? stack : null,
				message: message || (statusCode.length ? ReasonMessages[statusCode[0]] : null),
				status
			}
		};
	}
</script>

<script>
	export let code, message;
</script>

<Content content={message} isCentered={true} />

{#if code}
	<pre>{code}</pre>
{/if}

<style>
	pre {
		overflow-x: auto;
	}
</style>
