function searchEmployees(searchTerm) {
	const normalizedSearchTerm = searchTerm.toLowerCase();

	return employees.filter(function (employee) {
		return (
			employee.name.toLowerCase().includes(normalizedSearchTerm) ||
			employee.email.toLowerCase().includes(normalizedSearchTerm) ||
			employee.department.toLowerCase().includes(normalizedSearchTerm)
		);
	});
}

function initializeSearch() {
	const savedSearchTerm = loadSearchTerm();

	$("#searchInput").val(savedSearchTerm);
	refreshUI();
}
