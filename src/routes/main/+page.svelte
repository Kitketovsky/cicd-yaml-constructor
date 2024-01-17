<script lang="ts">
	import { Svelvet } from "svelvet";
	import YamlView from "./YamlView.svelte";
	import YamlNode from "./YamlNode.svelte";
	import { root, nodes, hovered } from "../../stores/stores";
	import { onMount } from "svelte";
	import { browser } from "$app/environment";

	export let data;

	$: {
		root.set(data.jsonYaml);

		nodes.set(
			Object.keys(data.jsonYaml).map((key) => {
				return {
					id: key,
					position: { x: 0, y: 0 },
					key
				};
			})
		);
	}

	let mounted = false;

	onMount(() => {
		if (browser) {
			const locallySaved = localStorage.getItem("CONSTRUCTOR");

			if (locallySaved) {
				$root = JSON.parse(locallySaved);
			}

			const locallySavedNodes = localStorage.getItem("CONSTRUCTOR-NODES");

			if (locallySavedNodes) {
				$nodes = JSON.parse(locallySavedNodes);
			}
		}

		mounted = true;
	});

	$: console.log("hovered", $hovered);

	$: if (mounted) {
		localStorage.setItem("CONSTRUCTOR", JSON.stringify($root));
		localStorage.setItem("CONSTRUCTOR-NODES", JSON.stringify($nodes));
	}
</script>

<!-- svelvet on:connection on:disconnection -->
<Svelvet id="my-canvas" controls TD raiseEdgesOnSelect fitView>
	{#each $nodes as nodeData, index (nodeData.id)}
		<YamlNode {nodeData} {index} />
	{/each}
</Svelvet>

<YamlView />
