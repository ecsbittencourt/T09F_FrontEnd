const handleCreateEvent = (event) => {
    let currMedida = JSON.parse(localStorage.getItem("t09f_Medida"));
    let Uni_Medida = document.getElementById("input-Medida").value;
    if(!Uni_Medida) {
        event.preventDefault();
        alert (" Unidade de Medida inválido!");
        return;
    }
    if (!Array.isArray(currMedida)){
         localStorage.setItem("t09f_Medida", JSON.stringify([Uni_Medida]));
    } else {
        if(currMedida.includes(Uni_Medida)) {
            event.preventDefault();
            alert("Unidade de Medida já existe!");
            return;
        }
         localStorage.setItem("t09f_Medida", JSON.stringify([...currMedida, Uni_Medida]));
    }
    document.getElementById("input-Medida").value = "";
    
}
    let criarBtn = document.getElementById("botao-criar-Unidade-Medida");
    criarBtn.addEventListener("click", e => handleCreateEvent(e));
    document.getElementById("input-Medida").addEventListener("keydown", e =>{
     if(e.key == 'Enter'){
        handleCreateEvent(e)
    };        
});
