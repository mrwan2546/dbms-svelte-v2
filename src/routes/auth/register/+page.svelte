<script>
	import Button from '../../../components/button.svelte';
	import Input from '../../../components/input.svelte';

	const { form } = $props();
</script>

<div class="flex justify-center">
	<div class="min-w-[512px] space-y-6">
		<h1 class="text-center text-4xl font-light uppercase">Register</h1>
		<form class="space-y-3 rounded-md bg-white p-5 shadow-lg">
			<Input label="Username" name="account" placeholder={'lnwzaza'} required />
			<Input label="Password" name="password" type="password" placeholder={'********'} required />
			<Input label="Display Name" name="display_name" placeholder={'lnwZaZa'} required />
			<Button type="submit" class="w-full">Register</Button>
			{#if form !== null && !form.success}
				<div class="w-full rounded-sm bg-red-500 p-3 text-white">
					{form?.message || "Unknown error"}
				</div>
			{/if}
			<div class="text-center">
				<span
					>Already account?
					<a href="/auth/login" class="text-blue-500 no-underline hover:underline">Login</a> it.</span
				>
			</div>
		</form>
	</div>
</div>
