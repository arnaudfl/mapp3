<script lang="ts">
    import Header from './Header.svelte';
    import '@picocss/pico'
    import './app.css'
  </script>

	<Header />

	<main class="container">
		<slot />
	</main>

    <footer class="container">
        <small
          >Built with <a href="https://picocss.com">Pico</a> •
          <a href="https://github.com/picocss/examples/blob/master/v1-preview/index.html"
            >Source code</a
          ></small
        >
      </footer>