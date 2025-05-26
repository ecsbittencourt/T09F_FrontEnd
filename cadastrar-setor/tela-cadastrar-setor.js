const cadastrarSetor = async (event) => {
  event.preventDefault();

  const setorValor = document.getElementById("input-setor").value.trim();

  if (!setorValor) {
    alert("Por favor, informe o nome do setor.");
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:8080/api/setores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: setorValor })
    });


    console.log(response.body)
    if(response.status == 409){
      alert("Nome de setor já existente.");
      return;
    }
    if (!response.ok) {
      const erro = await response.text();
      alert("Erro ao criar setor.");
      return;
    }

    alert("Setor criado com sucesso!");
    document.getElementById("input-setor").value = "";

  } catch (error) {
    alert("Erro desconhecido");
  }
};

document.getElementById("botao-criar-setor").addEventListener("click", cadastrarSetor);

document.getElementById("input-setor").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    cadastrarSetor(e);
  }
});
