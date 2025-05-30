document.addEventListener("DOMContentLoaded", () => {
  carregarEstoques();
});

async function carregarEstoques() {
  const baseURL = "http://127.0.0.1:8080/api";

  try {
    // Buscar tipos de estoque
    const resTipos = await fetch(`${baseURL}/estoques/tipos`);
    if (!resTipos.ok) throw new Error("Erro ao buscar tipos de estoque");
    const tiposEstoque = await resTipos.json();

    // Criar mapa id -> nome do tipo de estoque
    const mapaTiposEstoque = {};
    tiposEstoque.forEach(tipo => {
      mapaTiposEstoque[tipo.id] = tipo.nome;
    });

    // Buscar salas
    const resSalas = await fetch(`${baseURL}/estoques/salas`);
    if (!resSalas.ok) throw new Error("Erro ao buscar salas");
    const salas = await resSalas.json();

    // Criar mapa id -> número da sala
    const mapaSalas = {};
    salas.forEach(sala => {
      mapaSalas[sala.id] = sala.numero;
    });

    // Buscar estoques
    const resEstoques = await fetch(`${baseURL}/estoques`);
    if (!resEstoques.ok) throw new Error("Erro ao buscar estoques");
    const estoques = await resEstoques.json();

    // Popular tabela
    const tabelaBody = document.querySelector(".tabela-listagem-body");
    tabelaBody.innerHTML = "";

    estoques.forEach(estoque => {
      const tipoEstoqueNome = mapaTiposEstoque[estoque.id_t09f_tipo_estoque] || "Desconhecido";
      const numeroSala = mapaSalas[estoque.id_t09f_sala] || "Desconhecida";

      const row = document.createElement("tr");
      row.classList.add("tabela-listagem-body-row");

      row.innerHTML = `
        <td class="paragrafo3">${estoque.nome}</td>
        <td class="paragrafo3">${tipoEstoqueNome}</td>
        <td class="paragrafo3">Sala ${numeroSala}</td>
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
