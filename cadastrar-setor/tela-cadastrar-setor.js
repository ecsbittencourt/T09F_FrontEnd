const cadastrarSetor = async (event) => {
  event.preventDefault();

  const medidaValor = document.getElementById("input-setor").value.trim();

  if (!medidaValor) {
    alert("Por favor, informe a unidade de medida.");
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:8080/api/setores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: medidaValor })
    });

    if (!response.ok) {
      alert("Erro ao criar setor.");
      return;
    }

    alert("Setor criada com sucesso!");
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
