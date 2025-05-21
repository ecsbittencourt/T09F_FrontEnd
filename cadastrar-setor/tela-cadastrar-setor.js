const cadastrarSetor = (event) => {
  let currSetoresObj = JSON.parse(localStorage.getItem("t09f_setores"));
  let setorValor = document.getElementById("input-setor").value.trim();

  if (!setorValor) {
    event.preventDefault();
    alert("Nome do setor inválido!");
    return;
  }

  if (!currSetoresObj) {
    localStorage.setItem(
      "t09f_setores",
      JSON.stringify({
        nextIndex: 2,
        values: [{ id: 1, value: setorValor }]
      })
    );
    document.getElementById("input-setor").value = "";
    return;
  }

  let { nextIndex, values } = currSetoresObj;

  // Verifica se values é array, se não, inicializa
  if (!Array.isArray(values)) {
    values = [];
    nextIndex = 1;
  }

  // Verifica se está editando um setor existente
  const urlParams = new URLSearchParams(window.location.search);
  const editId = urlParams.get("editId");

  if (editId) {
    // Editando setor existente
    let setorParaEditar = values.find((setor) => setor.id == editId);
    if (setorParaEditar) {
      // Verifica se o novo nome já existe em outro setor
      let setorExiste = values.some(
        (setor) => setor.value.toLowerCase() === setorValor.toLowerCase() && setor.id !== editId
      );
      
      if (setorExiste) {
        alert("Já existe um setor com esse nome.");
        return;
      }

      setorParaEditar.value = setorValor; // Atualiza o nome do setor
      localStorage.setItem(
        "t09f_setores",
        JSON.stringify({
          nextIndex,
          values
        })
      );
      alert("Setor editado com sucesso!");
      window.location.href = "/listar-setores/tela-listar-setores.html"; // Redireciona para a página de listagem
      return;
    } else {
      alert("Setor não encontrado.");
      return;
    }
  }

  // Cria um novo setor caso não esteja editando
  let setorExiste = values.some(
    (setor) => setor.value.toLowerCase() === setorValor.toLowerCase()
  );

  if (setorExiste) {
    alert("Setor já existe!");
    return;
  }

  let novoSetor = { id: nextIndex, value: setorValor };

  localStorage.setItem(
    "t09f_setores",
    JSON.stringify({
      nextIndex: nextIndex + 1,
      values: [...values, novoSetor]
    })
  );

  document.getElementById("input-setor").value = "";
};

let criarBtn = document.getElementById("botao-criar-setor");
criarBtn.addEventListener("click", (e) => cadastrarSetor(e));

document.getElementById("input-setor").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    cadastrarSetor(e);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  // Pega o parâmetro 'editId' da URL
  const urlParams = new URLSearchParams(window.location.search);
  const editId = urlParams.get("editId");

  // Se o parâmetro editId não estiver presente, só continua com o campo vazio
  if (editId) {
    // Busca setores no localStorage
    const setores = JSON.parse(localStorage.getItem("t09f_setores"))?.values || [];

    // Encontra o setor com o id correspondente
    const setorParaEditar = setores.find(setor => setor.id == editId);

    if (setorParaEditar) {
      // Preenche o campo de input com o nome do setor
      document.getElementById("input-setor").value = setorParaEditar.value;

      // Opcional: você pode alterar o título ou algo mais, indicando que está no modo de edição
      document.querySelector(".titulo2").innerText = `Editar Setor: ${setorParaEditar.value}`;
    } else {
      alert("Setor não encontrado.");
    }
  }
});
