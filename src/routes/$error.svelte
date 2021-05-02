<script context="module">
    export function load({ error, status }) {
        return {
            props: {
                title: status,
                message: error.message,
            },
        };
    }
</script>

<script>
    export let title;
    export let message;
</script>

<h3 class="drac-heading drac-heading-md drac-text-white">Error: {title}</h3>
<p class="drac-text drac-line-height drac-text-white">{message}</p>
