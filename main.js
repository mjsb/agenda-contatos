const form = document.getElementById('form-agenda')
const inputTel = document.getElementById('tel')
const nomes = []
const fones = []

let contatos = ``

inputTel.addEventListener('keyup', function (e) {
    let input = e.target
    input.value = phoneMask(input.value)
})

form.addEventListener('submit', function (e) {
    e.preventDefault()
    addContato()
    atualizaTabela()
})

function addContato() {
    const inputNome = document.getElementById('nome')
    const inputTel = document.getElementById('tel')

    if (fones.includes(inputTel.value)) {

        alert(`O telefone ${inputTel.value} já esta cadastrado!`)

    } else {

        nomes.push(inputNome.value)
        fones.push(inputTel.value)

        let contato = `<tr>`

        contato += `<td>${inputNome.value}</td>`
        contato += `<td>${inputTel.value}</td>`
        contato += `<td><a href="#" onclick="excluir('${inputNome.value}','${inputTel.value}')">X</a></td>`
        contato += `</tr>`

        contatos += contato

    }

    form.reset()
}

function excluir(nome, tel) {
    
    if (confirm('Deseja realmente excluir o contato: \n' + nome + ' \nTelefone: ' + tel + ' ?')) {
        
        contatos = contatos.replace(`<tr><td>${nome}</td><td>${tel}</td><td><a href="#" onclick="excluir('${nome}','${tel}')">X</a></td></tr>`, '')
        console.log(contatos)

        if ( contatos.length === 0 ) {

            const emptyTable = document.querySelector('tbody')
            emptyTable.innerHTML = '<tr><td colspan="2"  class="empty">Nenhum contato cadastrado</td></tr>'

        } else {

            atualizaTabela()

        }

    } else {

        alert('Cancelado!')

    }
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody')
    corpoTabela.innerHTML = contatos
}

const phoneMask = value => {
    if (!value) return ''
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d)/, '($1) $2')
    value = value.replace(/(\d)(\d{4})$/, '$1-$2')
    return value
}
