if(document.querySelectorAll('.lazy')) {
    function loadImg() {
        let windowTop = window.pageYOffset || document.documentElement.scrollTop;
        const lazyImages = document.querySelectorAll('.lazy');
        lazyImages.forEach(item => {
          let itemTop = item.getBoundingClientRect().top + windowTop;
          let itemPoint = Math.abs(window.innerHeight - item.offsetHeight * 0.5);
          if (windowTop > itemTop - itemPoint) {
            if (item.dataset.src) {
                item.src = item.dataset.src;
                item.removeAttribute('data-src');
              } else if (item.dataset.srcset) {
                item.srcset = item.dataset.srcset;
                item.removeAttribute('data-srcset');
              }
              item.classList.remove('lazy');
          } 
        })
    }
   loadImg()
    window.addEventListener("scroll", loadImg)
}
$(".mobile-subnavs__header").on("click", function () {
    let parentItem = $(this).parent(".mobile-subnavs");
    parentItem
      .siblings(".mobile-subnavs__header")
      .removeClass("open")
      .find(".mobile-subnavs__dropdown")
      .slideUp();
    parentItem.find(".mobile-subnavs__dropdown").slideToggle();
    setTimeout(function () {
      parentItem.toggleClass("open");
    }, 500);
});
//payment schedule
$(".product .pay-schedule").on('click', function() {
  $("#js-popup-schedule").fadeIn(500);
  $("body").append('<div class="overlay" id="js-overlay"></div>');
})
//выбор радиобаттонов в оплате
$('.reqPayments input').on('click', function(e){
  if ($(this).val() == 2) {
    $(".form__btn").html(`Оплатить <svg xmlns='http://www.w3.org/2000/svg' width='97' height='13' viewBox='0 0 97 13' fill='none'>
    <path d='M77.8546 5.90834L74.1462 2.10019H71.9782V10.918H74.2407V5.29103L77.6277 8.62419H78.0455L81.374 5.29103V10.918H83.6382V2.10019H81.4702L77.8546 5.90834ZM94.4249 2.10019L88.8132 7.83145V2.10019H86.5506V10.918H88.6241L94.2357 5.18676V10.918H96.5V2.10019H94.4249ZM59.7818 5.32744C59.7818 6.73087 60.6139 7.83641 61.8896 8.29981L59.4964 10.918H62.2678L64.4444 8.53482H66.7998V10.918H69.0641V2.10019H63.3011C61.152 2.10019 59.7818 3.45729 59.7818 5.32744ZM66.8015 4.0415V6.64978H63.7206C62.6925 6.64978 62.1389 6.12018 62.1389 5.34399C62.1389 4.56779 62.7114 4.03985 63.7206 4.03985L66.8015 4.0415ZM49.2616 3.86276C49.1241 6.89637 48.4295 8.85258 47.073 8.85258H46.7343V10.971L47.0954 10.9875C49.8152 11.1282 51.3196 8.92374 51.5654 4.10936H55.1432V10.918H57.4023V2.10019H49.339L49.2616 3.86276ZM40.7393 1.97607C37.6755 1.97607 35.4732 3.93393 35.4732 6.50745C35.4732 9.17199 37.8698 11.0587 40.7393 11.0587C43.7256 11.0587 46.0466 9.06442 46.0466 6.50745C46.0466 3.95048 43.7256 1.97772 40.7393 1.97772V1.97607ZM40.7393 8.9436C39.008 8.9436 37.8286 7.90096 37.8286 6.50745C37.8286 5.07919 39.008 4.06798 40.7393 4.06798C42.4671 4.06798 43.6878 5.12718 43.6878 6.50745C43.6878 7.89103 42.4499 8.94195 40.7393 8.94195V8.9436ZM33.0714 2.11674H25.0802L25.0046 3.87931C24.8911 6.41973 24.1742 8.83603 22.816 8.87078L22.1885 8.88899V13L24.4734 12.995V10.918H32.406V12.995H34.7081V8.87078H33.0714V2.11674ZM30.8071 8.87078H25.976C26.7944 7.72553 27.231 6.06722 27.3084 4.12756H30.8088L30.8071 8.87078ZM16.8983 0H14.7836V10.7889H16.8983V0ZM2.61641 2.20777H0.5V12.995H2.61469L2.61641 2.20777ZM7.37704 1.46964H5.26235V12.2586H7.37704V1.46964ZM12.1394 0.736474H10.0195V11.5221H12.1394V0.736474Z' fill='white'/>
    </svg>`)
  } else {
    $(".ordering .form__btn").html('Подтвердить заказ')
  }
});