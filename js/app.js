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

// Formats salary values for display in Indian Rupees.
function formatSalary(salary) {
	return "₹" + Number(salary).toLocaleString("en-IN");
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
function saveEmployees() {
	localStorage.setItem("employees", JSON.stringify(employees));
}

// Loads employees from Local Storage.
// JSON.parse() converts the stored JSON string back into a JavaScript array.
// If no data exists, an empty array is returned.
function loadEmployees() {
	return JSON.parse(localStorage.getItem("employees")) || [];
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

// Renders all employee records inside the table body.
function renderEmployees() {
	const rows = employees.map(createEmployeeRow).join("");

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
	renderEmployees();
	updateDashboard();
}

// Validates the employee form fields before creating a new record.
function validateForm() {
	const name = $("#employeeName").val().trim();
	const email = $("#employeeEmail").val().trim();
	const department = $("#employeeDepartment").val().trim();
	const salary = $("#employeeSalary").val().trim();
	const joiningDate = $("#joiningDate").val().trim();

	if (!name) {
		alert("Name is required");
		return false;
	}

	if (!email) {
		alert("Email is required");
		return false;
	}

	if (!department) {
		alert("Department is required");
		return false;
	}

	if (!salary) {
		alert("Salary is required");
		return false;
	}

	if (!joiningDate) {
		alert("Joining Date is required");
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
}

// Removes one employee from the source array, then persists and refreshes the UI.
function deleteEmployee(id) {
	employees = employees.filter(function (employee) {
		return employee.id !== id;
	});

	saveEmployees();
	refreshUI();
}


// Initializes the dashboard when the page is ready.
$(document).ready(function () {
	$("#employeeForm").on("submit", function (e) {
		e.preventDefault();
		addEmployee();
	});

	// Event delegation is needed because table rows are rendered dynamically.
	// Direct click handlers on delete buttons will not stay reliable when rows are recreated after each render.
	$("#employeeTableBody").on("click", ".delete-btn", function () {
		const employeeId = Number($(this).data("id"));
		const shouldDelete = confirm("Are you sure you want to delete this employee?");

		if (!shouldDelete) {
			return;
		}

		deleteEmployee(employeeId);
	});

	const storedEmployees = loadEmployees();

	if (storedEmployees.length > 0) {
		employees = storedEmployees;
	} else {
		saveEmployees();
	}

	refreshUI();
});
