const cadastrarUnidade = async (event) => {
  event.preventDefault();

  const medidaValor = document.getElementById("input-unidade").value.trim();

  if (!medidaValor) {
    alert("Por favor, informe a unidade de medida.");
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:8080/api/unidades-medida", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ medida: medidaValor })
    });

    if (!response.ok) {
      alert("Erro ao criar unidade de medida.");
      return;
    }

    alert("Unidade de medida criada com sucesso!");
    document.getElementById("input-unidade").value = "";

  } catch (error) {
    alert("Erro desconhecido");
  }
};

document.getElementById("botao-criar-unidade").addEventListener("click", cadastrarUnidade);

document.getElementById("input-unidade").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    cadastrarUnidade(e);
  }
});
