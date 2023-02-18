<script lang="ts">
	import { intersect } from '$lib'

	const items = [...Array(20).keys()]
	const threshold = [...Array(30).keys()].map(i => i / 29)
	const rootMargin = '-96px 0px'

	function callback(entry: IntersectionObserverEntry) {
		entry.target.textContent = `${(entry.intersectionRatio * 100).toFixed(2)}%`
	}
</script>

<div class="container" />
{#each items as _}
	<div class="item" use:intersect={{ callback, threshold, rootMargin }} />
{/each}

<style>
	.container {
		position: fixed;
		top: 96px;
		right: 0;
		bottom: 96px;
		left: 0;
		background-color: red;
		opacity: 0.1;
	}

	.item {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 16px;
		padding: 8px;
		height: 64px;
		border: solid 1px #ccc;
		font-family: Arial, Helvetica, sans-serif;
		font-size: 28px;
		background-color: #eee;
	}
</style>
