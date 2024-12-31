<script lang="ts">
	import '../app.css';
	import Navbar from '../components/navbar.svelte';
	let { children } = $props();
</script>

<Navbar />

<main class="container mx-auto my-6 md:my-8">
	{@render children()}
</main>
