const inputText = document.querySelector('#text'); // 검색창
const productContainer = document.querySelector('.product-container'); // 상품 컨테이너

/* JSON 파일 동적으로 HTML에 넣기 */
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

function template(productName, brandName, photo, price) {
  return `
  <div class="product">
    <img src="img/${photo}" alt="" />
    <h2>${productName}</h2>
    <p>${brandName}</p>
    <h3>가격 : ${price}</h3>
    <button>담기</button>
  </div>
`;
}

inputText.addEventListener('input', function () {
  if (inputText.value === '내가검색할 검색어') {
    /* 만약에 내가 검색한 검색어가
      프로덕트 이름이나 업체명에 있으면
      그 상품을 보여준다.
    */
  }
});
