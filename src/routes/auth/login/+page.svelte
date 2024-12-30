<script>
	import Button from '../../../components/button.svelte';
	import Input from '../../../components/input.svelte';

	const { form } = $props();
	let isLoading = $state(false)
</script>

<div class="flex justify-center">
	<div class="min-w-[512px] space-y-6">
		<h1 class="text-center text-4xl font-light uppercase">เข้าสู่ระบบ</h1>
		<form onsubmit={() => isLoading = true} method="POST" class="space-y-3 rounded-md bg-white p-5 shadow-lg">
			<Input label="ชื่อผู้ใช้งาน" name="account" placeholder={'mrcoffee'} required />
			<Input label="รหัสผ่าน" name="password" type="password" placeholder={'********'} required />
			{#if form !== null && !form.success}
				<div class="w-full rounded-sm bg-red-500 p-3 text-white">
					{form?.message || "Unknown error"}
				</div>
			{/if}
			<Button type="submit" loading={isLoading} class="w-full">Login</Button>
			<div class="text-center">
				<span
					>ไม่มีผู้ใช้
					<a href="/auth/register" class="text-blue-500 no-underline hover:underline">สมัครสมาชิก</a> เลยสิ</span
				>
			</div>
		</form>
	</div>
</div>
