import { fetchData } from './modules/fetchingData.js';
import { AppItemsRender } from './modules/renderItems.js';


class Navbar {

  mobileButton = document.getElementById('mobile-nav-btn');
  searchButton = document.getElementById('search-btn');
  mainTitlehook = document.querySelector('.main-title');

  constructor() {
    this.mobileButton.addEventListener('click', this.navMobileBtnClickHandler);
    this.searchButton.addEventListener('click', () => {
      this.searchBarHandler()
    });


    // go to local storge and get meals ans send it to AppItemsRender to show it on screen
    document.getElementById('cat').addEventListener('click', () => {
      const meals = JSON.parse(localStorage.getItem('meals'))
      new AppItemsRender('category',meals,true);
    })
  }

  // this func responsible for toggle nav items on button click
  navMobileBtnClickHandler() {
    const navItemsHook = document.querySelector('.nav-items');
    navItemsHook.classList.toggle('nav-show');
  }

  // this func will take the  user input in search input field and send it to fetching recipes method
  searchBarHandler() {
    const requiredRecipeName = document.getElementById('search-field').value;
    this.fetchingRecipesByName(requiredRecipeName);
  }

  // sending the recipe name to fetching module to fetch the recipes by sending http request and store the recipes and send it to render method
  async fetchingRecipesByName(recipeName) {
    const recipes = await fetchData.fetchingData('fetching recipe by name','','',recipeName);
    this.recipesRenderHandler(recipes.meals, recipeName);
  }

  // will check on the recipes and send it to AppItemsRender module to render it to user
  recipesRenderHandler(recipes, recipeName) {
    if(recipes) {
      new AppItemsRender('recipe', recipes, true);
      this.mainTitlehook.innerText = `our ${recipeName}'s recipes`
    }else{
      document.getElementById('recipes-list').innerHTML = '';
      this.mainTitlehook.innerText = `we don't have recipes to ${recipeName}`;
    }
  }

}
export class App {

  itemsListHook = document.getElementById('main-elements-list');
  mainHeadingHook = document.querySelector('.main-title');

  constructor () {
    this.fetchingCategories();
    this.itemElClickHandler()
  }


  // this func using fetch data module to fetch categories  and send it to AppItemsRender to render it  and store it in local storge
  async fetchingCategories () {
    const categories = await fetchData.fetchingData('fetching categories');
    if(categories) {
      this.mainHeadingHook.innerText = `our main categories`;
      new AppItemsRender('category',categories.categories,true);
      localStorage.setItem('meals',JSON.stringify(categories.categories));
    }
  }
  
  
  // used to send request to fetchData module and recive the recipes and send it to AppItemsRender to render it
  async fetchingRecipes(categoryName) {
    const recipes = await fetchData.fetchingData('fetching recipes',categoryName);
    if(recipes) {
      this.mainHeadingHook.innerHTML = `our <span id="category-name">${categoryName}</span> category's recipes`;
      new AppItemsRender('recipe', recipes.meals,true)
    } else{
      document.getElementById('recipes-list').innerHTML = '';
      this.mainHeadingHook.innerText = `we don't have recipes to ${categoryName}`;
    }
  }


  // used to send clicked recipe element id to the fetch data module to get back the recipe details data and send this data to overlay class to render it to users on screen
  async fetchingRecipeDetails(recipeID) {
    const recipeDetails = await fetchData.fetchingData('fetching recipe details','',recipeID,'');
    import('./modules/recipeDetailsRender.js').then( module => {
      new module.overlay(recipeDetails.meals[0]);
    })
  }

  //used to handle item click and know if it category or recipe and send its info to method that responsble to fetch the data
  itemElClickHandler() {
    this.itemsListHook.addEventListener('click', event => {
      const clickedElHook = event.target.closest('.list-item');
      if(clickedElHook) {
        if(clickedElHook.dataset.itemType === 'category') {
          const categoryName = clickedElHook.title;
          this.fetchingRecipes(categoryName);
        }else if(clickedElHook.dataset.itemType === 'recipe'){
          const recipeID = clickedElHook.id;
          this.fetchingRecipeDetails(recipeID);
        }
      }
    })
  }

}

new Navbar();
new App();










