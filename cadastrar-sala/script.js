async function carregarSetoresDropdown() {
    const dropdown = document.getElementById("opcoes");
 
    try {
        const response = await fetch("http://127.0.0.1:8080/api/setores");
        const setores = await response.json();
 
        setores.forEach(setor => {
            const option = document.createElement("option");
            option.value = setor.id;
            option.textContent = setor.nome;
            dropdown.appendChild(option);
        });
    } catch (error) {
        alert("Erro ao carregar setores.");
    }
}
 
async function cadastrarSalaAPI() {
    const setorId = document.getElementById("opcoes").value;
    const numeroSala = document.getElementById("nomeNovaSala").value.trim();
 
    if (!setorId || !numeroSala) {
        alert("Por favor, preencha todos os campos.");
        return;
    }
 
    const sala = {
        numero: parseInt(numeroSala),
        idSetor: parseInt(setorId)
    };
 
    try {
        const response = await fetch("http://127.0.0.1:8080/api/salas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sala)
        });
 
        if (response.ok) {
            alert("Sala cadastrada com sucesso!");
            window.location.href = "/listar-salas/tela-listar-salas.html";
        } else {
            const erro = await response.text();
            alert("Erro ao criar sala: " + erro);
        }
 
    } catch (error) {
        alert("Erro ao criar sala: " + error.message);
    }
}
 
document.addEventListener("DOMContentLoaded", () => {
    carregarSetoresDropdown();
 
    document.querySelector(".botao").addEventListener("click", cadastrarSalaAPI);
    document.querySelector(".botao.botao-branco").addEventListener("click", () => {
        window.location.href = "/listar-salas/tela-listar-salas.html";
    });
});