<script lang="ts">
	export let name: string;
	export let label: string;
	export let placeholder: string = '';
	export let required: boolean = false;
	export let value: string = ''
</script>

<div class="space-y-2">
	<label for={name} class="">{label}</label>
	<textarea
		{required}
		id={name}
		{name}
		{placeholder}
		class="w-full rounded-md border border-slate-400"
	>{value}</textarea>
</div>
