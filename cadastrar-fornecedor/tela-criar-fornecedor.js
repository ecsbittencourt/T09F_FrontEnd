async function criarFornecedorAPI() {
  const nome = document.getElementById("input-nome").value.trim();
  const telefone = document.getElementById("input-telefone").value.trim();
  const email = document.getElementById("input-email").value.trim();
  const cnpj = document.getElementById("input-cnpj").value.trim();
 
  if (!nome || !telefone || !email || !cnpj) {
    alert("Por favor, preencha todos os campos.");
    return;
  }
 
  const fornecedor = { nome, telefone, email, cnpj };
 
  try {
    const response = await fetch("http://127.0.0.1:8080/api/fornecedores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fornecedor)
    });
 
    if (response.ok) {
      alert("Fornecedor criado com sucesso!");
      window.location.href = "/listar-fornecedores/tela-listar-fornecedores.html";
    } else {
      const erro = await response.text();
      alert("Erro ao criar fornecedor: " + erro);
    }
 
  } catch (error) {
    alert("Erro ao criar fornecedor: " + error.message);
  }
}
 
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("botao-criar-fornecedor").addEventListener("click", criarFornecedorAPI);
 
  document.querySelector(".botao.botao-branco").addEventListener("click", () => {
    window.location.href = "/listar-fornecedores/tela-listar-fornecedores.html";
  });
});