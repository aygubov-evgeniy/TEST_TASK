var orderApp = (function() {
  var state = {
    totalSum: 0,
    totalPrice: 0,
    filterCat: 0,
    filterPrice: 0,
    validateFields: false
  };

  return{
    init: function() {
      this.countProducts();
      this.filterProducts();
      this.orderModal();
    },

    countProducts: function() {
      var fieldTotalSum = document.querySelector('#totalSum'),
          fieldTotalPrice = document.querySelector('#totalPrice'),
          btnAddProduct = document.querySelectorAll('.product-box__btn'),
          pricesArr = document.querySelectorAll('.product-box__meta p'),
          fieldsQuantity = document.querySelectorAll('.qty__item');

      btnAddProduct.forEach(function(item, i) {
        item.addEventListener('click', function() {
          var productPrice = +pricesArr[i].innerHTML.split(' ')[0],
              quantity = Math.abs(+fieldsQuantity[i].value),
              totalProductPrice = quantity * productPrice;

          state.totalSum += totalProductPrice;
          state.totalPrice += quantity;

          if( state.totalSum !== 0 ) {
            fieldTotalSum.innerHTML = state.totalSum;
            fieldTotalPrice.innerHTML = state.totalPrice;
          }
        });
      });
    },

    filterProducts: function() {
      var fieldsControl = document.querySelectorAll('.select-control'),
          productsArr = document.querySelectorAll('.product-box__item'),
          pricesArr = document.querySelectorAll('.product-box__meta p'),
          productsWrap = document.querySelector('.products-box');

      state.productsArr = document.querySelectorAll('.product-box__item');

      fieldsControl.forEach(function(item) {
        item.addEventListener('change', function() {
          var filterProductsArr = [];

          if( this.getAttribute('data-filter') === 'filter-cat' ) {
            state.filterCat = this.value;
          }else if( this.getAttribute('data-filter') === 'filter-price' ) {
            state.filterPrice = this.value;
          }

          if( state.filterCat != 0 && state.filterPrice == 0 ) {
            state.productsArr.forEach(function(el) {
              if( el.getAttribute('data-category') === state.filterCat ) {
                filterProductsArr.push(el);
              }
            });
          }else if( state.filterCat == 0 && state.filterPrice != 0 ) {
            state.productsArr.forEach(function(el, i) {
              if( +pricesArr[i].innerHTML.split(' ')[0] <= state.filterPrice ) {
                filterProductsArr.push(el);
              }
            });
          }else if( state.filterCat != 0 && state.filterPrice != 0 ) {
            state.productsArr.forEach(function(el, i) {
              if( el.getAttribute('data-category') === state.filterCat && +pricesArr[i].innerHTML.split(' ')[0] <= state.filterPrice ) {
                filterProductsArr.push(el);
              }
            });
          }else {
            filterProductsArr = state.productsArr;
          }

          productsWrap.innerHTML = '';
          productsWrap.append(...filterProductsArr);
        });
      });
    },

    orderModal: function() {
      var btnModal = document.querySelector('.btn-check'),
          modal = document.querySelector('.order-modal'),
          modalFields = document.querySelectorAll('.order-modal__field'),
          btnModalForm = document.querySelector('.order-modal__btn');

      btnModal.addEventListener('click', function() {
        modal.classList.add('show');
      });

      btnModalForm.addEventListener('click', function() {
        modalFields.forEach(function(el) {
          el.value !== '' ? state.validateFields = true : state.validateFields = false;
        });

        if( !state.validateFields ) {
          alert('Заполните все поля!');
        }else {
          alert('Спасибо за покупки!');
          modal.classList.remove('show');
          state.totalSum = 0;
          state.totalPrice = 0;
          document.querySelector('#totalSum').innerHTML = 'XXX';
          document.querySelector('#totalPrice').innerHTML = 'XXX';
        }
      });
    }
  }
}());

orderApp.init();