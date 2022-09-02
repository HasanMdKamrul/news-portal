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
    // ** Data found container
    const dataFound = document.getElementById('data-found')
    newsContainer.textContent = ``;
    // ** specific news loaded
    const newsLoad = await dataLoader(`https://openapi.programming-hero.com/api/news/category/${id}`);
    const {data} = newsLoad;
    // console.log(data)

    const highestToLowestViewNews = data.sort((a,b)=>{return (b.total_view-a.total_view)});

    const dataFoundSection = document.getElementById('data-found-section');
    

    if (highestToLowestViewNews.length === 0) {
      dataFoundSection.classList.remove('hidden')
      dataFound.innerText = "Data Not Avaiable"
    } else {
      dataFoundSection.classList.remove('hidden')
      dataFound.innerText = highestToLowestViewNews.length;
    }
   
    highestToLowestViewNews.forEach(news=> {
        console.log(news)
        const {author:{name,published_date,img},image_url,title,thumbnail_url,total_view,details,_id} = news;
        console.log(typeof _id)
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
        <section class="bg-white dark:bg-gray-900">
        <div
          class="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6"
        >
          <dl
            class="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-4 dark:text-white"
          >
            <div class="flex flex-col items-center justify-between mr-5">
              <dt class="mb-2 text-3xl md:text-xl lg:text-3xl font-extrabold">
                ${total_view ? total_view + 'M' : 'N/A'}
              </dt>
              <dd class="font-light text-gray-500 dark:text-gray-700">
                <span><i class="fa-sharp fa-solid fa-eye"></i> <p>total view</p> </span>
              </dd>
            </div>
            <div class="flex items-center justify-center md:ml-3">
                <img class="w-20 h-20 rounded-full" src="${img ? img : "../logo 2/logo.png"}" alt="">
                <div class="ml-5 font-medium dark:text-white">
                    <div class="text-sky-200">${name ? name : 'N/A'}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-700">${published_date ? new Date(published_date).toLocaleDateString() : "N/A"}</div>
                </div>
            </div>
            <div class="flex items-center justify-center ml-5">
                <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            </div>
            <div class='flex justify-center items-center' for="my-modal">
                <label onclick="displayNewsDetails('${_id}')" for="my-modal" class="btn dark:bg-sky-700 text-white modal-button">News Details</label>
            </div>
            </div>
          </dl>
        </div>
      </section>
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



// ** News Details

const displayNewsDetails = async (id)=>{
  // ** Where to display 
    const detailsContainer = document.getElementById('modal-body')
    // ** load the news details data
    const newsDetails = await dataLoader(`https://openapi.programming-hero.com/api/news/${id}`);
    // ** excess individual news data 
    const {data} = newsDetails;

    data.forEach(news => {
      const {others_info:{is_trending,is_todays_pick},author:{name,published_date,img},title,details,total_view} = news;

      detailsContainer.innerHTML = `
      <h3 class="font-bold text-lg">${title ? title : 'N/A'}</h3>
      <p class="py-4">
        ${details.length > 300 ? details.slice(0,300) + '...': details}
      </p>
      <kbd class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">${is_trending ? "Trending..." : "Not Trending..."}</kbd>
      <kbd class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">Today's Pick:${is_todays_pick ? "Yes" : "No"}</kbd>
      <div class="flex justify-between items-center">
          <div class="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
          <dl class="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white">
              <div class="flex flex-col items-center justify-center">
                  <dt class="mb-2 text-3xl md:text-4xl font-extrabold">${total_view ? total_view + 'M' : 'N/A'}</dt>
                  <dd class="font-light text-gray-500 dark:text-gray-200">
                <i class="fa-sharp fa-solid fa-eye"></i> total view
                </dd>
              </div>
          </dl>
        </div>
        <div class="flex items-center justify-center">
                  <img class="w-20 h-20 rounded-full" src="${img ? img : "../logo 2/logo.png"}" alt="">
                  <div class="ml-5 font-medium dark:text-white">
                      <div class="text-sky-200">${name ? name : 'N/A'}</div>
                      <div class="text-sm text-gray-500 dark:text-gray-300">${published_date ? new Date(published_date).toLocaleDateString() : "N/A"}</div>
                  </div>
        </div>
      </div>
      <div class="modal-action">
        <label for="my-modal" class="btn">Okay</label>
      </div>
      
      `

    })
    

}

displayCategories()


