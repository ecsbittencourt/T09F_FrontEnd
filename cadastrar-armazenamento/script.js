document.addEventListener("DOMContentLoaded", function () {
    const dropdowns = document.querySelectorAll("select.dropdown");

    const setores = JSON.parse(localStorage.getItem("setores")) || [];
    const salas = JSON.parse(localStorage.getItem("salas")) || [];
    const tiposArmazenamento = JSON.parse(localStorage.getItem("tiposArmazenamento")) || [];

    const setorDropdown = dropdowns[0];
    const salaDropdown = dropdowns[1];
    const tipoArmazenamentoDropdown = dropdowns[2];

    function preencherDropdown(dropdown, lista) {
        lista.forEach(item => {
            const option = document.createElement("option");
            option.value = item.id;
            option.textContent = item.nome;
            dropdown.appendChild(option);
        });
    }

    preencherDropdown(setorDropdown, setores);
    preencherDropdown(salaDropdown, salas);
    preencherDropdown(tipoArmazenamentoDropdown, tiposArmazenamento);

    const botaoCriar = document.querySelector(".botao");
    botaoCriar.addEventListener("click", function () {
        const codigoInput = document.querySelector("input.input-de-texto");
        const codigo = codigoInput.value.trim();
        const setorId = setorDropdown.value;
        const salaId = salaDropdown.value;
        const tipoId = tipoArmazenamentoDropdown.value;

        if (!codigo || !setorId || !salaId || !tipoId) {
            alert("Por favor, preencha todos os campos antes de criar o armazenamento.");
            return;
        }

        const armazenamentos = JSON.parse(localStorage.getItem("armazenamentos")) || [];

        const novoArmazenamento = {
            id: armazenamentos.length + 1,
            codigo,
            setorId: parseInt(setorId),
            salaId: parseInt(salaId),
            tipoArmazenamentoId: parseInt(tipoId)
        };

        armazenamentos.push(novoArmazenamento);
        localStorage.setItem("armazenamentos", JSON.stringify(armazenamentos));

        alert("Armazenamento criado com sucesso!");

        // Limpar os campos
        codigoInput.value = "";
        setorDropdown.selectedIndex = 0;
        salaDropdown.selectedIndex = 0;
        tipoArmazenamentoDropdown.selectedIndex = 0;
    });
});
