
document.addEventListener("DOMContentLoaded", function () {
    const dropdowns = document.querySelectorAll("select.dropdown");

    const setores = JSON.parse(localStorage.getItem("setores")) || [];
    const salas = JSON.parse(localStorage.getItem("salas")) || [];
    const tiposArmazenamento = JSON.parse(localStorage.getItem("tiposArmazenamento")) || [];
    //const medicamentos = JSON.parse(localStorage.getItem("medicamentos")) || [];

    const setorDropdown = dropdowns[0];
    const salaDropdown = dropdowns[1];
    const tipoArmazenamentoDropdown = dropdowns[2];
    const medicamentoDropdown = dropdowns[3];

    function preencherDropdown(dropdown, lista) {
        lista.forEach(function(item) {
            const option = document.createElement("option");
            option.value = item.id;
            option.textContent = item.nome;
            dropdown.appendChild(option);
        });
    }

    preencherDropdown(setorDropdown, setores);
    preencherDropdown(salaDropdown, salas);
    preencherDropdown(tipoArmazenamentoDropdown, tiposArmazenamento);
    //preencherDropdown(medicamentoDropdown, medicamentos);

    const armazenamentoEditando = JSON.parse(localStorage.getItem("armazenamentoEditando"));
    const codigoInput = document.querySelector("input.input-de-texto");
    //const quantidadeInput = document.querySelector("input.input-quantidade");

    if (armazenamentoEditando) {
        codigoInput.value = armazenamentoEditando.codigo;
        setorDropdown.value = armazenamentoEditando.setorId;
        salaDropdown.value = armazenamentoEditando.salaId;
        tipoArmazenamentoDropdown.value = armazenamentoEditando.tipoArmazenamentoId;
        //medicamentoDropdown.value = armazenamentoEditando.medicamentoId;
        //if (quantidadeInput) {
        //    quantidadeInput.value = armazenamentoEditando.quantidade || 0;
        //}

        const botao = document.querySelector(".botao");
        botao.textContent = "Atualizar";
    }

    const botaoCriar = document.querySelector(".botao");
    if (botaoCriar) {
        botaoCriar.addEventListener("click", function () {
            const codigo = codigoInput.value.trim();
            const setorId = parseInt(setorDropdown.value);
            const salaId = parseInt(salaDropdown.value);
            const tipoId = parseInt(tipoArmazenamentoDropdown.value);
           // const medicamentoId = parseInt(medicamentoDropdown.value);
            //const quantidade = quantidadeInput ? parseInt(quantidadeInput.value) : 0;

            if (!codigo || !setorId || !salaId || !tipoId ) {
                alert("Por favor, preencha todos os campos antes de salvar.");
                return;
            }

            const armazenamentos = JSON.parse(localStorage.getItem("armazenamentos")) || [];

            const novoArmazenamento = {
                id: armazenamentoEditando ? armazenamentoEditando.id : Date.now(),
                codigo,
                setorId,
                salaId,
                tipoArmazenamentoId: tipoId,
                
            };

            if (armazenamentoEditando) {
                const index = armazenamentos.findIndex(a => a.id === armazenamentoEditando.id);
                if (index !== -1) {
                    armazenamentos[index] = novoArmazenamento;
                }
            } else {
                armazenamentos.push(novoArmazenamento);
            }

            localStorage.setItem("armazenamentos", JSON.stringify(armazenamentos));
            localStorage.removeItem("armazenamentoEditando");

            alert("Armazenamento salvo com sucesso!");
            window.location.href = "/listar-armazenamentos/tela-listar-armazenamentos.html";
        });
    }

    const botaoCancelar = document.querySelector(".botao.botao-branco");
    if (botaoCancelar) {
        botaoCancelar.addEventListener("click", () => {
            localStorage.removeItem("armazenamentoEditando");
            window.location.href = "/listar-armazenamentos/tela-listar-armazenamentos.html";
        });
    }
});
