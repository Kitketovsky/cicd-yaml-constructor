<script lang="ts">
	import { root } from "../../stores/tree";
	import YamlArray from "./YamlArray.svelte";

	export let data: Record<string, any>;
	export let keys: (string | number)[];

	$: entries = Object.entries(data);

	function getObjectRef(object: Record<string, any>, keys: string[]) {
		let ref = object;

		for (let key of keys) {
			ref = ref[key];
		}

		return ref;
	}
</script>

<ul>
	<span>YamlObject</span>

	{#each entries as [key, value]}
		<li>
			<input
				value={key}
				on:input={(event) => {
					let sortedObject = {};

					for (let object_key of Object.keys(data)) {
						const old_value = Object.getOwnPropertyDescriptor(data, object_key);

						const new_key = event.currentTarget.value;

						Object.defineProperty(
							sortedObject,
							object_key === key ? new_key : object_key,
							old_value
						);
					}

					let ref = getObjectRef($root, keys.slice(0, keys.length - 1));
					let refKey = keys.at(-1);

					ref[refKey] = sortedObject;
					$root = $root;
				}}
			/>: {#if Array.isArray(value)}
				<YamlArray keys={[...keys, key]} data={value} />
			{:else if value && typeof value === "object"}
				<svelte:self keys={[...keys, key]} data={value} />
			{:else}
				<input
					type="text"
					{value}
					on:input={(event) => {
						let ref = getObjectRef($root, keys);
						ref[key] = event.currentTarget.value;
						$root = $root;
					}}
				/>
			{/if}
		</li>
	{/each}
</ul>

<style>
	ul {
		list-style-type: none;
		border: 1px solid black;
		margin: 0.5rem;
		padding: 0.5rem;
	}

	span {
		display: block;
		font-size: 0.7rem;
		margin-bottom: 0.5rem;
		text-decoration: underline;
	}
</style>
