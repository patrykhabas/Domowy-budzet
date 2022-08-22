//przychody
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const addIncome = document.getElementById('add_income');
const addExpense = document.getElementById('add_expense');
const inputIncomeName = document.getElementById('name_income');
const inputIncomeAmount = document.getElementById('amount_income');
const inputExpenseName = document.getElementById('name_expense');
const inputExpenseAmount = document.getElementById('amount_expense');
const amountAvailable = document.getElementById('amount_available');
const incomeSum = document.getElementById('income_sum');
const expenseSum = document.getElementById('expense_sum');

//dynamiczne tworzenie listy
let listIncome = [];
let listExpenses = [];

//działania matematyczne naszego budzetu
const calculateWallet = () => {
  const sumIncome = listIncome.reduce((total, inc) => total + +inc.amount, 0);
  const sumExpense = listExpenses.reduce(
    (total, exp) => total + +exp.amount,
    0
  );
  const sum = sumIncome - sumExpense;
  if (sum > 0) {
    amountAvailable.innerText = `Możesz wydać jeszcze ${sum} złotych.`;
  } else if (sum < 0) {
    amountAvailable.innerText = `Bilans jest ujemny. Jesteś na minusie ${sum} złotych .`;
  } else {
    amountAvailable.innerText = `Bilans wynosi zero.`;
  }
  incomeSum.innerText = `Suma przychodów: ${sumIncome}`;
  expenseSum.innerText = `Suma wydatków: ${sumExpense}`;
};

calculateWallet();
// /*
// const createListItem = (item, type) => {
//    li.innerText = `Nazwa ${type === 'przychod' ? 'przychodu' : 'wydatku'}: ${item.name}. Kwota: ${item.amount} zł`;
// }
// */

const createListItem = (item, type) => {
  const isIncomeType = type === 'przychod';

  const myOlList = document.getElementById(
    isIncomeType ? 'list_income' : 'list_expenses'
  );

  const li = document.createElement('li');
  const elementId = uuidv4();
  li.id = elementId;
  li.innerText = `Nazwa ${isIncomeType ? 'przychodu' : 'wydatku'}: ${
    item.name
  }. Kwota: ${item.amount} zł`;

  const btnEdit = document.createElement('button');
  btnEdit.id = 'createdBtnEdit';
  btnEdit.innerText = 'Edytuj';

  // po wcisnieciu edytuje liste
  btnEdit.addEventListener('click', () => {
    li.innerText = '';
    //dynamiczne dodanie editInputName
    const editInputName = document.createElement('input');
    editInputName.setAttribute('placeholder', 'Edytuj Nazwe ');
    editInputName.setAttribute('type', 'text');
    li.appendChild(editInputName);

    //dynamiczne dodanie editInputAmount
    const editInputAmount = document.createElement('input');
    editInputAmount.setAttribute('placeholder', 'Edytuj Kwote');
    editInputAmount.setAttribute('type', 'number');
    li.appendChild(editInputAmount);

    // dynamiczne dodanie Button Potwierdz
    const saveEditChangesBtn = document.createElement('button');
    saveEditChangesBtn.innerText = 'Potwierdz';
    li.appendChild(saveEditChangesBtn);

    // dynamiczne dodanie Button Wroc
    const cancelBtn = document.createElement('button');
    cancelBtn.innerText = 'Wróć';
    li.appendChild(cancelBtn);

    cancelBtn.addEventListener('click', () => {
      li.innerText = `Nazwa ${isIncomeType ? 'przychodu' : 'wydatku'}: ${
        item.name
      }. Kwota: ${item.amount} zł`;
    });

    // Dodanie wydarzenia dla Btn Potwierdz
    saveEditChangesBtn.addEventListener('click', () => {
      if (editInputName.value === '' || editInputAmount.value === '') {
        return alert('Wpisz nazwe oraz kwote');
      }
      if (+editInputAmount.value < 0) {
        return alert('Wartość musi być większa lub równa 0');
      }

      if (isIncomeType) {
        const updatedIncomes = listIncome.filter((el) => el.id !== item.id);
        listIncome = [
          ...updatedIncomes,
          {
            name: editInputName.value,
            amount: +editInputAmount.value,
            id: uuidv4(),
          },
        ];
      } else {
        const updatedExpenses = listExpenses.filter((el) => el.id !== item.id);
        listExpenses = [
          ...updatedExpenses,
          {
            name: editInputName.value,
            amount: +editInputAmount.value,
            id: uuidv4(),
          },
        ];
      }

      calculateWallet();
      li.innerText = `Nazwa ${isIncomeType ? 'przychodu' : 'wydatku'}: ${
        editInputName.value
      }. Kwota: ${editInputAmount.value} zł`;
    });
  });
  // tworzemoe przycisku Usun
  const btnDelete = document.createElement('button');
  btnDelete.innerText = 'Usuń';

  //po wcisnieciu usuwa liste
  btnDelete.addEventListener('click', () => {
    if (isIncomeType) {
      listIncome = listIncome.filter((income) => income.id !== item.id);
      updateListIncome();
    } else {
      listExpenses = listExpenses.filter((expense) => expense.id !== item.id);
      updateListExpenses();
    }
  });

  //dodawaanie listy do ol
  myOlList.appendChild(li);
  myOlList.appendChild(btnEdit);
  myOlList.appendChild(btnDelete);
};

const updateListIncome = () => {
  document.getElementById('list_income').innerHTML = '';
  listIncome.forEach((item) => {
    createListItem(item, 'przychod');
  });

  calculateWallet();
};

addIncome.addEventListener('click', () => {
  if (inputIncomeName.value === '' || inputIncomeAmount.value === '') {
    return alert('Wpisz nazwe oraz kwote');
  }
  if (+inputIncomeAmount.value < 0) {
    return alert('Przychód musi być większy lub równy 0');
  }

  listIncome = [
    ...listIncome,
    {
      name: inputIncomeName.value,
      amount: inputIncomeAmount.value,
      id: uuidv4(),
    },
  ];
  updateListIncome();

  inputIncomeName.value = '';
  inputIncomeAmount.value = '';
});

calculateWallet();

const updateListExpenses = () => {
  document.getElementById('list_expenses').innerHTML = '';
  listExpenses.forEach((item2) => {
    createListItem(item2, 'expense');
  });

  calculateWallet();
};

addExpense.addEventListener('click', () => {
  if (inputExpenseName.value === '' || inputExpenseAmount.value === '') {
    return alert('Wpisz nazwe oraz kwote');
  }
  if (+inputExpenseAmount.value < 0) {
    return alert('Wydatek musi być większy lub równy 0');
  }

  listExpenses = [
    ...listExpenses,
    {
      name: inputExpenseName.value,
      amount: inputExpenseAmount.value,
      id: uuidv4(),
    },
  ];
  inputExpenseName.value = '';
  inputExpenseAmount.value = '';
  updateListExpenses();
});
