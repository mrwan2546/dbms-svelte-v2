<script lang="ts">
	export let name: string;
	export let label: string;
	export let min: number | undefined = undefined;
	export let max: number | undefined = undefined;
	export let type: 'text' | 'password' | 'number' = 'text';
	export let placeholder: string = '';
	export let value: any = ''
	export let required: boolean = false;
</script>

<div class="space-y-2">
	<label for={name} class="">{label}</label>
	<input
		{placeholder}
		{type}
		{required}
		id={name}
		{name}
		{value}
		min={type === 'number' ? min : undefined}
		max={type === 'number' ? max : undefined}
		minlength={type !== 'number' ? min : undefined}
		maxlength={type !== 'number' ? max : undefined}
		class="w-full rounded-md border border-slate-400"
	/>
</div>
