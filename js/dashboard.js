function getTotalEmployees() {
	return employees.length;
}

const departmentConfig = {
	IT: "#3b82f6",
	HR: "#22c55e",
	Finance: "#f59e0b",
	Marketing: "#a855f7",
	Sales: "#ef4444",
};

let departmentChartInstance = null;

function getDepartmentStats() {
	const departments = ["IT", "HR", "Finance", "Marketing", "Sales"];

	return departments.map(function (department) {
		const count = employees.filter(function (employee) {
			return employee.department === department;
		}).length;

		return {
			label: department,
			count: count,
			color: departmentConfig[department],
		};
	});
}

function getInitials(name) {
	const parts = name.split(" ").filter(Boolean);

	if (parts.length === 1) {
		return parts[0].slice(0, 2).toUpperCase();
	}

	return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getTotalSalary() {
	return employees.reduce(function (total, employee) {
		return total + employee.salary;
	}, 0);
}

function getAverageSalary() {
	const totalEmployees = getTotalEmployees();

	if (totalEmployees === 0) {
		return 0;
	}

	return getTotalSalary() / totalEmployees;
}

function getDepartmentCount() {
	const departments = employees.map(function (employee) {
		return employee.department;
	});

	return new Set(departments).size;
}

function updateDashboard() {
	$("#totalEmployees").text(getTotalEmployees());
	$("#totalSalary").text(formatCurrency(getTotalSalary()));
	$("#avgSalary").text(formatCurrency(getAverageSalary()));
	$("#departmentCount").text(getDepartmentCount());
}

function renderRecentActivities() {
	const activities = [
		{
			icon: "A",
			description: "John Doe added employee Emily Davis",
			time: "2 mins ago",
		},
		{
			icon: "U",
			description: "Jane Smith updated employee Michael Brown",
			time: "15 mins ago",
		},
		{
			icon: "D",
			description: "Admin deleted employee Chris Jackson",
			time: "1 hour ago",
		},
		{
			icon: "R",
			description: "Jane Smith exported employee report",
			time: "2 hours ago",
		},
	];

	const rows = activities
		.map(function (activity) {
			return `
				<li class="list-group-item activity-item">
					<div class="activity-row">
						<span class="activity-icon">${activity.icon}</span>
						<div>
							<p class="activity-desc">${activity.description}</p>
							<p class="activity-time mb-0">${activity.time}</p>
						</div>
					</div>
				</li>
			`;
		})
		.join("");

	$("#recentActivitiesList").html(rows);
}

function renderDepartmentChart() {
	const stats = getDepartmentStats();
	const labels = stats.map(function (item) {
		return item.label;
	});
	const data = stats.map(function (item) {
		return item.count;
	});
	const colors = stats.map(function (item) {
		return item.color;
	});

	const legendHtml = stats
		.map(function (item) {
			return `
				<li>
					<span class="legend-name">
						<span class="legend-dot" style="background-color: ${item.color};"></span>
						${item.label}
					</span>
					<span class="legend-value">${item.count}</span>
				</li>
			`;
		})
		.join("");

	$("#departmentLegend").html(legendHtml);

	const chartCanvas = document.getElementById("departmentChart");

	if (!chartCanvas) {
		return;
	}

	if (departmentChartInstance) {
		departmentChartInstance.destroy();
	}

	departmentChartInstance = new Chart(chartCanvas, {
		type: "doughnut",
		data: {
			labels: labels,
			datasets: [
				{
					data: data,
					backgroundColor: colors,
					borderWidth: 0,
				},
			],
		},
		options: {
			plugins: {
				legend: {
					display: false,
				},
			},
			cutout: "68%",
			maintainAspectRatio: true,
		},
	});
}

function renderTopEarners() {
	const topEarners = [...employees]
		.sort(function (a, b) {
			return b.salary - a.salary;
		})
		.slice(0, 5);

	const rows = topEarners
		.map(function (employee) {
			return `
				<li>
					<div class="earner-left">
						<span class="avatar-circle">${getInitials(employee.name)}</span>
						<div>
							<p class="earner-name">${employee.name}</p>
							<p class="earner-dept">${employee.department}</p>
						</div>
					</div>
					<span class="earner-salary">${formatCurrency(employee.salary)}</span>
				</li>
			`;
		})
		.join("");

	$("#topEarnersList").html(rows);
}
