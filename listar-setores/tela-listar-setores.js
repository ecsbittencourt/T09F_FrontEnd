// Função para buscar setores no localStorage
function getSetores() {
  const obj = JSON.parse(localStorage.getItem("t09f_setores"));
  if (!obj || !Array.isArray(obj.values)) return [];
  return obj.values;
}

// Função para salvar setores no localStorage
function setSetores(values) {
  const obj = JSON.parse(localStorage.getItem("t09f_setores")) || { nextIndex: 1 };
  obj.values = values;
  localStorage.setItem("t09f_setores", JSON.stringify(obj));
}

// Função para renderizar a tabela com setores
function renderSetores() {
  const setores = getSetores();
  const tbody = document.querySelector(".tabela-listagem-body");
  tbody.innerHTML = ""; // limpa tabela antes de inserir

  setores.forEach(({ id, value }) => {
    const tr = document.createElement("tr");
    tr.classList.add("tabela-listagem-body-row");

    tr.innerHTML = `
      <td class="paragrafo3">${id}</td>
      <td class="paragrafo3">${value}</td>
      <td class="tabela-listagem-edit-remove-icons">
        <button class="btn-editar" title="Editar"><img src="/Recursos/lapis-icon.png" alt="Editar"></button>
        <button class="btn-excluir" title="Excluir"><img src="/Recursos/lixo-icon.png" alt="Excluir"></button>
      </td>
    `;

    // Evento excluir
    tr.querySelector(".btn-excluir").addEventListener("click", () => {
      excluirSetor(id);
    });

    // Evento editar - redireciona para a página de criação/edição com id do setor
    tr.querySelector(".btn-editar").addEventListener("click", () => {
      window.location.href = `/cadastrar-setor/tela-cadastrar-setor.html?editId=${id}`;
    });

    tbody.appendChild(tr);
  });
}

// Função para excluir setor pelo id
function excluirSetor(id) {
  let setores = getSetores();
  setores = setores.filter(setor => setor.id !== id);
  setSetores(setores);
  renderSetores();
}

// Inicializa renderização ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
  renderSetores();
});
