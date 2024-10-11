// script.js

const buttons = document.querySelectorAll('.btn');
const display = document.getElementById('display');
let currentInput = '';     // Armazena o número digitado
let operator = '';         // Armazena o operador atual (+, -, *, /)
let previousInput = '';    // Armazena o número anterior
let resultDisplayed = false; // Para saber quando limpar a tela

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');

    // Limpar a tela (botão "C")
    if (value === 'C') {
      currentInput = '';
      previousInput = '';
      operator = '';
      display.textContent = '0';  // Exibe 0 após limpar
      resultDisplayed = false;
      return;
    }

    // Se for um operador
    if (button.classList.contains('operator')) {
      if (currentInput === '') return; // Evita usar operador sem número digitado
      operator = value;
      previousInput = currentInput;    // Salva o número digitado
      currentInput = '';               // Limpa o valor atual para digitar o próximo
      resultDisplayed = false;
      return;
    }

    // Quando for o botão "=" (calcular)
    if (value === '=') {
      if (operator && previousInput !== '' && currentInput !== '') {
        try {
          // Chama a função de cálculo
          const result = calculate(parseFloat(previousInput), parseFloat(currentInput), operator);
          display.textContent = result;   // Exibe o resultado
          previousInput = result.toString(); // Armazena o resultado como próximo valor
          currentInput = '';              // Limpa o input atual
          operator = '';                  // Reseta o operador
          resultDisplayed = true;
        } catch (error) {
          display.textContent = 'Erro';   // Exibe erro no caso de problema
        }
      }
      return;
    }

    // Adicionando números e ponto (.)
    if (resultDisplayed) {
      currentInput = value; // Substitui o valor após resultado
      resultDisplayed = false;
    } else {
      currentInput += value;
    }

    display.textContent = currentInput;   // Mostra o número conforme é digitado
  });
});

// Função de cálculo sem eval()
function calculate(a, b, operator) {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case 'x':
      return a * b;
    case '/':
      return b !== 0 ? a / b : 'Erro';   // Evita divisão por 0
    default:
      return 'Erro';                    // Operador desconhecido
  }
}
