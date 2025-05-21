// tela-criar-fornecedor.js
// Script para a tela de criar fornecedor: criar novo ou editar existente

const LS_KEY = "hospital_fornecedores";

function getFornecedores() {
  const data = localStorage.getItem(LS_KEY);
  return data ? JSON.parse(data) : [];
}

function saveFornecedores(fornecedores) {
  localStorage.setItem(LS_KEY, JSON.stringify(fornecedores));
}

function preencherFormularioParaEditar() {
  const index = localStorage.getItem("hospital_fornecedor_editar_index");
  const dados = localStorage.getItem("hospital_fornecedor_editar_dados");

  if (index !== null && dados) {
    const fornecedor = JSON.parse(dados);

    document.getElementById("input-nome").value = fornecedor.nome;
    document.getElementById("input-telefone").value = fornecedor.telefone;
    document.getElementById("input-email").value = fornecedor.email;
    document.getElementById("input-cnpj").value = fornecedor.cnpj;

    document.getElementById("botao-criar-fornecedor").textContent = "Salvar";
  }
}

function criarOuSalvarFornecedor() {
  const nome = document.getElementById("input-nome").value.trim();
  const telefone = document.getElementById("input-telefone").value.trim();
  const email = document.getElementById("input-email").value.trim();
  const cnpj = document.getElementById("input-cnpj").value.trim();

  if (!nome || !telefone || !email || !cnpj) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  let fornecedores = getFornecedores();
  const index = localStorage.getItem("hospital_fornecedor_editar_index");

  if (index !== null) {
    fornecedores[index] = { nome, telefone, email, cnpj };
    alert("Fornecedor atualizado com sucesso!");
  } else {
    fornecedores.push({ nome, telefone, email, cnpj });
    alert("Fornecedor criado com sucesso!");
  }

  saveFornecedores(fornecedores);

  localStorage.removeItem("hospital_fornecedor_editar_index");
  localStorage.removeItem("hospital_fornecedor_editar_dados");

  window.location.href = "/listar-fornecedores/tela-listar-fornecedores.html";
}

document.addEventListener("DOMContentLoaded", () => {
  preencherFormularioParaEditar();

  document.getElementById("botao-criar-fornecedor").addEventListener("click", criarOuSalvarFornecedor);

  document.querySelector(".botao.botao-branco").addEventListener("click", () => {
    localStorage.removeItem("hospital_fornecedor_editar_index");
    localStorage.removeItem("hospital_fornecedor_editar_dados");

    window.location.href = "/listar-fornecedores/tela-listar-fornecedores.html";
  });
});
