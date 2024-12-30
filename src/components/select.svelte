<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		name?: string;
		label: string;
		children: Snippet;
		onChange?: (value: string) => void;
		required?: boolean;
	}

	let { name, label, children, onChange, required }: Props = $props();
</script>

<div class="space-y-1">
	<label for={name}>{label}</label>
	<select
		class="w-full rounded-md border border-slate-400"
		{required}
		{name}
		onchange={(e) => onChange?.((e.target as any).value)}
	>
		{@render children()}
	</select>
</div>
