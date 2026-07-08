function refreshUI() {
	const searchTerm = $("#searchInput").val().trim();
	const employeeList = searchTerm ? searchEmployees(searchTerm) : employees;
	const totalEntries = employees.length;
	const visibleEntries = employeeList.length;
	const startEntry = visibleEntries > 0 ? 1 : 0;

	$("#tableEntrySummary").text(
		"Showing " +
			startEntry +
			" to " +
			visibleEntries +
			" of " +
			totalEntries +
			" entries"
	);

	renderEmployees(employeeList);
	updateDashboard();
	renderTopEarners();
	renderDepartmentChart();
	renderRecentActivities();
}

function registerEvents() {
	$("#employeeForm").on("submit", function (e) {
		e.preventDefault();

		if (editingEmployeeId !== null) {
			updateEmployee();
		} else {
			addEmployee();
		}
	});

	$("#resetFormBtn").on("click", function () {
		resetForm();
	});

	$("#employeeTableBody").on("click", ".edit-btn", function () {
		const employeeId = Number($(this).data("id"));
		loadEmployeeForEdit(employeeId);
	});

	$("#employeeTableBody").on("click", ".delete-btn", async function () {
		const employeeId = Number($(this).data("id"));
		const result = await Swal.fire({
			title: "Delete Employee?",
			text: "This action cannot be undone.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Delete",
			cancelButtonText: "Cancel",
		});

		if (!result.isConfirmed) {
			return;
		}

		deleteEmployee(employeeId);
	});

	$("#searchInput").on(
		"input",
		debounce(function () {
			const searchTerm = $(this).val().trim();
			saveSearchTerm(searchTerm);
			refreshUI();
		}, 500)
	);
}

$(document).ready(function () {
	loadEmployees();
	refreshUI();
	initializeSearch();
	registerEvents();
});
