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

let employees = [...sampleEmployees];
let editingEmployeeId = null;

function createEmployeeRow(employee, index) {
	return `
		<tr>
			<th scope="row">${index + 1}</th>
			<td>${employee.name}</td>
			<td>${employee.email}</td>
			<td>${employee.department}</td>
			<td>${formatCurrency(employee.salary)}</td>
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

function renderEmployees(employeeList = employees) {
	const rows = employeeList.map(createEmployeeRow).join("");

	$("#employeeTableBody").html(rows);
}

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

function resetForm() {
	$("#employeeForm")[0].reset();
	$("#saveEmployeeBtn").text("Save Employee");
	editingEmployeeId = null;
}

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

function deleteEmployee(id) {
	employees = employees.filter(function (employee) {
		return employee.id !== id;
	});

	saveEmployees();
	refreshUI();
	showSuccessMessage("Employee deleted successfully");
}
