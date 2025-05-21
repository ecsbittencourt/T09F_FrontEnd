// tela-listar-fornecedores.js
// Script para a tela de listar fornecedores: exibir, editar, deletar, pesquisar

const LS_KEY = "hospital_fornecedores";

function getFornecedores() {
  const data = localStorage.getItem(LS_KEY);
  return data ? JSON.parse(data) : [];
}

function saveFornecedores(fornecedores) {
  localStorage.setItem(LS_KEY, JSON.stringify(fornecedores));
}

function renderTabela() {
  const fornecedores = getFornecedores();
  const tbody = document.querySelector(".tabela-listagem-body");
  tbody.innerHTML = "";

  fornecedores.forEach((f, index) => {
    const tr = document.createElement("tr");
    tr.classList.add("tabela-listagem-body-row");

    tr.innerHTML = `
      <td class="paragrafo3">${f.nome}</td>
      <td class="paragrafo3">${f.telefone}</td>
      <td class="paragrafo3">${f.email}</td>
      <td class="paragrafo3">${f.cnpj}</td>
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
      editarFornecedor(idx);
    });
  });

  document.querySelectorAll(".deletar-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = btn.dataset.index;
      deletarFornecedor(idx);
    });
  });
}

function deletarFornecedor(index) {
  if (!confirm("Deseja realmente deletar este fornecedor?")) return;

  let fornecedores = getFornecedores();
  fornecedores.splice(index, 1);
  saveFornecedores(fornecedores);
  renderTabela();
}

function editarFornecedor(index) {
  const fornecedores = getFornecedores();
  const fornecedor = fornecedores[index];
  if (!fornecedor) return;

  localStorage.setItem("hospital_fornecedor_editar_index", index);
  localStorage.setItem("hospital_fornecedor_editar_dados", JSON.stringify(fornecedor));

  window.location.href = "/cadastrar-fornecedor/tela-criar-fornecedor.html";
}

function filtrarTabela() {
  const filtro = document.querySelector(".caixa input").value.toLowerCase();
  const trs = document.querySelectorAll(".tabela-listagem-body-row");

  trs.forEach(tr => {
    const nome = tr.cells[0].textContent.toLowerCase();
    const telefone = tr.cells[1].textContent.toLowerCase();
    const email = tr.cells[2].textContent.toLowerCase();
    const cnpj = tr.cells[3].textContent.toLowerCase();

    if (nome.includes(filtro) || telefone.includes(filtro) || email.includes(filtro) || cnpj.includes(filtro)) {
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
