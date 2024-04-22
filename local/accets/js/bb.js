let counters = 30;
let counterNewSend = false;
let block_show = false;
$(function () {
  let screenWidth = screen.width;
  const mainHeader = $(".js-main-header");
  const mainBurger = $(".js-main-burger");

  /*
   * Preloader
   */

  /*window.setTimeout(function () {
    $(".preloader").fadeOut();
  }, 2000);*/

  /*
   * Fixed menu
   */

  $(window).on("scroll", function () {
    let fromTop = $(window).scrollTop();
    if (fromTop > 100) {
      mainHeader.removeClass("header--dark");
      mainBurger.removeClass("burger--white");
    } else if ($(".menu__item.hovered").length == 0) {
      mainHeader.addClass("header--dark");
      mainBurger.addClass("burger--white");
    }
  });

  /*
   *  Dropdown
   */

  $(".menu__item").hover(
    function () {
      if ($(this).find(".dropdown").length > 0) {
        $(this).addClass("hovered")
        $(this).find(".dropdown").slideDown();
        if ($(window).scrollTop() < 100) {
          mainHeader.removeClass("header--dark");
        }
      }
    },
    function () {
      $(this).removeClass("hovered")
      $(this).find(".dropdown").slideUp();
      if ($(window).scrollTop() < 100) {
        mainHeader.addClass("header--dark");
      }
    },
    200
  );

  /*
   * Search
   */

  $(".search__toggle").on("click", function () {
    $(".search__modal").fadeIn().find(".search__input").focus();
    /*$(".wrap").addClass("noscroll");
    $("body").append('<div class="search__overlay"></div>');*/
  });

  /*$("body").on("click", ".search__overlay", function () {
    $(".search__modal").fadeOut(300);
    $(".wrap").removeClass("noscroll");
    $(".search__overlay").remove();
  });

  $(".search__input").on("focus", function () {
    $(".search-dropdown").fadeIn();
  });

  $(".search__input").on("blur", function () {
    $(".search-dropdown").fadeOut();
  });*/
  
	$(document).on("click", ".catalog__more", function (e) {
        let url = $(this).attr('href');
        let thisBlock = $(this);
        let tmpUrl = $(this).data('pager');
        $.ajax({
            type: "POST",
            dataType: "html",
            url: url,
            success: function (response) {
                let page_content = $(response);
                if($(thisBlock).parents('.loadPagination').hasClass('paginationReviews')){
                    if ($('.loadReviews').length > 0) {
                        let $moreBlocks = $(page_content.find('.loadReviews').html());
                        if (page_content.find('.loadCards').length > 0) {
                            $('.loadReviews').append($moreBlocks);
                        } else {
                            $('.loadReviews').html('');
                        }
                    }
                    if (page_content.find('.paginationReviews').length > 0) {
                        $('.paginationReviews').eq(0).html(page_content.find('.paginationReviews').html());
                    } else {
                        $('.paginationReviews').eq(0).html('');
                    }
                }else if($(thisBlock).parents('.loadPagination').hasClass('overPagination')){
                    if ($('.loadCardsOver').length > 0) {
                        let $moreBlocks = $(page_content.find('.loadCardsOver').html());
                        if (page_content.find('.loadCardsOver').length > 0) {
                            $('.loadCardsOver').append($moreBlocks);
                            $('.loader').show();
                            if ($(".card-items").length > 0) {
                                setTimeout(function () {
                                    $cardItems.masonry('appended', $moreBlocks);
                                    $('.loader').hide();
                                }, 500);
                            } else {
                                setTimeout(function () {
                                    $cataloGridPromo.masonry('appended', $moreBlocks);
                                    $('.loader').hide();
                                }, 500);
                            }
                        } else {
                            $('.loadCardsOver').html('');
                        }
                    }
                    if (page_content.find('.overPagination').length > 0) {
                        $('.overPagination').eq(0).html(page_content.find('.overPagination').html());
                    } else {
                        $('.overPagination').eq(0).html('');
                    }
                }else {
                    if ($('.loadCards').length > 0) {
                        let $moreBlocks = $(page_content.find('.loadCards').html());
                        if (page_content.find('.loadCards').length > 0) {
                            $('.loadCards').append($moreBlocks);
                            $('.loader').show();
                            if ($(".card-items").length > 0) {
                                setTimeout(function () {
                                    $cardItems.masonry('appended', $moreBlocks);
                                    $('.loader').hide();
                                }, 500);
                            } else {
                                setTimeout(function () {
                                    $cataloGridMain.masonry('appended', $moreBlocks);
                                    $('.loader').hide();
                                }, 500);
                            }
                            /*$('.loadCards').imagesLoaded().progress( function() {

                            });*/
                        } else {
                            $('.loadCards').html('');
                        }
                    }
                    if ($('.loadCollection').length > 0) {
                        let $moreBlocks = $(page_content.find('.loadCollection').html());
                        let $moreGoods = $moreBlocks.find('.coll-goods').html();
                        console.log($moreBlocks.find('.coll-goods').length);
                        if (page_content.find('.loadCollection').length > 0) {
                            $('.loadCollection').append($moreBlocks);
                            /*$('.loadCollection').imagesLoaded().progress( function() {
                                $cataloGrid.masonry('appended', $moreBlocks);
                            });*/
                            setTimeout(function () {
                                $cataloGridMain.masonry('appended', $moreBlocks);
                                $moreBlocks.find('.coll-goods').each(function(index, element){
                                    $(this).masonry({
                                        gutter: gutterMasonryColl,
                                        //columnWidth: colMasonryWidth,
                                        itemSelector: ".coll-goods__item",
                                        lazyLoad: true,
                                    });
                                });
                            }, 200);
                        } else {
                            $('.loadCollection').html('');
                        }
                    }


                    if (page_content.find('.loadPagination').length > 0) {
                        $('.loadPagination').eq(0).html(page_content.find('.loadPagination').html());
                    } else {
                        $('.loadPagination').eq(0).html('');
                    }
                }
                window.history.pushState(null, null, tmpUrl);


                //setTimeout(masonry, 100);
                //masonry();
            }
        });
        e.preventDefault();
    });
  $(".search__close").on("click", function (e) {
    e.preventDefault();
    $(".search__modal").fadeOut(300);
    $(".wrap").removeClass("noscroll");
    $(".search__overlay").remove();
  });

  /*
   * Mobile menu
   */

  $(".burger").on("click", function (e) {
    e.preventDefault();
    $(".mobile-menu").addClass("open");
    $(".wrap").addClass("noscroll");
  });

  $(".mobile-menu__close").on("click", function (e) {
    e.preventDefault();
    $(".mobile-menu").removeClass("open");
    $(".wrap").removeClass("noscroll");
  });

  $(".mobile-menu__item span").on("click", function () {
    let parentItem = $(this).parent(".mobile-menu__item");
    parentItem
      .siblings(".mobile-menu__item")
      .removeClass("open")
      .find(".mobile-menu__dropdown")
      .slideUp();
    parentItem.find(".mobile-menu__dropdown").slideToggle();
    setTimeout(function () {
      parentItem.toggleClass("open");
    }, 500);
  });

  /*
   * Footer menu
   */

  if (screenWidth < 481) {
    $(".footer-menu__title").on("click", function (e) {
      e.preventDefault();
      $(this)
        .toggleClass("open")
        .siblings(".footer-menu__list")
        .slideToggle()
        .parents(".footer-menu__col")
        .siblings(".footer-menu__col")
        .find(".footer-menu__title")
        .removeClass("open")
        .siblings(".footer-menu__list")
        .slideUp();
    });
  }

  /*
   *  Carousels
   */

  $(".banner").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 800,
    prevArrow:
      '<button class="prev" type="button"><svg><use href="/local/accets/img/icons/sprite.svg#arr-left"></svg></button>',
    nextArrow:
      '<button class="next" type="button"><svg><use href="/local/accets/img/icons/sprite.svg#arr-right"></svg></button>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
  });

  $(".goods").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    dots: false,
    autoplay: false,
    autoplaySpeed: 5000,
    speed: 800,
    prevArrow:
      '<button class="prev" type="button"><svg><use href="/local/accets/img/icons/sprite.svg#arr-left"></svg></button>',
    nextArrow:
      '<button class="next" type="button"><svg><use href="/local/accets/img/icons/sprite.svg#arr-right"></svg></button>',
    responsive: [
      {
        breakpoint: 1220,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          speed: 400,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          arrows: false,
          variableWidth: true,
          speed: 200,
          swipeToSlide: true,
        },
      },
    ],
  });

  $(".goods-new").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    dots: false,
    autoplay: false,
    autoplaySpeed: 5000,
    speed: 800,
    prevArrow:
      '<button class="prev" type="button"><svg><use href="/local/accets/img/icons/sprite.svg#arr-left"></svg></button>',
    nextArrow:
      '<button class="next" type="button"><svg><use href="/local/accets/img/icons/sprite.svg#arr-right"></svg></button>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          speed: 400,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          arrows: false,
          variableWidth: true,
          speed: 200,
          swipeToSlide: true
        },
      },
    ],
  });

  $(".reviews-carousel").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    dots: true,
    autoplay: false,
    autoplaySpeed: 5000,
    speed: 800,
    prevArrow:
      '<button class="prev" type="button"><svg><use href="/local/accets/img/icons/sprite.svg#chevron-left"></svg></button>',
    nextArrow:
      '<button class="next" type="button"><svg><use href="/local/accets/img/icons/sprite.svg#chevron-right"></svg></button>',
    responsive: [
      {
        breakpoint: 576,
        settings: {
          arrows: false,
          autoplay: true,
        },
      },
    ],
  });

  if (screenWidth < 992) {
    $(".gallery").slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      infinite: true,
      dots: true,
      autoplay: false,
      autoplaySpeed: 5000,
      speed: 800,
      arrows: false,
      responsive: [
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            autoplay: true,
          },
        },
      ],
    });
  }

  /*
   *  Modal
   */

  $(".js-modal-show").on("click", function () {
    var currentModal = $(this).attr("href");
    $(currentModal).fadeIn(500);
    $(".wrap").addClass("noscroll");
    $("body").append('<div class="overlay" id="js-overlay"></div>');
  });

  $(".js-modal-close").on("click", function (e) {
    e.preventDefault();
    $(".js-modal").fadeOut(100);
    $(".wrap").removeClass("noscroll");
    $("#js-overlay").remove();
  });

  $("body").on("click", "#js-overlay", function () {
    $(".js-modal").fadeOut(100);
    $(".wrap").removeClass("noscroll");
    $("#js-overlay").remove();
  });

  /*
   * Popup
   */
 /*   var redirect = getURIParametr('redirect');

   if(redirect!="trendymamas"){
	if ( $.cookie('hidePopap') != "Y" ) {
		  setTimeout(function () {
			$(".wrap").addClass("noscroll");
			$("#js-give-coupon").fadeIn(500);
			$("body").append('<div class="overlay" id="js-overlay"></div>');
			$.cookie('hidePopap', 'Y', { expires: 30, path: '/' });
		  }, 15000);
	}
   } */

  $(".js-popup-close").on("click", function (e) {
    closedPopap(e);
  });

  $("body").on("click", "#js-overlay", function (e) {
    closedPopap(e);
  });

  $(".js-signup").on("click", function () {
    var currentModal = $(this).attr("href");
    $(currentModal).fadeIn(500);
    $(".wrap").addClass("noscroll");
    $("body").append('<div class="overlay" id="js-overlay"></div>');
  });

  /*
   *   Маска телефона
   */

  $(".phone").mask("+7 (999) 999-99-99");
  $(".number").mask("9999");

  $(".js-phone-other").on("click", function (e) {
    e.preventDefault();
    if ($(this).hasClass("rus")) {
      $(this)
        .removeClass("rus")
        .text("Другой формат номера")
        .siblings(".form__group")
        .find(".phone")
        .removeClass(".phone")
        .mask("+7 (999) 999-99-99")
        .attr("placeholder", "+7 (___) ___-__-__")
        .focus();
    } else {
      $(this)
        .addClass("rus")
        .text("Российский номер")
        .siblings(".form__group")
        .find(".phone")
        .removeClass(".phone")
        .mask("9?999999999999999")
        .attr("placeholder", "________________")
        .focus();
    }
  });

  /*
   *   Маска даты
   */

  $(".date").mask("99.99.9999");

  /*
   *  Filter
   */

  let counter = 0;

  $(".filter__toggle").on("click", function (e) {
    e.preventDefault();
    $(this).toggleClass("open").siblings(".filter__dropdown").slideToggle();
  });

  if (screenWidth > 575) {
    $(".filter .checkbox label").on("click", function () {
      let thisInput = $(this).siblings("input");
      let idInput = thisInput.attr("id");
      let text = $(this).text();

      setTimeout(function () {
        //if (thisInput[0].checked === true) {
        if($(thisInput).is(':checked')){

          /*$(".filter__selected").each(function () {
            if ($(this).attr("data-target") === idInput) {
              $(this).remove();
            }
          });*/
          $(".filter__row").append(`
          <div class="filter__selected" data-target="${idInput}">
            <span>${text}</span>
            <svg>
              <use href="/local/accets/img/icons/sprite.svg#icon-close"></use>
            </svg>
          </div>
        `);

        } else {
          $('.filter__selected[data-target="'+idInput+'"]').remove();
        }
      }, 400);
    });

    $(".filter__row").on("click", ".filter__selected", function () {
     // let inputTarget = this.dataset["target"];
      let thisId = $(this).attr('data-target');
      console.log(thisId);
      $(this).remove();
      $('#'+thisId).trigger('click');
      //$(inputTarget)[0].checked = false;
    });

    $(".filter__reset").on("click", function (e) {
      e.preventDefault();
      $(this)
        .parents(".filter")
        .find(".checkbox input")
        .each(function () {
          this.checked = false;
        });
      $(this).parents(".filter").find(".filter__selected").remove();
    });
  } else {
    $(".filter .checkbox label").on("click", function () {
      let thisInput = $(this).siblings("input");
      let idInput = thisInput.attr("id");

      setTimeout(function () {
        if (thisInput[0].checked === true) {
          counter++;
          $(".filter-btn span").text(counter).fadeIn().css("display", "flex");
          $(".filter__qnt").text(counter).fadeIn().css("display", "flex");
        } else {
          counter--;
          if (counter <= 0) {
            counter = 0;
            $(".filter-btn span").hide();
            $(".filter__qnt").hide();
          } else {
            $(".filter-btn span").text(counter);
            $(".filter__qnt").text(counter);
          }
        }
      }, 400);
    });

    $(".filter__reset").on("click", function (e) {
      e.preventDefault();
      counter = 0;
      $(this)
        .parents(".filter")
        .find(".checkbox input")
        .each(function () {
          this.checked = false;
        });
      $(".filter-btn span").hide();
      $(".filter__qnt").hide();
    });
  }

  $(".filter-btn").on("click", function (e) {
    e.preventDefault();
    $(".filter").addClass("open");
    $(".wrap").addClass("noscroll");
    $("body").append('<div class="filter__overlay"></div>');
  });

  $(".filter__close").on("click", function (e) {
    e.preventDefault();
    $(".filter").removeClass("open");
    $(".wrap").removeClass("noscroll");
    $(".filter__overlay").remove();
  });

  $("body").on("click", ".filter__overlay", function () {
    $(".filter").removeClass("open");
    $(".wrap").removeClass("noscroll");
    $(".filter__overlay").remove();
  });

  /*
   * Form entry drop-down list
   */

  $(".smart input").on("focus", function () {
    $(this).siblings(".smart__dropdown").fadeIn();
  });

  $(".smart input").on("blur", function () {
    $(this).siblings(".smart__dropdown").fadeOut();
  });

  /*
   *  Plus - minus
   */

  $(".js-minus").click(function () {
    let $input = $(this).parent().find("input");
    let count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
    getQuantityCart($(this).parent().find("input").val(),$(this).parent().find("input").data('id'));
    return false;
  });

  $(".js-plus").click(function () {
    let $input = $(this).parent().find("input");
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    getQuantityCart($(this).parent().find("input").val(),$(this).parent().find("input").data('id'));
    return false;
  });

  /*
   *  Select
   */

  $(".select").each(function () {
    const _this = $(this),
      selectOption = _this.find("option"),
      selectOptionLength = selectOption.length,
      selectedOption = selectOption.filter(":selected"),
      duration = 450;

    let textSelect = "";

    console.log(_this.children("option:disabled").text());

    if (_this.children("option:disabled").text().length === 0) {
      textSelect = selectedOption.text();
    } else {
      textSelect = _this.children("option:disabled").text();
    }

    _this.hide();
    _this.wrap('<div class="select"></div>');
    $("<div>", {
      class: "new-select",
      text: textSelect,
    }).insertAfter(_this);

    const selectHead = _this.next(".new-select");
    $("<div>", {
      class: "new-select__list",
    }).insertAfter(selectHead);

    if (_this.children("option:disabled").text().length === 0) {
      selectHead.addClass("selected");
    }

    const selectList = selectHead.next(".new-select__list");
    for (let i = 1; i < selectOptionLength; i++) {
      $("<div>", {
        class: "new-select__item",
        html: $("<span>", {
          text: selectOption.eq(i).text(),
        }),
      })
        .attr("data-value", selectOption.eq(i).val())
        .appendTo(selectList);
    }

    const selectItem = selectList.find(".new-select__item");
    selectList.slideUp(0);
    selectHead.on("click", function () {
      if (!$(this).hasClass("on")) {
        $(this).addClass("on");
        selectList.slideDown(duration);

        selectItem.on("click", function () {
          $(this)
            .addClass("active")
            .siblings(".new-select__item")
            .removeClass("active");
          let chooseItem = $(this).data("value");

          $("select").val(chooseItem).attr("selected", "selected");
          selectHead.text($(this).find("span").text());
          selectHead.addClass("selected");

          selectList.slideUp(duration);
          selectHead.removeClass("on");
        });
      } else {
        $(this).removeClass("on");
        selectList.slideUp(duration);
      }
    });
  });

  /*
   * Order toggle
   */

  $(".order__toggle").on("click", function (e) {
    e.preventDefault();
    let order = $(this).parents(".order");
    if (order.hasClass("open")) {
      order.find(".order-table").slideUp();
      order.find(".order__toggle").text("Показать подробности заказа");
      order.removeClass("open");
    } else {
      order.find(".order-table").slideDown();
      order.find(".order__toggle").text("Скрыть подробности заказа");
      order.addClass("open");
    }
  });

  /*
   *  Product accordion
   */

  $(".info__header").on("click", function () {
    $(this)
      .toggleClass("open")
      .siblings(".info__content")
      .slideToggle()
      .parents(".info__item")
      .siblings(".info__item")
      .find(".info__header")
      .removeClass("open")
      .siblings(".info__content")
      .slideUp();
  });

  /*
   *  Gallery zoom
   */

  if (screenWidth > 991) {
    $(".zoom").zoom();
  }

  /*
   * Catalog card image
   */

  if (screenWidth < 1220) {
    let heightImg = $(".catalog .card__img").width() * 1.47;
    $(".catalog .card__img").css("height", heightImg);
  }

  /*
   * Modal gallery
   */

  $(".gallery__item").on("click", function (e) {
    e.preventDefault();
    if ($(this).hasClass("video")) {
      $(".modal-video").fadeIn();
    } else {
      $(".modal-gallery").fadeIn();
    }
    $(".wrap").addClass("noscroll");
  });

  $(".modal-gallery").on("click", function () {
    $(this).fadeOut();
    $(".wrap").removeClass("noscroll");
  });

  $(".modal-video").on("click", function () {
    $(this).fadeOut();
    $(".wrap").removeClass("noscroll");
  });

  /*
   * Subscribe to the notification
   */

  $(".size-radio.disabled").on("click", function (e) {
    let prod = $(this).find('input').val();
    let size = $(this).find('label').text();
    $('#js-popup-size .popup__title b').text(size);
    $('#js-popup-size #prodSize').val(prod);
    closedPopap(e);
    $("#js-popup-size").fadeIn(500);
    $(".wrap").addClass("noscroll");
    $("body").append('<div class="overlay" id="js-overlay"></div>');
  });
  $('.product__fav--desctop, .product__fav--mobile').on("click", function (e) {
    let id = $(this).data('id');
    $.ajax({
      type: "POST",
      dataType: "html",
      url: "/local/ajax/favorites.php?ID="+id,
      success: function(response){
        var result = $.parseJSON(response);
        if (response == 1) {
          $('.product__fav').addClass('active');
          console.log(response);
        }
        if (response == 2) {
          $('.product__fav').removeClass('active');
        }
      }
    });
    e.preventDefault();

  });
  $('.addCart').on("click", function (e) {//Добавление в корзину
    e.preventDefault();
    if($('#sizeBlock input:checked').length>0){//Размер выбран, добавляем
      addCart();
    }else{//размер не выбран - нужен попап
      $("#selectSize").fadeIn(500);
      $(".wrap").addClass("noscroll");
      $("body").append('<div class="overlay" id="js-overlay"></div>');
    }
  });
  $('#selectSize .sizes-select input').on("click", function (e) {//Выбран размер в попапе
    closedPopap(e);
    if($(this).is(':disabled')){//Если нажали на подписку
      openPopap('js-popup-size');
    }else{
      let sizeId = $(this).data('id');
      $('#'+sizeId).trigger( "click" );
      addCart();
    }
  });
  $('.delCartPosition').on("click", function (e) {//Удаление из корзины
    let id = $(this).parents('.basket-table__item').data('id');
    $(this).parents('.basket-table__item').remove();
    $.ajax({
      type: "POST",
      dataType: "html",
      url: "/local/ajax/cart.php?type=delete&bskId="+id,
      success: function(response){
          loadSmallCart();
        getCost();
        if($('.basket-table__item').length==0){
          loadEmptyCart();
        }

      }
    });
  });
  $('.reqDelivery input').on('click', function(e){//выбор радиобаттонов в доставке
    $('.deliveryForm').removeClass('hideBlock');
    $('.reqDelivery').removeClass('error');
    let price = $(this).data('price');
    let totalPrice = $('#totalPrice').data('price');
    let finalPrice = (Math.round(price+totalPrice)).toLocaleString('ru');
    $(this).val() == "5" ? $('#deliveryPrice span').eq(0).css("display","none") :  $('#deliveryPrice span').eq(0).css("display","block")
    $('.reqPayments').show();
    switch($(this).val()) {
      case '2':  //Курьер по Москве до МКАД - 750 ₽
        $('#deliveryPrice span').eq(1).html(price+' <span class="rub">&#8381;</span>');
        $('.req3').parents('.form__group').addClass('hideBlock');
        $('.req4').parents('.form__group').addClass('hideBlock');
        $('.req2').parents('.form__group').removeClass('hideBlock');
        $('#pay2').prop('checked', false).parents('.form__radio').addClass('hideBlock');
		$('.deliveryForm .form__subtitle').show();
        break;
      case '3':  //Самовывоз из магазина - бесплатно
        $('#deliveryPrice span').eq(1).html('бесплатно');
        $('.req3').parents('.form__group').addClass('hideBlock');
        $('.req4').parents('.form__group').addClass('hideBlock');
        $('.req2').parents('.form__group').addClass('hideBlock');
        $('#pay2').parents('.form__radio').removeClass('hideBlock');
        $('.reqPayments').hide();
        $('.reqPayments input').prop('checked', false);
        $(".ordering .form__btn").html('Подтвердить заказ')
		$('.deliveryForm .form__subtitle').hide();
        break;
      case '5':  //Область и РФ (CDEK) - уточним
		$('#deliveryPrice span').eq(1).html('Оплата доставки при получении');
        $('.req3').parents('.form__group').removeClass('hideBlock');
        $('.req4').parents('.form__group').addClass('hideBlock');
        $('.req2').parents('.form__group').removeClass('hideBlock');
        $('#pay2').prop('checked', false).parents('.form__radio').addClass('hideBlock');
		$('.deliveryForm .form__subtitle').show();
        break;
      case '6':  //Международная доставка - уточним
		$('#deliveryPrice span').eq(1).html('уточнит менеджер');
        $('.req3').parents('.form__group').removeClass('hideBlock');
        $('.req4').parents('.form__group').removeClass('hideBlock');
        $('.req2').parents('.form__group').removeClass('hideBlock');
        $('#pay2').prop('checked', false).parents('.form__radio').addClass('hideBlock');
		$('.deliveryForm .form__subtitle').show();
        break;
    }
    $('.ordering__total span').eq(1).html(finalPrice+' <span class="rub">&#8381;</span>');
  });
  $('.ordering__form').on("submit", function(e){
    let error = false;
    $('.ordering__form .req1').each(function(e){
      if($(this).val()==""){
        $(this).parents('.form__group').addClass('error');
        error = true;
      }else{
        $(this).parents('.form__group').removeClass('error');
      }
    });
    if($('.reqDelivery input').is(':checked')){
      $('.reqDelivery').removeClass('error');
      switch($('.reqDelivery input:checked').val()) {
        case '2':  //Курьер по Москве до МКАД - 750 ₽
          $('.ordering__form .req2').each(function(e){
            if($(this).val()==""){
              $(this).parents('.form__group').addClass('error');
              error = true;
            }else{
              $(this).parents('.form__group').removeClass('error');
            }
          });
          break;
        case '5':  //Область и РФ (CDEK) - уточним
          $('.ordering__form .req2').each(function(e){
            if($(this).val()==""){
              $(this).parents('.form__group').addClass('error');
              error = true;
            }else{
              $(this).parents('.form__group').removeClass('error');
            }
          });
          $('.ordering__form .req3').each(function(e){
            if($(this).val()==""){
              $(this).parents('.form__group').addClass('error');
              error = true;
            }else{
              $(this).parents('.form__group').removeClass('error');
            }
          });
          break;
        case '6':  //Международная доставка - уточним
          $('.ordering__form .req2').each(function(e){
            if($(this).val()==""){
              $(this).parents('.form__group').addClass('error');
              error = true;
            }else{
              $(this).parents('.form__group').removeClass('error');
            }
          });
          $('.ordering__form .req3').each(function(e){
            if($(this).val()==""){
              $(this).parents('.form__group').addClass('error');
              error = true;
            }else{
              $(this).parents('.form__group').removeClass('error');
            }
          });
          $('.ordering__form .req4').each(function(e){
            if($(this).val()==""){
              $(this).parents('.form__group').addClass('error');
              error = true;
            }else{
              $(this).parents('.form__group').removeClass('error');
            }
          });
          break;
      }
    }else{
      $('.reqDelivery').addClass('error');
      error = true;
    }
    if($('.reqDelivery input:checked').val()!=3) {
      if ($('.reqPayments input').is(':checked')) {
        $('.reqPayments').removeClass('error');
      } else {
        $('.reqPayments').addClass('error');
        error = true;
      }
    }


    if(error){
      if($('.form__group').hasClass('error') || $('.radioBlock').hasClass('error')){
        var target = $('.error').eq(0).offset().top-150;
      }
      $("html, body").animate({scrollTop: target}, 800);
    }else{
		$('.ordering__form .form__btn').attr('disabled', true);
      $.ajax({
        type: "POST",
        data: $('.ordering__form').serializeArray(),
        dataType: "json",
        url: "/local/ajax/order.php",
        success: function(response){
          if(response.error==1){
            window.location="/order/confirm/?ORDER_ID="+response.order;
          }else{
            $('#orderError .popup__title').text(response.error);
            openPopap('orderError');
			$('.ordering__form .form__btn').removeAttr('disabled');
          }
        }
      });
    }
    e.preventDefault();
    return false;
  });
  $("#personalForm").on('submit', function(e){
    let error = false;
    $('#personalForm .req').each(function(e){
      if($(this).val()==""){
        $(this).parents('.form__group').addClass('error');
        error = true;
      }else{
        $(this).parents('.form__group').removeClass('error');
      }
    });
    if(!error){
      $.ajax({
        type: "POST",
        data: $('#personalForm').serializeArray(),
        dataType: "json",
        url: "/local/ajax/personal.php?type=edit",
        success: function(response){
          if(response.error==1){
            $('#Confirm .popup__title').text(response.text);
            openPopap('Confirm');
          }else{
            $('#orderError .popup__title').text(response.error);
            openPopap('orderError');
          }
        }
      });
    }
    return false;
  });
  $('#fillProfile').on('click', function(e){
    
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "/local/ajax/personal.php?type=fillOrder",
      success: function(data){
        switch($('.reqDelivery input:checked').val()) {
          case '2':  //Курьер по Москве до МКАД - 750 ₽
              if(data.STREET=="" && data.HOUSE=="" && data.FLAT==""){
                openPopap('errorFullProfile');
              }
            $('.ordering__form input[data-code="STREET"]').val(data.STREET);
            $('.ordering__form input[data-code="HOUSE"]').val(data.HOUSE);
            $('.ordering__form input[data-code="FLAT"]').val(data.FLAT);
            break;
          case '5':  //Область и РФ (CDEK) - уточним
            if(data.CITY=="" && data.STREET=="" && data.HOUSE=="" && data.FLAT==""){
              openPopap('errorFullProfile');
            }
            $('.ordering__form input[data-code="CITY"]').val(data.CITY);
            $('.ordering__form input[data-code="STREET"]').val(data.STREET);
            $('.ordering__form input[data-code="HOUSE"]').val(data.HOUSE);
            $('.ordering__form input[data-code="FLAT"]').val(data.FLAT);
            break;
          case '6':  //Международная доставка - уточним
            if(data.COUNTRY=="" &&data.CITY=="" && data.STREET=="" && data.HOUSE=="" && data.FLAT==""){
              openPopap('errorFullProfile');
            }
            $('.ordering__form input[data-code="COUNTRY"]').val(data.COUNTRY);
            $('.ordering__form input[data-code="CITY"]').val(data.CITY);
            $('.ordering__form input[data-code="STREET"]').val(data.STREET);
            $('.ordering__form input[data-code="HOUSE"]').val(data.HOUSE);
            $('.ordering__form input[data-code="FLAT"]').val(data.FLAT);
            break;
        }
      }
    });
    e.preventDefault();
  });
  $('#promocodeCart').on('submit', function(e){
    let data = $('#promocodeCart').serializeArray();
    $.ajax({
      type: "POST",
      data: data,
      dataType: "json",
      url: "/local/ajax/cart.php?type=promoCode",
      success: function(data){
        if(data.type=='error'){
          $('#promocodeCart').addClass('error');
          $('#promocodeCart .error-text').text(data.text).removeClass('hideBlock');
        }else{
          document.location.reload();
        }
      }
    });
    e.preventDefault();
  });
  $('#js-modal-auth form').on('submit', function(e){
    authSMS();
    e.preventDefault();
  });
  $('#js-modal-sms form').on('submit', function(e){
    authSMScode();
    e.preventDefault();
  });
  $('#js-popup-size form').on('submit', function(e){//форма выбора размера
    let error = false;
    let data = $(this).serializeArray();
    $('#js-popup-size form input').each(function(e){

      if($(this).val()==""){
        $(this).parents('.form__group').addClass('error');
        error = true;
      }else{
        $(this).parents('.form__group').removeClass('error');
      }
    });
    if(!error) {
      $.ajax({
        type: "POST",
        data: data,
        dataType: "json",
        url: "/local/ajax/subscribe.php?type=size",
        success: function (response) {
          $('#js-popup-size .js-popup-close').trigger('click');
          if (response.error == 1) {
            openPopap('confirmSenderSize');
          } else if (response.error == 2) {
            openPopap('errorSenderSize');
          } else {
            $('#orderError .popup__title').text(response.error);
            openPopap('orderError');
          }
        }
      });
    }
    return false;
    e.preventDefault();
  });
  $('#subscribeForm').on('submit', function(e){//форма подписки
    let data = $('#subscribeForm').serializeArray();
    let error = false;
    if($('#subscribeForm .form__group input').val()==""){
      $('#subscribeForm .form__group').addClass('error');
      error = true;
    }else{
      $('#subscribeForm .form__group').removeClass('error');
      error = false;
    }
    if(!error) {
      $.ajax({
        type: "POST",
        data: data,
        dataType: "json",
        url: "/local/ajax/subscribe.php?type=add",
        success: function (response) {
          if (response.error == 1) {
            $('#Confirm .popup__title').text(response.text);
            openPopap('Confirm');
          } else {
            $('#orderError .popup__title').text(response.error);
            openPopap('orderError');
          }
        }
      });
    }
    e.preventDefault();
  });
  $('#js-modal-sms .modal__back').on('click', function(e){//вернуться назад в окне подктверждения кода
    $('#js-modal-sms .modal__close').trigger('click');
    openPopap("js-modal-auth");
    e.preventDefault();
  });
  $('#sendSMSagain').on('click', function(e){//повторная отправка кода
    if($(this).hasClass('sender')){
      authSMS();
    }
    e.preventDefault();
  });
  $('#gift_sert .form__radio input').on('change', function(){//выбор типа сертификата

    let sertType = $(this).val();
    let type = $(this).attr('data-type');
    $('#sertOver').hide();
    $('#sertOver input').val('');
    if(type=="el"){
      $('#sertOver').show();
    }
    $('#sertNominal').show();
    $('.selectBlock').hide();
    $('#sectBlock'+sertType).show();
  });
  $('#gift_sert').on('submit', function(e){//Отправлям форму с сертификатом
    let error = false;
    let sertType = $('#gift_sert .form__radio input:checked').val();
    let type = $('#gift_sert .form__radio input:checked').attr('data-type');
    $('.sertError').text('').hide();
    if($('#gift_sert .form__radio input:checked').length==0){
      $('.sertError').text('Выберите тип сертификата!').show();
      error = true;
    }else{
      if(type=="el"){
        if(!$('#sertOver input').val()){
          $('.sertError').text('Укажите e-mail получателя!').show();
          error = true;
        }
      }
    }

    if(!error) {
      $.ajax({
        type: "POST",
        data: $('#gift_sert').serializeArray(),
        dataType: "json",
        url: "/local/ajax/sert.php?type=pay",
        success: function (response) {
          if (response.error == 1) {
            window.location.href = "/pay/?ORDER_ID="+response.orderId;
          }else if (response.error == 2) {
            window.location.href = "/order/";
          }else{
            $('#orderError .popup__title').text("При покупке сертификата произошла ошибка. Поробуйте позже.");
            openPopap("orderError");
          }
        }
      });
    }
    e.preventDefault();
  });
  $('#js-give-coupon form').on('submit', function(e){//Отправлям форму с попапа
	let error = false;
	let data = $('#js-give-coupon form').serializeArray();
	let regEx = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
    
	if($('#js-give-coupon-email').val() == ""){
		$('#js-give-coupon-email').parent().addClass('error');
		error = true;
	}else{
		if (!regEx.test($('#js-give-coupon-email').val())) {
			$('#js-give-coupon-email').parent().addClass('error');
			error = true;
		}else{
			$('#js-give-coupon-email').parent().removeClass('error');
		}
	}
	if(!error) {
      $.ajax({
        type: "POST",
        data: data,
        dataType: "json",
        url: "/local/ajax/subscribe.php?type=add&over=coupon",
        success: function (response) {
			$('#js-give-coupon .js-popup-close').trigger('click');
			$('#js-give-coupon-email').val('');
          if (response.error == 1) {
            $('#Confirm .popup__title').text(response.text);
            openPopap('Confirm');
          } else {
            $('#PopapSubscribeError .popup__title').text(response.error);
            openPopap('PopapSubscribeError');
          }
        }
      });
    }
	e.preventDefault();
  });
  $('#PopapSubscribeError .js-popup-close').on('click', function(e){
	  openPopap('js-give-coupon');
  });
  if($('.catalog__more').length>0){
    scrollMore();
  }
  clickMoreCat();
  favoritesBut();
  loadSmallCart();
  $(document).on("keyup", function (e) {
    let code = e.keyCode || e.which;
    if(code==27){
      $('.modal-gallery').fadeOut();
      $(".wrap").removeClass("noscroll");
    }
  });
  $(document).on("click", ".page__more", function (e) {
	clickMorePage($(this));
	return false;
  });
});
$(window).scroll(function(){
  scrollMore();
});
function scrollMore(){
  if($('.catalog__more').length>0) {
    let $target = $('.catalog__more');
    if (block_show) {
      return false;
    }
    let wt = $(window).scrollTop();
    let wh = $(window).height()*1.5;
    let et = $target.offset().top;
    let eh = $target.outerHeight();
    let dh = $(document).height();

    if (wt + wh >= et || wh + wt == dh || eh + et < wh) {
      $('.catalog__more').click();
    }
  }
  if($('.page__more').length>0) {
    let $target = $('.page__more');
    if (block_show) {
      return false;
    }
    let wt = $(window).scrollTop();
    let wh = $(window).height()*1.5;
    let et = $target.offset().top;
    let eh = $target.outerHeight();
    let dh = $(document).height();

    if (wt + wh >= et || wh + wt == dh || eh + et < wh) {
      $('.page__more').click();
    }
  }
}
function clickMoreCat(){
  $('.catalog__more').on("click", function (e) {
    if (block_show) {
      return false;
    }
    $('.catalog__more').addClass('disabled');
    let url = $(this).attr('href');
    block_show = true;
    $.ajax({
      type: "GET",
      dataType: "html",
      async: false,
      url: url+"&ajaxCatalog=Y",
      success: function(data){
        $('#loadCatalog .catalog__row').append(data);
        window.history.pushState( null, null, url );
        favoritesBut();
      }
    });
    $.ajax({
      type: "GET",
      dataType: "html",
      url: url+"&ajaxCatalogPage=Y",
      success: function(data){
        block_show = false;
        $('#loadCatalogPage').html(data);
        clickMoreCat();
      }
    });

    e.preventDefault();
  });
}
function favoritesBut(){
  $('.card__fav').on("click", function (e) {
    let id = $(this).data('id');
    let link = $(this);
    $.ajax({
      type: "POST",
      dataType: "html",
      url: "/local/ajax/favorites.php?ID="+id,
      success: function(response){
        var result = $.parseJSON(response);
        if (result == 1) {
          $(link).addClass('active');
        }
        if (result == 2) {
          $(link).removeClass('active');
        }
      }
    });
    e.preventDefault();

  });
  $('.card__fav-del').on("click", function (e) {
    if($(this).hasClass('delSubscr')){
      let id = $(this).data('id');
      let link = $(this);
      $.ajax({
        type: "POST",
        dataType: "html",
        url: "/local/ajax/subscribe.php?type=sizeDel&ID="+id,
        success: function(response){
          $(link).parents('.catalog__item').remove();
        }
      });
    }else{
      let id = $(this).data('id');
      let link = $(this);
      $.ajax({
        type: "POST",
        dataType: "html",
        url: "/local/ajax/favorites.php?ID="+id,
        success: function(response){
          $(link).parents('.catalog__item').remove();
        }
      });
    }

    e.preventDefault();

  });

}
function closedPopap(e){//Закрытие попапов
  e.preventDefault();
  $(".popup").fadeOut(100);
  $(".wrap").removeClass("noscroll");
  $("#js-overlay").remove();
}
function openPopap(popapID) {
  $("#"+popapID).fadeIn(500);
  $(".wrap").addClass("noscroll");
  $("body").append('<div class="overlay" id="js-overlay"></div>');
}

