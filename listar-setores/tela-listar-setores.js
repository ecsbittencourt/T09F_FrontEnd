// Recupera setores do localStorage
function getSetores() {
  const obj = JSON.parse(localStorage.getItem("t09f_setores"));
  if (!obj || !Array.isArray(obj.values)) return [];
  return obj.values;
}

// Salva setores no localStorage mantendo nextIndex
function setSetores(values) {
  const obj = JSON.parse(localStorage.getItem("t09f_setores")) || { nextIndex: 1 };
  obj.values = values;
  localStorage.setItem("t09f_setores", JSON.stringify(obj));
}

// Renderiza a tabela de setores
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

    // Evento editar (aqui só alerta, pode ser adaptado depois)
    tr.querySelector(".btn-editar").addEventListener("click", () => {
      alert(`Aqui você pode implementar a edição do setor de ID ${id} - "${value}"`);
      // ou redirecione para página de edição se tiver, por exemplo:
      // window.location.href = `/editar-setor.html?id=${id}`;
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
