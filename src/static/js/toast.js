import Toasty from "../../lib/toasty.svelte";

// create a variable to hold the component
let toasty;

// create a function to embed the component
function showToast(message, type) {
    // create a new instance of the component with the given props
    toasty = new Toasty({
        target: document.body,
        props: { show: true, message, type }
    });
}

// export the function
export default showToast;
