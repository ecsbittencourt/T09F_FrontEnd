const btnCriar = document.getElementById("botao-criar-unidade-medida");
const inputUnidade = document.getElementById("input-unidade-medida");

const unidadeParaEditar = JSON.parse(localStorage.getItem("editarUnidadeMedida"));

if (unidadeParaEditar) {
  inputUnidade.value = unidadeParaEditar.medida;
}

btnCriar.addEventListener("click", async (event) => {
  event.preventDefault();

  const medida = inputUnidade.value.trim();

  if (!medida) {
    alert("Nome da unidade de medida inválido!");
    return;
  }

  try {
    if (unidadeParaEditar) {
      // Atualização
      const response = await fetch(`http://127.0.0.1:8080/api/unidades-medida/${unidadeParaEditar.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ medida })
      });

      if (response.ok) {
        alert("Unidade de medida atualizada com sucesso!");
        localStorage.removeItem("editarUnidadeMedida");
        window.location.href = "http://127.0.0.1:5500/listar-unidade-medida/tela-unidade-medida.html";
      } else {
        alert("Erro ao atualizar unidade de medida.");
      }

    } else {
      // Criação
      const response = await fetch("http://127.0.0.1:8080/api/unidades-medida", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ medida })
      });

      if (response.ok) {
        alert("Unidade de medida criada com sucesso!");
        inputUnidade.value = "";
        window.location.href = "http://127.0.0.1:5500/listar-unidade-medida/tela-unidade-medida.html";
      } else {
        alert("Erro ao criar unidade de medida.");
      }
    }
  } catch (error) {
    alert("Erro ao salvar unidade de medida.");
    console.error(error);
  }
});
