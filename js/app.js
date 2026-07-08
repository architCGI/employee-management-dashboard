// Sample employee data used to populate the dashboard table.
const employees = [
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

// Formats salary values for display in Indian Rupees.
function formatSalary(salary) {
	return "₹" + Number(salary).toLocaleString("en-IN");
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


// Initializes the employee table when the page is ready.
$(document).ready(function () {
	renderEmployees();
});