function addCart(){//Добавляем выбранный размер в корзину
  let id = $('#sizeBlock input:checked').val();
  $.ajax({
    type: "POST",
    dataType: "html",
    url: "/local/ajax/cart.php?type=add&ID="+id,
    success: function(response){
      var result = $.parseJSON(response);
      if (result == 1) {
        openPopap('modalCart');
        loadSmallCart();
      }
      if (result == 2) {//Ошибка
        openPopap('errorAddCart');
      }
    }
  });
}
function loadSmallCart(){//Загрузка малой корзины в шапке
  $.ajax({
    type: "POST",
    dataType: "html",
    url: "/local/ajax/cart.php?type=loadSmallCart",
    success: function(response){
      $('#smallCart span').html(response);
    }
  });
}
function getQuantityCart(quantity, idProd){//Изменение кол-ва в корзине
  console.log("/local/ajax/cart.php?type=getQuantity&quantity="+quantity+'&ID='+idProd);
  $.ajax({
    type: "POST",
    dataType: "html",
    url: "/local/ajax/cart.php?type=getQuantity&quantity="+quantity+'&ID='+idProd,
    success: function(response){
      getCost();
    }
  });
}
function getCost(){//Правый блок с кол-вом
  $.ajax({
    type: "POST",
    dataType: "html",
    url: "/local/ajax/cart.php?type=getCost",
    success: function(response){
      $('.cost').html(response);
    }
  });
}
function loadEmptyCart(){
  $.ajax({
    type: "POST",
    dataType: "html",
    url: "/local/ajax/cart.php?type=loadEmptyCart",
    success: function(response){
      $('.loadEmptyCart').html(response);
    }
  });
}

