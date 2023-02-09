<script lang="ts">
	import ServiceCard from '../components/service-card.svelte';
	import type { Service } from '../models/services';

	let services: Service[] = [
		{
			title: 'Car Import Calculator',
			description: 'Calculate the cost of importing a car in Malaw',
			url: '/mra/car-calculator'
		}
	];
</script>

<main class="h-full flex justify-center items-center  w-5/6 md:w-4/6 m-auto">
	<section class="w-full">
		<h1 class="text-4xl text-center font-bold mb-8">Tools</h1>
		<div>
			{#each services as service}
				<div>
					<ServiceCard {...service} />
				</div>
			{/each}
		</div>
	</section>
</main>
