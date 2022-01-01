import {fetchData} from '../utilites/fetchingData.js';

class categories {
  constructor() {
    this.fetchingCategories();
    this.categoriesList = document.getElementById('categories-list');
    this.categoryClickHandler();
  }

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
    categoryEl.title = categoryObj.strCategory;
    categoryEl.innerHTML = `
      <div class="cat-img">
        <img src="${categoryObj.strCategoryThumb}" alt="${categoryObj.strCategory}">
      </div>

      <div class="cat-body">
        <h3 class="cat-title">${categoryObj.strCategory}</h3>
      </div> `;

      return categoryEl;

  }


  categoryClickHandler() {
    this.categoriesList.addEventListener("click", event => {
      // console.log(event.target.closest('.category').title);
      if(event.target.closest('.category')) {

        const catName = event.target.closest('.category').title;

        import('../recipes/script.js').then( module => {
          new module.recipes(catName);
          window.location.href = 'http://127.0.0.1:8080/recipes.html';
  
        });
      }
    })
  }

}

new categories();