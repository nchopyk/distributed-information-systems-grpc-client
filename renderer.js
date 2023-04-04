const { fillLocalEmployeesList, fillGlobalEmployeesList, openCreateEmployeeModal } = require('./src/render-utils');
const elementsIds = require('./src/ui-element-ids');

window.addEventListener('DOMContentLoaded', async () => {
    initButtonsBindings();
    await Promise.all([fillLocalEmployeesList(), fillGlobalEmployeesList()]);
});

function initButtonsBindings() {
    const refreshLocalEmployeesListBtn = document.getElementById(elementsIds.refreshLocalEmployeesListBtn);
    refreshLocalEmployeesListBtn.addEventListener('click', fillLocalEmployeesList);

    const refreshGlobalEmployeesListBtn = document.getElementById(elementsIds.refreshGlobalEmployeesListBtn);
    refreshGlobalEmployeesListBtn.addEventListener('click', fillGlobalEmployeesList);

    const createNewEmployeeBtn = document.getElementById(elementsIds.createNewEmployeeBtn);
    createNewEmployeeBtn.addEventListener('click', openCreateEmployeeModal);

    const sortLocalEmployeesDropdown = document.getElementById(elementsIds.sortLocalEmployeesDropdown);
    sortLocalEmployeesDropdown.addEventListener('change', fillLocalEmployeesList);

    const orderLocalEmployeesDropdown = document.getElementById(elementsIds.orderLocalEmployeesDropdown);
    orderLocalEmployeesDropdown.addEventListener('change', fillLocalEmployeesList);

    const sortGlobalEmployeesDropdown = document.getElementById(elementsIds.sortGlobalEmployeesDropdown);
    sortGlobalEmployeesDropdown.addEventListener('change', fillGlobalEmployeesList);

    const orderGlobalEmployeesDropdown = document.getElementById(elementsIds.orderGlobalEmployeesDropdown);
    orderGlobalEmployeesDropdown.addEventListener('change', fillGlobalEmployeesList);


}


