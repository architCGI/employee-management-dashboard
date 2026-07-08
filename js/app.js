// Sample employee data used to populate the dashboard table.
const sampleEmployees = [
	{
		id: 1,
		name: "John Doe",
		email: "john@example.com",
		department: "IT",
		salary: 50000,
		joiningDate: "2025-01-10",
	},
	{
		id: 2,
		name: "Sarah Khan",
		email: "sarah.khan@example.com",
		department: "HR",
		salary: 42000,
		joiningDate: "2024-11-05",
	},
	{
		id: 3,
		name: "Michael Chen",
		email: "michael.chen@example.com",
		department: "Finance",
		salary: 61000,
		joiningDate: "2023-08-21",
	},
	{
		id: 4,
		name: "Priya Sharma",
		email: "priya.sharma@example.com",
		department: "Marketing",
		salary: 47000,
		joiningDate: "2025-03-14",
	},
	{
		id: 5,
		name: "David Wilson",
		email: "david.wilson@example.com",
		department: "Sales",
		salary: 53000,
		joiningDate: "2022-12-01",
	},
	{
		id: 6,
		name: "Ananya Verma",
		email: "ananya.verma@example.com",
		department: "IT",
		salary: 68000,
		joiningDate: "2024-06-18",
	},
	{
		id: 7,
		name: "Robert Brown",
		email: "robert.brown@example.com",
		department: "Finance",
		salary: 59000,
		joiningDate: "2023-02-27",
	},
	{
		id: 8,
		name: "Emily Davis",
		email: "emily.davis@example.com",
		department: "HR",
		salary: 45000,
		joiningDate: "2025-05-09",
	},
	{
		id: 9,
		name: "Arjun Mehta",
		email: "arjun.mehta@example.com",
		department: "Marketing",
		salary: 52000,
		joiningDate: "2024-01-30",
	},
	{
		id: 10,
		name: "Lisa Taylor",
		email: "lisa.taylor@example.com",
		department: "Sales",
		salary: 49000,
		joiningDate: "2023-10-12",
	},
];

// Employees acts as the single source of truth for the UI.
let employees = [...sampleEmployees];
let editingEmployeeId = null;

// Formats salary values for display in Indian Rupees.
function formatSalary(salary) {
	return "₹" + Number(salary).toLocaleString("en-IN");
}

// Shows a shared success alert so success feedback stays consistent across the app.
function showSuccessMessage(message) {
	Swal.fire({
		icon: "success",
		title: message,
		timer: 1500,
		showConfirmButton: false,
	});
}

// Shows a shared error alert so validation and error feedback use one configuration.
function showErrorMessage(message) {
	Swal.fire({
		icon: "error",
		title: message,
		timer: 1500,
		showConfirmButton: false,
	});
}

// Returns the total number of employees.
function getTotalEmployees() {
	return employees.length;
}

// Returns the combined salary of all employees.
function getTotalSalary() {
	return employees.reduce(function (total, employee) {
		return total + employee.salary;
	}, 0);
}

// Returns the average salary across all employees.
function getAverageSalary() {
	const totalEmployees = getTotalEmployees();

	if (totalEmployees === 0) {
		return 0;
	}

	return getTotalSalary() / totalEmployees;
}

// Returns the number of unique departments.
function getDepartmentCount() {
	const departments = employees.map(function (employee) {
		return employee.department;
	});

	return new Set(departments).size;
}

// Saves employees to Local Storage.
// Local Storage can store strings only, so JSON.stringify() converts the array into a storable string.
// Employee data uses Local Storage because it should survive refreshes and browser restarts.
function saveEmployees() {
	localStorage.setItem("employees", JSON.stringify(employees));
}

// Loads employees from Local Storage.
// JSON.parse() converts the stored JSON string back into a JavaScript array.
// If no data exists, an empty array is returned.
function loadEmployees() {
	const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];

	if (storedEmployees.length > 0) {
		employees = storedEmployees;
		return;
	}

	employees = [...sampleEmployees];
	saveEmployees();
}

// Saves the last search term in Session Storage.
// Session Storage is used for temporary UI state because it survives refreshes but is cleared when the tab closes.
function saveSearchTerm(searchTerm) {
	sessionStorage.setItem("searchTerm", searchTerm);
}

// Loads the last search term from Session Storage.
function loadSearchTerm() {
	return sessionStorage.getItem("searchTerm") || "";
}

// Filters employees by name, email, or department using a case-insensitive search term.
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

// Debounce delays execution until typing stops, which avoids running search logic on every single keystroke.
// A normal search runs immediately for each input event, while a debounced search waits briefly and reduces repeated work.
function debounce(callback, delay) {
	let timer;

	return function (...args) {
		clearTimeout(timer);

		timer = setTimeout(() => {
			callback.apply(this, args);
		}, delay);
	};
}

// Creates a single employee table row.
function createEmployeeRow(employee, index) {
	return `
		<tr>
			<th scope="row">${index + 1}</th>
			<td>${employee.name}</td>
			<td>${employee.email}</td>
			<td>${employee.department}</td>
			<td>${formatSalary(employee.salary)}</td>
			<td>${employee.joiningDate}</td>
			<td class="text-center">
				<div class="d-inline-flex gap-2">
					<button type="button" class="btn btn-sm btn-outline-primary edit-btn" data-id="${employee.id}">
						Edit
					</button>
					<button type="button" class="btn btn-sm btn-outline-danger delete-btn" data-id="${employee.id}">
						Delete
					</button>
				</div>
			</td>
		</tr>
	`;
}

