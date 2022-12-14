const searchButton = document.querySelector("#search-btn");
const cocktailList= document.querySelector("#cocktail");
const cocktailDetailsContent= document.querySelector(".cocktail-details-content");
const recipeCloseBtn = document.querySelector("#recipe-close-btn")

document.addEventListener("DOMContentLoaded",()=>{

})

searchButton.addEventListener("click",fetchCocktailList)

//checks user input at the search input
function fetchCocktailList(){
    let searchInput = document.querySelector("#search-input").value.trim();
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`)
    .then(resp=>resp.json())
    .then(data=>{
        console.log(data)
    })
}