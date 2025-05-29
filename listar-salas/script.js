document.addEventListener("DOMContentLoaded", () => {
  carregarSalasEMapearSetores();
});

async function carregarSalasEMapearSetores() {
  try {
    const baseURL = "http://127.0.0.1:8080/api";

    // Buscar salas
    const resSalas = await fetch(`${baseURL}/salas-e-setores`);
    if (!resSalas.ok) throw new Error("Erro ao carregar salas");
    const salas = await resSalas.json();

    // Popular tabela
    const tabelaBody = document.querySelector(".tabela-listagem-body");
    tabelaBody.innerHTML = "";

    salas.forEach(sala => {

      const row = document.createElement("tr");
      row.classList.add("tabela-listagem-body-row");

      row.innerHTML = `
        <td class="paragrafo3">Sala ${sala.numero}</td>
        <td class="paragrafo3">${sala.nomeSetor}</td>
        <td class="tabela-listagem-edit-remove-icons">
          <button class="btn-editar" data-id="${sala.id}">
            <img src="/Recursos/lapis-icon.png" alt="Editar">
          </button>
          <button class="btn-remover" data-id="${sala.id}">
            <img src="/Recursos/lixo-icon.png" alt="Remover">
          </button>
        </td>
      `;

      tabelaBody.appendChild(row);
    });

    // Adicionar eventos de editar
    document.querySelectorAll(".btn-editar").forEach(btn => {
      btn.addEventListener("click", e => {
        const id = e.currentTarget.getAttribute("data-id");
        window.location.href = `/cadastrar-sala/tela-cadastrar-sala.html?editId=${id}`;
      });
    });

    // Adicionar eventos de remover
    document.querySelectorAll(".btn-remover").forEach(btn => {
      btn.addEventListener("click", async e => {
        const id = e.currentTarget.getAttribute("data-id");
        if (!confirm("Deseja realmente remover esta sala?")) return;

        try {
          const response = await fetch(`${baseURL}/salas/${id}`, {
            method: "DELETE"
          });

          if (response.status === 204) {
            alert("Sala removida com sucesso!");
            carregarSalasEMapearSetores(); // Recarrega a tabela
          } else if (response.status === 409) {
            const erro = await response.text();
            alert("Erro: esta sala está vinculada a outros dados e não pode ser excluída.");
          } else {
            const erro = await response.text();
            alert("Erro ao remover sala: " + erro);
          }
        } catch (err) {
          alert("Erro de comunicação com o servidor: " + err.message);
          console.error("Erro ao tentar remover sala:", err);
        }
      });
    });

  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    alert("Erro ao carregar dados: " + error.message);
  }
}
