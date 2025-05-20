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
