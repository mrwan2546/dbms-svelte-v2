<script lang="ts">
	import { json } from '@sveltejs/kit';
	import Button from '../../../components/button.svelte';
	import Stepper from '../../../components/stepper.svelte';

	let { data } = $props();

	let stocks = $state(data.product.stocks > 0 ? 1 : 0);
	let isLoading = $state(false);
	let unit = $state(1);

	async function addToBasket() {
		isLoading = true;

		const resp = await fetch(`/api/basket`, {
			method: 'POST',
			body: JSON.stringify({
				product_id: data.product.id,
				unit
			}),
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		});

		if (resp.status !== 201) {
			isLoading = false;
			const { message } = (await resp.json()) as { message: string };
			alert(message || 'Unknown error.');
			return;
		}

		window.location.href = '/baskets';
	}
</script>

<div class="block md:flex max-h-[512px] px-6">
	<img alt="test" class="max-w-full md:max-w-[40%] rounded-t-xl md:rounded-l-xl object-cover" src={data.product.image} />
	<div class="max-w-full md:w-[60%] rounded-b-xl md:rounded-r-xl bg-white p-5">
		<div>
			<h1 class="text-3xl font-semibold">{data.product.title}</h1>
			<span>สินค้าคงเหลือ: {data.product.stocks} ชิ้น</span>
		</div>
		<hr class="my-3" />
		<h4 class="my-2 text-3xl font-medium">฿{data.product.price.toLocaleString()} บาท</h4>
		<div class="mb-3 flex items-center space-x-3">
			<span>จำนวนสินค้า: </span>
			<Stepper
				name="test"
				bind:value={stocks}
				max={data.product.stocks}
				min={1}
				disabled={data.product.stocks <= 0}
				onClick={(current) => (unit = current)}
			/>
		</div>
		<Button class="w-full md:w-fit" onClick={addToBasket} loading={isLoading} disabled={data.product.stocks <= 0}
			>{data.product.stocks <= 0 ? 'สินค้าหมด' : 'ซื้อสินค้า'}</Button
		>

		<hr class="my-3" />
		<div class="max-h-[512px] w-full overflow-y-auto rounded-lg bg-slate-100 p-3">
			<span> {data.product.description || 'ไม่มีคำอธิบาย'}</span>
		</div>
	</div>
</div>
