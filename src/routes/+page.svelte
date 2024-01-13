<script>
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";

	export let form;

	let creating = false;
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login" />
</svelte:head>

<div class="wrapper">
	<h1>Login</h1>

	<form
		method="POST"
		use:enhance={() => {
			creating = true;

			return async ({ update }) => {
				await update();
				creating = false;
				goto("/main");
			};
		}}
	>
		<div>
			<label for="email">Email</label>
			<input id="email" name="email" type="email" required disabled={creating} />
		</div>

		<div>
			<label for="password">Password</label>
			<input id="password" name="password" type="password" required disabled={creating} />
		</div>

		{#if form?.error}
			<span class="error-message">{form.error}</span>
		{/if}

		<button type="submit" disabled={creating}>Login</button>
	</form>
</div>

<style>
	.error-message {
		color: red;
	}
</style>
