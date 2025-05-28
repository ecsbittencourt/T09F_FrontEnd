let btnCriar = document.getElementById("botao-criar-unidade-medida");
let inputunidadeMedida = document.getElementById("input-unidade-medida");
 
const handleCriarunidadeMedida = (event) => {
    let newValue = inputunidadeMedida.value;
    if (!newValue) {
        event.preventDefault();
        alert("Nome da unidade de medida inválido!");
        return;
    }
 
    let retrieved = JSON.parse(localStorage.getItem("t09f-unidadeMedida"));
    if (!retrieved) {
        localStorage.setItem("t09f-unidadeMedida", JSON.stringify({
            nextIndex: 2,
            values: [{
                id: 1,
                value: newValue
            }]
        }));
        inputunidadeMedida.value = "";
        alert("Unidade de medida criada com sucesso!");
        return;
    }
 
    let { nextIndex, values } = retrieved;
    let newUnidadeMedida = { id: nextIndex, value: newValue };
 
    let filtered = values.filter((unidade) => {
        console.log(unidade, newUnidadeMedida);
        return compareUnidadeMedida(unidade, newUnidadeMedida);
    });
    console.log(filtered);
 
    if (filtered.length > 0) {
        alert("Unidade de medida já existe!");
        return;
    }
 
    localStorage.setItem("t09f-unidadeMedida", JSON.stringify({
        nextIndex: ++nextIndex,
        values: [
            ...values,
            newUnidadeMedida
        ]
    }));
    inputunidadeMedida.value = "";
    alert("Unidade de medida criada com sucesso!");
};
 
btnCriar.addEventListener("click", handleCriarunidadeMedida);
 
function compareUnidadeMedida(a, b) {
    return a.value.toLowerCase() === b.value.toLowerCase();
}