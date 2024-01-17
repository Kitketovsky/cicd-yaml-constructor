<script lang="ts">
	import { Node, Anchor } from "svelvet";
	import YamlArray from "./YamlArray.svelte";
	import YamlObject from "./YamlObject.svelte";
	import { root, nodes } from "../../stores/stores";
	import { createEventDispatcher, getContext, onMount, tick } from "svelte";

	export let nodeData: {
		id: string | number;
		key: string;
	};

	export let index: number;

	$: connections = $nodes[index + 1]?.id ? [$nodes[index + 1]?.id] : [];

	// let width: number;
	// let height: number;

	// onMount(() => {
	// 	if (!width && !height) {
	// 		tick().then(() => {
	// 			$nodes[index].position = { x: 0, y: height * index };
	// 		});
	// 	}
	// });
</script>

<!-- props: position, connections [nodeId, anchorId] | nodeId -->

<Node useDefaults let:grabHandle id={nodeData.id} bind:position={$nodes[index].position}>
	{@const data = $root[nodeData.key]}

	<div class="node-wrapper" use:grabHandle>
		<!-- only for input -->
		<div class="input-anchors">
			<Anchor direction="north" input />
		</div>

		<span>Node: {nodeData.key}</span>

		{#if Array.isArray(data)}
			<YamlArray keys={[nodeData.key]} {data} />
		{:else if data && typeof data === "object"}
			<YamlObject keys={[nodeData.key]} {data} />
		{:else}
			{data}
		{/if}

		<!-- only for outputs -->
		<div class="output-anchors">
			<Anchor direction="south" {connections} output />
		</div>
	</div>
</Node>

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
