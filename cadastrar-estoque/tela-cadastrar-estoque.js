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
  try {
    const tiposEstoque = await buscarTiposEstoque();
    popularSelect("select-tipo-estoque", tiposEstoque, "Selecione o tipo de estoque...");

    const setores = await buscarSetores();
    popularSelect("select-setor", setores, "Selecione o setor...");

    const salas = await buscarSalas();
    popularSelect("select-sala", salas, "Selecione a sala...");
  } catch (error) {
    alert("Erro ao carregar dados para os selects: " + error.message);
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
    id_t09f_tipo_estoque: parseInt(tipoEstoqueId),
    id_t09f_setor: parseInt(setorId),
    id_t09f_sala: parseInt(salaId)
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

  document.getElementById("btn-criar-estoque").addEventListener("click", criarEstoque);

  document.getElementById("btn-cancelar").addEventListener("click", () => {
    window.location.href = "/listar-estoques/tela-listar-estoques.html";
  });
});
