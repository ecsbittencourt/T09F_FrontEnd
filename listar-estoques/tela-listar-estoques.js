document.addEventListener("DOMContentLoaded", async () => {
  await carregarEstoques();
});

async function carregarEstoques() {
  const baseURL = "http://127.0.0.1:8080/api";

  try {
    // Buscar estoques
    const resEstoques = await fetch(`${baseURL}/estoques`);
    if (!resEstoques.ok) {
      alert("Erro ao buscar estoques!");      
      throw new Error("Erro ao buscar estoques");
    }
    const estoques = await resEstoques.json();
    // Popular tabela
    const tabelaBody = document.querySelector(".tabela-listagem-body");
    tabelaBody.innerHTML = "";

    console.log(estoques)
    estoques.forEach(estoque => {
      const row = document.createElement("tr");
      row.classList.add("tabela-listagem-body-row");

      row.innerHTML = `
      <td class="paragrafo3">${estoque.nome}</td>
                            <td class="paragrafo3">${estoque.nomeTipoEstoque}</td>
                            <td class="paragrafo3">${estoque.nomeSetor}</td>
                            <td class="paragrafo3">${estoque.numeroSala}</td>
                            <td class="tabela-listagem-edit-remove-icons">
                                <button class="btn-editar" data-id="${estoque.id}">
            <img src="/Recursos/lapis-icon.png" alt="Editar">
          </button>
          <button class="btn-remover" data-id="${estoque.id}">
            <img src="/Recursos/lixo-icon.png" alt="Remover">
          </button>
                            </td>
        
          
        
      `;

      tabelaBody.appendChild(row);
    });

    // Eventos de editar
    document.querySelectorAll(".btn-editar").forEach(btn => {
      btn.addEventListener("click", e => {
        const id = e.currentTarget.getAttribute("data-id");
        window.location.href = `/cadastrar-estoque/tela-cadastrar-estoque.html?editId=${id}`;
      });
    });

    // Eventos de remover
    document.querySelectorAll(".btn-remover").forEach(btn => {
      btn.addEventListener("click", async e => {
        const id = e.currentTarget.getAttribute("data-id");
        if (!confirm("Deseja realmente remover este estoque?")) return;

        try {
          const response = await fetch(`${baseURL}/estoques/${id}`, {
            method: "DELETE"
          });

          if (response.status === 204) {
            alert("Estoque removido com sucesso!");
            carregarEstoques(); // Atualiza a tabela
          } else {
            const erro = await response.text();
            alert("Erro ao remover estoque: " + erro);
          }
        } catch (err) {
          alert("Erro de comunicação com o servidor: " + err.message);
          console.error("Erro ao remover estoque:", err);
        }
      });
    });

  } catch (error) {
    console.error("Erro ao carregar dados:", error);
    alert("Erro ao carregar dados para os estoques: " + error.message);
  }
}
