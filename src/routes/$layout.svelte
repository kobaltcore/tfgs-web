<script>
    import { page } from "$app/stores";
    import "@dracula/dracula-ui/styles/dracula-ui.css";
</script>

<center>
    <h1 class="drac-heading drac-heading-2xl drac-text-white">
        TFGS Interface
    </h1>
    <nav>
        <ul class="drac-tabs drac-tabs-white">
            <li class="drac-tab" class:drac-tab-active={$page.path === "/"}>
                <a class="drac-tab-link drac-text" href="/">home</a>
            </li>
            <li
                class="drac-tab"
                class:drac-tab-active={$page.path === "/search"}
            >
                <a class="drac-tab-link drac-text" href="/search">search</a>
            </li>
            {#if $page.path.startsWith("/game/")}
                <li class="drac-tab drac-tab-active">
                    <a class="drac-tab-link drac-text" href="/search">game</a>
                </li>
            {/if}
        </ul>
    </nav>
</center>

<slot />
