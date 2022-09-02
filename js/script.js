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


// ** Load category data

const catagories = async ()=>{
    const categoryData = await dataLoader(`https://openapi.programming-hero.com/api/news/categories`);
    console.log(categoryData)
};



