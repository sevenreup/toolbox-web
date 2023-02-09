<script lang="ts">
	import { calculatevehicleDuty } from '../../../calculations/vehicle-import';
	import CurrencyInput from '../../../components/input/CurrencyInput.svelte';
	import YearPicker from '../../../components/pickers/year-picker.svelte';
	import { formatCurrency } from '../../../utils/input';
	let value = new Date();
	let engineSize = 1499;
	let cost = 2000000;
	$: total = calculatevehicleDuty(value, engineSize, cost);
</script>

<main class="h-full flex justify-center items-center  w-5/6 md:w-4/6 m-auto">
	<section class="w-full">
		<h1 class="text-4xl text-center font-bold mb-8">Duty Calculator</h1>
		<div class="flex gap-2 mb-6">
			<div class="w-full">
				<label for="email" class="block mb-2 text-sm font-medium">Year</label>
				<YearPicker
					{value}
					selectYear={(year) => {
						value = year;
					}}
				/>
			</div>
			<div class="w-full">
				<label for="engine" class="block mb-2 text-sm font-medium ">Enigine</label>
				<input
					type="number"
					id="engine"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					required
					bind:value={engineSize}
				/>
			</div>
		</div>

		<div class="mb-6">
			<label for="cost" class="block mb-2 text-sm font-medium">Cost</label>
			<CurrencyInput bind:value={cost} />
		</div>
		<div class="flex place-content-end items-end gap-2">
			<span> Duty : </span>
			<h2 class="text-2xl font-bold">
				{formatCurrency(total)}
			</h2>
		</div>
	</section>
</main>
