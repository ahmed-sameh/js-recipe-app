import {fetchData} from '../utilites/fetchingData.js';


class Navbar {

  mobileButton = document.getElementById('mobile-nav-btn');
  searchButton = document.getElementById('search-btn');

  constructor() {
    this.mobileButton.addEventListener('click', this.navMobileBtnClickHandler);
    this.searchButton.addEventListener('click', () => {
      this.searchBarHandler()
    });
  }

  // this fun responsible for toggle nav items on button click
  navMobileBtnClickHandler() {
    const navItemsHook = document.querySelector('.nav-items');
    navItemsHook.classList.toggle('nav-show');
  }

  // this fun will take the  user input in search input field and send it to fetching recipes method
  searchBarHandler() {
    const requiredRecipeName = document.getElementById('search-field').value;
    this.fetchingRecipesByName(requiredRecipeName);
  }

  // sending the recipe name to fetching module to fetch the recipes by sending http request and store the recipes and send it to render method
  async fetchingRecipesByName(recipeName) {
    const recipes = await fetchData.fetchingData('fetching recipe by name','','',recipeName);
    this.recipesRenderHandler(recipes.meals, recipeName);
  }

  // will check on the recipes and send it to recipes projecting class to render it to user
  recipesRenderHandler(recipes, recipeName) {
    if(recipes) {
      new RecipesProjecting(recipes, true);
      document.querySelector('.main-title').innerText = `our ${recipeName}'s recipes`
    }else{
      document.getElementById('recipes-list').innerHTML = '';
      document.querySelector('.main-title').innerText = `we don't have recipes to ${recipeName}`;
    }
  }
}
export class Recipes {

  constructor (categoryName) {
    // this.fetchRecipesOfCategory(categoryName);
    // document.getElementById('category-name').innerText = categoryName;
    this.fetchRecipesOfCategory('Chicken');
    document.getElementById('category-name').innerText = 'Chicken';
  }

  // used to send to fetch data module cat name and recive the recives and check it and send it to recipes projecting method
  async fetchRecipesOfCategory(categoryName) {
    const recipes = await fetchData.fetchingData('fetching recipes',categoryName);
    if(recipes) {
      new RecipesProjecting(recipes.meals, false);
    } else{
      document.getElementById('recipes-list').innerHTML = '';
      document.querySelector('.main-title').innerText = `we don't have recipes to ${categoryName}`;
    }
  }
}



class RecipesProjecting {

  recipesList = document.getElementById('recipes-list');

  constructor(recipesArray, clearPreRecipes) {
      if(clearPreRecipes){
        this.recipesList.innerHTML = ''
        this.recipesRenderHandler(recipesArray);
        this.recipeClickHandler();
      } else {
        this.recipesRenderHandler(recipesArray);
        this.recipeClickHandler();
      }
    
  }

  //  take the recipes array and send each singe recipe object to recipe div generator to render it and append it to ul of recipes list 
  recipesRenderHandler(recipesArray) {
    recipesArray.forEach(  meal => {
      const recipeDiv = this.recipeDivGenerator(meal);
      this.recipesList.append(recipeDiv);
      }
    );
  }

  // take the recipe object and generate the div and attach the data from the object and return it back to recipe render handler method 
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

  // used to handler recipe li click and get the id of clicked element and send it to fetching recipes details method 
  recipeClickHandler() {
    this.recipesList.addEventListener('click', event => {
      if(event.target.closest('.recipe')) {
        const recipeID = event.target.closest('.recipe').id;
        this.fetchingRecipeDetails(recipeID);
      }
    })
  }
  
  // used to send clicked recipe element id to the fetch data module to get back the recipe details data and send this data to overlay class to render it to users pn screen
  async fetchingRecipeDetails(recipeID) {
    const recipeDetails = await fetchData.fetchingData('fetching recipe details','',recipeID,'');
    new overlay(recipeDetails.meals[0]);
  }
}

class overlay {

  constructor(recipeDetails) {
    this.overlayHook = document.getElementById('overlay');
    this.overlayRenderHandler(recipeDetails);
    
    document.getElementById('close-btn').addEventListener('click', this.closeOverlayHandler);
  }
  
  // take selected recipe details and start to render it on screen to users
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
  
  // getting the tags from recipe object and start to generating li and fill it and render it on screen
  generatingTags(tagsString) {
    const mealTagsListHook = document.getElementById('tags');
    mealTagsListHook.innerHTML = ''
    const tagsArray = tagsString.split(",");
    tagsArray.forEach(tag => {
      const tagEl =  document.createElement('li');
      tagEl.innerText = tag;
      mealTagsListHook.append(tagEl);
    })
  }

  // fillterd recipes object and inject the ingredients into array and send this array to generating imgredient method to start to render it
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
  
  // take the ingredients array and start to render it on the screen 
  generatingIngredients(ingredientsList) {
    const ingredientsListHook = document.getElementById('ingredients-list');
    ingredientsListHook.innerHTML = '';
    ingredientsList.forEach( ingredient => {
      const ingredientLi = document.createElement('li');
      ingredientLi.innerText = ingredient;
      ingredientsListHook.append(ingredientLi);
    })

  }
  // handle the close overlay and clear data 
  closeOverlayHandler() {
    document.getElementById('overlay').classList.remove('visible') ;
    document.body.classList.remove('no-scroll');
    document.getElementById('ingredients-list').innerHTML = '';
    document.getElementById('tags').innerHTML = '';
  }

}






new Navbar();
new Recipes();










