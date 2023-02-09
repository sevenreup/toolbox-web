import { differenceInYears } from 'date-fns';

export function calculatevehicleDuty(makeYear: Date, engineCapacity: number, cost: number) {
	const year = differenceInYears(new Date(), makeYear);
	const importDutyRate = 25;
	let importExciseRate = 0;
	const importVATRate = 16.5;

	// calculate import excise rate based on year
	if (engineCapacity >= 1000 && engineCapacity <= 1499) {
		if (year >= 0 && year <= 8) {
			importExciseRate = 0;
		} else if (year >= 8 && year <= 12) {
			importExciseRate = 30;
		} else if (year > 12) {
			importExciseRate = 60;
		}
	} else if (engineCapacity >= 1500 && engineCapacity <= 1999) {
		if (year >= 0 && year <= 8) {
			importExciseRate = 15;
		} else if (year >= 8 && year <= 12) {
			importExciseRate = 45;
		} else if (year > 12) {
			importExciseRate = 75;
		}
	} else if (engineCapacity >= 2000 && engineCapacity <= 2499) {
		if (year >= 0 && year <= 8) {
			importExciseRate = 35;
		} else if (year >= 8 && year <= 12) {
			importExciseRate = 60;
		} else if (year > 12) {
			importExciseRate = 90;
		}
	} else if (engineCapacity >= 2500 && engineCapacity <= 2999) {
		if (year >= 0 && year <= 8) {
			importExciseRate = 45;
		} else if (year >= 8 && year <= 12) {
			importExciseRate = 70;
		} else if (year > 12) {
			importExciseRate = 100;
		}
	} else if (engineCapacity > 3000) {
		if (year >= 0 && year <= 8) {
			importExciseRate = 55;
		} else if (year >= 8 && year <= 12) {
			importExciseRate = 80;
		} else if (year > 12) {
			importExciseRate = 110;
		}
	}

	// calculate import duty
	const importDuty = (importDutyRate / 100) * cost;
	// calculate import excise
	const importExcise = (importExciseRate / 100) * cost + importDuty;
	// calculate import VAT
	const importVAT = (importVATRate / 100) * (importExcise + cost);

	// return total duty payable
	return importDuty + importExcise + importVAT;
}
