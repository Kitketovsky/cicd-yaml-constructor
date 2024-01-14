<script lang="ts">
	import Dictionary from "./Dictionary.svelte";

	export let data: Array<string | object>;
</script>

<ul>
	{#each data as unit}
		{#if Array.isArray(unit)}
			<svelte:self data={unit} />
		{:else if unit && typeof unit === "object"}
			<Dictionary data={unit} />
		{:else}
			<li>{unit}</li>
		{/if}
	{/each}
</ul>

<style>
	ul {
		list-style-type: "- ";
	}
</style>
