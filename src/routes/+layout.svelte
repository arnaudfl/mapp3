<script lang="ts">
    import Header from './Header.svelte';
    import './app.css'
</script>

<svelte:head>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/grids-responsive-min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</svelte:head>

<div id="layout" class="pure-g">
    <div class="sidebar pure-u-1 pure-u-md-1-4">
        <Header />
    </div>
    
    <div class="content pure-u-1 pure-u-md-3-4">
        <div>
            <slot />
            
            <div class="footer">
                <div class="pure-menu pure-menu-horizontal">
                    <ul>
                        <li class="pure-menu-item">Built with <a href="http://purecss.io/" class="pure-menu-link">purecss</a></li>
                        <li class="pure-menu-item">&bull; Powered by <a href="https://svelte.dev/" class="pure-menu-link">Svelte</a></li>
                        <li class="pure-menu-item">&bull; Developed by <a href="https://github.com/arnaudfl" class="pure-menu-link">arnaudfl</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>