// Renders the provided employee list inside the table body.
function renderEmployees(employeeList = employees) {
	const rows = employeeList.map(createEmployeeRow).join("");

	$("#employeeTableBody").html(rows);
}

// Updates all dashboard summary cards.
function updateDashboard() {
	$("#totalEmployees").text(getTotalEmployees());
	$("#totalSalary").text(formatSalary(getTotalSalary()));
	$("#avgSalary").text(formatSalary(getAverageSalary()));
	$("#departmentCount").text(getDepartmentCount());
}

// Refreshes all employee-driven UI sections.
function refreshUI() {
	const searchTerm = $("#searchInput").val().trim();
	const employeeList = searchTerm ? searchEmployees(searchTerm) : employees;

	renderEmployees(employeeList);
	updateDashboard();
}

// Restores the last saved search term and reapplies the matching filter.
function initializeSearch() {
	const savedSearchTerm = loadSearchTerm();

	$("#searchInput").val(savedSearchTerm);

	if (!savedSearchTerm) {
		renderEmployees(employees);
		return;
	}

	const filteredEmployees = searchEmployees(savedSearchTerm);
	renderEmployees(filteredEmployees);
}

// Validates the employee form fields before creating a new record.
function validateForm() {
	const name = $("#employeeName").val().trim();
	const email = $("#employeeEmail").val().trim();
	const department = $("#employeeDepartment").val().trim();
	const salary = $("#employeeSalary").val().trim();
	const joiningDate = $("#joiningDate").val().trim();

	if (!name) {
		showErrorMessage("Name is required");
		return false;
	}

	if (!email) {
		showErrorMessage("Email is required");
		return false;
	}

	if (!department) {
		showErrorMessage("Department is required");
		return false;
	}

	if (!salary) {
		showErrorMessage("Salary is required");
		return false;
	}

	if (!joiningDate) {
		showErrorMessage("Joining Date is required");
		return false;
	}

	return true;
}

// Creates a new employee object from the current form values.
function createEmployeeObject() {
	return {
		id: Date.now(),
		name: $("#employeeName").val().trim(),
		email: $("#employeeEmail").val().trim(),
		department: $("#employeeDepartment").val().trim(),
		salary: Number($("#employeeSalary").val().trim()),
		joiningDate: $("#joiningDate").val().trim(),
	};
}

// Clears the employee form after a successful save.
function resetForm() {
	$("#employeeForm")[0].reset();
	$("#saveEmployeeBtn").text("Save Employee");
	editingEmployeeId = null;
}

// Adds a new employee and refreshes the table and dashboard.
function addEmployee() {
	if (!validateForm()) {
		return;
	}

	const employee = createEmployeeObject();

	employees.push(employee);
	saveEmployees();
	refreshUI();
	resetForm();
	showSuccessMessage("Employee added successfully");
}

// Loads one employee into the form so the record can be updated.
function loadEmployeeForEdit(id) {
	const employee = employees.find(function (currentEmployee) {
		return currentEmployee.id === id;
	});

	if (!employee) {
		return;
	}

	$("#employeeName").val(employee.name);
	$("#employeeEmail").val(employee.email);
	$("#employeeDepartment").val(employee.department);
	$("#employeeSalary").val(employee.salary);
	$("#joiningDate").val(employee.joiningDate);

	editingEmployeeId = id;
	$("#saveEmployeeBtn").text("Update Employee");
}

// Updates the selected employee record with the latest form values.
function updateEmployee() {
	if (!validateForm()) {
		return;
	}

	const employee = employees.find(function (currentEmployee) {
		return currentEmployee.id === editingEmployeeId;
	});

	if (!employee) {
		return;
	}

	employee.name = $("#employeeName").val().trim();
	employee.email = $("#employeeEmail").val().trim();
	employee.department = $("#employeeDepartment").val().trim();
	employee.salary = Number($("#employeeSalary").val().trim());
	employee.joiningDate = $("#joiningDate").val().trim();

	saveEmployees();
	refreshUI();
	resetForm();
	showSuccessMessage("Employee updated successfully");
}

// Removes one employee from the source array, then persists and refreshes the UI.
function deleteEmployee(id) {
	employees = employees.filter(function (employee) {
		return employee.id !== id;
	});

	saveEmployees();
	refreshUI();
	showSuccessMessage("Employee deleted successfully");
}


// Initializes the dashboard when the page is ready.
$(document).ready(function () {
	$("#employeeForm").on("submit", function (e) {
		e.preventDefault();

		if (editingEmployeeId !== null) {
			updateEmployee();
		} else {
			addEmployee();
		}
	});

	// Event delegation is needed because edit buttons are recreated whenever the table rerenders.
	// Direct click handlers on dynamic rows will not reliably stay attached after new HTML replaces the old rows.
	$("#employeeTableBody").on("click", ".edit-btn", function () {
		const employeeId = Number($(this).data("id"));
		loadEmployeeForEdit(employeeId);
	});

	// Event delegation is needed because table rows are rendered dynamically.
	// Direct click handlers on delete buttons will not stay reliable when rows are recreated after each render.
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

			if (!searchTerm) {
				renderEmployees(employees);
				return;
			}

			const filteredEmployees = searchEmployees(searchTerm);
			renderEmployees(filteredEmployees);
		}, 500)
	);

	loadEmployees();
	refreshUI();
	initializeSearch();
});
