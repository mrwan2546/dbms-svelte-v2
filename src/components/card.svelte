<script lang="ts">
	import type { IProduct } from '$lib/interface/products.interface';
	import type { Snippet } from 'svelte';

	interface Props {
		data: IProduct;
		editable: boolean;
		children?: Snippet;
	}

	let { editable, data, children }: Props = $props();
</script>

<div class="w-full transform rounded-xl bg-white shadow-lg duration-300 hover:-translate-y-1">
	<a href={`/product/${data.id}`}>
		<div>
			<img alt="test" class="h-[412px] w-full rounded-t-md object-cover" src={data.image} />
		</div>
		<div class="p-3">
			<div class="mb-2">
				<span class="text-xl font-medium">{data.title}</span>
			</div>
			<div class="flex justify-between text-sm">
				<span>{data.price.toLocaleString()} บาท</span>
				<span class={data.stocks <= 0 ? '!text-red-500' : ''}
					>คงเหลือ {data.stocks.toLocaleString()} ชิ้น</span
				>
			</div>
		</div>
	</a>

	{#if editable}
		{@render children?.()}
	{/if}
</div>
