
export class AppItemsRender {
  itemsListHook = document.getElementById('main-elements-list');

  constructor(itemType,itemsArray,clearList) {

    if(itemsArray) {
      this.itemsRenderHandler(itemType,itemsArray,clearList)
    }else {
      console.log('there is no items')
    }


  }
  
  itemsRenderHandler(itemType,itemsArray,clearList) {
    if(clearList) {
      this.itemsListHook.innerHTML = ``;
    }
    switch (itemType) {
      case 'category':
        itemsArray.forEach(item => {
          const itemBox = this.categoriesCreateHandler(item);
          this.itemsListHook.append(itemBox);
        });
        
        break;

        case 'recipe':
          itemsArray.forEach(item => {
            const itemBox = this.recipesCreateHandler(item);
            this.itemsListHook.append(itemBox);
          });

          break;
    
      default:
        break;
    }
  }
  
  categoriesCreateHandler(itemObject) {

    const itemDiv = document.createElement('div');

    itemDiv.classList.add('list-item', 'category');
    itemDiv.id = itemObject.idCategory;
    itemDiv.title = itemObject.strCategory;
    itemDiv.innerHTML = `
      <div class="item-img">
        <img src="${itemObject.strCategoryThumb}" alt="${itemObject.strCategory}">
      </div>

      <div class="item-body">
        <h3 class="item-name">${itemObject.strCategory}</h3>
        <i class="far fa-eye"></i>
      </div>
    `;

    return itemDiv;
  }
  
  recipesCreateHandler(itemObject) {

    const itemDiv = document.createElement('div');

    itemDiv.classList.add('list-item', 'recipe');
    itemDiv.id = itemObject.idMeal;
    itemDiv.title = itemObject.strMeal;
    itemDiv.innerHTML = `
      <div class="item-img">
        <img src="${itemObject.strMealThumb}" alt="${itemObject.strMeal}">
      </div>

      <div class="item-body">
        <h3 class="item-name">${itemObject.strMeal}</h3>
        <i class="far fa-eye"></i>
      </div>
    `;

    return itemDiv;
  }
}