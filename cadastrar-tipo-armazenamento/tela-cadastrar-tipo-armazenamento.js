const editId = new URLSearchParams(window.location.search).get("editId");
const inputNomeTipoArmazenamento = document.getElementById("input-nome-tipo-armazenamento");
const selectTipoMedicamento = document.getElementById("dropdown");
const inputCapacidade = document.getElementById("input-capacidade");
const tabelaListagemBody = document.getElementById("tabela-listagem-body");
let listaCapacidades = [];

loadTipoMedicamentoOptions();

const botaoAdicionarCapacidade = document.getElementById("botao-adicionar-capacidade");
botaoAdicionarCapacidade.addEventListener("click", e => {
    const newId = parseInt(selectTipoMedicamento.options[selectTipoMedicamento.selectedIndex].value);
    const newNome = selectTipoMedicamento.options[selectTipoMedicamento.selectedIndex].innerText;
    const capacidade = parseInt(inputCapacidade.value);

    const existList = listaCapacidades.find(capacidade => capacidade.id === newId);
    console.log("Lista capacidades: " + listaCapacidades);
    if (existList) {
        alert("Erro! Tipo já adicionado!");
        return;
    }
    listaCapacidades.push({
        id: newId,
        nome: newNome,
        quantidade: capacidade
    });
    const newRow = document.createElement('tr');
    newRow.classList.add("tabela-listagem-body-row");
    newRow.setAttribute("data-tipo-medicamento-id", newId);
    newRow.innerHTML = `
        <td class="paragrafo3">${newNome}</td>
        <td class="paragrafo3">${capacidade}</td>
        <td class="tabela-listagem-edit-remove-icons">
            <button id="botao-deletar-${newId}" class="botao-deletar"><img src="/Recursos/lixo-icon.png" alt=""></button>
        </td>`;
    tabelaListagemBody.appendChild(newRow);

    document.getElementById("botao-deletar-" + newId).addEventListener("click", e => handleBotaoDeletar(e, newId));

});


if (editId) {
    // BUSCAR VALORES EXISTENTES
    carregarDadosAtuais(editId).then(response => {
        let tipoArmazenamento = response[0];
        let tiposMedicamentos = response[1];
        inputNomeTipoArmazenamento.value = tipoArmazenamento.nome;
        tiposMedicamentos.forEach(capacidade => {
            listaCapacidades.push({
                id: capacidade.idTipoMedicamento,
                nome: capacidade.nomeTipoMedicamento,
                quantidade: capacidade.quantidade
            })

            const newRow = document.createElement('tr');
            newRow.classList.add("tabela-listagem-body-row");
            newRow.setAttribute("data-tipo-medicamento-id", capacidade.idTipoMedicamento);
            newRow.innerHTML = `
        <td class="paragrafo3">${capacidade.nomeTipoMedicamento}</td>
        <td class="paragrafo3">${capacidade.quantidade}</td>
        <td class="tabela-listagem-edit-remove-icons">
            <button id="botao-deletar-${capacidade.idTipoMedicamento}" class="botao-deletar"><img src="/Recursos/lixo-icon.png" alt=""></button>
        </td>`;
            tabelaListagemBody.appendChild(newRow);

            document.getElementById("botao-deletar-" + capacidade.idTipoMedicamento).addEventListener("click", e => handleBotaoDeletar(e, capacidade.idTipoMedicamento));
        });
    });

    // BOTAO DE CRIAR EDITA
    const botaoCriar = document.getElementById("botao-criar");
    botaoCriar.addEventListener("click", e => {
        handleBotaoEditar(e);
        window.location.assign("http://127.0.0.1:5500/listar-tipo-armazenamento/tela-listar-tipo-armazenamento.html");
    });
    console.log(listaCapacidades)
} else {
    // CRIAR NOVO
    const botaoCriar = document.getElementById("botao-criar");
    botaoCriar.addEventListener("click", e => {
        handleBotaoCriar(e);
        window.location.assign("http://127.0.0.1:5500/listar-tipo-armazenamento/tela-listar-tipo-armazenamento.html");
    });


}

async function loadTipoMedicamentoOptions() {
    const tiposDeMedicamento = await getTiposDeMedicamento();
    tiposDeMedicamento.forEach(tipoDeMedicamento => {
        const option = document.createElement("option");
        option.value = tipoDeMedicamento.id;
        option.innerText = tipoDeMedicamento.nome;
        selectTipoMedicamento.appendChild(option);
    });
}
function getTiposDeMedicamento() {
    return fetch("http://127.0.0.1:8080/api/tipos-medicamentos").then(response => {
        if (!response.ok) {
            alert("Erro! Não foi possível buscar os tipos de medicamento.")
            throw new Error("Erro! Não foi possível buscar os tipos de medicamento.");
        }

        return response.json();
    });
}

function handleBotaoDeletar(e, id) {
    listaCapacidades = listaCapacidades.filter(capacidade => {
        return capacidade.id !== id;
    });

    tabelaListagemBody.removeChild(
        document.querySelector(`tr[data-tipo-medicamento-id="${id}"]`)
    );
}

function handleBotaoCriar(e) {
    if (!inputNomeTipoArmazenamento.value) {
        alert("Erro! Nome de tipo armazenamento inválido.");
        return;
    }

    fetch("http://127.0.0.1:8080/api/tipos-armazenamento", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(criarPostBody())
    }).then(response => {
        if (!(response.status === 201)) {
            alert("Erro! Não foi possível criar.")
            throw new Error("Erro! Status:" + response.status)
        }
    })
    console.log("Post body: " + criarPostBody());
}

function handleBotaoEditar(e) {
    if (!inputNomeTipoArmazenamento.value) {
        alert("Erro! Nome de tipo armazenamento inválido.");
        return;
    }

    fetch("http://127.0.0.1:8080/api/tipos-armazenamento/"+editId, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(criarPostBody())
    }).then(response => {
        if (!(response.status === 200)) {
            alert("Erro! Não foi possível criar.")
            throw new Error("Erro! Status:" + response.status)
        }
        
    })
    console.log("Post body: " + criarPostBody());

}


function criarPostBody() {
    return {
        id: editId,
        nome: inputNomeTipoArmazenamento.value,
        capacidades: listaCapacidades
    }
}

async function carregarDadosAtuais(id) {
    const promiseTipoArmazenamento = fetch("http://127.0.0.1:8080/api/tipos-armazenamento/" + id);
    const promiseTipoArmazenamentoTipoMedicamento = fetch("http://127.0.0.1:8080/api/tipos-armazenamento/" + id + "/tipos-medicamento");

    const responseTipoArmazenamento = await promiseTipoArmazenamento;
    const responseTipoArmazenamentoTipoMedicamento = await promiseTipoArmazenamentoTipoMedicamento;

    if (!(responseTipoArmazenamento.ok && responseTipoArmazenamentoTipoMedicamento.ok)) {
        alert("Erro ao carregar dados!");
        throw new Error("Erro ao carregar os dados da api!");
    }

    let tipoArmazenamento = (await responseTipoArmazenamento.json());
    let tiposMedicamentos = (await responseTipoArmazenamentoTipoMedicamento.json())

    return [tipoArmazenamento, tiposMedicamentos];


}