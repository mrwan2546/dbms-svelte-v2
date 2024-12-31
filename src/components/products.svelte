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
		<img src={image} class="max-h-[128px] max-w-[128px]" alt={`${name} images.`} />
		<div>
			<h4 class="text-lg md:text-2xl font-medium">{name}</h4>
			<span class="text-sm md:text-base">จำนวนสินค้า</span>
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
			<h4 class="text-base md:text-xl font-medium text-end">{(price * units).toLocaleString()} บาท</h4>
		{:else}
			<span class="!text-red-500 text-sm md:text-base text-end">สินค้าหมด</span>
		{/if}
		<button class="flex text-red-500 items-center space-x-1 hover:underline float-end" onclick={() => onDelete()}>
			<Trash size={18} />
			<span>ลบ</span>
		</button>
	</div>
</div>
