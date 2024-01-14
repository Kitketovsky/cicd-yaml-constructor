<script>
	import "./styles.css";
</script>

<div class="app">
	<header>
		<nav>
			<a href="/">Login</a>
			<a href="/main">Dashboard</a>
		</nav>
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
		padding: 1rem 0;
	}

	footer {
		padding: 1rem 0;
	}

	main {
		display: flex;
		flex-grow: 1;
	}
</style>
