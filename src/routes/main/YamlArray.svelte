<script lang="ts">
	import { root } from "../../stores/tree";
	import YamlObject from "./YamlObject.svelte";

	export let data: (string | number | object)[];
	export let keys: (string | number)[];

	// Assignments to properties of arrays and objects — e.g.
	// obj.foo += 1 or array[i] = x — work the same way as assignments to the values themselves.
</script>

<ul>
	<span>YamlArray</span>
	<!-- <div class="keys">{["root", ...keys].join(".")}</div> -->

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
		/* position: relative; */
		list-style-type: "- ";
		border: 1px solid red;
		margin: 0.5rem;
		padding: 0.5rem;
	}

	span {
		display: block;
		font-size: 0.7rem;
		margin-bottom: 0.5rem;
		text-decoration: underline;
		color: red;
	}
</style>