function authSMS() {
  let phone = $('#auth_phone').val();
  let error = false;
  if(phone==""){
    $('#auth_phone').parents('.form__group').addClass('error');
  }
  if(!error) {
    $.ajax({
      url: "/local/ajax/auth_sms.php",
      type: "POST",
      dataType: "json",
      data: "ACTION=GETSMS&PHONE=" + phone,
      success: function (data) {
        if (data != 1) {
          counters = 30;
          $('#auth_sms_status').hide();
          $('#js-modal-auth .modal__close').trigger('click');
          $('#js-modal-sms .modal__close').trigger('click');
          $('#js-modal-sms .modal__tel').text(phone);
          $("#auth_phone_sms").val(phone);
          $('#sendSMSagain').removeClass('sender').html('Можно будет запросить код повторно через <span>30</span> секунд');
          startCounter();
          openPopap("js-modal-sms");
        } else {
          $('#auth_sms_status').html('<span style="color:red; padding-bottom:5px;">Номер телефона не найден</span>');
        }
      }
    });
  }

  return false;
}
function startCounter(){
  counterNewSend = setInterval(timer, 1000);
}
function timer(){
  counters=counters-1;
  $("#sendSMSagain span").text(counters);
  if (counters <= 0)
  {
    clearInterval(counterNewSend);
    $("#sendSMSagain").addClass('sender').text('Отправить повторно');
    return;
  }
}
function authSMScode() {
  var phone = $('#auth_phone_sms').val();
  var code = $('#auth_phone_code').val();

  $.ajax({
    url: "/local/ajax/auth_sms.php",
    type: "POST",
    dataType: "json",
    data: "ACTION=SETCODE&PHONE="+phone+"&CODE="+code,
    success: function(data){

      if(data != 1) {
		  if(window.location.pathname=="/order/"){
			  location.reload();
		  }else{
			  window.location.replace('/personal/');
		  }
      }
      else {
        $('#auth_code_status').html('<span style="color:red; padding-bottom:5px;">Неверный код<br><br></span>');
      }
    }
  });

  return false;
}
function getURIParametr(name){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]);
}
function clickMorePage(thisBlock){
	let url = $(thisBlock).attr('href');
	let tmpUrl = $(thisBlock).data('pager');
	$.ajax({
		type: "POST",
		dataType: "html",
		url: url,
		success: function (response) {
			let page_content = $(response);
			if($(thisBlock).parents('.loadPagination').length>0){
				if ($('.loadContent').length > 0) {
					let $moreBlocks = $(page_content.find('.loadContent').html());
					if (page_content.find('.loadContent').length > 0) {
						$('.loadContent').append($moreBlocks);
					} else {
						$('.loadContent').html('');
					}
				}
				if (page_content.find('.loadPagination').length > 0) {
					$('.loadPagination').eq(0).html(page_content.find('.loadPagination').html());
				} else {
					$('.loadPagination').eq(0).html('');
				}
			}
			window.history.pushState(null, null, tmpUrl);
		}
	});
}