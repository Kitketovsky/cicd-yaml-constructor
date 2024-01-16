<script lang="ts">
	import { Node, Anchor } from "svelvet";
	import YamlArray from "./YamlArray.svelte";
	import YamlObject from "./YamlObject.svelte";
	import { root, nodes } from "../../stores/stores";

	export let nodeData: { id: string | number; position: { x: number; y: number }; key: string };
	export let index: number;

	let nodePosition;

	// let wrapper: HTMLDivElement;

	// $: if (wrapper) {
	// 	console.log(wrapper.getBoundingClientRect());
	// }
</script>

<!-- props: position, connections [nodeId, anchorId] | nodeId -->

{#if $root}
	{@const data = $root[nodeData.key]}

	<Node useDefaults let:node let:grabHandle position={nodeData.position} id={nodeData.id}>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="node-wrapper"
			use:grabHandle
			on:mouseup={() => {
				const { position } = node;
				nodePosition = position;
				// @ts-ignore
				$nodes[index].position = $nodePosition;
			}}
		>
			<div class="input-anchors">
				<Anchor direction="north" />
			</div>

			<span>Node: {nodeData.key}</span>

			{#if Array.isArray(data)}
				<YamlArray keys={[nodeData.key]} {data} />
			{:else if data && typeof data === "object"}
				<YamlObject keys={[nodeData.key]} {data} />
			{:else}
				{data}
			{/if}

			<div class="output-anchors">
				<Anchor direction="south" />
			</div>
		</div>
	</Node>
{/if}

<style>
	.node-wrapper {
		padding: 1rem;
		position: relative;
	}

	.input-anchors {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.output-anchors {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translate(-50%, 50%);
		display: flex;
		align-items: center;
		gap: 1rem;
	}
</style>
