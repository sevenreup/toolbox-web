<script lang="ts">
	import YearPickerContainer from './year-picker-container.svelte';
	import { addYears, formatDistanceToNowStrict } from 'date-fns';
	import Modal from '../modal/modal.svelte';

	export let value = new Date();
	export let selectYear: (year: Date) => void;
	let currentYear = new Date();
	let showModal = false;
</script>

<input
	type="year"
	id="year"
	class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
	value={`${value.getFullYear()} (${formatDistanceToNowStrict(value, { unit: 'year' })})`}
	required
	on:click={() => (showModal = true)}
	readonly
/>

{#if showModal}
	<Modal on:close={() => (showModal = false)}>
		<div>
			<YearPickerContainer
				currentMonth={value}
				selectYear={(year) => {
					selectYear(year);
					showModal = false;
				}}
				minDate={addYears(currentYear, -90)}
				maxDate={currentYear}
			/>
		</div>
	</Modal>
{/if}
