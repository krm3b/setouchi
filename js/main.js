$(function () {

  /*=================================================
    mainvisual :スライドショー
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
    header :上部固定
  ===================================================*/
  $(window).on('scroll', function () {
    const header = $('header');
    const mvHeight = $('.mainvisual').outerHeight(); 
    const placeholder = $('.header-placeholder');
    const headerHeight = header.outerHeight();

    if ($(window).scrollTop() > mvHeight) {
      header.addClass('is-fixed');
      placeholder.height(headerHeight); // ダミーに高さをセット
    } else {
      header.removeClass('is-fixed');
      placeholder.height(0); // 高さをリセット
    }
  });

  /*=================================================
    header :スムーススクロール
  ===================================================*/
  $('a[href^="#"]').click(function () {
    const headerHeight = $('header').outerHeight();
    let href = $(this).attr("href");
    let target = $(href == "#" || href == "" ? "html" : href);
    let position;
    if (window.innerWidth <= 768) {
      // SP表示のとき（補正なし）
      position = target.offset().top;
    } else {
      // PC表示のとき（ヘッダー分の補正あり）
      position = target.offset().top - headerHeight;
    }
    let speed = 600;
    $("html, body").animate({ scrollTop: position }, speed, "swing");
    return false;
  });
  
  /*=================================================
    header : ハンバーガ―メニュー
  ===================================================*/
  // ハンバーガーメニューをクリックした時
  $(".toggle-btn").on("click", function () {
    $("header").toggleClass("open");
  });
  // メニューのリンクをクリックした時
  $(".nav-list, .nav-list a").on("click", function () {
    $("header").removeClass("open");
  });
  
  //--------------------------------------------------
  // section-title,footer-title
  // -------------------------------------------------
  
  $(document).ready(function () {
    function checkScroll() {
      $('.section-title,.footer-title').each(function () {
        const elemTop = $(this).offset().top;
        const scroll = $(window).scrollTop();
        const windowHeight = $(window).height();

        if (scroll + windowHeight > elemTop + 50) { // 50px手前で発火
          $(this).addClass('show');
        }
      });
    }

    $(window).on('scroll', checkScroll);
    $(window).on('load', checkScroll); // ページ読み込み時にも実行
  });

  /*=================================================
    advantage : 横スクロール
  ===================================================*/
  gsap.registerPlugin(ScrollTrigger);

  // 初回実行
  window.addEventListener("load", () => {
    const items = document.querySelector(".advantage__items");
    const inner = document.querySelectorAll(".advantage__items--item");
    const totalScrollLength = items.scrollWidth - window.innerWidth;
    
    // function advantageScroll () {

    // }
    gsap.set(items,{
      width: inner.length * 100 + "%"
    });
    gsap.set(inner,{
      width: 100 / inner.length + "%"
    });
    console.log("items.scrollWidth : " + items.scrollWidth);
    console.log("window.innerWidth : " + window.innerWidth);
    console.log("totalScrollLength : " + totalScrollLength);

    gsap.to(items, {
      x: -totalScrollLength,    // 左へ動かす距離
      ease: "none",
      scrollTrigger: {
        trigger: ".advantage",  // どの要素でスクロール制御するか
        start: "-80px top",     // セクションの上から80px上で発火
        end: () => `+=${totalScrollLength}`, // この距離ぶんだけアニメーションする
        scrub: true,            // スクロールに合わせてぬるぬる動く
        pin: true,              // セクションを固定
        anticipatePin: 1,
        markers: true, // デバッグしたい時はtrue
      }
    });

    ScrollTrigger.refresh();
  });

    // リサイズ対応
  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });


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


  // ------------------------------------------------
  // how to use
  // ------------------------------------------------

  function isResponsive() {
    return window.innerWidth <= 768;
  }
  
  $(window).on("scroll resize", function () {
    $(".flow-box").each(function () {
      const targetPos = $(this).offset().top;
      const scroll = $(window).scrollTop();
      const windowHeight = $(window).height();

      if (isResponsive()) {
        if (!$(this).hasClass("inview") && scroll > targetPos - windowHeight + 100) {
          $(this).addClass("inview");
        }
      } else {
      // PC表示時：inviewを削除してリセット
        $(this).removeClass("inview");
      }
    });
  });

  // リロード直後にも判定を行う
  $(window).trigger("scroll");
  // --------------------------------------------------



  // -------------------------------------------------
  // floor
  // -------------------------------------------------
  function fadeInOnScroll() {
    $('.fade-in').each(function () {
      const elemTop = $(this).offset().top;
      const scroll = $(window).scrollTop();
      const windowHeight = $(window).height();

      if (scroll > elemTop - windowHeight + 100) {
        $(this).addClass('active');
      }
    });
  }

  // 最初の実行
  fadeInOnScroll();

  // スクロールごとに実行
  $(window).on('scroll', function () {
    fadeInOnScroll();
  });


  /*=================================================
    to top
  ===================================================*/
  let pagetop = $(".to-top");
  // 最初に画面が表示された時は、トップに戻るボタンを非表示に設定
  pagetop.hide();

  $(window).scroll(function () {
    if ($(this).scrollTop() > 600) {
      pagetop.fadeIn();
    } else {
      pagetop.fadeOut();
    }
  });

  pagetop.click(function () {
    $("body,html").animate({ scrollTop: 0 }, 500);

    return false;
  });
});
