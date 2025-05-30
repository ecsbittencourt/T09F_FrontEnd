async function buscarTiposEstoque() {
  const res = await fetch("http://127.0.0.1:8080/api/tipos-estoque");
  if (!res.ok) throw new Error("Erro ao buscar tipos de estoque");
  return res.json();
}

async function buscarSetores() {
  const res = await fetch("http://127.0.0.1:8080/api/setores");
  if (!res.ok) throw new Error("Erro ao buscar setores");
  return res.json();
}

async function buscarSalas() {
  const res = await fetch("http://127.0.0.1:8080/api/salas");
  if (!res.ok) throw new Error("Erro ao buscar salas");
  return res.json();
}

async function buscarEstoque(id) {
  const res = await fetch("http://127.0.0.1:8080/api/estoques/" + id);
  if (!res.ok) throw new Error("Erro ao buscar estoque!");
  return res.json();
}

function popularSelect(idSelect, dados, textoPadrao) {
  const select = document.getElementById(idSelect);
  select.innerHTML = `<option value="" disabled selected hidden>${textoPadrao}</option>`;
  dados.forEach(item => {
    const option = document.createElement("option");
    option.value = item.id;
    // Se a propriedade nome existir, use ela; senão, tenta numero ou valor
    option.textContent = item.nome ?? item.numero ?? item.valor ?? "Sem nome";
    select.appendChild(option);
  });
}

async function inicializar() {
  let editId = new URLSearchParams(window.location.search).get("editId");
  try {
    const tiposEstoque = await buscarTiposEstoque();
    popularSelect("select-tipo-estoque", tiposEstoque, "Selecione o tipo de estoque...");

    const setores = await buscarSetores();
    popularSelect("select-setor", setores, "Selecione o setor...");

    const salas = await buscarSalas();
    popularSelect("select-sala", salas, "Selecione a sala...");
    if (editId) {
      buscarEstoque(editId).then(estoque => {
        document.getElementById("input-nome-estoque").value = estoque.nome;
        document.getElementById("select-tipo-estoque").value = estoque.idTipoEstoque;
        document.getElementById("select-setor").value = estoque.idSetor;
        document.getElementById("select-sala").value = estoque.idSala;
      })

    }
  } catch (error) {
    alert("Erro ao carregar dados para os selects: " + error.message);
  }
}

async function editarEstoque(id) {
  const nome = document.getElementById("input-nome-estoque").value.trim();
  const tipoEstoqueId = document.getElementById("select-tipo-estoque").value;
  const setorId = document.getElementById("select-setor").value;
  const salaId = document.getElementById("select-sala").value;

  if (!nome || !tipoEstoqueId || !setorId || !salaId) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const body = {
    id: id,
    nome: nome,
    idTipoEstoque: parseInt(tipoEstoqueId),
    idSetor: parseInt(setorId),
    idSala: parseInt(salaId)
  };

  try {
    const response = await fetch("http://127.0.0.1:8080/api/estoques/"+id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      alert("Estoque editado com sucesso!");
      window.location.href = "/listar-estoques/tela-listar-estoques.html";
    } else {
      const erro = await response.json();
      alert("Erro ao criar estoque: " + erro);
    }
  } catch (error) {
    alert("Erro de comunicação: ");
  }
}

async function criarEstoque() {
  const nome = document.getElementById("input-nome-estoque").value.trim();
  const tipoEstoqueId = document.getElementById("select-tipo-estoque").value;
  const setorId = document.getElementById("select-setor").value;
  const salaId = document.getElementById("select-sala").value;

  if (!nome || !tipoEstoqueId || !setorId || !salaId) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const body = {
    nome: nome,
    idTipoEstoque: parseInt(tipoEstoqueId),
    idSetor: parseInt(setorId),
    idSala: parseInt(salaId)
  };

  try {
    const response = await fetch("http://127.0.0.1:8080/api/estoques", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      alert("Estoque criado com sucesso!");
      window.location.href = "/listar-estoques/tela-listar-estoques.html";
    } else {
      const erro = await response.text();
      alert("Erro ao criar estoque: " + erro);
    }
  } catch (error) {
    alert("Erro de comunicação: " + error.message);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  inicializar();

  let editId = new URLSearchParams(window.location.search).get("editId");
  if (!editId) {
    document.getElementById("btn-criar-estoque").addEventListener("click", criarEstoque);
  } else {
    document.getElementById("btn-criar-estoque").addEventListener("click", () => editarEstoque(editId))
  }

  document.getElementById("btn-cancelar").addEventListener("click", () => {
    window.location.href = "/listar-estoques/tela-listar-estoques.html";
  });
});
