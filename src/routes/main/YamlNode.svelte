<script lang="ts">
	import { Node, Anchor } from "svelvet";
	import YamlArray from "./YamlArray.svelte";
	import YamlObject from "./YamlObject.svelte";
	import { root } from "../../stores/tree";

	export let nodeData: { id: string | number; position: { x: number; y: number }; key: string };
</script>

{#if $root}
	<Node useDefaults position={nodeData.position} on:nodeReleased={console.log}>
		<div class="node-wrapper">
			<div class="input-anchors">
				<Anchor direction="north" />
			</div>

			<span>{nodeData.key}</span>

			{#if Array.isArray($root[nodeData.key])}
				<YamlArray keys={[nodeData.key]} data={$root[nodeData.key]} />
			{:else if $root[nodeData.key] && typeof $root[nodeData.key] === "object"}
				<YamlObject keys={[nodeData.key]} data={$root[nodeData.key]} />
			{:else}
				{$root[nodeData.key]}
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
