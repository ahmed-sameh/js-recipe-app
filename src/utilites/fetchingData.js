export class fetchData {

  static async fetchingCategoriesHandler() {
    let categories;
      await fetch('https://www.themealdb.com/api/json/v1/1/categories.php').then(
        async responseData => {
          if(responseData.ok)
          {
            categories = await responseData.json();
          }
        }
        ).catch(e => console.log('Connection error', e));
        
        return categories;
  }
  
  static async fetchingRecipesHandler(categoryName) {
    let recipes;
    if(categoryName) {
      await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`).then(
        async responseData => {
          if(responseData.ok) {
            recipes = await responseData.json();
          }
        }
      ).catch(e => console.log('Connection error', e));;
    }else {
      console.log('category name is null')
    }

    return recipes;
  }
  
  static async fetchingRecipeDetailsHandler(recipeID) {
    if(recipeID)
    {
      const recipeDetails = await fetch(`www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID}`)
    }else {
      console.log('recipe id is null')
    }
  }
}
