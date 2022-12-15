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
        let html = "";
        //iterate through the array to display the typed ingredient's available options
        if(data.drinks){
            data.drinks.map(drink=>{
            html+=`
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
            })
            cocktailList.classList.remove('unavailable')
        //displays this when ingredient is not found
        }else{
            html = `Sorry, no match for the ingredient`
            cocktailList.classList.add('unavailable')
        }   

        cocktailList.innerHTML = html;
    });
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


// const newRamenForm = document.getElementById('new-ramen');
// newRamenForm.addEventListener("submit",handleSubmit)

// function handleSubmit(e){
//     e.preventDefault();   
//     console.log(e); 
    
//         const newName = document.querySelector('#new-name');
//         const newRestaurant = document.getElementById('new-restaurant');
//         const newImage = document.getElementById('new-image');
//         const newRating = document.getElementById('new-rating');
//         const newComment = document.getElementById('new-comment');

//         const newRamen={                  
//             name: newName.value,
//             restaurant: newRestaurant.value,
//             image: newImage.value,
//             rating: newRating.value,
//             comment: newComment.value
//         }
//         addNewItem(newRamen)
//         newRamenForm.reset()
//     } 


// function addNewItem(newRamen){
//     fetch(url,{
//         method: "POST",
//         headers:{
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(newRamen)
//     })
//     .then(response=>response.json())
//     .then(item=> console.log(item))
    
// } 
