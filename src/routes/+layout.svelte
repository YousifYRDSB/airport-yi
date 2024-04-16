<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import {writable} from 'svelte/store';

	export let data: any;
	let myStore = data.performanceData
	console.log("PERFORAMCNEDATA", ($myStore))
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Airport Search</strong>
			</svelte:fragment>
			<svelte:fragment >
				<a
					class="btn btn-sm variant-ghost-surface"
					href="/"
					rel="noreferrer"
				>
					Home
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="/list"
					rel="noreferrer"
				>
					Full List
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
