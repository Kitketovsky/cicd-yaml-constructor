<script lang="ts">
	import { root } from "../../stores/tree";
	import YamlArray from "./YamlArray.svelte";

	export let data: Record<string, any>;
	export let keys: (string | number)[];

	const entries = Object.entries(data);
</script>

<!-- if (old_key !== new_key) {
    Object.defineProperty(o, new_key,
        Object.getOwnPropertyDescriptor(o, old_key));
    delete o[old_key];
} -->

<ul>
	{#each entries as [key, value], index (index)}
		<li>
			{key}: {#if Array.isArray(value)}
				<YamlArray keys={[...keys, key]} data={value} />
			{:else if value && typeof value === "object"}
				<svelte:self keys={[...keys, key]} data={value} />
			{:else}
				<input
					type="text"
					{value}
					on:input={(event) => {
						$root["build-job"]["image"] = event.currentTarget.value;
					}}
				/>
			{/if}
		</li>
	{/each}
</ul>

<style>
	ul {
		list-style-type: none;
	}
</style>
