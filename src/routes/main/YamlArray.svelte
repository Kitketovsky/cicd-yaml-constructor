<script lang="ts">
	import { tick } from "svelte";
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
					{:else}
						<li>{value}</li>
					{/if}
					<button
						class="addNewValue"
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
				</div>
			{/if}
		</div>
	{/each}

	<button
		on:click={async () => {
			// - add new value
			// - we focus on new input
			// - if on blur the value if empty string, then remove this value from array
			const ref = getObjectRef($root, keys);
			ref.push("");
			editable = true;
			$root = $root;

			await tick();

			// const lastInput = Array.from(list.querySelectorAll(".item > input")).at(-1);

			// if (lastInput) {
			// 	lastInput.focus();
			// }
		}}>+ Add New Value</button
	>
</ul>

<style>
	ul {
		/* position: relative; */
		list-style-type: "- ";
		display: flex;
		flex-direction: column;
		border: 1px solid red;
		margin: 0.5rem;
		margin-left: 1rem;
		padding: 0.5rem;
		background-color: white;
	}

	.item {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.item button {
		display: none;
	}

	.wrapper {
		padding: 0.5rem;
	}

	.item:hover button {
		display: initial;
	}
</style>
