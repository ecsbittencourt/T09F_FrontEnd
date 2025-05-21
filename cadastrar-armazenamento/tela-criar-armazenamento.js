// tela-criar-armazenamento.js

const LS_KEY = "hospital_armazenamentos";

function getArmazenamentos() {
  const data = localStorage.getItem(LS_KEY);
  return data ? JSON.parse(data) : [];
}

function saveArmazenamentos(armazenamentos) {
  localStorage.setItem(LS_KEY, JSON.stringify(armazenamentos));
}

function preencherFormularioParaEditar() {
  const index = localStorage.getItem("hospital_armazenamento_editar_index");
  const dados = localStorage.getItem("hospital_armazenamento_editar_dados");

  if (index !== null && dados) {
    const a = JSON.parse(dados);

    document.querySelector('input[placeholder="Código"]').value = a.codigo || "";

    // Preencher selects - como seus selects tem opções fixas, vamos selecionar a que bate
    const selects = document.querySelectorAll(".input-dropdown select");
    selects[0].value = a.setor || "";
    selects[1].value = a.sala || "";
    selects[2].value = a.tipo_armazenamento || "";

    // Se você quiser adicionar os campos medicamento e quantidade para edição, deve incluir inputs no HTML
    // Aqui só preenche o que está disponível no form

    document.querySelector(".botao").textContent = "Salvar";
  }
}

function criarOuSalvarArmazenamento() {
  const codigo = document.querySelector('input[placeholder="Código"]').value.trim();

  const selects = document.querySelectorAll(".input-dropdown select");
  const setor = selects[0].value;
  const sala = selects[1].value;
  const tipo_armazenamento = selects[2].value;

  if (!codigo || !setor || !sala || !tipo_armazenamento) {
    alert("Preencha todos os campos.");
    return;
  }

  let armazenamentos = getArmazenamentos();
  const index = localStorage.getItem("hospital_armazenamento_editar_index");

  // Campos adicionais (medicamento, quantidade) não existem no form, então vou deixar vazio
  const medicamento = "";
  const quantidade = "";

  if (index !== null) {
    armazenamentos[index] = { codigo, setor, sala, tipo_armazenamento, medicamento, quantidade };
    alert("Armazenamento atualizado com sucesso!");
  } else {
    armazenamentos.push({ codigo, setor, sala, tipo_armazenamento, medicamento, quantidade });
    alert("Armazenamento criado com sucesso!");
  }

  saveArmazenamentos(armazenamentos);

  localStorage.removeItem("hospital_armazenamento_editar_index");
  localStorage.removeItem("hospital_armazenamento_editar_dados");

  window.location.href = "/listar-armazenamentos/tela-listar-armazenamentos.html";
}

document.addEventListener("DOMContentLoaded", () => {
  preencherFormularioParaEditar();

  document.querySelector(".botao").addEventListener("click", criarOuSalvarArmazenamento);

  document.querySelector(".botao.botao-branco").addEventListener("click", () => {
    localStorage.removeItem("hospital_armazenamento_editar_index");
    localStorage.removeItem("hospital_armazenamento_editar_dados");

    window.location.href = "/listar-armazenamentos/tela-listar-armazenamentos.html";
  });
});
