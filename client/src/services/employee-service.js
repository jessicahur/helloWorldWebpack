export default function(AngularModule) {
  AngularModule.factory('employeeService', function() {

    return {
      employees: [],
      getAll(array){
        this.employees = array;
      },
      addEmployee(employee){
        this.employees.push(employee);
      },
      deleteEmployee(employee){
        this.employees.splice(employees.indexOf(employee), 1);
      },
      updateEmployee(employee){

      },
      getEmployees() {
        return this.employees;

      }
    }
  });
};
