function getUrlParameter(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}
 
async function carregarFornecedorParaEdicao() {
  const editId = getUrlParameter("editId");
  if (!editId) return; // não é edição
 
  try {
    const response = await fetch("http://127.0.0.1:8080/api/fornecedores");
    if (!response.ok) throw new Error("Erro ao carregar fornecedores");
 
    const fornecedores = await response.json();
    const fornecedor = fornecedores.find(f => f.id === parseInt(editId));
 
    if (!fornecedor) {
      alert("Fornecedor não encontrado para edição.");
      return;
    }
 
    document.getElementById("input-nome").value = fornecedor.nome;
    document.getElementById("input-telefone").value = fornecedor.telefone;
    document.getElementById("input-email").value = fornecedor.email;
    document.getElementById("input-cnpj").value = fornecedor.cnpj;
 
    document.getElementById("botao-criar-fornecedor").textContent = "Salvar";
  } catch (error) {
    alert("Erro ao carregar fornecedor: " + error.message);
  }
}
 
async function salvarFornecedor() {
  const nome = document.getElementById("input-nome").value.trim();
  const telefone = document.getElementById("input-telefone").value.trim();
  const email = document.getElementById("input-email").value.trim();
  const cnpj = document.getElementById("input-cnpj").value.trim();
 
  if (!nome || !telefone || !email || !cnpj) {
    alert("Por favor, preencha todos os campos.");
    return;
  }
 
  const fornecedor = { nome, telefone, email, cnpj };
  const editId = getUrlParameter("editId");
  const urlBase = "http://127.0.0.1:8080/api/fornecedores";
 
  try {
    let response;
    if (editId) {
      // PUT para editar
      response = await fetch(`${urlBase}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fornecedor),
      });
    } else {
      // POST para criar
      response = await fetch(urlBase, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fornecedor),
      });
    }
 
    if (response.ok) {
      alert(editId ? "Fornecedor atualizado com sucesso!" : "Fornecedor criado com sucesso!");
      window.location.href = "/listar-fornecedores/tela-listar-fornecedores.html";
    } else {
      const erro = await response.text();
      alert("Erro ao salvar fornecedor: " + erro);
    }
  } catch (error) {
    alert("Erro na comunicação: " + error.message);
  }
}
 
document.addEventListener("DOMContentLoaded", () => {
  carregarFornecedorParaEdicao();
  document.getElementById("botao-criar-fornecedor").addEventListener("click", salvarFornecedor);
});