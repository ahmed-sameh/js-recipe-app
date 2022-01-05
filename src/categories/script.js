import {fetchData} from '../utilites/fetchingData.js';


class navbar {
  mobileButton = document.getElementById('mobile-nav-btn');
  constructor() {
    this.mobileButton.addEventListener('click', this.navBtnClickHandler);
  }

  // it toggle nav items  depend on mobile nav button click
  navBtnClickHandler() {
    const navItemsHook = document.querySelector('.nav-items');
    navItemsHook.classList.toggle('nav-show');
  }
}

class categories {
  constructor() {
    this.fetchingCategories();
    this.categoriesList = document.getElementById('categories-list');
    this.categoryClickHandler();
  }

  // this func using fetch data module to fetch categories  and send it to categorie render method 
  async fetchingCategories () {
    const categories = await fetchData.fetchingData('fetching categories');
    this.categoriesRender(categories.categories)
    
  }

  /* this func will take array of categories objects and send each object to render by categoryElementRenderHandler and get back the category div element and append it to categories list ul*/
  categoriesRender(categoriesList) {
    categoriesList.forEach(categoryElementInfo => {
      const catDiv = this.categoryElementRenderHandler(categoryElementInfo);
      this.categoriesList.append(catDiv)
    });
  }

  // take category object and return category div element
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

  // this func will handle the click on catgory
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
new navbar();