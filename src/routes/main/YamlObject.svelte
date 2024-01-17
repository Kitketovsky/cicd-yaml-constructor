<script lang="ts">
	import { root } from "../../stores/stores";
	import YamlArray from "./YamlArray.svelte";

	export let data: Record<string, any>;
	export let keys: string[];

	$: entries = Object.entries(data);

	function getObjectRef(object: Record<string, any>, keys: string[]) {
		let ref = object;

		for (let key of keys) {
			ref = ref[key];
		}

		return ref;
	}

	function onObjectKeyChange(
		event: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		},
		key: string
	) {
		let sortedObject = {};

		for (let object_key of Object.keys(data)) {
			const old_value = Object.getOwnPropertyDescriptor(data, object_key);
			if (!old_value) return null;
			const new_key = event.currentTarget.value;
			Object.defineProperty(sortedObject, object_key === key ? new_key : object_key, old_value);
		}

		let ref = getObjectRef($root, keys.slice(0, keys.length - 1));
		let refKey = keys.at(-1);

		if (!refKey) return null;

		ref[refKey] = sortedObject;
		$root = $root;
	}

	function onObjectValueChange(event: Event & { currentTarget: HTMLInputElement }, key: string) {
		let ref = getObjectRef($root, keys);
		ref[key] = event.currentTarget.value;
		$root = $root;
	}

	let editable = false;

	let wrapper: HTMLUListElement;

	function focusHandler(
		event: MouseEvent & {
			currentTarget: EventTarget & Window;
		}
	) {
		if (event.target) {
			editable = wrapper.contains(event.target as Node);
		}
	}
</script>

<!-- TODO: find another way to check if focus is within element or not -->
<svelte:window on:click={focusHandler} />

<ul bind:this={wrapper}>
	{#each entries as [key, value]}
		<li>
			{#if editable}
				<input value={key} on:input={(event) => onObjectKeyChange(event, key)} />
			{:else}
				<span>{key}</span>
			{/if}
			: {#if typeof value === "string" || typeof value === "number"}
				{#if editable}
					<input type="text" {value} on:input={(event) => onObjectValueChange(event, key)} />
				{:else}
					<span>{value}</span>
				{/if}
			{/if}
		</li>
		{#if Array.isArray(value)}
			<YamlArray keys={[...keys, key]} data={value} />
		{:else if value && typeof value === "object"}
			<svelte:self keys={[...keys, key]} data={value} />
		{/if}
	{/each}
</ul>

<style>
	ul {
		list-style-type: none;
		border: 1px solid black;
		margin: 0.5rem;
		padding: 0.5rem;
		background-color: white;
	}

	li {
		padding: 0.5rem;
	}
</style>
