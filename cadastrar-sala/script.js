document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.querySelector("select.dropdown");
    const setores = JSON.parse(localStorage.getItem("setores")) || [];

    setores.forEach(setor => {
        const option = document.createElement("option");
        option.value = setor.id;
        option.textContent = setor.nome;
        dropdown.appendChild(option);
    });
});

function CadastrarSala() {
    const setor = document.getElementById("opcoes").value;
    const sala = document.getElementById("nomeNovaSala").value;

    if (!setor || !sala) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const salas = JSON.parse(localStorage.getItem("salas")) || [];



    // Verifica se já existe uma sala com o mesmo nome no mesmo setor
    const salaExistente = salas.find(s =>
        s.nome.toLowerCase() === sala.toLowerCase() &&
        s.setorId === parseInt(setor)
    );

    if (salaExistente) {
        alert("Já existe uma sala com esse nome neste setor.");
        return;
    }

    const novaSala = {
        id: salas.length + 1,
        nome: sala,
        setorId: parseInt(setor)
    };

    salas.push(novaSala);

    localStorage.setItem("salas", JSON.stringify(salas));

    alert("Sala cadastrada com sucesso!");
}