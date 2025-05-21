document.addEventListener('DOMContentLoaded', function () {
    const tabelaBody = document.getElementById('tabela-listagem-body');

    
    const unidadeMedidaData = JSON.parse(localStorage.getItem("t09f-unidadeMedida")) || { values: [] };

   
    unidadeMedidaData.values.forEach((unidade, index) => {
        const row = document.createElement('tr');
        row.classList.add('tabela-listagem-body-row');
        
        row.innerHTML = `
            <td class="paragrafo3">${unidade.value}</td>
            <td class="tabela-listagem-edit-remove-icons">
                <button class="edit-button"><img src="/Recursos/lapis-icon.png" alt="Editar"></button>
                <button class="delete-button"><img src="/Recursos/lixo-icon.png" alt="Excluir"></button>
            </td>
        `;
        
        tabelaBody.appendChild(row);

        
        row.querySelector('.delete-button').addEventListener('click', () => {
            deleteUnidade(index);
        });
    });

    function deleteUnidade(index) {
       
        unidadeMedidaData.values.splice(index, 1);

       
        localStorage.setItem("t09f-unidadeMedida", JSON.stringify(unidadeMedidaData));

        
        tabelaBody.innerHTML = ''; 
        unidadeMedidaData.values.forEach((unidade, index) => {
            const row = document.createElement('tr');
            row.classList.add('tabela-listagem-body-row');
            
            row.innerHTML = `
                <td class="paragrafo3">${unidade.value}</td>
                <td class="tabela-listagem-edit-remove-icons">
                    <button class="edit-button"><img src="/Recursos/lapis-icon.png" alt="Editar"></button>
                    <button class="delete-button"><img src="/Recursos/lixo-icon.png" alt="Excluir"></button>
                </td>
            `;
            
            tabelaBody.appendChild(row);

            
            row.querySelector('.delete-button').addEventListener('click', () => {
                deleteUnidade(index);
            });
        });
    }
});
