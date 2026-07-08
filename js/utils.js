function debounce(callback, delay) {
	let timer;

	return function (...args) {
		clearTimeout(timer);

		timer = setTimeout(() => {
			callback.apply(this, args);
		}, delay);
	};
}

function formatCurrency(amount) {
	return "₹" + Number(amount).toLocaleString("en-IN");
}
