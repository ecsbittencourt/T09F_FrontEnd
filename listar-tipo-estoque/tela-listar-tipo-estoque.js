let retrieved = JSON.parse(localStorage.getItem("t09f-tipo-estoque"));
let tipoEstoqueList;
if(!retrieved || !retrieved["values"]) {
    tipoEstoqueList = [];
} else {
    tipoEstoqueList = retrieved["values"];
}
let tabelaListagemBody = document.getElementById("tabela-listagem-body");

tipoEstoqueList.forEach(element => {
    let row = document.createElement('tr');
    row.classList.add("tabela-listagem-body-row");
    row.innerHTML = `
    <td class="paragrafo3">${element.id}</td>
    <td class="paragrafo3">${element.value}</td>
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
        const {nextIndex, values} = JSON.parse(localStorage.getItem("t09f-tipo-estoque"));
        
        localStorage.setItem("t09f-tipo-estoque", JSON.stringify({nextIndex,values:values.filter(element => !(element["id"] == id))}));
        location.reload();
    });
})
