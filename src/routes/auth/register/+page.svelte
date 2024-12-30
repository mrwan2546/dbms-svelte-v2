<script>
	import Button from '../../../components/button.svelte';
	import Input from '../../../components/input.svelte';

	const { form } = $props();
</script>

<div class="flex justify-center">
	<div class="min-w-[512px] space-y-6">
		<h1 class="text-center text-4xl font-light uppercase">สมัครสมาชิก</h1>
		<form method="POST" class="space-y-3 rounded-md bg-white p-5 shadow-lg">
			<Input label="ชื่อผู้ใช้งาน" name="account" placeholder={'mrcoffee'} required />
			<Input label="รหัสผ่าน" name="password" type="password" placeholder={'********'} required />
			<Input label="ชื่อที่แสดงหน้าเว็บ" name="display_name" placeholder={'Mr. Coffee'} required />
			<Button type="submit" class="w-full">สมัครสมาชิก</Button>
			{#if form !== null && !form.success}
				<div class="w-full rounded-sm bg-red-500 p-3 text-white">
					{form?.message || "Unknown error"}
				</div>
			{/if}
			<div class="text-center">
				<span
					>มีบัญชีอยู่แล้ว?
					<a href="/auth/login" class="text-blue-500 no-underline hover:underline">เข้าสู่ระบบ</a> เลยสิ</span
				>
			</div>
		</form>
	</div>
</div>
