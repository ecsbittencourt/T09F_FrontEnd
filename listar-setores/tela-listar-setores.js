async function listarSetores() {
  try {
    const response = await fetch("http://127.0.0.1:8080/api/setores");
    const setores = await response.json();

    const tbody = document.querySelector(".tabela-listagem-body");
    tbody.innerHTML = "";

    setores.forEach(({ id, nome }) => {
      const tr = document.createElement("tr");
      tr.classList.add("tabela-listagem-body-row");

      tr.innerHTML = `
        <td class="paragrafo3">${id}</td>
        <td class="paragrafo3">${nome}</td>
        <td class="tabela-listagem-edit-remove-icons">
          <button onclick="editarSetor(${id}, '${nome}')" title="Editar">
            <img src="/Recursos/lapis-icon.png" alt="Editar">
          </button>
          <button onclick="excluirSetor(${id})" title="Excluir">
            <img src="/Recursos/lixo-icon.png" alt="Excluir">
          </button>
        </td>
      `;

      tbody.appendChild(tr);
    });
  } catch (error) {
    alert("Erro ao listar setores.");
  }
}

async function excluirSetor(id) {
  if (!confirm("Deseja excluir este setor?")) return;

  try {
    const response = await fetch(`http://127.0.0.1:8080/api/setores/${id}`, {
      method: "DELETE"
    });

    if (response.ok) {
      alert("Setor excluído com sucesso!");
      listarSetores();
    } else {
      alert("Erro ao excluir setor.");
    }
  } catch (error) {
    alert("Erro desconhecido ao excluir setor.");
  }
}

function editarSetor(id, nomeAtual) {
  const novoNome = prompt("Digite o novo nome do setor:", nomeAtual);
  if (!novoNome || !novoNome.trim()) return;

  fetch(`http://127.0.0.1:8080/api/setores/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome: novoNome.trim() })
  })
  .then(response => {
    if (response.ok) {
      alert("Setor atualizado com sucesso!");
      listarSetores();
    } else {
      alert("Erro ao atualizar setor.");
    }
  })
  .catch(() => alert("Erro desconhecido ao atualizar setor."));
}

window.addEventListener("DOMContentLoaded", listarSetores);
