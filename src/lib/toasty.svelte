<script>
  import toast, { Toaster } from "svelte-french-toast";

  export let show = false;
  export let message = "";
  export let type = "success";

  $: if (show) {
    switch (type) {
      case "error":
        toast.error(message);
        break;
      case "success":
        toast.success(message);
        break;
      default:
        toast.call(type, message);
    }
  }
</script>

<Toaster />
