<script>
	import { onMount } from 'svelte';
	import toast, { Toaster } from 'svelte-french-toast';

	export let show = false;
	export let message = '';
	export let type = 'success';


	$: if(show){
		toast.call(type, message);
	}
</script>

<Toaster />