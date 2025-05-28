document.addEventListener("DOMContentLoaded", () => {
  carregarSalasEMapearSetores();
});
 
async function carregarSalasEMapearSetores() {
  try {
    // Buscar setores primeiro para ter o mapeamento id -> nome
    const resSetores = await fetch("http://127.0.0.1:8080/api/setores");
    console.log(resSetores)
    if (!resSetores.ok) {
       throw new Error("Erro ao carregar setores");
    } 
    const setores = await resSetores.json();
 
    // Criar mapa id -> nome
    const mapaSetores = {};
    setores.forEach(s => {
      mapaSetores[s.id] = s.nome;
    });
 
    // Buscar salas
    const resSalas = await fetch("http://127.0.0.1:8080/api/salas");
    if (!resSalas.ok) throw new Error("Erro ao carregar salas");
    const salas = await resSalas.json();
 
    // Popular tabela
    const tabelaBody = document.querySelector(".tabela-listagem-body");
    tabelaBody.innerHTML = "";
 
    salas.forEach(sala => {
      const setorId = sala.id_t09f_setor ?? sala.idSetor;
      const nomeSetor = mapaSetores[setorId] || "Setor desconhecido";
 
      const row = document.createElement("tr");
      row.classList.add("tabela-listagem-body-row");
 
      row.innerHTML = `
<td class="paragrafo3">Sala ${sala.numero}</td>
<td class="paragrafo3">${nomeSetor}</td>
<td class="tabela-listagem-edit-remove-icons">
<button class="btn-editar" data-id="${sala.id}"><img src="/Recursos/lapis-icon.png" alt="Editar"></button>
<button class="btn-remover" data-id="${sala.id}"><img src="/Recursos/lixo-icon.png" alt="Remover"></button>
</td>
      `;
 
      tabelaBody.appendChild(row);
    });
 
    // Adicionar eventos para editar
    document.querySelectorAll(".btn-editar").forEach(btn => {
      btn.addEventListener("click", e => {
        const id = e.currentTarget.getAttribute("data-id");
        window.location.href = `/cadastrar-sala/tela-cadastrar-sala.html?editId=${id}`;
      });
    });
 
    // Adicionar eventos para remover
    document.querySelectorAll(".btn-remover").forEach(btn => {
      btn.addEventListener("click", async e => {
        const id = e.currentTarget.getAttribute("data-id");
        if (!confirm("Deseja realmente remover esta sala?")) return;
 
        try {
          const res = await fetch(`/api/salas/${id}`, { method: "DELETE" });
          if (res.ok) {
            alert("Sala removida com sucesso!");
            carregarSalasEMapearSetores();
          } else {
            const erro = await res.text();
            alert("Erro ao remover sala: " + erro);
          }
        } catch (err) {
          alert("Erro de comunicação: " + err.message);
        }
      });
    });
 
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    alert("Erro ao carregar dados: " + error.message);
  }
}