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
        const {category_name,category_id} = newsCategory;
        console.log(typeof category_id);
        // ** list item make and append
        const item = document.createElement('li');

        item.innerHTML = `
        <a onclick="displayNewsByCategory('${category_id}')" href="#" class="mr-4 hover:underline md:mr-6">${category_name}</a>
        `
        categoriesContainer.appendChild(item)
    });

};

// ** Load News by Specific category and display in the ui

const displayNewsByCategory = async (id)=>{
    // ** specific news loaded
    const newsLoad = await dataLoader(`https://openapi.programming-hero.com/api/news/category/${id}`);
    const {data} = newsLoad;
    // console.log(data)

    const highestToLowestViewNews = data.sort((a,b)=>{return (b.total_view-a.total_view)});
   
    highestToLowestViewNews.forEach(news=> {
        const {} = news;
    })
}

displayCategories()


