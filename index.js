(function(){

const quotesEl = document.querySelector('.quotes');
const loader = document.querySelector('.loader');

// const getQuotes = async (page, limit) => {
//     const API_URL = `https://api.javascripttutorial.net/v1/quotes/?page=${page}&limit=${limit}`;
//     const response = await fetch(API_URL);
//     // var data = await response.json();
//     //     console.log("data",data);
    
//     if (!response.ok) {
//         throw new Error(`An error occurred: ${response.status}`);
//     }
//     return await response.json();
// }

//show quotes
const showQuotes = async (quotes,page,limit) => {
    const API_URL = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
    const response = await fetch(API_URL);
    let data=await response.json()
    let finalData=data.data

    data.forEach(quote => {
        const quoteEl = document.createElement('div');
        quoteEl.classList.add('quote');

        quoteEl.innerHTML = `<div>
            <img src="${quote.download_url}" class="photos"/>
            <footer>AUTHOR : ${quote.author}</footer>
            <p>LIKES : ${quote.width} likes</p>
            <p>DISLIKES : ${quote.height} Dislikes</p>
           
            </div>
        `;




        quotesEl.appendChild(quoteEl);
    });
};

//loader
const hideLoader = () => {
    loader.classList.remove('show');
};

const showLoader = () => {
    loader.classList.add('show');
};


   // control variables
   let currentPage = 1;
   const limit = 25;
   let total = 0;


   const hasMoreQuotes = (page, limit, total) => {
    const startIndex = (page - 1) * limit + 1;
    return total === 0 || startIndex < total;
};


// load quotes
const loadQuotes = async (page, limit) => {

    // show the loader
    showLoader();

    // 0.5 second later
    setTimeout(async () => {
        try {
            // if having more quotes to fetch
            if (hasMoreQuotes(page, limit, total)) {
                // call the API to get quotes
                const response = await showQuotes(page, limit);
                // show quotes
                showQuotes(response.data);
                // update the total
                total = response.total;
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            hideLoader();
        }
    }, 500);

};


//scroll events
window.addEventListener('scroll', () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5 &&
        hasMoreQuotes(currentPage, limit, total)) {
        currentPage++;
        loadQuotes(currentPage, limit);
    }
}, {
    passive: true
});

//initialize
loadQuotes(currentPage, limit);

})();




// async function imagesMain() {
//     const response = await fetch("https://picsum.photos/v2/list?page=2&limit=100");
//     var data = await response.json();
//     console.log("data",data);
  
//     const allData=data.map((e)=>(
      
  
//       `<div>
//       <img src="${e.download_url}" class="photos"/>
//       <div class="boxes">
//       <p>AUTHOR : ${e.author}</p>
//       <p>LIKES : ${e.width} likes</p>
//       <p>DISLIKES : ${e.height} Dislikes</p>
//       <p>URL : ${e.url}</p>
//       </div>
//       </div>
//       `
//      ))
    
  
//     const mainBody=document.getElementById("container")
//     mainBody.innerHTML=allData
  
  
  
//   }

// imagesMain()