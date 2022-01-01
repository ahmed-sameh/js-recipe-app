import {fetchData} from '../utilites/fetchingData.js';
export class recipes {
  constructor (categoryName) {
    // this.fetchRecipesOfCategory(categoryName);
    // document.getElementById('category-name').innerText = categoryName;
    this.fetchRecipesOfCategory('Dessert');
    document.getElementById('category-name').innerText = 'Dessert';
    this.recipesList = document.getElementById('recipes-list');
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
}

new recipes();