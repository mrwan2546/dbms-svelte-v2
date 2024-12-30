<script lang="ts">
	import { Minus, Plus } from 'lucide-svelte';

	interface Props {
		name: string;
		value: number;
		disabled: boolean;
		min?: number;
		max?: number;
		onClick?: (current: number) => void;
	}

	let { value = $bindable(), onClick, name, min, max, disabled }: Props = $props();

	function increment() {
		if (max !== null && max !== undefined && value + 1 > max) return;
		value++;
		onClick?.(value)
	}
	function decrement() {
		if (min !== null && min !== undefined && value - 1 < min) return;
		value--;
		onClick?.(value)
	}
</script>

<div class="mt-1 flex w-fit">
	<button
		onclick={decrement}
		class={`rounded-l-md ${disabled ? 'bg-slate-500 hover:bg-slate-700' : 'bg-purple-500 hover:bg-purple-700'} px-2 duration-300 `}
		{disabled}
	>
		<Minus color="#fff" />
	</button>
	<input readonly {name} {value} class="w-[48px] border border-slate-300 text-center" />
	<button
		onclick={increment}
		class={`rounded-r-md ${disabled ? 'bg-slate-500 hover:bg-slate-700' : 'bg-purple-500 hover:bg-purple-700'} px-2 duration-300 `}
		{disabled}
	>
		<Plus color="#fff" />
	</button>
</div>
