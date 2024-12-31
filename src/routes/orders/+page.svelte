<script lang="ts">
	import type { IOrdersParsed } from '$lib/interface/order.interface.js';
	import { FileQuestion } from 'lucide-svelte';

	const { data } = $props();
	const orders = data.orders || [];

	function caculateTotal(items: IOrdersParsed['items']) {
		return items.reduce((total, data) => total + data.price * data.units, 0);
	}

	function parseMobile(raw: string) {
		return `${raw.substring(0, 3)}-${raw.substring(3, 6)}-${raw.substring(6, 10)}`;
	}
</script>

<div class=" px-3 md:px-0">
	<h1 class="mb-4 text-3xl uppercase">รายการสั่งซื้อ</h1>
	<div class="space-y-3">
		{#if orders.length > 0}
			{#each orders as order}
				<div class="w-full rounded-md bg-white">
					<div class="p-3">
						<h1 class="text-xl font-medium">รหัสรายการ:</h1>
						<h4 class="text-sm md:text-base">{order.order_id}</h4>
					</div>
					<hr />
					<div class="p-3">
						<h1 class="text-xl font-medium">ที่อยู่จัดส่ง:</h1>
						<div class="text-sm">
							<p>{order.shipping_name}</p>
							<p>{order.shipping_address}, {order.shipping_province}</p>
							<p>{parseMobile(order.shipping_mobile)}</p>
						</div>
					</div>
					<hr />
					<div class="p-3">
						<h1 class="text-xl font-medium">สินค้า:</h1>
						{#each order.items as item}
							<div class="flex w-full justify-between p-3">
								<div class="flex space-x-3">
									<a href={`/product/${item.id}`}>
										<img
											src={item.image}
											class="max-h-[128px] translate-y-0 transform duration-300 hover:-translate-y-1"
											alt={`${item.title} images.`}
										/>
									</a>
									<div>
										<h4 class="text-lg md:text-2xl font-medium">{item.title}</h4>
										<span>จำนวนสินค้า: {item.units} ชิ้น</span>
									</div>
								</div>
								<div>
									<h4 class="text-base md:text-xl font-medium text-end">
										{(item.price * item.units).toLocaleString()} บาท
									</h4>
								</div>
							</div>
						{/each}
					</div>
					<hr />
					<div class="flex items-end justify-between px-6 py-5">
						<h4 class="text-base md:text-xl font-bold">รวมทั้งสิ้น</h4>
						<h4 class="text-xl md:text-3xl font-bold">{caculateTotal(order.items).toLocaleString()} บาท</h4>
					</div>
				</div>
			{/each}
		{:else}
			<div class="flex justify-center">
				<div class="relative">
					<div class="rounded-full bg-white/50 p-24"></div>
					<FileQuestion size={128} class="absolute inset-0 m-auto text-gray-400" />
				</div>
			</div>

			<div class="text-center">
				<h4 class="text-3xl font-medium">ไม่พบหมายเลขออเดอร์</h4>
			</div>
		{/if}
	</div>
</div>
