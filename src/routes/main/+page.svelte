<script lang="ts">
	import { Svelvet } from "svelvet";
	import YamlView from "./YamlView.svelte";
	import YamlNode from "./YamlNode.svelte";
	import { root } from "../../stores/tree";

	export let data;

	$: {
		root.set(data.jsonYaml);
	}
</script>

<Svelvet id="my-canvas" controls fitView TD>
	{#if $root}
		{#each Object.keys($root).map((key, index) => {
			return { id: index, position: { x: 0, y: 200 * index }, key };
		}) as nodeData (nodeData.id)}
			<YamlNode {nodeData} />
		{/each}
	{/if}
</Svelvet>

<YamlView />
