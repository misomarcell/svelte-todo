<script>
    import TodoItem from './TodoItem.svelte';

    import { collectionData } from 'rxfire/firestore';
    import { startWith } from 'rxjs/operators';
	import { db } from './firebase';

    export let uid;

	var todoText = "";
	function add() {
		if(!todoText)
			return;

		db.collection('todos').add({ text: todoText, state: 'c inc', uid: uid || 'anonymus', created: Date.now() });
	}

	const query = db.collection('todos').where('uid', '==', uid || 'anonymus').orderBy('created');
    const todos = collectionData(query, 'id').pipe(startWith([]));;

    const removeItem = e => {
        const { id } = e.detail;
        db.collection('todos').doc(id).delete();
    }
</script>

<input type="text" bind:value={todoText} placeholder="What you want to do?"/>
<button on:click={add}>Add item</button>

<ul>
    {#each $todos as todo}
        <li><TodoItem {...todo} on:remove={removeItem}/></li>
    {/each}
</ul>