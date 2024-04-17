<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import {writable} from 'svelte/store';
	import { Toast } from '@skeletonlabs/skeleton';
import { initializeStores } from '@skeletonlabs/skeleton';

initializeStores();

	// export let data: any;

</script>

<Toast />
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
