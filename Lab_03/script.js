
const gifForm = document.querySelector("#form");
const searchResults = document.querySelector("#search-results");
const gifInput = document.querySelector("#search")
const loadMoreGif = document.querySelector(".hidden")

var pageNum = 0;
var offset = 0; 

gifForm.addEventListener("submit", handleFormSubmit);

async function getResults(event) {
   // event.preventDefault();

   //left of here, trying to make it so that you can load more gifs by clicking load morw
   if (pageNum!=0){
    for (pageNum = 1; pageNum <=2; pageNum++){
        offset = 9*pageNum;
    }
}


    const gif = gifInput.value;
    const apiURL = "http://api.giphy.com/v1/gifs/search?api_key=Ve3UuSfLd3puXRoTtfAhRHRZ96sBa0mu&offset=" + offset + "limit=9&q=" + gif;

    const response = await fetch(apiURL);
    const responseData = await response.json();
    const responseDataFinal = responseData.data;
    
    console.log(responseDataFinal);
    //generateHTML(responseData);

const displayResults = (gifData) => {
    const finalData = gifData;
    finalData.forEach(element => {
        searchResults.innerHTML += `
        <h2>${element.title}</h2>
        <img src="${element.images.fixed_height.url}" alt="${element.title} gif images" />
        `;
      }
    )
  } 

  

  displayResults(responseDataFinal);
}


function handleFormSubmit(event){
    event.preventDefault();
    searchResults.innerHTML = "" //clears gif page
    getResults();
    gifInput.value = "" //clears searchbar
}

function showMore(event){
    pageNum++;
    getResults(event)
    
}


