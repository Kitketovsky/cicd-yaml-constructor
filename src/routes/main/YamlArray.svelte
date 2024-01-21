<script lang="ts">
	import { root } from "../../stores/stores";
	import YamlObject from "./YamlObject.svelte";

	export let data: (string | number | object)[];
	export let keys: string[];

	function getObjectRef(object: Record<string, any>, keys: string[]) {
		let ref = object;

		for (let key of keys) {
			ref = ref[key];
		}

		return ref;
	}

	let editable = false;
</script>

<ul>
	<button class="editButton" on:click={() => (editable = !editable)}>Edit</button>
	{#each data as value, index ([...keys, index].join("."))}
		<div class="wrapper">
			{#if Array.isArray(value)}
				<svelte:self data={value} />
			{:else if value && typeof value === "object"}
				<YamlObject keys={[...keys, index.toString()]} data={value} />
			{:else}
				<div class="item" style="display: flex; gap: 1rem">
					{#if editable}
						<input
							type="text"
							{value}
							on:input={(event) => {
								const ref = getObjectRef($root, keys);
								ref[index] = event.currentTarget.value;
								$root = $root;
							}}
							on:blur={(event) => {
								console.log(event);
								if (!value) {
									const lastKey = keys.at(-1);
									if (!lastKey) return null;
									const ref = getObjectRef($root, keys.slice(0, keys.length - 1));
									if (!Array.isArray(ref[lastKey])) return null;
									// @ts-ignore
									ref[lastKey] = ref[lastKey].filter((arrayValue) => arrayValue !== value);
									$root = $root;
								}
							}}
						/>
						<button
							class="removeValue"
							on:click={() => {
								const lastKey = keys.at(-1);
								if (!lastKey) return null;
								const ref = getObjectRef($root, keys.slice(0, keys.length - 1));
								if (!Array.isArray(ref[lastKey])) return null;
								// @ts-ignore
								ref[lastKey] = ref[lastKey].filter((arrayValue) => arrayValue !== value);
								$root = $root;
							}}>Remove</button
						>
					{:else}
						<li>{value}</li>
					{/if}
				</div>
			{/if}
		</div>
	{/each}

	<button
		class="addNewValue"
		on:click={async () => {
			const ref = getObjectRef($root, keys);
			ref.push("");
			editable = true;
			$root = $root;
		}}>+ Add New Value</button
	>
</ul>

<style>
	ul {
		position: relative;
		list-style-type: "- ";
		display: flex;
		flex-direction: column;
		border: 1px solid black;
		margin: 0.5rem;
		margin-left: 1rem;
		padding: 0.5rem;
		background-color: white;
	}

	@supports selector(:has(*)) {
		.addNewValue {
			display: none;
		}
		ul:not(:has(ul:hover)):hover {
			border: 3px solid black;
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
			top: 0;
			right: 0;
		}
	}

	.item {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.wrapper {
		padding: 0.5rem;
	}
</style>
