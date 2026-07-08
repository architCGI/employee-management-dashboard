function saveEmployees() {
	localStorage.setItem("employees", JSON.stringify(employees));
}

function loadEmployees() {
	const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];

	if (storedEmployees.length > 0) {
		employees = storedEmployees;
		return;
	}

	employees = [...sampleEmployees];
	saveEmployees();
}

function saveSearchTerm(searchTerm) {
	sessionStorage.setItem("searchTerm", searchTerm);
}

function loadSearchTerm() {
	return sessionStorage.getItem("searchTerm") || "";
}
