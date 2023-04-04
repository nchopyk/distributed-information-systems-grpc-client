const repository = require('./repository');
const elementsIds = require('./ui-element-ids');
const {
    localEmployeesList,
    globalEmployeesList,
    globalEmployeesErrorSection,
    localEmployeesErrorSection,
    sortLocalEmployeesDropdown,
    orderLocalEmployeesDropdown,
    sortGlobalEmployeesDropdown,
    orderGlobalEmployeesDropdown
} = require('./ui-element-ids');

async function fillLocalEmployeesList() {
    try {
        const tableBody = document.getElementById(localEmployeesList);
        const errorSection = document.getElementById(localEmployeesErrorSection);
        const sortLocalEmployees = document.getElementById(sortLocalEmployeesDropdown);
        const orderLocalEmployees = document.getElementById(orderLocalEmployeesDropdown);

        const sortBy = sortLocalEmployees.value;
        const orderBy = orderLocalEmployees.value;

        const employees = await repository.local.getAllEmployees({ sort: sortBy, order: orderBy });

        tableBody.innerHTML = ''; // clear the table body
        errorSection.innerHTML = ''; // clear the error section

        for (const employee of employees) {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${employee.first_name}</td>
            <td>${employee.last_name}</td>
            <td>${employee.job_title}</td>
            <td>${employee.filial}</td>
            <td>${employee.sick_leave_days_available}</td>
            <td>${employee.sick_leave_days_used}</td>
            <td>${employee.vacation_days_available}</td>
            <td>${employee.vacation_days_used}</td>
        `;

            const editBtnColumn = document.createElement('td');
            editBtnColumn.appendChild(creteEditEmployeeButton(employee.id));

            const deleteBtnColumn = document.createElement('td');
            deleteBtnColumn.appendChild(creteDeleteEmployeeButton(employee.id));

            row.append(editBtnColumn);
            row.append(deleteBtnColumn);


            tableBody.appendChild(row);
        }
    } catch (error) {
        console.error(error);
        const message = `Error while getting local employees\n${error.message}\n${error.stack}`;
        showErrorInTab({ tabId: elementsIds.localEmployeesErrorSection, message });
    }
}

async function fillGlobalEmployeesList() {
    try {
        const tableBody = document.getElementById(globalEmployeesList);
        const errorSection = document.getElementById(globalEmployeesErrorSection);
        const sortGlobalEmployees = document.getElementById(sortGlobalEmployeesDropdown);
        const orderGlobalEmployees = document.getElementById(orderGlobalEmployeesDropdown);

        const sortBy = sortGlobalEmployees.value;
        const orderBy = orderGlobalEmployees.value;

        const employees = await repository.global.getAllEmployees({ sort: sortBy, order: orderBy });

        tableBody.innerHTML = ''; // clear the table body
        errorSection.innerHTML = ''; // clear the error section


        for (const employee of employees) {
            const row = document.createElement('tr');

            row.innerHTML = `
            <td>${employee.first_name}</td>
            <td>${employee.last_name}</td>
            <td>${employee.job_title}</td>
            <td>${employee.filial}</td>
            <td>${employee.sick_leave_days_available}</td>
            <td>${employee.sick_leave_days_used}</td>
            <td>${employee.vacation_days_available}</td>
            <td>${employee.vacation_days_used}</td>
        `;

            tableBody.appendChild(row);
        }
    } catch (error) {
        console.error(error);
        const message = `Error while getting global employees\n${error.message}\n${error.stack}`;
        showErrorInTab({ tabId: elementsIds.globalEmployeesErrorSection, message });
    }
}

const showErrorInTab = ({ tabId, message }) => {
    const tab = document.getElementById(tabId);

    tab.innerHTML = `<div class="alert alert-danger" role="alert">${message.replaceAll('\n', '<br>')}</div>`;
};

function creteEditEmployeeButton(employeeId) {
    const button = document.createElement('input');
    button.type = 'button';
    button.className = 'btn btn-info edit-employee-btn';
    button.onclick = () => openUpdateEmployeeModal(employeeId);
    button.value = 'Edit';


    return button;
}

function creteDeleteEmployeeButton(employeeId) {
    const button = document.createElement('input');
    button.type = 'button';
    button.className = 'btn btn-danger delete-employee-btn';
    button.onclick = async () => {
        await repository.local.deleteEmployee({ id: employeeId });
        fillLocalEmployeesList();
    };
    button.value = 'Delete';


    return button;
}

function openCreateEmployeeModal() {
    const createEmployeeModal = new bootstrap.Modal(document.getElementById('createEmployeeModal'));
    createEmployeeModal.show();


    const createEmployeeForm = document.getElementById('createEmployeeForm');

    createEmployeeForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(createEmployeeForm);
        const employeeData = {};

        for (const [key, value] of formData.entries()) {
            employeeData[key] = value;
        }

        try {
            await repository.local.createNewEmployee(employeeData);
            await fillLocalEmployeesList();
        } catch (error) {
            console.error(error);
            const message = `Error while creating new employee\n${error.message}\n${error.stack}`;
            showErrorInTab({ tabId: elementsIds.localEmployeesErrorSection, message });
        }

        createEmployeeModal.hide();
    });
}


async function openUpdateEmployeeModal(employeeId) {
    {
        const updateEmployeeModal = new bootstrap.Modal(document.getElementById('updateEmployeeModal'));
        const updateEmployeeForm = document.getElementById('updateEmployeeForm');

        try {
            const employee = await repository.local.getEmployeeById({ id: employeeId });

            if (!employee) {
                throw new Error(`Employee with id ${employeeId} not found`);
            }

            // Set the input values of the form with the preloaded data
            document.getElementById('firstNameUpdateInput').value = employee.first_name;
            document.getElementById('lastNameUpdateInput').value = employee.last_name;
            document.getElementById('jobTitleUpdateInput').value = employee.job_title;
            document.getElementById('sickLeaveDaysUpdateInput').value = employee.sick_leave_days_available;
            document.getElementById('vacationDaysUpdateInput').value = employee.vacation_days_available;
            document.getElementById('salaryUpdateInput').value = employee.salary;
            document.getElementById('emailUpdateInput').value = employee.email;

            updateEmployeeModal.show();

            updateEmployeeForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                try {
                    event.preventDefault();
                    const formData = new FormData(updateEmployeeForm);
                    const employeeData = {};

                    for (const [key, value] of formData.entries()) {
                        employeeData[key] = value;
                    }

                    await repository.local.updateEmployee({ id: employeeId, employeeData });
                    await fillLocalEmployeesList();
                } catch (error) {
                    console.error(error);
                    const message = `Error while creating new employee\n${error.message}\n${error.stack}`;
                    showErrorInTab({ tabId: elementsIds.localEmployeesErrorSection, message });
                }
                updateEmployeeModal.hide();
            });
        } catch (error) {
            console.error(error);
            const message = `Error while updating employee\n${error.message}\n${error.stack}`;
            showErrorInTab({ tabId: elementsIds.localEmployeesErrorSection, message });
        }
    }


}

module.exports = { fillGlobalEmployeesList, fillLocalEmployeesList, showErrorInTab, openCreateEmployeeModal };
