<script lang="ts">
	import { LoaderCircle } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		disabled?: boolean;
		loading?: boolean;
		onClick?: () => void;
		type?: 'submit' | 'button' | 'reset';
		children: Snippet;
		class?: string;
		to?: string;
	}

	let { disabled, onClick, loading, type, children, class: className, to }: Props = $props();

	let classz = `${disabled || loading ? 'bg-slate-500 hover:bg-slate-700' : 'bg-purple-500 hover:bg-purple-700'} flex justify-center rounded-lg px-3 py-3 text-white duration-300 ${className}`
</script>

{#if to}
	<a href={to} class={classz}>{#if loading}
			<LoaderCircle class="animate-spin" />
		{:else}
			{@render children()}
		{/if}
	</a>
{:else}
	<button
		{type}
		onclick={() => onClick?.()}
		disabled={disabled || loading}
		class={classz}
	>
		{#if loading}
			<LoaderCircle class="animate-spin" />
		{:else}
			{@render children()}
		{/if}
	</button>
{/if}
