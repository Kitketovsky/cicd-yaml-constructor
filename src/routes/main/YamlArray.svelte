<script lang="ts">
	import { root } from "../../stores/tree";
	import YamlObject from "./YamlObject.svelte";

	export let data: (string | number | object)[];
	export let keys: (string | number)[];

	// Assignments to properties of arrays and objects — e.g.
	// obj.foo += 1 or array[i] = x — work the same way as assignments to the values themselves.
</script>

<ul>
	{#each data as value, index ([...keys, index].join("."))}
		{#if Array.isArray(value)}
			<svelte:self data={value} />
		{:else if value && typeof value === "object"}
			<YamlObject keys={[...keys, index]} data={value} />
		{:else}
			<li>{value}</li>
		{/if}
	{/each}
</ul>

<style>
	ul {
		list-style-type: "- ";
	}

	li {
		border: 1px solid black;
	}
</style>
