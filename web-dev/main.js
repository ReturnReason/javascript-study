const searchInput = document.querySelector('#search-input'); // 검색창
const productContainer = document.querySelector('.product-container'); // 상품 컨테이너
const shoppingCart = document.querySelector('.dragbox'); // 드래그 할곳
let productList = []; // store.json 파일 리스트
let dragItem; // 장바구니로 드래그 될 상품 태그 요소
let putBtn;

/* JSON데이터 받아와서 productList 배열에 원본 데이터 저장하기 */
roadData();

/* 제품 템플릿 */
function template(productName, brandName, photo, price, index) {
  return `
    <div class="product" draggable="true" id="${index}">
      <img src="img/${photo}" alt="" draggable="false"/>
      <h2 class="title">${productName}</h2>
      <p class="brand-name">${brandName}</p>
      <h3>가격 : ${price}</h3>
      <button class="put-btn">담기</button>
    </div>
  `;
}

/* JSON 데이터 받아오기 */
function roadData() {
  fetch('./store.json')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.products.forEach((item) => {
        productList.push(item);
      });
    })
    .then(() => {
      makeProduct(productList);
    })
    .catch((error) => {
      console.error('에러');
    });
}

/* 받아온 JSON 데이터 보여주기 */
function makeProduct(productList) {
  productList.forEach((product, index) => {
    const { title, brand, photo, price } = product;
    productContainer.insertAdjacentHTML('beforeend', template(title, brand, photo, price, index));
  });

  putBtnClickEvent();
}

// 담기 버튼에 클릭 이벤트 만들기
function putBtnClickEvent() {
  const putBtn = document.querySelectorAll('.put-btn');
  for (btn of putBtn) {
    btn.addEventListener('click', (e) => {
      console.log(e.target.parentElement);
    });
  }
}

/* 
  ***********
    검색하기 
  ************
*/

searchInput.addEventListener('keyup', function () {
  let inputText = searchInput.value.trim().toUpperCase(); // 검색어 공백 제거
  const productList = newProductList(inputText);

  productContainer.innerHTML = '';
  makeProduct(productList);
});

/* 검색에 해당하는 제품 이름/브랜드를 담은 아이템 배열 만들기 */
function newProductList(inputText) {
  const findProduct = productList.filter((product) => {
    return product.title.includes(inputText) || product.brand.includes(inputText);
  });
  return findProduct;
}

/* 
  ***********
    장바구니 
  ************
*/

// 드래그 & 드랍 이벤트
productContainer.addEventListener('dragstart', (e) => {
  e.target.classList.add('draggable');
  console.log('현재 선택된 요소 :', e.target);
});

productContainer.addEventListener('dragend', (e) => {
  e.target.classList.remove('draggable');
});

shoppingCart.addEventListener('dragover', (e) => {
  e.preventDefault;
  dragItem = document.querySelector('.draggable');
});

productContainer.addEventListener('dragend', (e) => {
  dragItem.classList.remove('draggable');

  // 드래그한 아이템 요소 장바구니에 만들기
  const currentDragItem = e.target.cloneNode(true);
  currentDragItem.children[4].remove(); // 담기 버튼 삭제

  currentDragItem.classList.add('itemInTheBox');

  // 담기 버튼 삭제한 자리에 수량 인풋 만들고 추가
  const amountInput = createAmoutInput();
  currentDragItem.insertAdjacentElement('beforeend', amountInput);

  // 드래그한 아이템 쇼핑카트에 추가
  shoppingCart.insertAdjacentElement('beforeend', currentDragItem);

  // 만약 장바구니에 이미 추가된 아이템이라면 개수 1 추가

  // 카트 아이템이 비어있지 않다면 "여기로 드래그" 문구 제거
  const cartText = document.querySelector('.dragbox-text');
  if (cartText.innerHTML !== '') {
    cartText.innerHTML = '';
  }
});

function createAmoutInput() {
  /* 수량 표시할 인풋 만들기 */
  let amountProduct = 1;
  const amountInput = document.createElement('input');
  amountInput.setAttribute('type', 'number');
  amountInput.setAttribute('value', amountProduct);
  amountInput.classList.add('amount');

  return amountInput;
}
