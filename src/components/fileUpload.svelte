<script lang="ts">
	import type { ChangeEventHandler } from 'svelte/elements';

	interface Props {
		name?: string;
		label: string;
		required?: boolean;
		onFileChange?: (file: File) => void;
	}

	const { label, name, required = false, onFileChange }: Props = $props();

	function onChange(e: Event) {
		const target = e.target as HTMLInputElement;
		if (target.files && target.files.length === 1) {
			const file = target.files[0];
			onFileChange?.(file);
		}
	}
</script>

<div class="space-y-2">
	<label for={name} class="">{label}</label>
	<input
		type="file"
		{required}
		id={name}
		{name}
		onchange={onChange}
		accept="image/*"
		class="w-full rounded-md border border-slate-400 file:mr-3 file:border-0 file:bg-gray-200 file:px-4 file:py-2"
	/>
</div>
