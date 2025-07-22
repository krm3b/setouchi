$(function () {
  /*=================================================
    スライドショー
  ===================================================*/
  $(function () {
    const $images = $('.back-image');
    let current = 0;

    // 最初の画像に active を追加
    $images.eq(current).addClass('active');

    setInterval(function () {
      // 現在の画像の active を外す
      $images.eq(current).removeClass('active');

      // 次の画像のインデックスに進む（ループ）
      current = (current + 1) % $images.length;

      // 次の画像に active を追加
      $images.eq(current).addClass('active');
    }, 5000); // 5秒ごとに切り替え
  });

  /*=================================================
    ヘッダー上部固定
  ===================================================*/
  $(window).on('scroll', function () {
    const header = $('header');
    const mvHeight = $('.mainvisual').outerHeight(); // メインビジュアルの高さ
    if ($(window).scrollTop() > mvHeight) {
      header.addClass('is-fixed');
    } else {
      header.removeClass('is-fixed');
    }

  });

  /*=================================================
    ハンバーガ―メニュー
  ===================================================*/



  /*=================================================
    Inview（画面に表示されたタイミングで処理を実行）
  ===================================================*/
  $(window).scroll(function () {});

  // --------------------------------------------------
  // voice
  // --------------------------------------------------
  $(window).on("scroll", function () {
    $(".item-left, .item-right").each(function () {
      const targetPos = $(this).offset().top;
      const scroll = $(window).scrollTop();
      const windowHeight = $(window).height();

      if (scroll > targetPos - windowHeight + 100) {
        $(this).addClass("inview");
      }
    });
  });

  // ページ読み込み時にも発火（リロード直後に表示領域にある要素のため）
  $(window).trigger("scroll");


  
  // ---------------------------------------------------



  // ------------------------------------------------
  // event
  // ------------------------------------------------
  $(".accordion .title").on("click", function () {
    const $item = $(this).closest(".item");
    const $content = $item.find(".content");
    const $icon = $(this).find("span");

    if ($content.is(":visible")) {
      $content.slideUp();
      $item.removeClass("open");
      $icon.text("+");
    } else {
      $content.slideDown();
      $item.addClass("open");
      $icon.text("−");
    }
  });
  // --------------------------------------------------
});
