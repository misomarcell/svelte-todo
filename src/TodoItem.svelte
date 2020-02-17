<script>
    import { createEventDispatcher } from 'svelte';

    export let text;
    export let id;

    const dispatch = createEventDispatcher();
    
    const remove = () => {
        dispatch('remove', { id });
    } 
</script>

<div>
    {text}
    <span on:click={remove} class='remove'>Remove</span>
</div>

<style>
    .remove {
        text-decoration: underline;
        cursor: pointer;
    }
</style>
