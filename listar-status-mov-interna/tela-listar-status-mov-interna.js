getStatus().then(data => {
    let statusList = data;
    let tabelaListagemBody = document.getElementById("tabela-listagem-body");

    statusList.forEach(element => {
        let row = document.createElement('tr');
        row.classList.add("tabela-listagem-body-row");
        row.innerHTML = `
    <td class="paragrafo3">${element.id}</td>
    <td class="paragrafo3">${element.nome}</td>
    <td class="tabela-listagem-edit-remove-icons">
        <button><a href="/cadastrar-status-mov-interna/tela-criar-status-mov-inte.html?editId=${element.id}"><img src="/Recursos/lapis-icon.png" alt=""></a></button>
        <button class="botao-deletar"><img src="/Recursos/lixo-icon.png" alt=""></button>
    </td>
    `
        tabelaListagemBody.appendChild(row);
    });

    let botaoDeleteList = document.getElementsByClassName("botao-deletar");

    [...botaoDeleteList].forEach(botaoDelete => {
        botaoDelete.addEventListener("click", e => {
            const clickedButton = e.target.tagName === 'IMG' ? e.target.parentElement : e.target;
            const id = clickedButton.parentElement.parentElement.children[0].textContent;

            deleteStatus(id).then(() => {
                location.reload();
            });

        });
    })
});
async function getStatus() {
    let response = await fetch("http://127.0.0.1:8080/api/status-movimentacao-interna");
    if (!response.ok) {
        return null;
    } else {
        let data = await response.json();
        return data;
    }
}



async function deleteStatus(id) {
    let response = await fetch(`http://127.0.0.1:8080/api/status-movimentacao-interna/${id}`, {
        method: "DELETE",
        headers: {
        },
    });
    if (!(response.status === 204)) {
        console.log("Não 204!!!")
        alert("Erro! Não foi possível deletar!");
        throw new Error("Erro!")
    }

}