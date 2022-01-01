import {fetchData} from '../utilites/fetchingData.js';

class categories {
  constructor() {
    this.fetchingCategories();
  }
  categoriesList = document.getElementById('categories-list');
  
  async fetchingCategories () {
    const categories = await fetchData.fetchingCategoriesHandler();
    this.categoriesRender(categories.categories)
  }

  categoriesRender(categoriesList) {
    categoriesList.forEach(categoryElementInfo => {
      const catDiv = this.categoryElementRenderHandler(categoryElementInfo);
      this.categoriesList.append(catDiv)
    });
  }

  categoryElementRenderHandler (categoryObj) {
    const categoryEl = document.createElement('div');
    categoryEl.classList.add('category');
    categoryEl.id = categoryObj.idCategory;
    categoryEl.innerHTML = `
      <div class="cat-img">
        <img src="${categoryObj.strCategoryThumb}" alt="${categoryObj.strCategory}">
      </div>

      <div class="cat-body">
        <h3 class="cat-title">${categoryObj.strCategory}</h3>
      </div> `;

      return categoryEl;

  }
}

new categories();