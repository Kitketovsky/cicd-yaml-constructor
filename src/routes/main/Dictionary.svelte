<script lang="ts">
	import List from "./List.svelte";

	export let data: Record<string, any> | any;
</script>

<ul>
	{#each Object.entries(data || {}) as [key, value]}
		<li>
			{key}: {#if typeof value === "string"}
				{value}
			{:else if Array.isArray(value)}
				<List data={value} />
			{:else}
				<svelte:self data={value} />
			{/if}
		</li>
	{/each}
</ul>

<style>
	ul {
		list-style-type: none;
	}
</style>
