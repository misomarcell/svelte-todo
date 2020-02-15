<script>
	import Profile from './Profile.svelte';
	
	import { startWith } from 'rxjs/operators';
	import { authState } from 'rxfire/auth';
	import { collectionData } from 'rxfire/firestore';
	import { auth, googleProvider } from './firebase';
	import { db } from './firebase';

	let user = authState(auth);
	function login(){
		auth.signInWithPopup(googleProvider);
	}

	function add() {
		 db.collection('todos').add({ text: 'c text', state: 'c inc', uid: user.uid || 'anonymus', created: Date.now() });
	}

	const query = db.collection('todos');
	const todos = collectionData(query, 'id').pipe(startWith([]));;
</script>

<main>
	{#if $user}
		<Profile {...$user}/>
		<button on:click={() => auth.signOut()}>Sign Out</button>
	{:else}
		<button on:click={login}>Sign In</button>
	{/if}

	<button on:click={add}>Add item</button>

	{#each $todos as todo, i}

        <p> {i} {todo.text} </p>
        
	{/each}
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