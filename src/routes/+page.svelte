<script lang="ts">
	import { Plus, ShoppingBag } from 'lucide-svelte';
	import Card from '../components/card.svelte';
	import Button from '../components/button.svelte';

	let { data } = $props();

	async function onDelete(id: number) {
		const result = confirm('คุณแน่ใจต้องการลบสินค้านี้หรือไม่');
		if (result) {
			const resp = await fetch(`/api/product/${id}`, {
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
</script>

{#if data.products.length > 0 || data.isAdmin}
	<div class="grid grid-cols-1 gap-8 px-5 md:grid-cols-3">
		{#each data.products as product}
			<Card data={product} editable={data.isAdmin}>
				<hr />
				<div class="flex space-x-3 p-3">
					<Button class="w-[50%]" to={`/product/admin/${product.id}`}>แก้ไข</Button>
					<Button class="w-[50%] !bg-red-500 hover:!bg-red-700" onClick={() => onDelete(product.id)}
						>ลบ</Button
					>
				</div>
			</Card>
		{/each}
		{#if data.isAdmin}
			<a
				href="/product/admin/add"
				class="flex h-[256px] w-full transform items-center justify-center rounded-xl border-4 border-dashed border-gray-500 duration-300 hover:-translate-y-1"
			>
				<Plus size={64} />
				<br />
				<span>เพิ่มสินค้า</span>
			</a>
		{/if}
	</div>
{/if}
{#if !data.isAdmin && data.products.length === 0}
	<div class="flex justify-center">
		<div class="relative">
			<div class="rounded-full bg-white/50 p-24"></div>
			<ShoppingBag size={128} class="absolute inset-0 m-auto text-gray-400" />
		</div>
	</div>

	<div class="text-center">
		<h4 class="text-3xl font-medium">ไม่มีรายการสินค้า</h4>
	</div>
{/if}
