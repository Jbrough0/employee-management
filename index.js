const logo = require("asciiart-logo");
const { prompt } = require("inquirer");
const db = require("./db/conection");
require("console.table");
init();

function init() {
    const logoText = logo({ name: "Employee Management" }).render();
    console.log(logoText);
    loadMainPrompts();
}
async function loadMainPrompts() {
  const { choice } = await prompt([
  {
      type: "list",
      name: "choice",
      message: "What is your choice?",
      choices: [
        {
            name: "All Employees",
            value: "VEIW_EMPLOYEES"
        },
        {
          name: "Employees By Department",
          value: "VEIW_EMPLOYEES_BY_DEPARTMENT"
        },
        {
          name: "Veiw All Employees by Manager",
          value: "VEIW_EMPLOYEES_BY_MANAGER"
        },
        {
          name: "Add Employees",
          value: "ADD_EMPLOYEES"
        },
        {
          name: "Delete Employees",
          value: "DELETE_EMPLOYEES"
        },
        {
          name: "Update Role",
          value: "UPDATE_ROLE"
        },
        {
          name: "Update Employee Manager",
          value: "UPDATE_EMPLOYEE_MANAGER"
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES"
        },
        {
          name: "Add Role",
          value: "ADD_ROLE"
        },
        {
          name: "Delete Role",
          value: "DELETE_ROLE"
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "Delete Department",
          value: "DELETE_DEPARTMENT"
        },
        {
          name: "Exit",
          value: "EXIT"
        }
      ]
    }
  ]);
  switch (choice) {
      case "VIEW_EMPLOYEES":
        return viewEmployees();
      case "VIEW_EMPLOYEES_BY_DEPARTMENT":
        return viewEmployeesByDepartment();
      case "VIEW_EMPLOYEES_BY_MANAGER":
        return viewEmployeesByManager();
      case "ADD_EMPLOYEES":
        return addEmployees();
      case "DELETE_EMPLOYEES":
        return deleteEmloyees();
      case "UPDATE_ROLE":
        return updateEmployeeRole();
      case "UPDATE_EMPLOYEE_MANAGER":
        return updateEmployeeManager();
      case "VIEW_DEPARTMENTS":
        return viewDepartments();
      case "ADD_DEPARTMENT":
        return addDepartment();
      case "DELETE_DEPARTMENT":
        return deleteDepartment();
      case "VIEW_ROLES":
        return viewRoles();
      case "ADD_ROLE":
        return addRole();
      case "DELETE_ROLE":
        return deleteRole();
      default:
        return exit();
    }
}
async function viewEmployees(){
  const Employees =await db.findAllEmployees();

  console.log("\n");
  console.table(employees);
  
  loadMainPrompts();

}
async function viewEmployeesByDepartment() {
  const departments = await db.findAllDepartments();

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const { departmentId } = await prompt([
    {
      type: "list",
      name: "departmentId",
      message: "Which department would you like to speak to employees from?",
      choices: departmentChoices
    }
  ]);
  const employees = await db.findAllEmployeesByDepartment(departmentId);
  
  console.log("\n");
  console.table(employees);

  loadMainPrompts();
}
async function VEIW_EMPLOYEES_BY_MANAGER(){
  const Manager = await db.findAllEmployees();

  const managerChoices = managers.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

const{managerID} = await prompt ([
  {
    type: "list",
        name: "managerId",
        message: "Which of your employees do you want to see direct reports for?",
        choices: managerChoices
      }
    ]);
  
    const employees = await db.findAllEmployeesByManager(managerId);
  
    console.log("\n");

    if (employees.length ===0) {
      console.log("There are no direct reports for this employee");
    } else {
      console.table(employees);
    }

    loadMainPrompts();
  }
  async function deleteEmployee() {
    const employees = await db.findAllEmployees();
  
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
    const { employeeId } = await prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to be delted from your system?",
        choices: employeeChoices
      }
    ]);
    await db.removeEmployee(employeeId);
  
    console.log("Employee has been deleted from the database");
  
    loadMainPrompts();
  }

  async function updateEmployeeRole() {
    const employees = await db.findAllEmployees();
  
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));

    const { employeeId } = await prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee's role do think should be updated?",
        choices: employeeChoices
      }
    ]);
    const roles = await db.findAllRoles();
  
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
  
    const { roleId } = await prompt([
      {
        type: "list",
        name: "roleId",
        message: "Which role do you want to assign the employee you selected?",
        choices: roleChoices
      }
    ]);
  
    await db.updateEmployeeRole(employeeId, roleId);
  
    console.log("Updated employee's role");
  
    loadMainPrompts();
  }
  
  async function updateEmployeeManager() {
    const employees = await db.findAllEmployees();
  
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
    const { employeeId } = await prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which manager do you want to update?",
        choices: employeeChoices
      }
    ]);
    const managers = await db.findAllPossibleManagers(employeeId);
  
    const managerChoices = managers.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
    const { managerId } = await prompt([
      {
        type: "list",
        name: "managerId",
        message:
          "Which employee do you want to give a promotion as manager to for the selected employee?",
        choices: managerChoices
      }
    ]);
  
    await db.updateEmployeeManager(employeeId, managerId);
  
    console.log("Updated employee's manager");
  
    loadMainPrompts();
  }
  
  async function viewRoles() {
    const roles = await db.findAllRoles();
  
    console.log("\n");
    console.table(roles);
  
    loadMainPrompts();
  }

  async function addRole() {
    const departments = await db.findAllDepartments();
  
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));
  
    const role = await prompt([
      {
        name: "title",
        message: "What is the name of the role?"
      },
      {
        name: "salery",
        message: "What is the salery of the role?"
      },
      {
        type: "list",
        name: "department_id",
        message: "This role belongs to which department?",
        choices: departmentChoices
      }
    ]);
    await db.createRole(role);
  
    console.log(`Added ${role.title} to the database`);
  
    loadMainPrompts();
  }
  async function deleteRole() {
    const roles = await db.findAllRoles();
  
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
    const { roleId } = await prompt([
      {
        type: "list",
        name: "roleId",
        message:
          "Which role do you want to delete?",
        choices: roleChoices
      }
    ]);
    await db.deleteRole(roleId);
  
    console.log("Role has been deleted from the database");
  
    loadMainPrompts();
  }
  async function viewDepartments() {
    const departments = await db.findAllDepartments();
  
    console.log("\n");
    console.table(departments);
  
    loadMainPrompts();
  }
  
  async function addDepartment() {
    const department = await prompt([
      {
        name: "name",
        message: "What is the department's name?"
      }
    ]);
    await db.createDepartment(department);
  
    console.log(`Added ${department.name} to the database`);
  
    loadMainPrompts();
  }
  async function deleteDepartment() {
    const departments = await db.findAllDepartments();
  
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));
    const { departmentId } = await prompt({
      type: "list",
      name: "departmentId",
      message:
        "Which department do you want to delete from the database?",
      choices: departmentChoices
    });
    await db.deleteDepartment(departmentId);
  
    console.log(`Department has been deleted from the database`);
  
    loadMainPrompts();
  }
  async function addEmployee() {
    const roles = await db.findAllRoles();
    const employees = await db.findAllEmployees();
  
    const employee = await prompt([
      {
        name: "first_name",
        message: "What is the first name of the employee?"
      },
      {
        name: "last_name",
        message: "What is the last name of the employee?"
      }
    ]);
  
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
  
    const { roleId } = await prompt({
      type: "list",
      name: "roleId",
      message: "What role is this employee assigned to?",
      choices: roleChoices
    });
  
    employee.role_id = roleId;
  
    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
    managerChoices.unshift({ name: "None", value: null });
  
    const { managerId } = await prompt({
      type: "list",
      name: "managerId",
      message: "Who is the name of the employee's manager?",
      choices: managerChoices
    });
  
    employee.manager_id = managerId;
  
    await db.createEmployee(employee);
  
    console.log(
      `Added ${employee.first_name} ${employee.last_name} to the database`
    );
  
    loadMainPrompts();
  }
  function exit() {
    console.log("So long!");
    process.exit;
  }
