<script lang="ts">
	import { Svelvet } from "svelvet";
	import YamlView from "./YamlView.svelte";
	import YamlNode from "./YamlNode.svelte";
	import { root } from "../../stores/tree";

	export let data;

	$: root.set(data.jsonYaml);

	$: nodesData = $root
		? Object.keys($root).map((key, index) => {
				return {
					id: crypto.randomUUID(),
					position: { x: 0, y: 200 * index },
					key
				};
			})
		: [];
</script>

<Svelvet id="my-canvas" controls fitView TD>
	{#each nodesData as nodeData (nodeData.id)}
		<YamlNode {nodeData} />
	{/each}
</Svelvet>

<YamlView />
