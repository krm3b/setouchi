$(function () {
  /*=================================================
    ハンバーガ―メニュー
  ===================================================*/


  /*=================================================
    Inview（画面に表示されたタイミングで処理を実行）
  ===================================================*/
  $(window).scroll(function () {


  });


  // ---------------------
  // voice
  // ---------------------
  $(window).on('scroll', function () {
    $('.item-left, .item-right').each(function () {
      const targetPos = $(this).offset().top;
      const scroll = $(window).scrollTop();
      const windowHeight = $(window).height();

      if (scroll > targetPos - windowHeight + 100) {
        $(this).addClass('inview');
      }
    });
  });

  // ページ読み込み時にも発火（リロード直後に表示領域にある要素のため）
  $(window).trigger('scroll');

});






