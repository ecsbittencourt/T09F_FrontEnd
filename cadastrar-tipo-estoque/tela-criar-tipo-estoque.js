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


    putTipoEstoque(editId, newValue);
    inputTipoEstoque.value = "";

}

const handleCriarTipoEstoque = (event) => {
    let newValue = inputTipoEstoque.value;
    if (!newValue) {
        event.preventDefault();
        alert("Nome do tipo inválido!");
        return;
    }

    postTipoEstoque({ nome: newValue });
    inputTipoEstoque.value = "";
    return;
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



function compareTipoEstoque(obj1, obj2) {
    if (obj1 === obj2) return true;
    return obj1["value"] == obj2["value"];
}

function postTipoEstoque(data) {
    fetch("http://127.0.0.1:8080/api/tipos-estoque", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    }).then(data => data);
}

function putTipoEstoque(id, newValue) {
    fetch(`http://127.0.0.1:8080/api/tipos-estoque/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            id: id,
            nome: newValue
        })
    }).then(response => {
        console.log(response);
        if (!response.status == 200) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    }).then(data => data);
}