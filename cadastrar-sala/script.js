document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const editId = urlParams.get("editId");

  const selectSetor = document.getElementById("opcoes");
  const inputNumero = document.getElementById("nomeNovaSala");
  const btnCriarAtualizar = document.querySelector(".tela-cadastrar-sala-botoes-div .botao");
  const btnVoltar = document.querySelector(".tela-cadastrar-sala-botoes-div .botao-branco");

  const baseURL = "http://127.0.0.1:8080/api";

  // Função para carregar setores no select
  async function carregarSetores() {
    try {
      const res = await fetch(`${baseURL}/setores`);
      if (!res.ok) throw new Error("Erro ao carregar setores");
      const setores = await res.json();

      selectSetor.innerHTML = '<option value="" disabled selected hidden>Setor</option>';
      setores.forEach(setor => {
        const option = document.createElement("option");
        option.value = setor.id;
        option.textContent = setor.nome;
        selectSetor.appendChild(option);
      });

      if (!editId) {
        selectSetor.value = "";
      }
    } catch (error) {
      alert("Erro ao carregar setores: " + error.message);
      console.error("Erro ao carregar setores:", error);
    }
  }

  // Função para carregar dados da sala para edição
  async function carregarSala(id) {
    try {
      console.log("Carregando sala com id:", id);

      // Verifica se id é número válido antes do fetch
      if (!id || isNaN(id)) {
        throw new Error("ID inválido para carregar a sala");
      }

      const res = await fetch(`${baseURL}/salas/${id}`);
      if (!res.ok) throw new Error(`Erro ao buscar sala: ${res.status} ${res.statusText}`);

      const sala = await res.json();
      inputNumero.value = sala.numero;
      selectSetor.value = sala.idSetor;
    } catch (error) {
      alert("Não foi possível carregar os dados da sala. " + error.message);
      console.error("Erro no fetch da sala:", error);
    }
  }

  await carregarSetores();

  if (editId && !isNaN(editId)) {
    await carregarSala(editId);
    btnCriarAtualizar.textContent = "Atualizar";
  } else {
    btnCriarAtualizar.textContent = "Criar";
    selectSetor.value = "";
  }

  // Função para criar ou atualizar sala
  async function cadastrarOuAtualizarSala() {
    const numero = parseInt(inputNumero.value);
    const idSetor = parseInt(selectSetor.value);

    if (!numero || !idSetor) {
      alert("Preencha o número da sala e selecione um setor.");
      return;
    }

    const salaData = { numero, idSetor };

    try {
      let response;
      if (editId && !isNaN(editId)) {
        response = await fetch(`${baseURL}/salas/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(salaData),
        });
      } else {
        response = await fetch(`${baseURL}/salas`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(salaData),
        });
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Erro na requisição");
      }

      alert(editId ? "Sala atualizada com sucesso!" : "Sala criada com sucesso!");
      window.location.href = "/listar-salas/tela-listar-salas.html";
    } catch (err) {
      alert("Erro: " + err.message);
      console.error("Erro ao criar/atualizar sala:", err);
    }
  }

  btnCriarAtualizar.addEventListener("click", cadastrarOuAtualizarSala);
  btnVoltar.addEventListener("click", () => {
    window.location.href = "/listar-salas/tela-listar-salas.html";
  });
});
