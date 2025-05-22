
document.addEventListener("DOMContentLoaded", function () {
    const armazenamentos = JSON.parse(localStorage.getItem("armazenamentos")) || [];
    const salas = JSON.parse(localStorage.getItem("salas")) || [];
    const tiposArmazenamento = JSON.parse(localStorage.getItem("tiposArmazenamento")) || [];
    const medicamentos = JSON.parse(localStorage.getItem("medicamentos")) || [];
    const setores = JSON.parse(localStorage.getItem("setores")) || [];

    const tbody = document.querySelector(".tabela-listagem-body");
    tbody.innerHTML = "";

    function encontrarPorId(lista, id) {
        return lista.find(item => item.id === id) || null;
    }

    function renderizarTabela() {
        tbody.innerHTML = "";
        armazenamentos.forEach((armazenamento, index) => {
            const sala = encontrarPorId(salas, armazenamento.salaId);
            const tipo = encontrarPorId(tiposArmazenamento, armazenamento.tipoArmazenamentoId);
            const medicamento = encontrarPorId(medicamentos, armazenamento.medicamentoId);
            const setor = encontrarPorId(setores, armazenamento.setorId);

            const row = document.createElement("tr");
            row.classList.add("tabela-listagem-body-row");

            row.innerHTML = `
                <td class="paragrafo3">${armazenamento.codigo}</td>
                <td class="paragrafo3">${sala ? sala.nome : "Sala não encontrada"}</td>
                <td class="paragrafo3">${setor ? setor.nome : "Setor não encontrado"}</td>
                <td class="paragrafo3">${tipo ? tipo.nome : "Tipo não encontrado"}</td>
                <td class="paragrafo3">${medicamento ? medicamento.nome : "Medicamento não encontrado"}</td>
                <td class="paragrafo3">${armazenamento.quantidade || 0}</td>
                <td class="tabela-listagem-edit-remove-icons">
                    <button class="editar"><img src="/Recursos/lapis-icon.png" alt="Editar"></button>
                    <button class="deletar"><img src="/Recursos/lixo-icon.png" alt="Deletar"></button>
                </td>
            `;

            // Evento de deletar
            row.querySelector(".deletar").addEventListener("click", function () {
                if (confirm("Tem certeza que deseja excluir este registro?")) {
                    armazenamentos.splice(index, 1);
                    localStorage.setItem("armazenamentos", JSON.stringify(armazenamentos));
                    renderizarTabela();
                }
            });

            // Evento de editar
            row.querySelector(".editar").addEventListener("click", function () {
                localStorage.setItem("armazenamentoEditando", JSON.stringify(armazenamento));
                window.location.href = "/cadastrar-armazenamento/tela-criar-armazenamento.html";
            });

            tbody.appendChild(row);
        });
    }

    renderizarTabela();
});
