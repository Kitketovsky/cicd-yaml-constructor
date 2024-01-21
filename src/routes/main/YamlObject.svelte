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
</script>

<!-- TODO: find another way to check if focus is within element or not -->
<div class="container">
	<ul>
		<button class="editButton" on:click={() => (editable = !editable)}>Edit</button>
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

		<!-- in object we can add a key and a value, which can be -->
		<!-- - another object
			 - string
			 - number
			 - array
		-->
		<button class="addNewValue">+ Add New Key/Value Pair</button>
	</ul>
</div>

<style>
	.container {
		--padding: 0.5rem;
		--borderColor: black;
		display: contents;
	}

	ul {
		list-style-type: none;
		border: 1px solid var(--borderColor);
		margin: 0.5rem;
		padding: var(--padding);
		background-color: white;
		position: relative;
	}

	@supports selector(:has(*)) {
		.addNewValue {
			display: none;
		}
		ul:not(:has(ul:hover)):hover {
			border: 3px solid var(--borderColor);
		}

		ul:not(:has(ul:hover)):hover > .addNewValue {
			display: block;
		}

		.editButton {
			display: none;
		}

		ul:not(:has(ul:hover)):hover > .editButton {
			display: block;
			position: absolute;
			top: calc(var(--padding) * -1);
			right: 0;
		}
	}

	li {
		padding: 0.5rem;
	}

	button {
		margin-top: 0.5rem;
	}
</style>
