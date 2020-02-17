<script>
	import Profile from './Profile.svelte';
	import TodoList from './TodoList.svelte';

	import { authState } from 'rxfire/auth';
	import { auth, googleProvider } from './firebase';

	let user = authState(auth);
	function login(){
		auth.signInWithPopup(googleProvider);
	}

</script>

<main>
	{#if $user}
		<Profile {...$user}/>
		<button on:click={() => auth.signOut()}>Sign Out</button>

		<TodoList uid={ $user.uid } />

	{:else}
		<button on:click={login}>Sign In</button>
		<TodoList uid={ null } />
	{/if}

</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>