/*Funcinalidade
document
    .querySelector("select[name=uf]")//selecionar o campo de nome uf
    .addEventListener("change",()=>{
        console.log("Mudei")
    })//vai ficar sempre ouvindo um evendo, e esperando uma função
  */      
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res=> res.json())
    .then( states =>{
        
        //para cada estado de estados - pega 1 da lista
        for(state of states){
            ufSelect.innerHTML+= `<option value="${state.id}">${state.nome}</option>`
        }
        
    } )
}

populateUFs();

function getCities(event){
    const citySelect = document.querySelector("select[name=city")
    const stateInput = document.querySelector("input[name=state")   
    


    const ufValue = event.target.value

    //Dentro das opções temos que pegar o texto dele
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.optionn[indexOfSelectedState].text 

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value> Selecione a cidade</option>"
    citySelect.disabled = true   

    fetch(url)
    .then(res=> res.json())
    .then( cities => {
 
        for(const city of cities){
            citySelect.innerHTML +=`<option value="${city.id}">${city.nome}</option>`
        }

        citySelect.disabled = false
    } )
}

document
    .querySelector("select[name=uf]")//selecionar o campo de nome uf
    .addEventListener("change",getCities)//vai ficar sempre ouvindo um evendo, e esperando uma função


//Items de coleta

//Pegar todos os LIs
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)

}

//Atualizar o campo escondido com os itens selecionados
const collectedItems = document.querySelector("input[name = items]")

//Criar uma variavel para armazenar os items
let selectedItems = []
//let é uma variável, const é constante

function handleSelectedItem(event){

    const itemLi = event.target

    //adicionar ou remover classe com jS
    //toggle faz a função de adicionar ou remover
    itemLi.classList.toggle("selected")

    const itemId =event.target.dataset.id 


    //será true ou false
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    })


    //Verificar se tem items selecionados
    //Se sim pegar os itens selecionados
    if(alreadySelected >= 0){
        //Tirar da seleção

        const filteredItems = selectedItems.filter(item =>{
            //se ja estiverem selecionados tirar da seleção
            //vai entrar no selectedItems e vai rodar a função, caso ache verdadeiro vai adicionar em outro array
            const itemIsDiffrent = item != itemId
            return itemIsDiffrent
        })

        selectedItems = filteredItems
    }

    
    
    //se não estiver selecionado, adicionar a seleção
    else{
       //push colocam novos tamanhos no array
       selectedItems.push(itemId) 
    }

    collectedItems.value = selectedItems

}

