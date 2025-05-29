const getResponse = getTiposArmazenamento();

const tabelaTipoArmazenamentoBody = document.getElementById("tabela-tipo-armazenamento-body");

getResponse.then(tipoArmazenamentoList => {
    tipoArmazenamentoList.forEach(element => {
        let row = document.createElement("tr");
        row.classList.add("tabela-listagem-body-row");
        row.innerHTML = `
        <td class="paragrafo3">${element.id}</td>
        <td class="paragrafo3">${element.nome}</td>
        <td class="tabela-listagem-edit-remove-icons">
            <button class="botao-editar"><a href="/cadastrar-tipo-armazenamento/tela-cadastrar-tipo-armazenamento.html?editId=${element.id}"><img src="/Recursos/lapis-icon.png" alt=""></a></button>
            <button class="botao-deletar"><img src="/Recursos/lixo-icon.png" alt=""></button>
        </td>`;
        tabelaTipoArmazenamentoBody.appendChild(row);
    });
    const botaoDeletarList = document.getElementsByClassName("botao-deletar");
    [...botaoDeletarList].forEach(botao => {
        botao.addEventListener("click", e => {
            handleBotaoDeletar(e);
        })
    })
});

async function getTiposArmazenamento() {
    const response = await fetch("http://127.0.0.1:8080/api/tipos-armazenamento");
    if (!(response || response.ok)) {
        alert("Erro! Não foi possível carregar os tipos de armazenamento.")
        return;
    }
    return response.json();
}

function handleBotaoDeletar(e) {
    const clickedButton = e.target.tagName === 'IMG' ? e.target.parentElement : e.target;
    const id = clickedButton.parentElement.parentElement.children[0].textContent;

    deletarTipoArmazenamento(id).then(() => {
        location.reload();
    });
}

async function deletarTipoArmazenamento(id) {
    const response = await fetch(`http://127.0.0.1:8080/api/tipos-armazenamento/${id}`, {
        method: "DELETE",
    });

    if (!response || !(response.status === 204)) {
        alert("Erro desconhecido ao deletar!");
        throw new Error("Erro desconhecido!");
    }


}