let corpoDaTabela = document.getElementById("tabela-listagem-body");

getTipoMedicamento().then(data => {
    montarTabela(corpoDaTabela, data);
    let botaoDeleteList = document.getElementsByClassName("botao-deletar");
    [...botaoDeleteList].forEach(botaoDelete => {
        botaoDelete.addEventListener("click", e => {
            console.log("clique")
            const clickedButton = e.target.tagName === 'IMG' ? e.target.parentElement : e.target;
            const id = clickedButton.parentElement.parentElement.children[0].textContent;

            deleteTipoMedicamento(id).then(() => {
                location.reload();
            });

        });
    })
});










function montarTabela(corpoDaTabela, data) {
    data.forEach(element => {
        let row = document.createElement('tr');
        row.classList.add("tabela-listagem-body-row");
        row.innerHTML = `
            <td class="paragrafo3">${element.id}</td>
            <td class="paragrafo3">${element.nome}</td>
            <td class="paragrafo3">${element.nomeUnidadeMedida}</td>
            <td class="tabela-listagem-edit-remove-icons">
                <button class="botao-editar"><a href="/cadastrar-tipo-medicamento/tela-criar-tipo-medicamento.html?editId=${element.id}"><img src="/Recursos/lapis-icon.png" alt=""></a></button>
                <button class="botao-deletar"><img src="/Recursos/lixo-icon.png" alt=""></button>
            </td>
        `;
        corpoDaTabela.appendChild(row);
    });


}



async function getTipoMedicamento() {
    let response = await fetch("http://127.0.0.1:8080/api/tipos-medicamentos");
    if (!(response.status === 200)) {
        alert("Erro ao carregar tipos de medicamentos!");
        return;
    }
    console.log(response)
    return response.json();

}

async function deleteTipoMedicamento(id) {
    let response = await fetch(`http://127.0.0.1:8080/api/tipos-medicamentos/${id}`, {
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