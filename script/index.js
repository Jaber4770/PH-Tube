const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => showCategories(data.categories));
}

const showCategories = (categories)=>{

    console.log(categories);
}


loadCategories();