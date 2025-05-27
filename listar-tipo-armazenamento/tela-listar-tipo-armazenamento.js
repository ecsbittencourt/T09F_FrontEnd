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
            <button><img src="/Recursos/lapis-icon.png" alt=""></button>
            <button><img src="/Recursos/lixo-icon.png" alt=""></button>
        </td>`;
        tabelaTipoArmazenamentoBody.appendChild(row);
    });
    
});

async function getTiposArmazenamento() {
    const response = await fetch("http://127.0.0.1:8080/api/tipos-armazenamento");
    if(!(response || response.ok)) {
        alert("Erro! Não foi possível carregar os tipos de armazenamento.")
        return;
    }
    return response.json();
}