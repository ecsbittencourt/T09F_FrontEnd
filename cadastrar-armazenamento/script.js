document.addEventListener("DOMContentLoaded", async function () {
    const codigoInput = document.getElementById("codigo-input");
    const setorDropdown = document.getElementById("setor-dropdown");
    const salaDropdown = document.getElementById("sala-dropdown");
    const tipoArmazenamentoDropdown = document.getElementById("tipo-armazenamento-dropdown");
    const botaoCriar = document.getElementById("botao-criar");
    const botaoCancelar = document.getElementById("botao-cancelar");

    async function carregarDropdown(endpoint, dropdown) {
        try {
            const response = await fetch(`http://localhost:8080/api/${endpoint}`);
            if (!response.ok) throw new Error("Erro ao buscar dados");
            const dados = await response.json();

            dados.forEach(item => {
                const option = document.createElement("option");
                option.value = item.id;
                option.textContent = item.nome;
                dropdown.appendChild(option);
            });
        } catch (error) {
            alert("Erro ao carregar dados: " + error.message);
        }
    }

    async function carregarDropdownSala(endpoint, dropdown) {
        try {
            const response = await fetch(`http://localhost:8080/api/${endpoint}`);
            if (!response.ok) throw new Error("Erro ao buscar dados");
            const dados = await response.json();

            dados.forEach(item => {
                const option = document.createElement("option");
                option.value = item.id;
                option.textContent = item.numero;
                dropdown.appendChild(option);
            });
        } catch (error) {
            alert("Erro ao carregar dados: " + error.message);
        }
    }

    await carregarDropdown("setores", setorDropdown);
    await carregarDropdownSala("salas", salaDropdown);
    await carregarDropdown("tipos-armazenamento", tipoArmazenamentoDropdown);

    botaoCriar.addEventListener("click", async function () {
        const codigo = codigoInput.value.trim();
        const idSala = salaDropdown.value;
        const idTipoArmazenamento = tipoArmazenamentoDropdown.value;

        if (!codigo || !idSala || !idTipoArmazenamento) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const armazenamento = {
            codigo,
            idSala,
            idTipoArmazenamento
        };

        try {
            const response = await fetch("http://localhost:8080/api/armazenamentos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(armazenamento)
            });

            if (!response.ok) throw new Error("Erro ao salvar armazenamento");
            alert("Armazenamento salvo com sucesso!");
            window.location.href = "/listar-armazenamentos/tela-listar-armazenamentos.html";
        } catch (error) {
            alert("Erro ao salvar: " + error.message);
        }
    });

    botaoCancelar.addEventListener("click", () => {
        window.location.href = "/listar-armazenamentos/tela-listar-armazenamentos.html";
    });
});
