<script lang="ts">
	import { Trash } from 'lucide-svelte';
	import Stepper from './stepper.svelte';

	interface Props {
		name: string;
		image: string;
		stocks: number;
		units: number;
		price: number;
		onClick: (current: number) => void;
		onDelete: () => void;
	}

	let { name, image, stocks, units = $bindable(), price, onClick, onDelete }: Props = $props();
</script>

<div class="flex w-full justify-between rounded-sm bg-white p-3">
	<div class="flex space-x-3">
		<img src={image} class="max-h-[128px]" alt={`${name} images.`} />
		<div>
			<h4 class="text-2xl font-bold">{name}</h4>
			<span>จำนวนสินค้า</span>
			<Stepper
				{onClick}
				name="test"
				bind:value={units}
				max={stocks}
				min={1}
				disabled={stocks <= 0}
			/>
		</div>
	</div>
	<div>
		{#if stocks > 0}
			<h4 class="text-xl font-medium">{(price * units).toLocaleString()} บาท</h4>
		{:else}
			<span class="!text-red-500">สินค้าหมด</span>
		{/if}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="flex justify-end text-red-500 items-center space-x-1 hover:underline cursor-pointer" onclick={() => onDelete()}>
			<Trash size={18} />
			<span>ลบ</span>
		</div>
	</div>
</div>
