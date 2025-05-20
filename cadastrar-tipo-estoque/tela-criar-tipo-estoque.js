let btnCriar = document.getElementById("botao-criar-tipo-estoque");
let inputTipoEstoque = document.getElementById("input-tipo-estoque");
let editId = new URLSearchParams(window.location.search).get("editId");

const handleEditTipoEstoque = (e) => {
    let newValue = inputTipoEstoque.value;
    if (!newValue) {
        e.preventDefault();
        alert("Nome do tipo inválido!");
        return;
    }

    
    let {nextIndex, values} = JSON.parse(localStorage.getItem("t09f-tipo-estoque"));
    let filtered = (values.filter((tipoEstoque) => {
        return compareTipoEstoque(tipoEstoque, {value:newValue});
    }));
    if (filtered.length > 0) {
        alert("Tipo estoque já existe!");
        return;
    }

    const otherValues = values.filter(value => !(value.id == editId));
    if(otherValues.length === values.length) {
        alert("Erro! Id não existente!");
        return;
    }

    localStorage.setItem("t09f-tipo-estoque", JSON.stringify({
        nextIndex,
        values: [...otherValues, {id: editId, value: newValue}]
    }));
    inputTipoEstoque.value = "";

}

const handleCriarTipoEstoque = (event) => {
    let newValue = inputTipoEstoque.value;
    if (!newValue) {
        event.preventDefault();
        alert("Nome do tipo inválido!");
        return;
    }

    let retrieved = JSON.parse(localStorage.getItem("t09f-tipo-estoque"));
    if (!retrieved) {
        localStorage.setItem("t09f-tipo-estoque", JSON.stringify({
            nextIndex: 2,
            values: [{
                id: 1,
                value: newValue
            }]
        }))
        inputTipoEstoque.value = "";
        return;
    }

    let { nextIndex, values } = retrieved;
    let newTipoEstoque = { id: nextIndex, value: newValue };

    let filtered = (values.filter((tipoEstoque) => {
        console.log(tipoEstoque, newTipoEstoque);
        return compareTipoEstoque(tipoEstoque, newTipoEstoque);
    }));
    console.log(filtered);
    if (filtered.length > 0) {
        alert("Tipo estoque já existe!");
        return;
    }
    localStorage.setItem("t09f-tipo-estoque", JSON.stringify({
        nextIndex: ++nextIndex,
        values: [
            ...values,
            newTipoEstoque
        ]
    }));
    inputTipoEstoque.value = "";

}




btnCriar.addEventListener("click", e => {
    if (editId) {
        handleEditTipoEstoque(e);
    } else {

        handleCriarTipoEstoque(e);
    }
})
inputTipoEstoque.addEventListener("keydown", e => {
    if (e.key == 'Enter') {
        if (editId) {
            handleEditTipoEstoque(e);
        } else {

            handleCriarTipoEstoque(e);
        }
    }
})

function removeTipoEstoque(values, id) {

}

function compareTipoEstoque(obj1, obj2) {
    if (obj1 === obj2) return true;
    return obj1["value"] == obj2["value"];
}