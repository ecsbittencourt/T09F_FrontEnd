let retrieved;
getTipoEstoque().then(data => {
    retrieved = data;
    console.log(retrieved);
    let tipoEstoqueList = retrieved;
    let tabelaListagemBody = document.getElementById("tabela-listagem-body");

    tipoEstoqueList.forEach(element => {
        let row = document.createElement('tr');
        row.classList.add("tabela-listagem-body-row");
        row.innerHTML = `
    <td class="paragrafo3">${element.id}</td>
    <td class="paragrafo3">${element.nome}</td>
    <td class="tabela-listagem-edit-remove-icons">
        <button><a href="/cadastrar-tipo-estoque/tela-criar-tipo-estoque.html?editId=${element.id}"><img src="/Recursos/lapis-icon.png" alt=""></a></button>
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
            const { nextIndex, values } = JSON.parse(localStorage.getItem("t09f-tipo-estoque"));

            localStorage.setItem("t09f-tipo-estoque", JSON.stringify({ nextIndex, values: values.filter(element => !(element["id"] == id)) }));
            location.reload();
        });
    })
});
async function getTipoEstoque() {
    let response = await fetch("http://127.0.0.1:8080/api/tipos-estoque");
    if (!response) {
        console.log("ERROOOO!");
        return null;
    } else {
        let data = await response.json();
        return data;
    }
}



function deleteTipoEstoque(id) {
    fetch(`http://127.0.0.1:8080/api/tipos-estoque/${id}`, {
        method: "DELETE",
        headers: {
        },
    }).then(response => {
        console.log(response);
        if (!response.status == 204) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
    });
}