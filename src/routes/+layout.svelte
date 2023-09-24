<script lang="ts">
	import Header from './Header.svelte';
	import './app.css';
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css" />
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/grids-responsive-min.css"
	/>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
		integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"
	/>
</svelte:head>

<div id="layout" class="pure-g">
	<div class="sidebar pure-u-1 pure-u-md-1-4">
		<Header />
	</div>

	<div class="content pure-u-1 pure-u-md-3-4">
		<div>
			<div class="posts">
				<!-- A single blog post -->
				<section class="post">
					<header class="post-header">
						<img
							width="48"
							height="48"
							alt="Tilo Mitra&#x27;s avatar"
							class="post-avatar"
							src="./images/5.jpg"
						/>

						<h2 class="post-title">Trombinoscope du Best Group Ever ⭐P3</h2>

						<p class="post-meta">
							Par <a href="https://github.com/arnaudfl" class="post-author">arnaudfl</a>
							avec <span class="post-category post-category-design">CSS</span>
							<span class="post-category post-category-pure">Pure</span>
							<span class="post-category post-category-js">Svelte</span>
							<span class="post-category post-category-yui">Leaflet</span>
						</p>
					</header>

					<div class="post-description">
						<p>&nbsp;</p>
						<slot />
					</div>
				</section>
			</div>

			<div class="footer">
				<div class="pure-menu pure-menu-horizontal">
					<ul>
						<li class="pure-menu-item">
							<a href="http://purecss.io/" class="pure-menu-link">
								<i class="fab fa-css3" />
								purecss
							</a>
						</li>
						<li class="pure-menu-item">
							<a href="https://svelte.dev/" class="pure-menu-link">
								<i class="fab fa-js" />
								Svelte
							</a>
						</li>
						<li class="pure-menu-item">
							<a href="https://github.com/arnaudfl" class="pure-menu-link">
								<i class="fab fa-github" />
								arnaudfl
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
