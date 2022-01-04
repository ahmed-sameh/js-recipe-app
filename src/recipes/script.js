import {fetchData} from '../utilites/fetchingData.js';
export class recipes {

  constructor (categoryName) {
    // this.fetchRecipesOfCategory(categoryName);
    // document.getElementById('category-name').innerText = categoryName;
    this.fetchRecipesOfCategory('Beef');
    document.getElementById('category-name').innerText = 'Beef';
    this.recipesList = document.getElementById('recipes-list');
    this.recipeClickHandler();
  }

  async fetchRecipesOfCategory(categoryName) {
    const recipes = await fetchData.fetchingRecipesHandler(categoryName);
    this.recipesRenderHandler(recipes.meals);
  }

  recipesRenderHandler(categoryMealsList) {
    console.log(categoryMealsList)
    categoryMealsList.forEach(  meal => {
      const recipeDiv = this.recipeDivGenerator(meal);
      this.recipesList.append(recipeDiv);
      }
    );
  }

  recipeDivGenerator(recipeObj) {
    const recipeEl = document.createElement('div');

    recipeEl.classList.add('recipe');
    recipeEl.id = recipeObj.idMeal;
    recipeEl.title = recipeObj.strMeal;
    recipeEl.innerHTML = `
    <div class="recipe-img">
      <img src="${recipeObj.strMealThumb}" alt="${recipeObj.strMeal}">
    </div>

    <div class="recipe-body">
      <h3 class="recipe-name">${recipeObj.strMeal}</h3>
      <i class="fas fa-heart"></i>
    </div>
    `;

    return recipeEl;
  }


  recipeClickHandler() {
    this.recipesList.addEventListener('click', event => {
      if(event.target.closest('.recipe')) {
        const recipeID = event.target.closest('.recipe').id;
        this.fetchingRecipeDetails(recipeID);
      }
    })
  }
  
  async fetchingRecipeDetails(recipeID) {
    const recipeDetails = await fetchData.fetchingRecipeDetailsHandler(recipeID);
    new overlay(recipeDetails.meals[0]);
  }
}

class overlay {

  constructor(recipeDetails) {
    this.overlayHook = document.getElementById('overlay');
    this.overlayRenderHandler(recipeDetails);
    
    document.getElementById('close-btn').addEventListener('click', this.closeOverlayHandler);
  }
  
  overlayRenderHandler(mealDetails) {
    const mealImgHook = document.getElementById('recipe-img').querySelector('img');
    const mealNameHook = document.getElementById('recipe-name').querySelector('h2'); 
    const mealCountryeHook = document.getElementById('recipe-country').querySelector('span');
    const mealCategoryeHook = document.getElementById('recipe-category').querySelector('span');
    const mealYouTubeLinkHook = document.getElementById('youtube-link'); 
    const recipeInstructionHook = document.getElementById('recipe-instruction').querySelector('p');
    const recipeNameIngredientsHook = document.getElementById('recipe-ingredients').querySelector('span');
    
    
    
    mealImgHook.src = mealDetails.strMealThumb;
    mealNameHook.innerText = mealDetails.strMeal;
    mealCountryeHook.innerText = mealDetails.strArea;
    mealCategoryeHook.innerText = mealDetails.strCategory;
    mealYouTubeLinkHook.href = mealDetails.strYoutube
    recipeInstructionHook.innerText = mealDetails.strInstructions;
    recipeNameIngredientsHook.innerText = mealDetails.strMeal;
    
    
    if(mealDetails.strTags) {
      this.generatingTags(mealDetails.strTags);
    }
    
    this.getIngredients(mealDetails);
    
    
    document.body.className = 'no-scroll';
    this.overlayHook.className = 'visible';
  }
  
  
  generatingTags(tagsString) {
    const mealTagsListHook = document.getElementById('tags');
    const tagsArray = tagsString.split(",");
    tagsArray.forEach(tag => {
      const tagEl =  document.createElement('li');
      tagEl.innerText = tag;
      mealTagsListHook.append(tagEl);
    })
  }


  getIngredients(mealObject) {
    let ingredientsList = [];
    Object.keys(mealObject).forEach( el => {
      if(el.startsWith('strIngredient')) {
        if(mealObject[el]) {
          ingredientsList.push(mealObject[el]);
        }
      }
    })
    this.generatingIngredients(ingredientsList);
  }
  
  generatingIngredients(ingredientsList) {
    const ingredientsListHook = document.getElementById('ingredients-list');
    ingredientsList.forEach( ingredient => {
      const ingredientLi = document.createElement('li');
      ingredientLi.innerText = ingredient;
      ingredientsListHook.append(ingredientLi);
    })

  }

  closeOverlayHandler() {
    document.getElementById('overlay').classList.remove('visible') ;
    document.body.classList.remove('no-scroll');
    document.getElementById('ingredients-list').innerHTML = '';
    document.getElementById('tags').innerHTML = '';
  }

}





new recipes();












// **************************************************************************
// *                              to do next                                *
// **************************************************************************
/*
    1- htshta8al 3la  js bta3 al overlay  <<<<<<<<<done>>>>>>>>
    
    2-  htshta8al 3la albutton bta3 alnavbar

    3-  htshof fy tre2a torbt al category m3 al recipes 

    4-  htsha8al alsearch bar


*/