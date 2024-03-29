const form = document.querySelector("#form");
const descriptionInput = document.querySelector("#description");
const valueInput = document.querySelector("#value");
const transactionsList = document.querySelector("#transactions-list");
const balanceValue = document.querySelector("#balance-value");

let transactions = [];

function addTransaction(event) {
  event.preventDefault();

  const type = document.querySelector('input[name="type"]:checked').value;
  const description = descriptionInput.value;
  const value = Number(valueInput.value);

  if (!description || !value) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  const transaction = { type, description, value };
  transactions.push(transaction);
  updateList();
  updateBalance();
  resetForm();
  saveTransactionsToCookie();
}

function updateList() {
  let transactionsHTML = "";
  transactions.forEach((transaction, index) => {
    transactionsHTML += `
      <tr>
        <td>${transaction.description}</td>
        <td class="${transaction.type === "income" ? "saldo" : "debito"}">${transaction.type === "income" ? "+" : "-"}${parseFloat(transaction.value.toFixed(2)).toLocaleString('pt-BR', {currency: 'BRL', style: 'currency', minimumFractionDigits: 2})}</td>
        <td><button onclick="removeTransaction(${index})" class="outcome delete-btn">Excluir</button></td>
      </tr>
    `;
  });

  transactionsList.innerHTML = transactionsHTML;
}

function updateBalance() {
  let balance = 0;
  transactions.forEach((transaction) => {
    balance +=
      transaction.type === "income" ? transaction.value : -transaction.value;
  });

  balanceValue.innerHTML = `${parseFloat(balance.toFixed(2)).toLocaleString('pt-BR', {currency: 'BRL', style: 'currency', minimumFractionDigits: 2})}`;
}

function removeTransaction(index) {
  transactions.splice(index, 1);
  updateList();
  updateBalance();
  saveTransactionsToCookie();
}

function resetForm() {
  form.reset();
}

function saveTransactionsToCookie() {
  document.cookie = `transactions=${JSON.stringify(transactions)}; max-age=7892608`;
}

function getTransactionsFromCookie() {
  const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)transactions\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  if (cookieValue) {
    transactions = JSON.parse(cookieValue);
    updateList();
    updateBalance();
  }
}

form.addEventListener("submit", addTransaction);

getTransactionsFromCookie();



// Create new switch theme function

const toggle = document.querySelector('#toggle-theme');
  const body = document.querySelector('body');

  // Definir tema escuro como padrão
  if (!localStorage.getItem('theme')) {
    body.classList.add('dark-theme');
    toggle.checked = true;
  } else if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
    toggle.checked = true;
  }

  toggle.addEventListener('change', function () {
    if (toggle.checked == true) {
      body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
      body.classList.remove('light-theme');
    } else {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    }
  });


  /* Mudar cor do botão de adicionar */

const incomeValue = document.querySelector('input[value="income"]')
const expenseValue = document.querySelector('input[value="expense"]')

const addButton = document.querySelector('button.income')
 
document.addEventListener('click', function () {
  if (incomeValue.checked){
    addButton.style.backgroundColor = '#00c853'
  } else if (expenseValue.checked){
    addButton.style.backgroundColor = '#d50000'
  }
})

/* Adicionando efeitos sonoros */

addButton.addEventListener('click', function () {
  if (incomeValue.checked && description.value.length > 0 && value.value.length > 0){
    document.querySelector('#cash-in').play();
  } else if (expenseValue.checked && description && value){
    document.querySelector('#cash-out').play();
  }
})

/* Mudar cor do valor final */

function validarCorValorFinal(){
  setTimeout( () => {
    var verifVal = document.querySelector('#balance-value').innerHTML
    if(String(verifVal).indexOf('R$&nbsp;0,00') !== -1 ){
      document.querySelector('#balance-value').style.color = "#FFF"
    } else if(String(verifVal).indexOf('-') !== -1 ){
      document.querySelector('#balance-value').style.color = "#ff9090"
    } else{
      document.querySelector('#balance-value').style.color = "#90ff90"
    }
  }, 300)
}
validarCorValorFinal();

document.addEventListener('click', validarCorValorFinal);