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
    // ** Where to display the news contents
    const newsContainer = document.getElementById('news-content');
    newsContainer.textContent = ``;
    // ** specific news loaded
    const newsLoad = await dataLoader(`https://openapi.programming-hero.com/api/news/category/${id}`);
    const {data} = newsLoad;
    // console.log(data)

    const highestToLowestViewNews = data.sort((a,b)=>{return (b.total_view-a.total_view)});
   
    highestToLowestViewNews.forEach(news=> {
        console.log(news)
        const {author:{name,published_date,img},image_url,title,thumbnail_url,total_view,details} = news;
        const divContent = document.createElement('div');
        divContent.classList.add('gap-16','items-center','py-8','px-4','mx-auto','max-w-screen-xl','lg:grid','lg:grid-cols-2','lg:py-16','lg:px-6');
        divContent.innerHTML = `
        <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
        <h2
          class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
        >
          ${title ? title : 'N/A'}
        </h2>
        <p class="mb-4">
          ${details.length > 350 ? details.slice(0,350) + '...': details}
        </p>
      </div>
      <div class="grid grid-cols-2 gap-4 mt-8">
        <img
          class="w-full rounded-lg"
          src="${thumbnail_url ? thumbnail_url : "../logo 2/logo.png"}"
          alt="office content 1"
        />
        <img
          class="mt-4 w-full lg:mt-10 rounded-lg"
          src="${image_url ? image_url :"../logo 2/logo.png"}"
          alt="office content 2"
        />
      </div>
        `;
        newsContainer.appendChild(divContent)

    })
}

displayCategories()


