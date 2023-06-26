$(".slider").slick({
  dots: true,
  infinite: true,
  arrows: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});


function getData(url, callback) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => callback(data))
    .catch((err) => console.error(err));
}

const categoryTemplate = (categories) => {
  return `
      <h2>CATEGORY</h2>
      <div class="grid-container">
        <div class="grid-item electronics">${categories[0]}</div>
        <div class="center-column">
          <div class="grid-item jewelery">${categories[1]}</div>
          <div class="grid-item men">${categories[2]}</div>
        </div>
        <div class="grid-item women">${categories[3]}</div>
      </div>
    `;
};

const productTemplate = (product) => {
    const div = document.createElement("div");
    div.classList.add("product-card");
    div.setAttribute("id", `product-${product.id}`);
    div.innerHTML = `
        <div class="product-image"><img src="${product.image}" alt="Product Image"></div>
        <div class="product-title">${product.title}</div>
        <div class="product-price">Price XXXX</div>
      `;
    return div;
  };
  

function filterData(list) {
  const categories = {};
  const bestSeller = [];
  const topPicks = [];
  

  for (let index = 0; index < list.length; index++) {
    if (!categories[list[index].category])
      categories[list[index].category] = [];
    categories[list[index].category].push(list[index]);

    if (list[index].rating.rate > 4) bestSeller.push(list[index]);

    if (list[index].rating.rate > 4.5 && list[index].rating.count > 5)
      topPicks.push(list[index]);
  }
  console.log(categories, bestSeller, topPicks)
  return { categories, bestSeller, topPicks };
  
}

const render = (products) => {
    const { categories, bestSeller, topPicks } = filterData(products);
    document.getElementById("category").innerHTML = categoryTemplate(
      Object.keys(categories)
    );
  
    const productPlaceholder = document.getElementById("product-placeholder");
    productPlaceholder.innerHTML = "";  
    for (let index = 0; index < bestSeller.length && index < 4; index++) {
      productPlaceholder.appendChild(productTemplate(bestSeller[index]));
    }
    const justSold = document.getElementById("just-sold-product-placeholder");
    justSold.innerHTML = "";  
    for (let index = 3; index < bestSeller.length; index++) {
      justSold.appendChild(productTemplate(bestSeller[index]));
    }
    console.log(bestSeller)
    console.log(topPicks)
    const topPic = document.getElementById("top-pick-product-placeholder");
    topPic.innerHTML = "";  
    for (let index = 0; index < topPicks.length && index < 4; index++) {
      topPic.appendChild(productTemplate(topPicks[index]));
    }
  };
  
  
  

getData("https://fakestoreapi.com/products", render);
