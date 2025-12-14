const form = document.querySelector("form");
let qtdSorteio = 0;

form.onsubmit = (event) => {
  event.preventDefault();

  let quantity = parseInt(document.getElementById("quantity").value);
  let start = parseInt(document.getElementById("start").value);
  let end = parseInt(document.getElementById("end").value);
  let repeatOff = document.getElementById("repeat-off").checked;
  let range = end - start + 1;

  if (quantity < 1 || quantity > 100) {
    alert("A quantidade de números deve ser entre 1 e 100!");
    return;
  }

  if (start < 1 || start > 1000 || end < 1 || end > 1000) {
    alert("O intervalo deve ser entre 1 e 1000!");
    return;
  }

  if (start >= end) {
    alert("Por favor, insira um intervalo válido!");
    return;
  }

  if (repeatOff && quantity > range) {
    alert("A quantidade de números não pode ser maior que o intervalo quando não há repetição!");
    return;
  }

  let result = generateNumbers(quantity, start, repeatOff, range);
  result.sort((a, b) => a - b); // Ordena os números em ordem crescente

  console.log(result);
  displayResults(result);
};

function generateNumbers(quantity, start, repeatOff, range) {
  let numbers = [];

  while (numbers.length < quantity) {
    let randomNumber = Math.floor(Math.random() * (range)) + start;

    if (repeatOff) {
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    } else {
      numbers.push(randomNumber);
    }
  }

  return numbers;
}

function displayResults(numbers) {
  const resultWrapper = document.querySelector(".result-wrapper");
  resultWrapper.innerHTML = ""; // Limpa os resultados anteriores

  numbers.forEach((num) => {
    const resultInner = document.createElement("div");
    resultInner.classList.add("result-inner");

    const span = document.createElement("span");
    span.textContent = num;

    resultInner.appendChild(span);
    resultWrapper.appendChild(resultInner);
  });

  qtdSorteio++;

  // Update info
  const titulo = document.querySelector("#info > h2");
  const paragrafo = document.querySelector("#info > p");
  titulo.textContent = "Resultado do sorteio";
  paragrafo.textContent = `${qtdSorteio}º Resultado`;

  form.classList.add("result");
}

const logo = document.getElementById("logo"); // Seleciona a logo

if (logo) {
  logo.addEventListener("click", () => {
    location.reload(); // Recarrega a página completamente
  });
}
