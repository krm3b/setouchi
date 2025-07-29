$(function () {
  /*=================================================
    ロード処理
  ===================================================*/
  const isFirstLoad = sessionStorage.getItem('isFirstLoad');
  $(window).on('load',function(){
    // フラグがない場合（初回アクセス時）
    if (!isFirstLoad) {
      // ローディング画面でのスクロール制御
      $('body').addClass('no-scroll');

      // じわっとテキストアニメーション起動
      BlurTextAnimeControl();
  
      // フェードアウト
      setTimeout(function () {
        $(".loading1").addClass('fade-out');
      }, 5000);
  
      // 完全に非表示（display:none）に切り替えたい場合
      setTimeout(function () {
        $(".loading1").addClass('none');
      }, 6000); // フェード時間（1s）後に
  
        
      // セッションストレージにフラグを保存
      sessionStorage.setItem('isFirstLoad', true);
    }   
    else {
      // 2回目以降はローディング画面非表示
      $('body').removeClass('no-scroll'); //スクロール制御OFF
      $(".loading1").addClass('none');    
      $(".loading2").addClass('none');
      $(".mainvisual__title").addClass('.displayAnime');
      setTimeout(function () {
        scrollToHash();
      }, 10);
    }
  });

  // 個別ページからメインページ表示時のセクション表示
  const scrollToHash = function () {
    const hasHash = window.location.hash;
    const headerHeight = $('header').outerHeight();
    if (hasHash) {
      const target = $(hasHash);
      if (target.length) {
        const position = target.offset().top - headerHeight;
        $('html, body').scrollTop(position);
      }
    }
  };

  /*=================================================
    loading2 : クリック→波紋アニメーション/loading非表示
  ===================================================*/
  $('.loading2').click(function (e) {
    const ripple = document.getElementById('ripple');
    const x = e.clientX;
    const y = e.clientY;

    // 波紋をクリック位置に配置
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.remove('rippleAnime');

    // 再描画トリガー（一度無効にして再実行させるため）
    void ripple.offsetWidth;
    ripple.classList.add('rippleAnime');
  
    // アニメーション後にローディング画面を非表示/スクロール制御解除
    ripple.addEventListener('animationend', function handleAnimationEnd() {
      ripple.removeEventListener('animationend', handleAnimationEnd);

      const loading2 = document.getElementById('loading2');
      loading2.classList.add('fade-out');

      setTimeout(() => {
        loading2.classList.add('none'); // 完全に非表示に
        loading2.classList.remove('fade-out'); // 次回のためにリセット
        $('body').removeClass('no-scroll');
        $(".mainvisual__title").addClass('.displayAnime')
      }, 1000); // フェードアウトのCSSに合わせた時間
    });
  });

  /*=================================================
    じわっとアニメーション
  ===================================================*/
  // blurTriggerにblurというクラス名を付ける定義
  function BlurTextAnimeControl() {
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
  
    $('.blurTrigger').each(function() {
      var $this = $(this); // キャッシュしておくと少し速い
      var elemPos = $this.offset().top - 50;
  
      $this.toggleClass('blur', scroll >= elemPos - windowHeight);
      // ↑ 条件に応じてblurクラスを付けたり外したり
    });
  }

});

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
    console.log("position: " + position);
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
  let scrollTween;

  function setupScrollTrigger() {
    const items = document.querySelector(".advantage__items");
    const inner = document.querySelectorAll(".advantage__items--item");
    const header = document.querySelector("header");
    const headerHeight = header.offsetHeight;

    gsap.set(items,{
      width: inner.length * 100 + "%"
    });
    gsap.set(inner,{
      width: 100 / inner.length + "%"
    });

    // 前のトリガーがあれば削除
    if (scrollTween) {
      scrollTween.scrollTrigger.kill();
      scrollTween.kill();
    }

    scrollTween = gsap.to(items, {
      // x: -(items.scrollWidth - window.innerWidth),    // 左へ動かす距離
      x: () => -(items.scrollWidth - window.innerWidth),  // 幅変動時に毎回計算
      ease: "none",
      scrollTrigger: {
        trigger: ".advantage",  // どの要素でスクロール制御するか
        start: () => `-${header.offsetHeight}px top`,     // ヘッダー高さ分の80pxからスタート
        end: () => `+=${items.scrollWidth - window.innerWidth}`, // 全体幅 - 現在表示幅 (幅変動時に毎回計算)
        scrub: true,            // スクロールに合わせてぬるぬる動く
        pin: true,              // セクションを固定
        anticipatePin: 1,
        markers: false, // デバッグしたい時はtrue
      }
    });
  };

  // 初回実行
  window.addEventListener("load", () => {
    setupScrollTrigger();
    ScrollTrigger.refresh();
  });

  // リサイズ（幅変動時）対応
  window.addEventListener("resize", () => {
    setupScrollTrigger();
    ScrollTrigger.refresh();
  });

  /*=================================================
    Inview（画面に表示されたタイミングで処理を実行）
  ===================================================*/


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
