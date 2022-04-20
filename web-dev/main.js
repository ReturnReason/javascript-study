const inputText = document.querySelector('#text'); // 검색창
const productContainer = document.querySelector('.product-container'); // 상품 컨테이너

/* JSON 파일 동적으로 HTML에 넣기 */

makeProduct();

function makeProduct() {
  fetch('./store.json')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.products.forEach((item) => {
        productContainer.insertAdjacentHTML('beforeend', template(item.title, item.brand, item.photo, item.price));
      });
    })
    .catch((error) => {
      console.log('에러');
    });
}

function template(productName, brandName, photo, price) {
  return `
  <div class="product">
    <img src="img/${photo}" alt="" />
    <h2 class="title">${productName}</h2>
    <p class="brand-name">${brandName}</p>
    <h3>가격 : ${price}</h3>
    <button>담기</button>
  </div>
`;
}

inputText.addEventListener('input', function () {
  const searchTitle = document.querySelectorAll('.title');
  const searchBrand = document.querySelectorAll('.brand-name');
  let text = inputText.value.trim(); // 검색어 공백 제거해서 저장

  searchTitle.forEach((title) => {
    title.parentElement.style.visibility = 'hidden';
    title;
    if (title.innerHTML.indexOf(text) !== -1 && text !== '') {
      // 포함된 상품만 보여주기
      title.parentElement.style.visibility = 'visible';
      productContainer.prepend(title.parentElement); // 부모의 첫번째 자식으로 해당 상품 추가
    }

    if (text === '') {
      setTimeout(() => {
        title.parentElement.style.visibility = 'visible';
      }, 100);
    }
  });

  searchBrand.forEach((brand) => {
    if (brand.innerHTML.indexOf(text) !== -1 && text !== '') {
      console.log(brand.innerHTML.indexOf(text));
    }
  });

  if (text === '') {
    productContainer.innerHTML = '';
    makeProduct(); // 검색어 있는 상품이 검색되면 위치 변경되므로 상품 재배치
  }
});
