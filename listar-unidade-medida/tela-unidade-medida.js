async function listarUnidades() {
  try {
    const response = await fetch("http://127.0.0.1:8080/api/unidades-medida");
    const unidades = await response.json();

    const tbody = document.querySelector(".tabela-listagem-body");
    tbody.innerHTML = "";
    unidades.forEach(({ id, medida }) => {
      const tr = document.createElement("tr");
      tr.classList.add("tabela-listagem-body-row");

      tr.innerHTML = `
        <td class="paragrafo3">${medida}</td>
        <td class="tabela-listagem-edit-remove-icons">
          <button onclick="editarUnidade(${id}, '${medida}')" title="Editar">
            <img src="/Recursos/lapis-icon.png" alt="Editar">
          </button>
          <button onclick="excluirUnidade(${id})" title="Excluir">
            <img src="/Recursos/lixo-icon.png" alt="Excluir">
          </button>
        </td>
      `;

      tbody.appendChild(tr);
    });
  } catch (error) {
    alert("Erro ao listar unidades de medida.");
  }
}

function editarUnidade(id, medidaAtual) {
  // Armazena a unidade selecionada para edição
  localStorage.setItem("editarUnidadeMedida", JSON.stringify({ id, medida: medidaAtual }));

  // Redireciona para a tela de cadastro
  window.location.href = "/cadastrar-unidade-medida/tela-criar-unidade-medida.html";
}

async function excluirUnidade(id) {
  if (!confirm("Deseja excluir esta unidade de medida?")) return;

  try {
    const response = await fetch(`http://127.0.0.1:8080/api/unidades-medida/${id}`, {
      method: "DELETE"
    });

    if (response.ok) {
      alert("Unidade de medida excluída com sucesso!");
      listarUnidades();
    } else {
      alert("Erro ao excluir unidade.");
    }
  } catch (error) {
    alert("Erro desconhecido ao excluir unidade.");
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  await listarUnidades();
} );
