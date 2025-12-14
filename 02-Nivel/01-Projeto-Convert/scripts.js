// Cotação de moedas do dia.
const USD = 6.00
const EUR = 6.30
const GBP = 7.30

// Obtendo os elementos do formulário.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

// Manipulando o input amount para receber somente números.
amount.addEventListener("input", () => {
    const hasCharactersRegex = /\D+/g

    amount.value = amount.value.replace(hasCharactersRegex, "")
})

// Captando o evento de submit (enviar) do formulário.
form.onsubmit = (Event) => {
    Event.preventDefault()

    switch (currency.value){
        case "USD":
            convertCurrency(amount.value, USD, "US$")
        break
        case "EUR":
            convertCurrency(amount.value, EUR, "€")
        break
        case "GBP":
            convertCurrency(amount.value, GBP, "£")
        break
    }
}

// Função para converter a moeda.
function convertCurrency(amount, price, symbol){
    try {
        // Exibindo a cotação da moeda selecionada.
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

        // Calcula o total.
        let total = amount * price

        // Verifica se o resultado Is Not a Number.
        if (isNaN(total)) {
            return alert("Por favor, digite o valor corretamente para converter.")
        }

        // Formatar o valor total e Replace "R$" por nada
        total = formatCurrencyBRL(total).replace("R$", "")

        // Exibe o resultado total no h1#result.
        result.textContent = `${total} Reais`

        // Aplica a classe que exibe o footer para mostrar o resultado.
        footer.classList.add("show-result")
    } catch {
        // Remove a classe do footer removendo ele da tela.
        footer.classList.remove("show-result")
        
        console.log(error)
        alert("Não foi possível converter. Tente novamente mais tarde.")
    }
}

// Formata a moeda em Real Brasileiro.
function formatCurrencyBRL(value) {
    /* Converte em tipo Number para utilizar o toLocaleString
        e formatar no padrão BRL (R$ 00,00).
    */
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}