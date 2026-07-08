function showSuccessMessage(message) {
	Swal.fire({
		icon: "success",
		title: message,
		timer: 1500,
		showConfirmButton: false,
	});
}

function showErrorMessage(message) {
	Swal.fire({
		icon: "error",
		title: message,
		timer: 1500,
		showConfirmButton: false,
	});
}
