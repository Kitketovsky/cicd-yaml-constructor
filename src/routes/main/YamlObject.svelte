<script lang="ts">
	import YamlArray from "./YamlArray.svelte";

	export let data: Record<string, any>;
	export let keys: (string | number)[];

	const entries = Object.entries(data);
</script>

<ul>
	{#each entries as [key, value], index (index)}
		<li>
			{key}: {#if Array.isArray(value)}
				<YamlArray keys={[...keys, key]} data={value} />
			{:else if value && typeof value === "object"}
				<svelte:self keys={[...keys, key]} data={value} />
			{:else}
				{value}
			{/if}
		</li>
	{/each}
</ul>

<style>
	ul {
		list-style-type: none;
	}
</style>
