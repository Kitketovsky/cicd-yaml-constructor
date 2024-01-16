<script lang="ts">
	import { Svelvet } from "svelvet";
	import YamlView from "./YamlView.svelte";
	import YamlNode from "./YamlNode.svelte";
	import { root, nodes } from "../../stores/stores";

	export let data;

	$: {
		root.set(data.jsonYaml);

		nodes.set(
			Object.keys(data.jsonYaml).map((key, index) => {
				return { id: key, position: { x: 0, y: 200 * index }, key };
			})
		);
	}
</script>

<!-- svelvet on:connection on:disconnection -->
<Svelvet id="my-canvas" controls fitView TD edgesAboveNode="all">
	{#each $nodes as nodeData, index (nodeData.id)}
		<YamlNode {nodeData} {index} />
	{/each}
</Svelvet>

<YamlView />
