<script lang="ts">
	import { Svelvet, Node, Anchor } from "svelvet";
	import List from "./List.svelte";
	import Dictionary from "./Dictionary.svelte";
	import YamlView from "./YamlView.svelte";

	export let data;

	let nodes = Object.entries(data.jsonYaml).map(([key, entry], index) => {
		return { id: index.toString(), position: { x: 0, y: 200 * index }, label: key, data: entry };
	});
</script>

<Svelvet
	id="my-canvas"
	controls
	fitView
	TD
	on:connection={console.log}
	on:disconnection={console.log}
>
	{#each nodes as nodeProps, index (nodeProps.id)}
		<Node useDefaults {...nodeProps} on:nodeReleased={console.log}>
			<div class="node-wrapper">
				<div class="input-anchors">
					<Anchor direction="north" />
				</div>

				<span>{nodeProps.label}</span>

				{#if Array.isArray(nodeProps.data)}
					<List data={nodeProps.data} />
				{:else}
					<Dictionary data={nodeProps.data} />
				{/if}

				<div class="output-anchors">
					<Anchor direction="south" />

					{#if index === nodes.length - 1}
						<button
							class="add-node-btn"
							on:click={() => {
								nodes = [
									...nodes,
									{
										id: (index + 1).toString(),
										label: "new node",
										position: { x: 0, y: 200 * (index + 1) },
										data: {}
									}
								];
							}}>+</button
						>
					{/if}
				</div>
			</div>
		</Node>
	{/each}
</Svelvet>

<YamlView yaml={data.jsonYaml} />

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

	.add-node-btn {
		border-radius: 50%;
		border: none;
		background-color: aquamarine;
	}
</style>
