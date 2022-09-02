// ** data loader function

const dataLoader = async (url)=>{
    try {
        const response = await fetch(url);
        response.ok ? console.log('Successfull') : console.log('Failed');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
};





// ** Display catagories

const displayCategories = async ()=>{
    // ** where to display data
    const categoriesContainer = document.getElementById('list-items');
    // ** Load category data
    const categoryData = await dataLoader(`https://openapi.programming-hero.com/api/news/categories`);

    // ** get news_category from api
    const {data} = categoryData;
    const {news_category} = data;

    // ** making the ui visible
    news_category.forEach(newsCategory => {
        const {category_name} = newsCategory;
        console.log(category_name);
        // ** list item make and append
        const item = document.createElement('li');

        item.innerHTML = `
        <a href="#" class="mr-4 hover:underline md:mr-6">${category_name}</a>
        `
        categoriesContainer.appendChild(item)
    });

  

   
    


};

displayCategories()


