<script lang="ts">
	import { browser } from '$app/environment';
	import type { IUser } from '$lib/interface/user.interface';
	import { Coffee, Key, LoaderCircle, LogOut, Receipt, ShoppingCart, User } from 'lucide-svelte';

	let isLoaded = $state(false);
	let dropdown = $state(false);
	let user: IUser | null = $state(null);

	if (browser) {
		async function getUser() {
			// Get user
			const resp = await fetch('/api/user', {
				credentials: 'include'
			});
			if (resp.status === 200) {
				user = await resp.json();
			}

			isLoaded = true;
		}

		getUser();
	}
</script>

<nav
	class="flex w-full items-center justify-between rounded-b-2xl bg-white px-6 md:px-12 py-6 shadow-lg"
>
	<a href="/" class="flex items-center space-x-1 md:space-x-3">
		<Coffee size={24} />
		<h1 class="text-base md:text-2xl uppercase">Coffee Store</h1>
	</a>

	<div class="flex items-center space-x-4">
		{#if isLoaded}
			{#if user}
				<a href="/baskets" class="items-center space-x-1 hidden md:flex">
					<ShoppingCart />
					<span>ตะกร้า</span>
				</a>
				<div class="relative">
					<button onclick={() => (dropdown = !dropdown)} class="flex items-center space-x-1">
						<User />
						<span class="hidden md:block">สวัสดี, </span>
						<span>{user.display_name}</span>
					</button>
					{#if dropdown}
						<div
							class="bg-l absolute right-0 z-50 mt-2 rounded-xl bg-white shadow-xl drop-shadow-md"
						>
							<a
								href="/baskets"
								class="flex md:hidden w-[196px] items-center p-3 duration-300 hover:bg-slate-100 "
								onclick={() => (dropdown = false)}
							>
								<ShoppingCart class="mr-3" />
								ตะกร้า
							</a>
							<a
								href="/orders"
								class="flex w-[196px] items-center p-3 duration-300 hover:bg-slate-100"
								onclick={() => (dropdown = false)}
							>
								<Receipt class="mr-3" />
								รายการสั่งซื้อ
							</a>
							<hr />
							<a
								href="/api/user/logout"
								class="flex w-[196px] items-center rounded-b-xl p-3 duration-300 hover:bg-slate-100"
								onclick={() => (dropdown = false)}
							>
								<LogOut class="mr-3" />
								ออกจากระบบ</a
							>
						</div>
					{/if}
				</div>
			{:else}
				<a
					href="/auth/login"
					class="transform rounded-xl bg-purple-600 px-6 py-3 text-white drop-shadow-sm duration-300 hover:-translate-y-[.10rem] hover:shadow-lg hover:shadow-purple-300"
					>Login</a
				>
			{/if}
		{:else}
			<LoaderCircle class="animate-spin" />
		{/if}
	</div>
</nav>
