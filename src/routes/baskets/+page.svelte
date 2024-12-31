<script lang="ts">
	import type { IAddress } from '$lib/interface/address.interface';
	import { ShoppingCart } from 'lucide-svelte';
	import Button from '../../components/button.svelte';
	import Products from '../../components/products.svelte';
	import Select from '../../components/select.svelte';
	import Textarea from '../../components/textarea.svelte';
	import Input from '../../components/input.svelte';

	let { data } = $props();
	// Checkout
	let baskets = data?.baskets || [];
	let total = $state(0);
	// State
	let provinces: IAddress[] = $state([]);
	let distrcis: IAddress[] = $state([]);
	let subDistricts: IAddress[] = $state([]);
	// API
	let isLoading = $state(false);

	function caculateTotal() {
		// Replace total
		total = (data.baskets || []).reduce(
			(total, current) => total + current.price * current.units,
			0
		);
	}

	async function deleteBasket(id: number) {
		const result = confirm('คุณแน่ใจต้องการลบสินค้าในตะกร้านี้หรือไม่');
		if (result) {
			const resp = await fetch(`/api/basket/${id}`, {
				method: 'DELETE',
				credentials: 'include'
			});
			if (resp.status !== 200) {
				alert('Something went wrong. Please try again later');
				return;
			}
			window.location.reload();
		}
	}

	async function checkout(e: SubmitEvent) {
		isLoading = true;
		const resp = await fetch('/api/order/checkout', {
			method: 'POST',
			body: JSON.stringify({
				info: Object.fromEntries(new FormData(e.target as HTMLFormElement)),
				baskets: baskets.map((i) => ({
					basket_id: i.id,
					unit: i.units
				}))
			})
		});

		if (resp.status !== 201) {
			isLoading = false;
			const { message } = (await resp.json()) as { message: string };
			alert(message || 'Unknown error.');
			return;
		}

		window.location.href = '/orders';
	}

	async function loadProvinces() {
		// Get provinces
		const resp = await fetch('/api/address/provinces');
		provinces = (await resp.json()) || [];
	}

	async function loadDistricts(id: string) {
		if (!id) return;
		// Clear data
		distrcis = [];
		subDistricts = [];

		// Get districts
		const resp = await fetch(`/api/address/districts/${id}`);
		distrcis = (await resp.json()) || [];
	}

	async function loaSubdDistricts(id: string) {
		if (!id) return;
		// Clear data
		subDistricts = [];

		// Get districts
		const resp = await fetch(`/api/address/sub-districts/${id}`);
		subDistricts = (await resp.json()) || [];
	}

	$effect(() => {
		caculateTotal();
		loadProvinces();
	});
</script>

<div class="px-3 md:px-0">
	<div class="text-3xl uppercase flex items-center space-x-1">
		<ShoppingCart size={32} />
		<span>ชำระเงิน</span>
	</div>
	<div class="mt-3 block md:flex w-full justify-between space-x-0 md:space-x-3 space-y-3 md:space-y-0">
		<div class={`${baskets.length > 0 ? 'w-full md:w-[70%]' : 'w-full'} space-y-3 overflow-y-auto h-full md:h-[512px]`}>
			{#if baskets.length > 0}
				{#each baskets as basket, idx}
					<Products
						image={basket.image}
						name={basket.title}
						stocks={basket.stocks}
						units={basket.units}
						price={basket.price}
						onClick={(current) => {
							baskets[idx].units = current;
							caculateTotal();
						}}
						onDelete={() => deleteBasket(basket.id)}
					/>
				{/each}
			{:else}
				<div class="flex justify-center">
					<div class="relative">
						<!-- svelte-ignore element_invalid_self_closing_tag -->
						<div class="rounded-full bg-white/50 p-24" />
						<ShoppingCart size={128} class="absolute inset-0 m-auto text-gray-400" />
					</div>
				</div>

				<div class="text-center">
					<h4 class="text-3xl font-medium">ไม่พบสินค้าในตะกร้า</h4>
				</div>
			{/if}
		</div>
		<!-- svelte-ignore event_directive_deprecated -->
		<!-- svelte-ignore component_name_lowercase -->
		{#if baskets.length > 0}
			<form class="w-full md:w-[30%] bg-white p-5" on:submit|preventDefault={checkout}>
				<h4 class="text-3xl font-light uppercase">รายละเอียดจัดส่ง</h4>
				<hr class="my-3" />
				<div class="space-y-2">
					<Input label="ชื่อ - นามสกุล" name="name" required />
					<Input label="เบอร์โทร" name="mobile" min={10} max={10} required />
					<Textarea label="ที่อยู่" name="address" />
					<Select label="จังหวัด" onChange={loadDistricts} required={true}>
						<option value="">-</option>
						{#each provinces as province}
							<option value={province.id}>{province.name_th}</option>
						{/each}
					</Select>
					<Select label="อำเภอ" onChange={loaSubdDistricts} required={true}>
						<option value="">-</option>
						{#each distrcis as district}
							<option value={district.id}>{district.name_th}</option>
						{/each}
					</Select>
					<Select label="ตำบล" name="address_id" required={true}>
						<option value="">-</option>
						{#each subDistricts as subDistrict}
							<option value={subDistrict.id}>{subDistrict.name_th}</option>
						{/each}
					</Select>
				</div>
				<hr class="my-3" />
				<div class="mb-3 flex items-end justify-between">
					<h4 class="text-xl font-bold">รวมทั้งสิ้น</h4>
					<h4 class="text-3xl font-bold">{total.toLocaleString()} บาท</h4>
				</div>
				<Button loading={isLoading} type="submit" class="w-full">สั่งซื้อสินค้า</Button>
			</form>
		{/if}
	</div>
</div>
