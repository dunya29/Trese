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