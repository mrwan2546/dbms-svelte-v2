<script lang="ts">
	import '../app.css';
	import Navbar from '../components/navbar.svelte';
	let { children } = $props();
</script>

<Navbar />

<main class="container mx-auto">
	{@render children()}
</main>
