const { employees, prices, species, hours } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return ids.map((id) => data.species.find((specie) => specie.id === id));
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  const specieAnimal = data.species.find((specie) => specie.name === animal);
  return specieAnimal.residents.every((animalAge) => animalAge.age >= age);
}

function getEmployeeByName(name) {
  // seu código aqui
  if (name === undefined) {
    return {};
  }
  const cond = (employee) => employee.firstName === name || employee.lastName === name;
  const resultEmployee = employees.find(cond);
  return resultEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  // seu código aqui
  const { managers } = data;
  return managers.some((manager) => manager === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aquie
  const employee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(employee);
  return employee;
}

function countAnimals(paramSpecies) {
  // seu código aqui
  /**
   * Source: https://danielobara.wordpress.com/2018/11/20/como-converter-array-de-objetos-para-um-unico-objeto-em-javascript-com-es6/
   * Pesquisei e encontrei nesse site como  usar o reduce para criar um objeto utilizando a condição que desejamos para cada elemento.
   */
  if (paramSpecies === undefined) {
    const cond = (obj, item) => {
      // console.log(item.name);
      const objAnimal = obj;
      objAnimal[item.name] = item.residents.length;
      return objAnimal;
    };
    return data.species.reduce(cond, {});
  }
  const result = data.species.find((specie) => specie.name === paramSpecies);
  return result.residents.length;
}

function calculateEntry(entrants) {
  // seu código aqui
  console.log(entrants);
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  const arrayEntrants = Object.keys(entrants).map((value) => value);
  const priceTotal = arrayEntrants.reduce((
    sum, value,
  ) => sum + (entrants[value] * prices[value]), 0);
  return priceTotal;
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
  const objHours = {};
  Object.keys(hours).forEach((hour) => {
    const prop = hour;
    if (hour === 'Monday') {
      objHours[prop] = 'CLOSED';
    } else {
      objHours[hour] = `Open from ${hours[prop].open}am until ${(hours[prop].close - 12)}pm`;
    }
  });
  if (dayName === undefined) return objHours;
  const resultDay = {};
  resultDay[dayName] = objHours[`${dayName}`];
  return resultDay;
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  const employeeResult = employees.find((employee) => employee.id === id);
  const idSpecie = employeeResult.responsibleFor[0];
  const specieResult = species.find((specie) => specie.id === idSpecie).residents;
  let comp = 0;
  let oldAnimal;
  Object.keys(specieResult).forEach((animal) => {
    if (specieResult[animal].age > comp) {
      oldAnimal = specieResult[animal];
      comp = specieResult[animal].age;
    }
  });
  return [oldAnimal.name, oldAnimal.sex, oldAnimal.age];
}

function increasePrices(percentage) {
  // seu código aqui
  Object.keys(prices).forEach((value, indice) => {
    const prop = value;
    const newPrice = ((percentage * prices[prop]) / 100 + prices[prop]);
    const priceFloat = (newPrice + 0.001).toFixed(2);
    prices[value] = parseFloat(priceFloat);
  });
  return prices;
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
  const employee = employees.reduce((obj, emp) => {
    const returnObj = obj;
    returnObj[`${emp.firstName} ${emp.lastName}`] = emp.responsibleFor.map((
      responsibleFor,
    ) => species.find((specie) => specie.id === responsibleFor).name);
    return returnObj;
  }, {});
  if (idOrName === undefined) {
    return employee;
  }
  const emp = employees.find((
    empValue,
  ) =>
    empValue.id === idOrName || empValue.firstName === idOrName || empValue.lastName === idOrName);
  const objEmp = {};
  objEmp[`${emp.firstName} ${emp.lastName}`] = employee[`${emp.firstName} ${emp.lastName}`];
  return objEmp;
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
