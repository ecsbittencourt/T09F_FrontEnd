document.addEventListener("DOMContentLoaded", async function () {
    const codigoInput = document.getElementById("codigo-input");
    const setorDropdown = document.getElementById("setor-dropdown");
    const salaDropdown = document.getElementById("sala-dropdown");
    const tipoArmazenamentoDropdown = document.getElementById("tipo-armazenamento-dropdown");
    const botaoCriar = document.getElementById("botao-criar");
    const botaoCancelar = document.getElementById("botao-cancelar");

    const editId = new URLSearchParams(window.location.search).get("editId");

    async function carregarDropdown(endpoint, dropdown, nomeCampo = "nome") {
        try {
            const response = await fetch(`http://localhost:8080/api/${endpoint}`);
            if (!response.ok) throw new Error("Erro ao buscar dados");
            const dados = await response.json();

            dados.forEach(item => {
                const option = document.createElement("option");
                option.value = item.id;
                option.textContent = item[nomeCampo];
                dropdown.appendChild(option);
            });
        } catch (error) {
            alert("Erro ao carregar dados: " + error.message);
        }
    }

    await carregarDropdown("setores", setorDropdown);
    await carregarDropdown("salas", salaDropdown, "numero");
    await carregarDropdown("tipos-armazenamento", tipoArmazenamentoDropdown);

    // Carrega dados do armazenamento se for edição
    if (editId) {
        try {
            const response = await fetch(`http://localhost:8080/api/armazenamentos/${editId}`);
            if (!response.ok) throw new Error("Erro ao carregar armazenamento");

            const armazenamento = await response.json();
            codigoInput.value = armazenamento.codigo;
            salaDropdown.value = armazenamento.idSala;
            tipoArmazenamentoDropdown.value = armazenamento.idTipoArmazenamento;

            botaoCriar.textContent = "Salvar";
        } catch (error) {
            alert("Erro ao carregar dados do armazenamento: " + error.message);
        }
    }

    botaoCriar.addEventListener("click", async function () {
        const codigo = codigoInput.value.trim();
        const idSala = salaDropdown.value;
        const idTipoArmazenamento = tipoArmazenamentoDropdown.value;

        if (!codigo || !idSala || !idTipoArmazenamento) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const armazenamento = { codigo, idSala, idTipoArmazenamento };

        try {
            let response;
            if (editId) {
                response = await fetch(`http://localhost:8080/api/armazenamentos/${editId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(armazenamento)
                });
            } else {
                response = await fetch("http://localhost:8080/api/armazenamentos", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(armazenamento)
                });
            }

            if (!response.ok) throw new Error("Erro ao salvar armazenamento");
            alert(editId ? "Armazenamento atualizado com sucesso!" : "Armazenamento criado com sucesso!");
            window.location.href = "/listar-armazenamentos/tela-listar-armazenamentos.html";
        } catch (error) {
            alert("Erro ao salvar: " + error.message);
        }
    });

    botaoCancelar.addEventListener("click", () => {
        window.location.href = "/listar-armazenamentos/tela-listar-armazenamentos.html";
    });
});
