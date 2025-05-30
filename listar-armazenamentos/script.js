document.addEventListener("DOMContentLoaded", async function () {
    try {
        const armazenamentos = await fetchDados("/api/armazenamentos")

        renderizarTabela(armazenamentos);
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
    }
});

async function fetchDados(endpoint) {
    const response = await fetch(`http://localhost:8080${endpoint}`);
    if (!response.ok) throw new Error(`Erro ao buscar ${endpoint}`);
    return await response.json();
}

function encontrarPorId(lista, id) {
    return lista.find(item => item.id === id) || null;
}

function renderizarTabela(armazenamentos) {
    const tbody = document.querySelector(".tabela-listagem-body");
    tbody.innerHTML = "";

    armazenamentos.forEach((armazenamento) => {

        const row = document.createElement("tr");
        row.classList.add("tabela-listagem-body-row");

        row.innerHTML = `
            <td class="paragrafo3">${armazenamento.codigo}</td>
                            <td class="paragrafo3">${armazenamento.nomeTipoArmazenamento}</td>
                            <td class="paragrafo3">${armazenamento.numeroSala}</td>
                            <td class="paragrafo3">${armazenamento.nomeSetor}</td>
                            <td class="paragrafo3">${armazenamento.nomeMedicamento}</td>
                            <td class="paragrafo3">${armazenamento.quantidade}</td>
                            <td class="tabela-listagem-edit-remove-icons">
                                <button class="editar"><img src="/Recursos/lapis-icon.png" alt=""></button>
                                <button class="deletar"><img src="/Recursos/lixo-icon.png" alt=""></button>
                            </td>
        `;

        // Editar
        row.querySelector(".editar").addEventListener("click", function () {
            localStorage.setItem("armazenamentoEditando", JSON.stringify(armazenamento));
            window.location.href = "/cadastrar-armazenamento/tela-criar-armazenamento.html?editId="+armazenamento.id;
        });

        // Deletar
        row.querySelector(".deletar").addEventListener("click", async function () {
            if (confirm("Tem certeza que deseja excluir este armazenamento?")) {
                await deletarArmazenamento(armazenamento.id);
            }
        });

        tbody.appendChild(row);
    });
}

async function deletarArmazenamento(id) {
    try {
        const response = await fetch(`http://localhost:8080/api/armazenamentos/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error("Erro ao deletar armazenamento");

        location.reload(); // Recarrega a tabela após exclusão
    } catch (error) {
        console.error("Erro ao deletar:", error);
        alert("Erro ao deletar armazenamento.");
    }
}
