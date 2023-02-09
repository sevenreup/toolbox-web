export const formatCurrency = (
	value: number,
	maximumFractionDigits?: number,
	minimumFractionDigits?: number,
	locale = 'en-US',
	currency = 'USD'
) => {
	return new Intl.NumberFormat(locale, {
		currency: currency,
		style: 'currency',
		maximumFractionDigits: maximumFractionDigits || 0,
		minimumFractionDigits: minimumFractionDigits || 0
	})
		.format(value)
		.replace('$', '');
};
