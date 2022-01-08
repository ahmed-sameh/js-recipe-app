
export class AppItemsRender {
  itemsListHook = document.getElementById('main-elements-list');

  constructor(itemType,itemsArray,clearList) {
    if(itemsArray) {
      this.itemsRenderHandler(itemType,itemsArray,clearList)
    }else {
      console.log('there is no items')
    }
  }
  
  //  used to handle item create process
  itemsRenderHandler(itemType,itemsArray,clearList) {
    // used to check if clear main ul is required or not
    if(clearList) {
      this.itemsListHook.innerHTML = ``;
    }

    // used to detect required items type and append them to the main ul in template 
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
        console.log("can't detect item type you need to create");
        break;
    }
  }
  
  //  used to create category single item 
  categoriesCreateHandler(itemObject) {
    
    const itemDiv = document.createElement('div');
    
    itemDiv.classList.add('list-item');
    itemDiv.dataset.itemType = 'category';
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
  
  //  used to create recipe single item 
  recipesCreateHandler(itemObject) {
    
    const itemDiv = document.createElement('div');
    
    itemDiv.classList.add('list-item');
    itemDiv.dataset.itemType = 'recipe';
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