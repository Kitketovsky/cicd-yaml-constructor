<script>
	import "./styles.css";
</script>

<div class="app">
	<header>
		<nav>
			<a href="/">Login</a>
			<a href="/main">Dashboard</a>
		</nav>

		<button
			on:click={() => {
				localStorage.removeItem("CONSTRUCTOR");
				localStorage.removeItem("CONSTRUCTOR-NODES");
			}}>Clear storage</button
		>
	</header>

	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	:global(.svelvet-wrapper) {
		height: auto !important;
	}

	header {
		padding: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	main {
		display: flex;
		flex-grow: 1;
	}
</style>
