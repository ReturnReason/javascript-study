const inputText = document.querySelector('#text'); // 검색창
const productContainer = document.querySelector('.product-container'); // 상품 컨테이너
const shoppingCart = document.querySelector('.dragbox'); // 드래그 할곳

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
  <div class="product" draggable="true">
    <img src="img/${photo}" alt="" draggable="false"/>
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

  // 브랜드 검색시
  searchBrand.forEach((brand) => {
    if (brand.innerHTML.indexOf(text) !== -1 && text !== '') {
      let brandArr = [];
      brandArr.push(brand.parentElement);

      brand.parentElement.style.visibility = 'visible';
      productContainer.prepend(brand.parentElement);
    }
  });

  if (text === '') {
    productContainer.innerHTML = '';
    makeProduct(); // 검색어 있는 상품이 검색되면 위치 변경되므로 상품 재배치
  }
});

// 드래그 & 드랍 이벤트
productContainer.addEventListener('dragstart', (e) => {
  e.target.classList.add('draggable');
  console.log(e.target);
});

productContainer.addEventListener('dragend', (e) => {
  e.target.classList.remove('draggable');
});

shoppingCart.addEventListener('dragover', (e) => {
  e.preventDefault;
  const dragItem = document.querySelector('.draggable');

  productContainer.addEventListener('dragend', () => {
    shoppingCart.appendChild(dragItem);
    dragItem.classList.remove('draggable');
    dragItem.classList.add('itemInTheBox');
  });

  const cartText = document.querySelector('.dragbox-text');
  if (cartText.innerHTML !== '') {
    cartText.innerHTML = '';
  }
});

/* 1. 상품을 드래그한다 dragstart(현재 드래그중) 클래스 부착
드래그 놓으면 클래스 뗴기

현재 드래그중인 요소 찾아서 드래그 박스 안에 놓으면 요소로 추가
기존 텍스트 삭제

// function hasTextBox(parent) {
//   const dragBoxText = document.querySelector('.dragbox-text');
//   // shoppingCart.removeChild(dragBoxText);
//   if (dragBoxText) {
//     console.log('자식이없넹');
//   } else {
//     console.log('dragBoxText있음'); */
