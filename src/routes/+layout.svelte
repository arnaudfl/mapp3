<script lang="ts">
  import Header from './Header.svelte';
  import './app.css'
</script>

<svelte:head>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/grids-responsive-min.css">
</svelte:head>

<div id="layout" class="pure-g">
  <div class="sidebar pure-u-1 pure-u-md-1-4">
    <Header />
  </div>

  <div class="content pure-u-1 pure-u-md-3-4">
      <div>
          <!-- A wrapper for all the blog posts -->
          <div class="posts">
              <h1 class="content-subhead">Pinned Post</h1>

              <!-- A single blog post -->
              <section class="post">
                  <slot />
              </section>
          </div>

          <div class="footer">
              <div class="pure-menu pure-menu-horizontal">
                  <ul>
                      <li class="pure-menu-item"><a href="http://purecss.io/" class="pure-menu-link">About</a></li>
                      <li class="pure-menu-item"><a href="http://github.com/pure-css/pure/" class="pure-menu-link">GitHub</a></li>
                  </ul>
              </div>
          </div>
      </div>
  </div>
</div>