

async function fetchDataFromAPIEndpoint() {

  const cards = await (await fetch('/json/shop.json')).json()
  // .then(response => response.json())
  // .then(cards => {
  //   // Handle the JSON data here
  //   console.log(cards);
  // })
  // .catch(error => console.error('Error loading JSON:', error));
  
 // const cards = await fetch('/api/fetchNotion').then((res) => res.json().then((data) => data.results));
 console.log("main")
 //const cards = require('/json/shop.json');
 console.log(cards);

  document.querySelector('.card-container').innerHTML = cards
      .map(
          (card) => `
  <article class="card">
    <img src="${card.image_url}" 
      class="card__image">
    <h2 class="card__heading">${card.name}</h2>
    <div class="card__content">
      <p>${card.price}
      </p>
    </div>
    <a href="${card.url}" class="card__btn">link</a>
  </article>
  `
      )
      .join('');
}
fetchDataFromAPIEndpoint();