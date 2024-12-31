<script lang="ts">
	import { LoaderCircle } from 'lucide-svelte';
	import Button from '../../../../components/button.svelte';
	import FileUpload from '../../../../components/fileUpload.svelte';
	import Input from '../../../../components/input.svelte';
	import Textarea from '../../../../components/textarea.svelte';

	let isLoading = $state(false);
	let isLoadingUpload = $state(false);

	// Image form & preview state
	let inputImageURL: HTMLInputElement;
	let imagePreview = $state('');

	const { data } = $props();
	const { data: productInfo } = data;

	function updateImage(url: string) {
		if (inputImageURL) {
			inputImageURL.value = url;
		}
		imagePreview = url;
	}

	async function uploadImage(file: File) {
		// Start loading
		isLoadingUpload = true;

		const form = new FormData();
		form.set('file', file, file.name);

		const resp = await fetch('/api/upload', {
			method: 'POST',
			body: form
		});

		const js = (await resp.json()) as { url: string; message: string };
		isLoadingUpload = false;

		if (resp.status !== 201) {
			alert(js.message || 'Unknown error');
			return;
		}

		// Update image
		updateImage(js.url);
	}

	$effect(() => {
		if (productInfo) {
			updateImage(productInfo.image);
		}
	});
</script>

<div class="flex justify-center">
	<div class="px-4">
		<h1 class="mb-3 text-3xl">{data.type === 'ADD' ? 'เพิ่ม' : 'แก้ไข'}สินค้า</h1>
		<form
			method="POST"
			class="max-w-full space-y-2 rounded-md bg-white p-5 shadow-lg md:min-w-[712px]"
			onsubmit={() => (isLoading = true)}
		>
			<input type="hidden" name="image" bind:this={inputImageURL} />
			<Input
				label="ชื่อสินค้า"
				name="name"
				value={productInfo.title}
				required
				placeholder="เมล็ดกาแฟคั่ว"
			/>
			<FileUpload label="รูปภาพสินค้า" onFileChange={uploadImage} />
			{#if isLoadingUpload}
				<div class="flex justify-center">
					<LoaderCircle class="animate-spin" />
				</div>
			{/if}
			{#if imagePreview && !isLoadingUpload}
				<img src={imagePreview} alt="" class="mx-auto max-h-[512px]" />
			{/if}
			<Textarea
				label="รายละเอียดสินค้า"
				name="description"
				required
				placeholder="หอมคั่วจากโรงงาน"
				value={productInfo.description || ''}
			/>
			<Input
				label="ราคา / ชิ้น"
				name="price"
				type="number"
				min={0}
				value={productInfo.price}
				required
			/>
			<Input
				label="จำนวนคงเหลือ"
				name="stocks"
				type="number"
				min={0}
				value={productInfo.stocks}
				required
			/>
			<Button type="submit" class="w-full" loading={isLoading}>บันทึก</Button>
		</form>
	</div>
</div>
