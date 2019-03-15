var orderApp = (function() {
  var state = {
    totalSum: 0,
    totalPrice: 0
  };

  return{
    init: function() {
      this.countProducts();
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
              quantity = +fieldsQuantity[i].value,
              totalProductPrice = quantity * productPrice;

          state.totalSum += totalProductPrice;
          state.totalPrice += quantity;

          if( state.totalSum !== 0 ) {
            fieldTotalSum.innerHTML = state.totalSum;
            fieldTotalPrice.innerHTML = state.totalPrice;
          }
        });
      });
    }
  }
}());

orderApp.init();