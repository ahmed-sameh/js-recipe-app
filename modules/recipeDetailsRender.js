
export class overlay {

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
