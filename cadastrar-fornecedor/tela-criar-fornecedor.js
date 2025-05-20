let handleCreateFornecedor = (event) => {
    event.preventDefault();

    let nome = document.getElementById("input-nome").value.trim();
    let telefone = document.getElementById("input-telefone").value.trim();
    let email = document.getElementById("input-email").value.trim();
    let cnpj = document.getElementById("input-cnpj").value.trim();

    if (!nome || !telefone || !email || !cnpj) {
        alert("Preencha todos os campos!");
        return;
    }

    let data = JSON.parse(localStorage.getItem("t09f_fornecedores"));

    if (!data || !Array.isArray(data.fornecedores)) {
        data = {
            nextId: 2,
            fornecedores: [
                { id: 1, nome, telefone, email, cnpj }
            ]
        };
        localStorage.setItem("t09f_fornecedores", JSON.stringify(data));
        alert("Fornecedor salvo com sucesso!");
    } else {
        let { nextId, fornecedores } = data;

        let jaExiste = fornecedores.some(f => f.cnpj === cnpj);
        if (jaExiste) {
            alert("Fornecedor com este CNPJ já existe!");
            return;
        }

        fornecedores.push({ id: nextId, nome, telefone, email, cnpj });
        localStorage.setItem("t09f_fornecedores", JSON.stringify({
            nextId: nextId + 1,
            fornecedores
        }));

        alert("Fornecedor salvo com sucesso!");
    }

    document.getElementById("input-nome").value = "";
    document.getElementById("input-telefone").value = "";
    document.getElementById("input-email").value = "";
    document.getElementById("input-cnpj").value = "";
};

document.getElementById("botao-criar-fornecedor").addEventListener("click", handleCreateFornecedor);

["input-nome", "input-telefone", "input-email", "input-cnpj"].forEach(id => {
    document.getElementById(id).addEventListener("keydown", (e) => {
        if (e.key === "Enter") handleCreateFornecedor(e);
    });
});
