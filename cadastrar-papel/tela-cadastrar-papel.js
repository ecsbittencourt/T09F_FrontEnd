const handleCreateEvent = (event) => {
    let currPapeis = JSON.parse(localStorage.getItem("papeis"));
    let papel = document.getElementById("input-papel").value;
    if(!papel) {
        event.preventDefault();
        alert("Nome do papél inválido!");
        return;
    }
    if (!Array.isArray(currPapeis)) {
        localStorage.setItem("papeis", JSON.stringify([papel]));
    } else {
        if(currPapeis.includes(papel)) {
            event.preventDefault();
            alert("Papel já existe!");
            return;
        }
        localStorage.setItem("papeis", JSON.stringify([...currPapeis, papel]));
        return;
    }
}

let criarBtn = document.getElementById("botao-criar-papel");
criarBtn.addEventListener("click", e => handleCreateEvent(e));
document.getElementById("input-papel").addEventListener("keydown", e =>{
    if(e.key == 'Enter'){
        handleCreateEvent(e)
    };
});