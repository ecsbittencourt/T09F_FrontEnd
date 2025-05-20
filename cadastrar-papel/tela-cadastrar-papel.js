const handleCreateEvent = (event) => {
    let currPapeis = JSON.parse(localStorage.getItem("t09f_papeis"));
    let papel = document.getElementById("input-papel").value;
    if(!papel) {
        event.preventDefault();
        alert("Nome do papél inválido!");
        return;
    }
    if (!Array.isArray(currPapeis)) {
        localStorage.setItem("t09f_papeis", JSON.stringify([papel]));
    } else {
        if(currPapeis.includes(papel)) {
            event.preventDefault();
            alert("Papel já existe!");
            return;
        }
        localStorage.setItem("t09f_papeis", JSON.stringify([...currPapeis, papel]));
    }
    document.getElementById("input-papel").value = "";
}

let criarBtn = document.getElementById("botao-criar-papel");
criarBtn.addEventListener("click", e => handleCreateEvent(e));
document.getElementById("input-papel").addEventListener("keydown", e =>{
    if(e.key == 'Enter'){
        handleCreateEvent(e)
    };
});