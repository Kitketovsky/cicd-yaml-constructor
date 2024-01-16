<script lang="ts">
	import { root } from "../../stores/stores";
</script>

{#if $root}
	<div class="yaml">
		<pre>
			{JSON.stringify($root, null, 2).trim()}
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
