// tela-listar-armazenamentos.js

const LS_KEY = "hospital_armazenamentos";

function getArmazenamentos() {
  const data = localStorage.getItem(LS_KEY);
  return data ? JSON.parse(data) : [];
}

function saveArmazenamentos(armazenamentos) {
  localStorage.setItem(LS_KEY, JSON.stringify(armazenamentos));
}

function renderTabela() {
  const armazenamentos = getArmazenamentos();
  const tbody = document.querySelector(".tabela-listagem-body");
  tbody.innerHTML = "";

  armazenamentos.forEach((a, index) => {
    const tr = document.createElement("tr");
    tr.classList.add("tabela-listagem-body-row");

    tr.innerHTML = `
      <td class="paragrafo3">${a.codigo}</td>
      <td class="paragrafo3">${a.sala}</td>
      <td class="paragrafo3">${a.tipo_armazenamento}</td>
      <td class="paragrafo3">${a.medicamento}</td>
      <td class="paragrafo3">${a.quantidade}</td>
      <td class="tabela-listagem-edit-remove-icons">
        <button class="editar-btn" data-index="${index}"><img src="/Recursos/lapis-icon.png" alt="Editar"></button>
        <button class="deletar-btn" data-index="${index}"><img src="/Recursos/lixo-icon.png" alt="Deletar"></button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  document.querySelectorAll(".editar-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = btn.dataset.index;
      editarArmazenamento(idx);
    });
  });

  document.querySelectorAll(".deletar-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = btn.dataset.index;
      deletarArmazenamento(idx);
    });
  });
}

function deletarArmazenamento(index) {
  if (!confirm("Deseja realmente deletar este armazenamento?")) return;

  let armazenamentos = getArmazenamentos();
  armazenamentos.splice(index, 1);
  saveArmazenamentos(armazenamentos);
  renderTabela();
}

function editarArmazenamento(index) {
  const armazenamentos = getArmazenamentos();
  const armazenamento = armazenamentos[index];
  if (!armazenamento) return;

  localStorage.setItem("hospital_armazenamento_editar_index", index);
  localStorage.setItem("hospital_armazenamento_editar_dados", JSON.stringify(armazenamento));

  window.location.href = "/cadastrar-armazenamento/tela-criar-armazenamento.html";
}

function filtrarTabela() {
  const filtro = document.querySelector(".caixa input").value.toLowerCase();
  const trs = document.querySelectorAll(".tabela-listagem-body-row");

  trs.forEach(tr => {
    const codigo = tr.cells[0].textContent.toLowerCase();
    const sala = tr.cells[1].textContent.toLowerCase();
    const tipo = tr.cells[2].textContent.toLowerCase();
    const medicamento = tr.cells[3].textContent.toLowerCase();
    const quantidade = tr.cells[4].textContent.toLowerCase();

    if (
      codigo.includes(filtro) ||
      sala.includes(filtro) ||
      tipo.includes(filtro) ||
      medicamento.includes(filtro) ||
      quantidade.includes(filtro)
    ) {
      tr.style.display = "";
    } else {
      tr.style.display = "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderTabela();

  const btnPesquisar = document.querySelector(".caixa button");
  btnPesquisar.addEventListener("click", filtrarTabela);

  const inputPesquisar = document.querySelector(".caixa input");
  inputPesquisar.addEventListener("keyup", filtrarTabela);
});
