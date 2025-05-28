async function carregarFornecedores() {
  try {
    const response = await fetch("http://127.0.0.1:8080/api/fornecedores");
    if (!response.ok) throw new Error("Erro ao carregar fornecedores");
    const fornecedores = await response.json();
    const tbody = document.querySelector(".tabela-listagem-body");
    tbody.innerHTML = "";
 
    fornecedores.forEach(fornecedor => {
      const tr = document.createElement("tr");
      tr.classList.add("tabela-listagem-body-row");
 
      tr.innerHTML = `
<td class="paragrafo3">${fornecedor.id}</td>
<td class="paragrafo3">${fornecedor.nome}</td>
<td class="paragrafo3">${fornecedor.telefone}</td>
<td class="paragrafo3">${fornecedor.email}</td>
<td class="paragrafo3">${fornecedor.cnpj}</td>
<td class="tabela-listagem-edit-remove-icons">
<button class="btn-editar" data-id="${fornecedor.id}"><img src="/Recursos/lapis-icon.png" alt="Editar"></button>
<button class="btn-excluir" data-id="${fornecedor.id}"><img src="/Recursos/lixo-icon.png" alt="Excluir"></button>
</td>
      `;
      tbody.appendChild(tr);
    });
 
    // Evento editar
    document.querySelectorAll(".btn-editar").forEach(btn => {
      btn.addEventListener("click", e => {
        const id = e.currentTarget.getAttribute("data-id");
        window.location.href = `/cadastrar-fornecedor/tela-criar-fornecedor.html?editId=${id}`;
      });
    });
 
    // Evento excluir
    document.querySelectorAll(".btn-excluir").forEach(btn => {
      btn.addEventListener("click", async e => {
        const id = e.currentTarget.getAttribute("data-id");
        if (!confirm("Deseja realmente excluir este fornecedor?")) return;
 
        try {
          const res = await fetch(`http://127.0.0.1:8080/api/fornecedores/${id}`, {
            method: "DELETE"
          });
 
          if (res.ok) {
            alert("Fornecedor excluído com sucesso!");
            carregarFornecedores();
          } else {
            const erro = await res.text();
            alert("Erro ao excluir fornecedor: " + erro);
          }
        } catch (err) {
          alert("Erro de comunicação: " + err.message);
        }
      });
    });
 
  } catch (error) {
    alert("Erro ao carregar fornecedores: " + error.message);
  }
}
 
document.addEventListener("DOMContentLoaded", carregarFornecedores);