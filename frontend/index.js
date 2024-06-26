const searchButton = document.querySelector("#search-btn");
const cocktailList= document.querySelector("#cocktail");
const cocktailDetailsContent= document.querySelector(".cocktail-details-content");
const recipeCloseBtn = document.querySelector("#recipe-close-btn");
const cocktailItem = document.querySelector(".cocktail-item");




//event listeners
document.addEventListener("DOMContentLoaded",()=>{
    //search button
    searchButton.addEventListener("click",fetchCocktailList)
    //cocktail recipe
    cocktailList.addEventListener("click",getCocktailRecipe)
    //recipe close button
    recipeCloseBtn.addEventListener("click",()=>{
        cocktailDetailsContent.parentElement.classList.remove('showRecipe')
    })
})

//Base URL
let url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="

//checks user input at the search input and fetches all available
//options with that ingredient from the API
function fetchCocktailList(){
    let searchInput = document.querySelector("#search-input").value.trim();
    fetch(`${url}${searchInput}`)
    .then(resp=>resp.json())
    .then(data=>{
        cocktailList.innerHTML= "";
        if(data.drinks){
            data.drinks.map(cocktail=>renderCocktail(cocktail))       
        }        
    })
}

//displaying images
function renderCocktail(drink){    
    cocktailList.innerHTML+=`
        <div class="cocktail-item" data-id= "${drink.idDrink}" >
            <div class="cocktail-img">
                <img src=${drink.strDrinkThumb} alt="cocktail">
            </div>
            <div class="cocktail-name">
            <h3>${drink.strDrink}</h3>
                <a href="#" class="recipe-btn">Get recipe</a>
            </div>                          
        </div>
    `

}


function getCocktailRecipe(event){
    event.preventDefault();
   if(event.target.classList.contains("recipe-btn")){
        let cocktailItem = event.target.parentElement.parentElement;
        console.log(cocktailItem)
        //fetches recipe by ID tag
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailItem.dataset.id}`)
        .then(resp=>resp.json())
        .then(data=>{
            console.log(data)
            cocktailRecipeDisplay(data.drinks[0])
        })
   }
}




//displaying the cocktail recipe
function cocktailRecipeDisplay(drink){
    console.log(drink)
     cocktailDetailsContent.innerHTML=`
     <h2 class="recipe-title">${drink.strDrink}</h2>
     <p class="recipe-category">${drink.strCategory}</p>
     <div class="recipe-instructions">
         <h3>Instructions:</h3>
         <p>${drink.strInstructions}</p>
        <div class= "buttons"> 
            <button id="delete"> Delete </button> 
            <button id="edit"> Edit </button> 
        </div>
     </div>
     <div class="recipe-cocktail-img">
         <img src=${drink.strDrinkThumb} alt="">
     </div>
     `
     cocktailDetailsContent.parentElement.classList.add('showRecipe')
     
     document.querySelector('#delete').addEventListener("click", (e)=>{
        console.dir(e.target)
     })
}


// //Fetch Requests
// function fetchLocalData(){
//     return fetch("http://localhost:3000/drinks")
//     .then(resp=>resp.json())
//     .then(cocktailData=>cocktailData.map(cocktail=>renderCocktail(cocktail)))
// }


//Event listener
const newCocktailForm = document.getElementById('new-cocktail');
newCocktailForm.addEventListener("submit",handleSubmit)

//Event handler
function handleSubmit(e){
    e.preventDefault(); 
    let newCocktail={                  
        strDrink: e.target.name.value,        
        strDrinkThumb: e.target.image.value,
        strInstructions:e.target.instructions.value
        }
        renderCocktail(newCocktail);
        addNewItem(newCocktail);
        newCocktailForm.reset()
    } 

function addNewItem(newCocktail){
    fetch("http://localhost:3000/drinks",{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(newCocktail)
    })
    .then(response=>response.json())
    .then(data=> console.log(data))   
    .catch(function (error) {
        alert("Bad things! Ragnarők!");
        console.log(error.message);
      });  
} 


