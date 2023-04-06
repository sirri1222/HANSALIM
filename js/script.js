window.onload = function () {
  // 콤마기능
  function priceToString(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  // 더보기 목록 기능
  const menuBt = document.getElementById("menu_bt");
  const menuList = document.getElementById("menu_list");

  //   참여 목록 기능
  const joinBt = document.getElementById("join_bt");
  const joinList = document.getElementById("join_list");

  //   조합원센터 목록 기능
  const centerMore = document.getElementById("center_more");
  const centerList = document.getElementById("center_list");

  const toggleListArr = [menuList, joinList, centerList];
  const toggleBtArr = [menuBt, joinBt, centerMore];

  document.addEventListener("click", function () {
    toggleListArr.forEach(function (item) {
      item.style.display = "none";
    });
    toggleBtArr.forEach(function (item) {
      item.classList.remove("active");
    });
  });

  toggleListArr.forEach(function (item) {
    item.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  });

  function listToggle(button, list) {
    list.style.display = "none";
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      toggleBtArr.forEach(function (item) {
        item.classList.remove("active");
      });
      const nowListId = list.getAttribute("id");
      const hideArr = toggleListArr.filter(function (item) {
        let id = item.getAttribute("id");
        if (id !== nowListId) {
          return this;
        }
      });
      hideArr.forEach(function (item) {
        item.style.display = "none";
      });
      if (this.tagName === "A") {
        event.preventDefault();
      }
      const css = getComputedStyle(list).display;
      if (css === "none") {
        list.style.display = "block";
        this.classList.add("active");
      } else {
        list.style.display = "none";
        this.classList.remove("active");
      }
    });
  }
  listToggle(menuBt, menuList);
  listToggle(joinBt, joinList);
  listToggle(centerMore, centerList);

  const fixTopBt = document.querySelector(".fix-top");
  fixTopBt.addEventListener("click", function () {
    // Anime.js 버전
    const scrollElement =
      window.document.scrollingElement ||
      window.document.body ||
      window.document.documentElement;
    anime({
      targets: scrollElement,
      scrollTop: 0,
      duration: 600,
      easing: "easeInOutQuad",
    });
  });

  // 오늘의 상품 기능
  const 제품 = {
    이름: "콩콩크림빵",
    단위: "1개",
    가격: 1500,
    태그: "인기",
    사진: "a.jpg",
    아이디: "0",
    링크: "#",
  };
  let VISUAL_ARR;
  let visualTag = document.getElementById("data-visual");
  // 오늘의 상품 데이터
  let TODAY_GOOD;
  let todayTag = document.getElementById("data-today");
  let todayTag2 = document.getElementById("data-today2");

  let SALE_GOOD;
  let saleTag = document.getElementById("data-sale");

  let NEW_GOOD;
  let newTag = document.getElementById("data-new");
  let newListTag = document.getElementById("data-new-list");

  let RECOMMEND_GOOD;
  let recommendTag = document.getElementById("data-recommend");

  let POPULAR_ICON;
  let popularIconTag = document.getElementById("data-popular-icon");

  let POPULAR_GOOD;
  let popularShow = 1;
  let popularTag = document.getElementById("data-popular");

  let BANNER_ARR;
  let bannerTag = document.getElementById("data-banner");

  let BRAND_GOOD;
  let brandTag = document.getElementById("data-brand");

  let REVIEW_ARR;
  let reviewTag = document.getElementById("data-review");

  let NOTICE_ARR;
  let noticeTag = document.getElementById("data-notice");

  let GOODNEWS_ARR;
  let goodNewTag = document.getElementById("data-goodnews");

  let SEASON_ARR;
  let seasonTag = document.getElementById("data-season");

  // 비주얼 화면 출력 기능
  function showVisual() {
    let html = "";
    VISUAL_ARR.forEach((item) => {
      const tag = `
      <div class="swiper-slide">
        <div class="visual-slide-page">
          <a href="${item.link}">
            <img src="images/${item.pic}" alt="${item.name}" />
          </a>
        </div>
      </div>`;
      html += tag;
    });
    visualTag.innerHTML = html;

    // 비주얼 슬라이드 기능
    var swVisual = new Swiper(".sw-visual", {
      loop: true,
      navigation: {
        prevEl: ".visual-prev",
        nextEl: ".visual-next",
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".visual-pg",
        type: "fraction",
      },
    });
    // 비주얼 슬라이드 멈춤 기능
    const swVisualPlay = document.querySelector(".visual-play");
    swVisualPlay.addEventListener("click", function () {
      // 현재 active 클래스가 있는지 없는지 판단하고 기능을 설정한다.
      if (swVisualPlay.classList.contains("active")) {
        swVisual.autoplay.start();
        swVisualPlay.classList.remove("active");
      } else {
        swVisual.autoplay.stop();
        swVisualPlay.classList.add("active");
      }
    });
  }
  // 오늘의 상품 화면 출력 기능
  function showTodayGood() {
    let htmlTop = "";
    let htmlBottom = "";
    const topArr = TODAY_GOOD.filter(function (item, index) {
      if (index < 4) {
        return item;
      }
    });
    topArr.forEach(function (item) {
      let tag = `
      <div class="good-box">
      <!-- 제품이미지 -->
      <a href="${item.link}" class="good-img">
        <img src="images/${item.pic}" alt="${item.name}" />
        <span class="good-type">${item.tag}</span>
      </a>
      <!-- 제품정보 -->
      <a href="${item.link}" class="good-info">
        <em>${item.name}</em>(<em>${item.unit}</em>)
      </a>
      <!-- 제품가격 -->
      <a href="${item.link}" class="good-info-price">${priceToString(
        item.price
      )}<em>원</em></a>
      <!-- 장바구니 -->
      <button class="good-add-cart"></button>
    </div>
      `;

      htmlTop += tag;
    });
    // 인덱스 4~7 까지 배열만들기

    const bottomArr = TODAY_GOOD.filter(function (item, index) {
      if (index > 3) {
        return item;
      }
    });

    bottomArr.forEach(function (item) {
      let tag = `
      <div class="good-box">
      <!-- 제품이미지 -->
      <a href="${item.link}" class="good-img">
        <img src="images/${item.pic}" alt="${item.name}" />
        <span class="good-type">${item.tag}</span>
      </a>
      <!-- 제품정보 -->
      <a href="${item.link}" class="good-info">
        <em>${item.name}</em>(<em>${item.unit}</em>)
      </a>
      <!-- 제품가격 -->
      <a href="${item.link}" class="good-info-price">${item.price}<em>원</em></a>
      <!-- 장바구니 -->
      <button class="good-add-cart"></button>
    </div>
      `;
      htmlBottom += tag;
    });

    todayTag.innerHTML = htmlTop;
    todayTag2.innerHTML = htmlBottom;
  }
  // 알뜰 상품 화면 출력 기능
  function showSaleGood() {
    let html = `
    <div class="swiper sw-sale">
      <div class="swiper-wrapper">
    `;
    const saleArr = SALE_GOOD.filter(function (item, index) {
      if (index < 9) {
        return item;
      }
    });
    saleArr.forEach(function (item) {
      let tag = `
      <div class="swiper-slide">
        <div class="good-box">
          <!-- 제품이미지 -->
          <a href="${item.link}" class="good-img">
            <img src="images/${item.pic}" alt="${item.name}" />
            <span class="good-type">${item.tag}</span>
          </a>
          <!-- 제품정보 -->
          <a href="${item.link}" class="good-info">
            <em>${item.name}</em>(<em>${item.unit}</em>)
          </a>
          <!-- 제품가격 -->
          <a href="${item.link}" class="good-info-price">${priceToString(
        item.price
      )}<em>원</em></a>
          <!-- 장바구니 -->
          <button class="good-add-cart"></button>
        </div>
      </div>
      `;
      html += tag;
    });
    html += `
    </div>
    </div>
    `;
    saleTag.innerHTML = html;
    const swSale = new Swiper(".sw-sale", {
      slidesPerView: 3,
      spaceBetween: 16,
      slidesPerGroup: 3,
      navigation: {
        prevEl: ".sale .slide-prev",
        nextEl: ".sale .slide-next",
      },
      pagination: {
        el: ".sale .slide-pg",
        type: "fraction",
      },
    });
  }
  // 신상품 화면 출력 기능
  function showNewGood() {
    // 첫번째 출력 자료
    let obj = NEW_GOOD[0];
    let newGoodFirst = ` 
    <a href="${obj.link}" class="new-img">
    <img src="images/${obj.pic}" alt="${obj.title}" /></a>
    <a href="${obj.link}" class="new-title">${obj.title}</a>
    <a href="${obj.link}" class="new-txt">${obj.txt}</a>
    `;
    newTag.innerHTML = newGoodFirst;
    // 나머지 출력 1~4번
    let html = "";
    NEW_GOOD.forEach(function (item, index) {
      let tag = "";
      if (index !== 0) {
        tag = `
        <div class="new-box">
        <a href="${item.link}" class="new-box-img">
        <img src="images/${item.pic}" alt="${item.title}" /></a>
        <a href="${item.link}" class="new-box-title">${item.title}</a>
        </div>
        `;
      }
      html += tag;
    });
    newListTag.innerHTML = html;
  }
  // 추천상품 화면 출력 기능
  function showRecommendGood() {
    let html = `
    <div class="swiper sw-recommend">
      <div class="swiper-wrapper">
      `;
    RECOMMEND_GOOD.forEach(function (item) {
      let tag = `
      <div class="swiper-slide">
        <div class="good-box">
        <!-- 제품이미지 -->
        <a href="${item.link}" class="good-img">
        <img src="images/${item.pic}" alt="${item.name}" />
        <span class="good-type">${item.tag}</span>
        </a>
        <!-- 제품정보 -->
        <a href="${item.link}" class="good-info">
        <em>${item.name}</em>(<em>${item.unit}</em>)
        </a>
        <!-- 제품가격 -->
        <a href="${item.link}" class="good-info-price">${priceToString(
        item.price
      )}<em>원</em></a>
        <!-- 장바구니 -->
        <button class="good-add-cart"></button>
        </div>
      </div>
      `;
      html += tag;
    });
    html += `
      </div>
    </div>`;
    recommendTag.innerHTML = html;
    const swRecommend = new Swiper(".sw-recommend", {
      slidesPerView: 3,
      spaceBetween: 16,
      slidesPerGroup: 3,
      navigation: {
        prevEl: ".recommend .slide-prev",
        nextEl: ".recommend .slide-next",
      },
      pagination: {
        el: ".recommend .slide-pg",
        type: "fraction",
      },
    });
    // 만약에 목록의 개수가 slidesPerView 보다 적으면
    // 1 / 1 출력한다.
    // 0 / 0
    const sg = document.querySelector(".recommend .slide-pg");
    sg.style.display = "block";
    if (RECOMMEND_GOOD.length == 0) {
      sg.innerHTML = "0/0";
      //  0 / 0
    } else if (RECOMMEND_GOOD.length < swRecommend.params.slidesPerView) {
      sg.innerHTML = "1/1";
      // 1 / 1
    }
  }
  // 인기 상품 아이콘 출력 기능
  function showPopularIconGood() {
    let html = `
      <div class="swiper sw-icon">
        <div class="swiper-wrapper">
    `;
    // 데이터처리
    POPULAR_ICON.forEach(function (item) {
      const tag = `
        <div class="swiper-slide">
          <a href="${item.link}">
            <span
              class="popular-cate-icon"              
              style="
                background: url('images/${item.icon}') no-repeat;
                background-position: 0px 0px;
              "
            ></span>
            <span class="popular-cate-name">${item.txt}</span>
          </a>
        </div>
      `;

      html += tag;
    });

    html += `
        </div>
      </div>
    `;

    // html 이 화면에 배치하고 나야 js로 참조할 수있다.
    popularIconTag.innerHTML = html;

    const swIcon = new Swiper(".sw-icon", {
      slidesPerView: 7,
      slidesPerGroup: 7,
      spaceBetween: 10,
      navigation: {
        nextEl: ".popular-slide-next",
        prevEl: ".popular-slide-prev",
      },
    });

    // html에 배치가 되었으면 찾을 수 있다.
    const tag = document.querySelectorAll(".popular-slide a");
    // tag에 저장된 배열의 각 요소들에 기능을 줌
    tag.forEach(function (item, index) {
      item.addEventListener("mouseover", function () {
        const spanTag = this.querySelector(".popular-cate-icon");
        spanTag.style.backgroundPositionY = "-64px";
      });
      item.addEventListener("mouseout", function () {
        const spanTag = this.querySelector(".popular-cate-icon");
        spanTag.style.backgroundPositionY = "0px";
      });

      // 클릭을 하면 버튼(.popular-more)의 글자를
      // 클릭된 타이틀의 글자로 변경한다.
      item.addEventListener("click", function (event) {
        // a 태그이므로 href가 적용된다 막아야함
        event.preventDefault();
        const bt = document.querySelector(".popular-more");
        const title = this.querySelector(".popular-cate-name");
        bt.innerHTML = `
        ${title.innerHTML} 물품 더보기
        `;
        // 하단의 목록을 갱신한다.
        // 현재 클릭된 번호를 popularShow에 담는다.
        popularShow = index;

        popularShow = showPopularGood();
      });
    });
  }

  // 인기상품 화면 출력 기능
  function showPopularGood() {
    let html = "";
    let popCate = "populargood-" + popularShow;

    POPULAR_GOOD[popCate].forEach(function (item) {
      let tag = `
      <div class="good-box">
      <!-- 제품이미지 -->
      <a href="${item.link}" class="good-img">
        <img src="images/${item.pic}" alt="${item.name}" />
        <span class="good-type">${item.tag}</span>
      </a>
      <!-- 제품정보 -->
      <a href="${item.link}" class="good-info">
        <em>${item.name}</em>(<em>${item.unit}</em>)
      </a>
      <!-- 제품가격 -->
      <a href="${item.link}" class="good-info-price">${priceToString(
        item.price
      )}<em>원</em></a>
      <!-- 장바구니 -->
      <button class="good-add-cart"></button>
      </div>
      `;
      html += tag;
    });

    popularTag.innerHTML = html;
  }
  // 배너 화면 출력 기능
  function showBannerGood() {
    let html = `
    <div class="swiper sw-banner">
      <div class="swiper-wrapper">
      `;
    BANNER_ARR.forEach(function (item) {
      let tag = `
      <div class="swiper-slide">
        <a href="${item.link}">
          <img src="images/${item.image}" alt="${item.id}" />
        </a>
      </div>
      `;
      html += tag;
    });
    html += `
    </div>
    </div>
    `;
    bannerTag.innerHTML = html;
    const swBanner = new Swiper(".sw-banner", {
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      slidesPerView: 2,
      spaceBetween: 0,
      navigation: {
        prevEl: ".banner-slide-prev",
        nextEl: ".banner-slide-next",
      },
    });
  }
  // 브랜드관 화면 출력 기능
  function showBrandGood() {
    let html = `
    <div class="swiper sw-brand">
      <div class="swiper-wrapper">
      `;
    BRAND_GOOD.forEach(function (item) {
      let tag = `
      <div class="swiper-slide">
      <div class="brand-box" >
      <a href="${item.link}">
        <img src="images/${item.pic}" alt="${item.id}" />
        <p>${item.txt}</p>
        <ul class="brand-info clearfix">
          <li>
            <span class="brand-info-title">${item.title}</span>
            <span class="brand-info-value">${item.value}</span>
          </li>
          <li>
            <span class="brand-info-title">${item.title_2}</span>
            <span class="brand-info-value">${item.value_2}</span>
          </li>
        </ul>
      </a>
    </div>
    </div>
      `;
      html += tag;
    });
    html += `
      </div>
    </div>
    `;
    brandTag.innerHTML = html;
    const swBrand = new Swiper(".sw-brand", {
      slidesPerView: 3,
      spaceBetween: 16,
      navigation: {
        prevEl: ".brand .slide-prev",
        nextEl: ".brand .slide-next",
      },
      pagination: {
        el: ".brand .slide-pg",
        type: "fraction",
      },
    });
  }
  // 이용후기 화면 출력 기능
  function showReview() {
    let html = `
    <div class="swiper sw-review">
      <div class="swiper-wrapper">
      `;
    REVIEW_ARR.forEach(function (item) {
      const tag = `
      <div class="swiper-slide">
      <div class="review-box">
      <a href="${item.link}">
        <div class="review-box-desc">
          <span class="review-box-title">
          ${item.title}
          </span>
          <span class="review-box-star"> ${item.star} </span>
          <span class="review-box-img">
            <img src="images/${item.pic}" alt="${item.title}" />
          </span>
        </div>
        <p class="review-box-txt">
        ${item.txt}
        </p>
        <span class="review-box-user"> ${item.user}(${item.shop}) </span>
      </a>
    </div>
    </div>
      `;
      html += tag;
    });
    html += `
    </div>
    </div>
    `;
    reviewTag.innerHTML = html;
    const swRecommend = new Swiper(".sw-review", {
      slidesPerView: 3,
      spaceBetween: 16,
      slidesPerGroup: 3,
      navigation: {
        prevEl: ".review .slide-prev",
        nextEl: ".review .slide-next",
      },
      pagination: {
        el: ".review .slide-pg",
        type: "fraction",
      },
    });
  }
  // 공지사항 화면 출력 기능
  function showNotice() {
    let html = "";
    NOTICE_ARR.forEach(function (item) {
      const tag = `
      <li>
      <a href="${item.link}">
      <span>${item.title}</span><em>${item.data}</em></a>
      </li>
      `;
      html += tag;
    });
    noticeTag.innerHTML = html;
  }
  // 물품소식 화면 출력기능
  function showGoodNews() {
    let html = "";
    GOODNEWS_ARR.forEach(function (itme) {
      const tag = `
        <li>
          <a href="${itme.link}">
            <span>${itme.title}</span><em>${itme.data}</em>
          </a>
        </li>
      `;
      html += tag;
    });
    goodNewTag.innerHTML = html;
  }
  // 시즌화면 출력 기능
  // 시즌 화면 출력기능
  const buyTotal = document.getElementById("buy-total");
  const buyTotalMoney = document.getElementById("buy-total-money");
  let buyTotalCount = 0;
  let buyTotalMoneyPrice = 0;

  function showSeason() {
    let html = "";
    SEASON_ARR.forEach(function (item, index) {
      const tag = `
      <li>
        <div class="season-good clearfix">
          <input
            type="checkbox"
            id="ch${index}"
            class="season-good-check season-item"
            checked
            value=${item.price}
          />
          <label for="ch${index}" class="season-label"> ${item.title} </label>
          <a href="${item.link}" class="season-good-img">
            <img src="images/${item.pic}" alt="${item.title}" />
          </a>
          <p class="season-good-info">
            <a href="${item.link}" class="season-good-title">${item.title}</a>
            <a href="${
              item.link
            }" class="season-good-price"><em>${priceToString(
        item.price
      )}</em>원</a>
          </p>
        </div>
      </li>
      `;
      html += tag;
    });
    seasonTag.innerHTML = html;

    // Smooth Scrollbar 적용
    Scrollbar.initAll();
    // 체크 박스 각각의 기능
    checkBoxFn();
    // 계산 출력하라.
    showBuyGood();
  }

  // 전체 체크박스 기능
  const chkAll = document.getElementById("chall");
  chkAll.addEventListener("change", function () {
    const chkArr = document.querySelectorAll(".season-item");
    if (chkAll.checked) {
      // 전체 체크를 해야 하는 경우
      chkArr.forEach(function (item) {
        item.checked = true;
      });
    } else {
      // 전체 체크를 해제 해야 하는 경우
      chkArr.forEach(function (item) {
        item.checked = false;
      });
    }
    showBuyGood();
  });

  // 체크박스 각각의 기능
  function checkBoxFn() {
    const chkArr = document.querySelectorAll(".season-item");
    chkArr.forEach(function (item) {
      item.addEventListener("change", function () {
        // 가격을 다시 계산한다.
        showBuyGood();
      });
    });
  }

  // 계산 출력 기능
  function showBuyGood() {
    // 체크가 된 카운팅을 한다. 그리고 더한다.
    let count = 0;
    let priceTotal = 0;

    const chkArr = document.querySelectorAll(".season-item");
    chkArr.forEach(function (item) {
      const state = item.checked;
      if (state) {
        // count = count + 1;
        count += 1;
        // count ++;
        // 글자를 정수 숫자로 변경함.
        const price = parseInt(item.value);
        // priceTotal = priceTotal + price;
        priceTotal += price;
      }
    });

    buyTotalCount = count;
    buyTotalMoneyPrice = priceTotal;

    buyTotal.innerHTML = buyTotalCount;
    buyTotalMoney.innerHTML = priceToString(buyTotalMoneyPrice);

    // 전체 선택 버튼 해제
    if (buyTotalCount === chkArr.length) {
      // 전체 체크 버튼 checked 되어야 함.
      chkAll.checked = true;
    } else {
      // 전체 체크 버튼 checked 해제되어야 함.
      chkAll.checked = false;
    }
  }

  // 계산 출력 기능
  function showBuyGood() {
    let count = 0;
    let priceTotal = 0;
    const chkArr = document.querySelectorAll(".season-item");
    chkArr.forEach((item) => {
      const state = item.checked;
      const price = parseInt(item.value);
      if (state) {
        count++;
        priceTotal += price;
      }
    });
    buyTotalCount = count;
    buyTotal.innerHTML = buyTotalCount;
    buyTotalMoneyPrice = priceTotal;
    buyTotalMoney.innerHTML = buyTotalMoneyPrice;
    if (buyTotalCount === chkArr.length) {
      chkAll.checked = true;
    } else {
      chkAll.checked = false;
    }
  }

  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (event) {
    const req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      const str = req.response;
      let obj = JSON.parse(str);
      VISUAL_ARR = obj.visual;
      TODAY_GOOD = obj.todaygood;
      SALE_GOOD = obj.salegood;
      NEW_GOOD = obj.newgood;
      RECOMMEND_GOOD = obj.recommendgood;
      POPULAR_ICON = obj.popularicon;
      POPULAR_GOOD = obj.populargood;
      BANNER_ARR = obj.banner;
      BRAND_GOOD = obj.brandgood;
      REVIEW_ARR = obj.review;
      NOTICE_ARR = obj.notice;
      GOODNEWS_ARR = obj.goodnews;
      SEASON_ARR = obj.season;

      // 비주얼 화면 배치
      showVisual();
      // 오늘의 상품을 화면에 배치한다.
      showTodayGood();
      // 할인 상품을 화면에 배치한다.
      showSaleGood();
      // 신상품을 화면에 배치한다.
      showNewGood();
      // 추천상품을 화면에 배치한다.
      showRecommendGood();
      // 인기 아이콘을 화면에 배치한다.
      showPopularIconGood();
      // 인기상품을 화면에 배치한다.
      showPopularGood();
      // 배너를 화면에 배치한다.
      showBannerGood();
      // 브랜드관을 화면에 배치한다.
      showBrandGood();
      // 이용후기를 화면에 배치한다.
      showReview();
      // 공지사항을 화면에 배치한다.
      showNotice();
      // 물품소식을 화면에 배치한다.
      showGoodNews();
      // 시즌 목록을 화면에 배치한다.
      showSeason();
    }
  };
  // 자료를 호출한다.
  xhttp.open("GET", "data.json");
  // 웹브라우저 기능 실행 요청
  xhttp.send();

  // 커뮤니티 탭 메뉴
  // 탭 버튼
  const tabBtArr = document.querySelectorAll(".community-bt");
  // 탭내용
  const tabConArr = document.querySelectorAll(".community-notice dd");
  // 탭 포커스
  let tabFocusIndex = 0;
  tabBtArr.forEach(function (item, index) {
    item.addEventListener("click", function () {
      tabFocusIndex = index;
      tabFocusFn();
    });
  });
  // 탭 포커스 함수를 생성
  function tabFocusFn() {
    // css를 적용 및 제거
    // 일단 모두 제거
    tabBtArr.forEach(function (item) {
      item.classList.remove("community-bt-active");
    });
    tabBtArr[tabFocusIndex].classList.add("community-bt-active"); // 내용에서 일단 모두 제거
    tabConArr.forEach((item) => {
      item.classList.remove("community-visible-active");
    });
    tabConArr[tabFocusIndex].classList.add("community-visible-active");
  }

  const wrap = document.querySelector(".wrap");
  const header = document.querySelector(".header");
  let scy = 0;
  window.addEventListener("scroll", function () {
    scy = document.documentElement.scrollTop;
    if (scy > 0) {
      header.classList.add("active");
      wrap.classList.add("active");
    } else {
      header.classList.remove("active");
      wrap.classList.remove("active");
    }
  });

  const openBt = document.querySelector(".footer-link");
  // 목록 닫기 버튼
  const closeBt = document.querySelector(".family-close");
  // 보여진 패밀리 목록
  const family = document.querySelector(".family");
  // 스크롤바를 안생기게 하려고 처리
  const community = document.querySelector(".community");
  // 기능처리
  openBt.addEventListener("click", function () {
    family.classList.toggle("active");
    openBt.classList.toggle("active");
    community.classList.add("active");
  });
  closeBt.addEventListener("click", function () {
    family.classList.remove("active");
    openBt.classList.remove("active");
    community.classList.remove("active");
  });
  // niceScroll 적용// niceScroll 적용
  // niceScroll 적용
  // const sgl = $(".season-good-list");
  // sgl.niceScroll({
  //   cursorwidth: "8px",
  //   cursoropacitymax: 0.5,
  // });

  // sgl.mouseover(function () {
  //   sgl.getNiceScroll().resize();
  // });
  // Smooth Scrollbar 적용

  // 전체 메뉴 펼침 기능
  const allMenuArea = document.querySelector(".all-menu-area");
  const allMenu = document.querySelector(".all-menu");
  const cateList = document.querySelector(".cate-list");
  const themeList = document.querySelector(".theme-list");
  allMenuArea.addEventListener("mouseleave", () => {
    allMenu.classList.remove("active");
  });
  cateList.addEventListener("mouseenter", () => {
    allMenu.classList.add("active");
  });
  // cateList.addEventListener("mouseleave", () => {
  //   allMenu.classList.remove("active");
  // });
  themeList.addEventListener("mouseenter", () => {
    allMenu.classList.remove("active");
  });

  // 서브 카테고리 보여주기
  const cateListLis = document.querySelectorAll(".cate-list > li");
  const cateDepth2 = document.querySelectorAll(".cate-depth2-list");
  cateListLis.forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
      cateDepth2.forEach((itemSub, indexSub) => {
        itemSub.style.display = "none";
        if (index === indexSub) {
          itemSub.style.display = "block";
        }
      });
      console.log(index);
    });
  });
};
