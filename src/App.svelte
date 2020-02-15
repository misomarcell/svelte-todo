<script>
	import Profile from './Profile.svelte';
	
	import { auth, googleProvider } from './firebase'

	var user;
	if(auth.currentUser)
	{
		console.log(auth.currentUser);
		user = auth.currentUser;
	}
	function signOut(){
		auth.signOut().then(result => {
			return result;
		});
		user = null;
	}

	function signIn(){
		auth.signInWithPopup(googleProvider).then(result => {
			user = auth.currentUser;
		});
	}
</script>

<main>
	<h1>Hello aaa</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>


{#if user}
	<Profile {...user}/>
	<button on:click={signOut}>Sign Out</button>
{:else}
	<button on:click={signIn}>Sign In</button>
{/if}

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