const searchButton = document.querySelector("#search-btn");
const cocktailList= document.querySelector("#cocktail");
const cocktailDetailsContent= document.querySelector(".cocktail-details-content");
const recipeCloseBtn = document.querySelector("#recipe-close-btn")


//event listeners
document.addEventListener("DOMContentLoaded",()=>{
    searchButton.addEventListener("click",fetchCocktailList)
    cocktailList.addEventListener("click",getCocktailRecipe)
    recipeCloseBtn.addEventListener("click",()=>{
        cocktailDetailsContent.parentElement.classList.remove('showRecipe')
    })
    fetchLocalData()
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
        if(data.drinks){
            displayData(data.drinks)
            cocktailList.classList.remove('unavailable')
        }else{
            html = `Sorry, no match for the ingredient`
            cocktailList.classList.add('unavailable') 
        }
})
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
     </div>
     <div class="recipe-cocktail-img">
         <img src=${drink.strDrinkThumb} alt="">
     </div>
     `

     cocktailDetailsContent.parentElement.classList.add('showRecipe')
}


///////////////////////////////LOCAL DATA////////////////////////////////////////////////////
function fetchLocalData(){
    return fetch("http://localhost:3000/drinks")
    .then(resp=>resp.json())
    .then(data=>displayData(data))

}

//Displays data for both the public and local database
function displayData(data){
    console.log(data) 
    let html = "";      
    data.map(drink=>{
        html+=`
        <div class="cocktail-item" data-id= "${drink.idDrink}" >
            <div class="cocktail-img">
                <img src=${drink.strDrinkThumb} alt="cocktail">
            </div>
            <div class="cocktail-name">
            <h3>${drink.strDrink}</h3>
                <a href="#" class="recipe-btn">Get recipe</a>
            </div>  
            <button> Delete </button>                  
        </div>
                `
            })   
            cocktailList.innerHTML = html;
}
//////////////////////////////////// CREATING A NEW COCKTAIL ////////////////////////////////////
function displayNewCocktail(drink){
    let html;
    html+=`
        <div class="cocktail-item" data-id= "${drink.idDrink}" >
            <div class="cocktail-img">
                <img src=${drink.strDrinkThumb} alt="cocktail">
            </div>
            <div class="cocktail-name">
            <h3>${drink.strDrink}</h3>
                <a href="#" class="recipe-btn">Get recipe</a>
            </div>  
            <button> Delete </button>                  
        </div>
                `
    cocktailList.innerHTML = html;
}   
          

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
        displayNewCocktail(newCocktail);
        addNewItem(newCocktail);
        newCocktailForm.reset()
    } 

function addNewItem(newCocktail){
    fetch("http://localhost:3000/drinks",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCocktail)
    })
    .then(response=>response.json())
    .then(data=>data)    
} 
