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

<nav
	class="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600"
>
	<div class="container flex flex-wrap items-center justify-between mx-auto">
		<a href="/" class="flex items-center">
			<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Tools</span>
		</a>
		<div class="flex md:order-2">
			<button
				type="button"
				class="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0  			dark:focus:ring-blue-800"
				>Github</button
			>
			<button
				data-collapse-toggle="navbar-sticky"
				type="button"
				class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
				aria-controls="navbar-sticky"
				aria-expanded="false"
			>
				<span class="sr-only">Open main menu</span>
				<svg
					class="w-6 h-6"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
						clip-rule="evenodd"
					/></svg
				>
			</button>
		</div>
		<div
			class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
			id="navbar-sticky"
		>
			<ul
				class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
			/>
		</div>
	</div>
</nav>

<main class="h-full flex w-5/6 md:w-4/6 m-auto">
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
