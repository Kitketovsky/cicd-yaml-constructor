<script lang="ts">
	export let yaml: JSON;
</script>

{#if yaml}
	<div class="yaml">
		<pre>
			{JSON.stringify(yaml, null, 2).trim()}
		</pre>
	</div>
{/if}

<style>
	.yaml {
		background-color: antiquewhite;
		padding: 1rem;
		max-width: 250px;
	}
</style>
