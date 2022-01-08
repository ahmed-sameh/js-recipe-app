export class fetchData {

  /*
    this module will recive data type that app will needed and will fetch it from api and will return the required data 
    and it will required data  as categoryName, recipeID and recipeName and start sending http requests upon this data using fetch api 
  */ 


  static async fetchingData(dataType,categoryName = '', recipeID = '', recipeName = '') {
    let fetchedData;
    let apiURL;
    //data type is will be category or recipe
    switch (dataType) {
      case 'fetching categories':
        apiURL = 'https://www.themealdb.com/api/json/v1/1/categories.php';
        break;

      case 'fetching recipes':
        if(categoryName) {
          apiURL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`;
        }else {
          console.log('category name is null')
        }
        break;

      case 'fetching recipe details':
        if(recipeID) {
          apiURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID}`;
            
        }else {
          console.log('recipe id is null')
        }
        break;

      case 'fetching recipe by name':
        if(recipeName) {
          apiURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`;
            
        }else {
          console.log('recipe name is null')
        }
        break;
    
      default:
        console.log("can't detect data type you need to create");
        break;
    }
    
    await fetch(apiURL).then( async responseData => {
      if(responseData.ok) {
        fetchedData = await responseData.json();
      }
    }).catch(e => console.log('Connection error', e));

    return fetchedData;
  }

}