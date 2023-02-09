<script lang="ts">
	import { getYear, format, eachYearOfInterval } from 'date-fns';
	import { onMount, tick } from 'svelte';
	import { handleFocusTrap } from './focus-trap';

	export let minDate: Date;
	export let maxDate: Date;
	export let currentMonth: Date;
	export let datepicker: HTMLElement | null = null;
	export let selectYear: (year: Date) => void;

	let focusedYear: number;
	let years: HTMLElement;

	function handleYearFocus(year: number): void {
		focusedYear = year;
	}

	function handleKeyDownFocus(index: number, focusedElement: HTMLElement) {
		focusedElement.blur();
		[...(years.childNodes as any)][index].focus();
	}

	async function handleKeyDown(event: KeyboardEvent) {
		const current = document.activeElement as HTMLElement;
		const yearItems = [...years.childNodes];
		const currentIndex = yearItems.indexOf(current);
		const yearNumber = getYear(currentMonth);

		let newIndex: number;

		if (!current) {
			return;
		}

		await tick();
		handleFocusTrap(event, {
			element: datepicker!,
			classNames: `.month-switcher:not([disabled]), .year-button:not([tabindex='-1']`,
			isFocusTrapDisabled: false
		});

		switch (event.key) {
			case 'ArrowUp':
				handleYearFocus(yearNumber - 4);
				newIndex = (currentIndex + yearItems.length - 4) % yearItems.length;
				handleKeyDownFocus(newIndex, current);
				event.preventDefault();
				break;
			case 'ArrowDown':
				handleYearFocus(yearNumber + 4);
				newIndex = (currentIndex + yearItems.length + 4) % yearItems.length;
				handleKeyDownFocus(newIndex, current);
				event.preventDefault();
				break;
			case 'ArrowLeft':
				handleYearFocus(yearNumber - 1);
				newIndex = (currentIndex + yearItems.length - 1) % yearItems.length;
				handleKeyDownFocus(newIndex, current);
				event.preventDefault();
				break;
			case 'ArrowRight':
				handleYearFocus(yearNumber + 1);
				newIndex = (currentIndex + yearItems.length + 1) % yearItems.length;
				handleKeyDownFocus(newIndex, current);
				event.preventDefault();
				break;
			default:
				break;
		}
	}

	function handleSelectClass(currentMonth: Date, date: Date): boolean {
		const currentMonthYear = getYear(currentMonth);
		const year = getYear(date);
		return currentMonthYear === year;
	}

	onMount(() => {
		const selectedYear = ([...years.childNodes] as HTMLElement[]).filter((year: HTMLElement) =>
			year.classList.contains('selected')
		);
		if (selectedYear[0]) {
			(selectedYear[0] as HTMLElement).focus();
		}
	});
</script>

<div
	class="year-picker gap-2 justify-between"
	bind:this={years}
	on:keydown={handleKeyDown}
	tabindex="-1"
>
	{#each eachYearOfInterval({ start: minDate, end: maxDate }) as year}
		<button
			class="year-button p-2 rounded-lg"
			class:selected={handleSelectClass(currentMonth, year)}
			type="button"
			tabindex={handleSelectClass(currentMonth, year) ? 0 : -1}
			aria-pressed={handleSelectClass(currentMonth, year)}
			aria-label={year.toISOString()}
			on:focus={() => handleYearFocus(getYear(year))}
			on:click={() => selectYear(year)}
		>
			{format(year, 'yyyy')}
		</button>
	{/each}
</div>

<style lang="postcss">
	.year-picker {
		height: 322px;
		padding: 0 4px;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		overflow-y: auto;
		flex-direction: row;
	}
	.year-button {
		color: unset;
		border: none;
		cursor: pointer;
		height: 42px;
		outline: 0;
		letter-spacing: 0.00938em;
		background-color: transparent;
		transition: background-color 200ms ease-in-out;
	}
	.year-button:active {
		color: theme(colors.white);
		background-color: theme(colors.slate.700);
	}
	.year-button.selected {
		color: theme(colors.white);
		background-color: theme(colors.slate.700);
	}
</style>
