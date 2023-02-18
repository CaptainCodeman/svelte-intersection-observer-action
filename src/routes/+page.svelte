<script lang="ts">
	import { intersect } from '$lib'

	let container: HTMLDivElement
	let items = [...Array(20).keys()]

	function callback(entry: IntersectionObserverEntry) {
		entry.target.textContent = `${entry.intersectionRatio}`
	}
</script>

<main>
	<div class="container" bind:this={container} />
	{#each items as item}
		<div class="item" use:intersect={{ callback, threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0], rootMargin: '-96px 0px' }} />
	{/each}
</main>

<style>
	.container {
		position: fixed;
		top: 96px;
		right: 0;
		bottom: 96px;
		left: 0;
		background-color: red;
		opacity: 0.1;
		border: solid 5px red;
	}

	.item {
		margin: 16px;
		padding: 8px;
		height: 64px;
		border: solid 1px #ccc;
	}
</style>
