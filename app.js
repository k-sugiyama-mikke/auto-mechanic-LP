document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("multiStepForm");
  const steps = document.querySelectorAll(".form-step");
  const progressBar = document.getElementById("progress-bar");
  const progressNumerator = document.getElementById("progress-numerator");
  const progressDenominator = document.getElementById("progress-denominator");
  let currentPage = 0;

  progressDenominator.textContent = steps.length;
  init();

  //郵便番号フォームの文字数制限
  const zipCode = document.getElementById("zip-code");
  zipCode.setAttribute("pattern", "[0-9]*");
  zipCode.setAttribute("inputmode", "numeric");
  zipCode.setAttribute("maxlength", "7");

  //生まれ年フォームの文字数制限
  const birth = document.getElementById("birth");
  birth.setAttribute("pattern", "[0-9]*");
  birth.setAttribute("inputmode", "numeric");
  birth.setAttribute("maxlength", "4");

  //電話番号フォームの文字数制限
  const tel = document.getElementById("tel");
  tel.setAttribute("pattern", "[0-9]*");
  tel.setAttribute("inputmode", "numeric");
  tel.setAttribute("maxlength", "11");

  /**
   * 次へボタン
   */
  document.querySelector(".next-btn").addEventListener("click", () => {
    if (currentPage < steps.length) {
      console.log("currentPage");
      console.log(currentPage);
      currentPage++;
      updateSteps();
    }
  });

  /**
   * 戻るボタン
   */
  document.querySelector(".prev-btn").addEventListener("click", () => {
    if (currentPage > 0) {
      console.log("currentPage");
      console.log(currentPage);
      currentPage--;

      //戻るページを取得する
      const beforeCurrentPage = currentPage;
      currentBeforeStep = null;
      steps.forEach((step, index) => {
        if (index == beforeCurrentPage) {
          currentBeforeStep = step;
        }
      });

      updateSteps();
    }
  });

  /**
   * ファーストモーダル（上のボタン）
   */
  document
    .querySelector("#intension-dialog__button-upper")
    .addEventListener("click", () => {
      const intensionDialog = document.getElementById("intension-dialog");
      const mechanicFirstView = document.getElementById("mechanic-first-view");
      const form = document.getElementById("form-screen");
      const slider = document.getElementById("slider");
      const currentPlan = document.getElementById("current-plan");
      currentPlan.value = "近いうちに転職したい";
      const offerLabel = document.getElementById("offer-label");

      intensionDialog.classList.add("invisible");
      mechanicFirstView.classList.add("invisible");
      form.classList.remove("invisible");
      slider.classList.add("invisible");
      offerLabel.classList.remove("invisible");
    });

  /**
   * ファーストモーダル（下のボタン）
   */
  document
    .querySelector("#intension-dialog__button-bottom")
    .addEventListener("click", () => {
      const intensionDialog = document.getElementById("intension-dialog");
      const mechanicFirstView = document.getElementById("mechanic-first-view");
      const form = document.getElementById("form-screen");
      const slider = document.getElementById("slider");
      const currentPlan = document.getElementById("current-plan");
      currentPlan.value = "今は情報収集したい";
      const offerLabel = document.getElementById("offer-label");

      intensionDialog.classList.add("invisible");
      mechanicFirstView.classList.add("invisible");
      form.classList.remove("invisible");
      slider.classList.add("invisible");
      offerLabel.classList.remove("invisible");
    });

  /**
   * 利用規約モーダルを閉じる（×ボタン）
   */
  document
    .getElementById("terms-dialog-close")
    .addEventListener("click", () => {
      console.log("クリックされた");
      const dialog = document.getElementById("terms-dialog");
      console.log(dialog);
      dialog.classList.add("invisible");
    });

  /**
   * 利用規約モーダルを閉じる（画面）
   */
  document.getElementById("terms-dialog").addEventListener("click", () => {
    console.log("クリックされた");
    const dialog = document.getElementById("terms-dialog");
    console.log(dialog);
    dialog.classList.add("invisible");
  });

  /**
   * 利用規約モーダルを開く
   */
  document.getElementById("terms-text").addEventListener("click", () => {
    const dialog = document.getElementById("terms-dialog");
    dialog.classList.remove("invisible");
  });

  /**
   * 会社概要モーダルを開く
   */
  document.getElementById("company-text").addEventListener("click", () => {
    const dialog = document.getElementById("company-dialog");
    dialog.classList.remove("invisible");
  });

  /**
   * 会社概要モーダルを閉じる（×ボタン）
   */
  document
    .getElementById("company-dialog-close")
    .addEventListener("click", () => {
      console.log("クリックされた");
      const dialog = document.getElementById("company-dialog");
      console.log(dialog);
      dialog.classList.add("invisible");
    });

  /**
   * 会社概要モーダルを閉じる（画面）
   */
  document.getElementById("company-dialog").addEventListener("click", () => {
    console.log("クリックされた");
    const dialog = document.getElementById("company-dialog");
    console.log(dialog);
    dialog.classList.add("invisible");
  });

  /**
   * フォーム更新処理
   */
  function updateSteps() {
    steps.forEach((step, index) => {
      step.classList.remove("active", "back-slide");
      if (index === currentPage) {
        step.classList.add("active");
      } else if (index < currentPage) {
        step.classList.add("back-slide");
      }
    });
    console.log("updateSteps currentPage");
    console.log(currentPage);

    const nowCurrentPage = currentPage + 1;

    // Update progress
    const progressPercent = Math.round((nowCurrentPage / steps.length) * 100);
    progressBar.style.width = `${progressPercent}%`;
    progressNumerator.textContent = nowCurrentPage;

    // formContainer.style.transform = `translateX(-${100 * currentPage}%)`;

    if (currentPage != 0) {
      //   adjustFormHeight();
    }

    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const submitBtn = document.getElementById("submit-btn");
    const slider = document.getElementById("slider");
    console.log("page数");
    console.log(nowCurrentPage);

    switch (nowCurrentPage) {
      case 1:
        prevBtn.classList.add("invisible");
        nextBtn.classList.remove("invisible");
        submitBtn.classList.add("invisible");
        checkCheckboxAndRadioForm(nowCurrentPage);
        break;
      case 2:
        prevBtn.classList.remove("invisible");
        nextBtn.classList.add("invisible");
        submitBtn.classList.add("invisible");
        slider.classList.add("invisible");
        slider.classList.add("invisible");
        checkCheckboxAndRadioForm(nowCurrentPage);

        break;
      case 3:
        console.log("case 3");
        prevBtn.classList.remove("invisible");
        nextBtn.classList.remove("invisible");
        submitBtn.classList.add("invisible");
        slider.classList.remove("invisible");

        if (validateFormThirdQuestion()) {
          addDecorationAfterInputComplete();
          nextBtnInvalidationCancel();
        } else {
          deleteDecorationAfterInputComplete();
          nextBtnDisabled();
        }

        break;
      case 4:
        console.log("case 4");
        prevBtn.classList.remove("invisible");
        nextBtn.classList.add("invisible");
        submitBtn.classList.remove("invisible");
        slider.classList.remove("invisible");

        let validate = validateFormFourQuestion();

        const isLastPage = true;
        if (validate.result) {
          addDecorationAfterInputComplete(isLastPage);
          submitBtnInvalidationCancel();
        } else {
          deleteDecorationAfterInputComplete();
          submitBtnDisabled();
        }
        break;

      default:
        break;
    }
  }

  /**
   * データ送信する
   */
  document
    .getElementById("submit-btn")
    .addEventListener("click", async function () {
      const submitBtn = document.getElementById("submit-btn");
      submitBtn.disabled = true;

      const loading = document.getElementById("loading");
      loading.classList.remove("invisible");

      const data = collectFormData();

      const dir = location.pathname.replace(/[^/]+$/, ""); // 今いるディレクトリ（末尾をファイル扱いでカット）
      location.replace(dir + "complete.html");
      return;

      console.log("送信するデータ：", data);
      const API_ENDPOINT = "https://d3akfz01stgoxo.cloudfront.net/submit";

      try {
        const res = await fetch(API_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await res.json();
        if (res.ok) {
          location.replace("/complete.html");
        } else {
          throw new Error("送信に失敗しました");
        }
        console.log("送信成功:", result);
      } catch (err) {
        location.replace("/complete.html");
      }
    });

  /**
   * 入力データの収集
   * @returns {Object} formData
   */
  function collectFormData() {
    const form = document.getElementById("multiStepForm");
    const inputs = form.querySelectorAll("input");
    const formData = {};
    const params = new URLSearchParams(window.location.search);

    inputs.forEach((input) => {
      const name = input.name;
      const value = input.value.trim();

      if (!name) return; // name属性がない場合はスキップ

      if (input.type === "checkbox") {
        const keyName = name.replace(/\[\]$/, ""); // [] を削除
        if (!formData[keyName]) formData[keyName] = [];
        if (input.checked) formData[keyName].push(value);
      } else if (input.type === "radio") {
        if (input.checked) formData[name] = value;
      } else {
        formData[name] = value;
      }
    });

    //広告媒体を取得する
    const utmSource = params.get("utm_source");
    switch (utmSource) {
      case ("facebook", "instagram"):
        formData.adMedia = "meta";
        formData.metaPlatform = utmSource;
        formData.metaAdId = "meta";

        break;
      case "google":
        formData.adMedia = "google";
        formData.utmSource = utmSource;
        formData.utmMedium = params.get("utm_medium") || "";
        formData.utmTerm = params.get("utm_term") || "";
        formData.matchtype = params.get("matchtype") || "";
        formData.device = params.get("device") || "";
        formData.gclid = params.get("gclid") || "";

        break;
      default:
        break;
    }

    return formData;
  }

  /**
   * 初回起動
   */
  function init() {
    // 初期化
    updateSteps();
  }

  /**
   * ラジオボタンを選択した際は次へ移動する
   */
  document.querySelectorAll(".form-radio").forEach((radio) => {
    radio.addEventListener("click", function () {
      currentPage++;
      updateSteps();
    });
  });

  /**
   * フォームのグレーアウトをリセットする
   */
  function backgroundReset() {
    const nextBtn = document.querySelector(".next-btn");
    const submitBtn = document.querySelector(".submit-btn");

    const formScreen = document.querySelector(".form-screen");

    submitBtn.classList.remove("highlight");
    formScreen.classList.remove("dimmed");
    nextBtn.classList.remove("highlight");
  }

  /**
   * ハンドアイコンを初期の位置に戻す
   */
  function handReset() {
    const hand = document.getElementById("hand-icon");
    // ✅ hand-icon を初期位置に戻す
    hand.style.left = `0px`;
    hand.style.top = `20px`;
  }

  /**
   *チェックボックスとラジオボタンをチェックする
   */
  function checkCheckboxAndRadioForm(currentPage) {
    console.log("checkCheckboxAndRadioForm start");
    console.log(currentPage);
    const targetStep = document.getElementById(`form-step-${currentPage}`);
    console.log(targetStep);

    //チェックボックス
    if (targetStep.querySelector(".form-checkbox")) {
      console.log("このステップにはチェックボックスがあります");
      let nextBtn = document.querySelector(".next-btn");
      let formScreen = document.querySelector(".form-screen");

      const isChecked = [...targetStep.querySelectorAll(".form-checkbox")].some(
        (cb) => cb.checked
      );

      if (isChecked) {
        formScreen.classList.add("dimmed");
        nextBtn.classList.add("highlight");
        addDecorationAfterInputComplete();
        nextBtnInvalidationCancel();
        targetBtnScroll("next-btn");
      } else {
        formScreen.classList.remove("dimmed");
        nextBtn.classList.remove("highlight");
        handReset();
        nextBtnDisabled();
      }
    }

    //ラジオボタン
    if (targetStep.querySelector(".form-radio")) {
      console.log("このステップにはラジオボタンがあります");
      let nextBtn = document.querySelector(".next-btn");
      let formScreen = document.querySelector(".form-screen");

      const isChecked = [...targetStep.querySelectorAll(".form-radio")].some(
        (cb) => cb.checked
      );

      formScreen.classList.remove("dimmed");
      nextBtn.classList.remove("highlight");
      handReset();
      //   if (isChecked) {
      //     formScreen.classList.add("dimmed");
      //     nextBtn.classList.add("highlight");
      //     addDecorationAfterInputComplete();
      //   } else {
      //   }
    }
  }

  /**
   *　チェックボックスにチェックが入った時のアクション（背景グレーアウト、ハンドアイコン移動）
   */
  document.querySelectorAll(".form-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const currentStep = checkbox.closest(".form-step"); // チェックボックスのあるステップを取得
      const nextBtn = document.querySelector(".next-btn");
      const formScreen = document.querySelector(".form-screen");

      const isChecked = [
        ...currentStep.querySelectorAll(".form-checkbox"),
      ].some((cb) => cb.checked);

      if (isChecked) {
        formScreen.classList.add("dimmed");
        nextBtn.classList.add("highlight");
        nextBtnInvalidationCancel();

        addDecorationAfterInputComplete();
      } else {
        formScreen.classList.remove("dimmed");
        nextBtn.classList.remove("highlight");
        handReset();
        nextBtnDisabled();
      }
    });
  });

  /**
   * ページ内のフォーム（テキスト）をチェックする
   */
  function checkInputFormWithInPage() {
    const targetPage = currentPage;
    let currentStep = null;
    steps.forEach((step, index) => {
      if (index == targetPage) {
        currentStep = step;
      }
    });

    const inputs = currentStep.querySelectorAll(".form-input__text");
    console.log(inputs);

    let isInput = true;
    inputs.forEach((input) => {
      console.log("入力された値:", input.value);
      if (!input.value) {
        isInput = false;
      }
    });

    return isInput;
  }

  /***********************************************
   * フォーム1問目のバリデーションチェック
   *************************************************/

  /**
   * フォームの1問目のバリデーションチェック
   */
  function validateFormFirstQuestion() {}

  /***********************************************
   * フォーム2問目のバリデーションチェック
   *************************************************/

  /**
   * フォームの2問目のバリデーションチェック
   */
  function validateFormSecondQuestion() {}

  /***********************************************
   * フォーム3問目のバリデーションチェック
   *************************************************/

  // フォーム3問目の監視対象の要素を取得
  const zipCodeInput = document.getElementById("zip-code");
  const birthInput = document.getElementById("birth");
  const zipCodeCouter = document.getElementById("zip-code-counter");

  // イベント設定
  [zipCodeInput, birthInput].forEach((input) => {
    input.addEventListener("input", () => {
      if (validateFormThirdQuestion()) {
        addDecorationAfterInputComplete();
        nextBtnInvalidationCancel();
        targetBtnScroll("next-btn");
      } else {
        deleteDecorationAfterInputComplete();
        nextBtnDisabled();
      }
    });
  });

  /**
   * フォーム3問目のバリデーションチェック
   */
  function validateFormThirdQuestion() {
    let result = false;
    const zipCode = zipCodeInput.value.trim();
    const birth = birthInput.value.trim();
    const zipCodeLength = zipCode.length;
    console.log(zipCodeLength);
    zipCodeCouter.textContent = 7 - zipCodeLength;

    // 郵便番号：7桁の数字、誕生年：4桁の数字
    const zipCodeValid = /^\d{7}$/.test(zipCode);
    const birthValid = /^\d{4}$/.test(birth);

    if (zipCodeValid && birthValid) {
      result = true;
    }

    return result;
  }

  /***********************************************
   * フォーム4問目のバリデーションチェック
   *************************************************/

  // フォーム4問目の監視対象の要素を取得
  const nameInput = document.getElementById("name");
  const telInput = document.getElementById("tel");
  const telCouter = document.getElementById("tel-counter");

  // イベント設定
  [nameInput, telInput].forEach((input) => {
    input.addEventListener("input", () => {
      const validate = validateFormFourQuestion();
      const isLastPage = true;
      if (validate.result) {
        addDecorationAfterInputComplete(isLastPage);
        submitBtnInvalidationCancel();
        targetBtnScroll("submit-btn");
      } else {
        deleteDecorationAfterInputComplete();
        submitBtnDisabled();
      }
    });
  });

  /**
   * フォームの4問目のバリデーションチェック
   */
  function validateFormFourQuestion() {
    let res = {
      result: true,
      msg: "",
    };

    const nameValue = document.getElementById("name").value.trim();
    const telValue = document.getElementById("tel").value.trim();

    const telLength = telValue.length;
    telCouter.textContent = 11 - telLength;

    // 名前が空でない
    const nameValid = nameValue.length > 0;

    // 電話番号: 数字のみで10桁または11桁
    const telValid = /^\d{11}$/.test(telValue);

    if (!nameValid) {
      res.result = false;
      return res;
    }

    if (!telValid) {
      res.result = false;
      res.msg = "正しい電話番号を入力してください";
      return res;
    }

    return res;
  }

  /**
   * フォーム入力後の装飾を追加する
   */
  function addDecorationAfterInputComplete(islastPage = false) {
    console.log("addDecorationAfterInputComplete start");
    const formScreen = document.querySelector(".form-screen");
    formScreen.classList.add("dimmed");

    let targetBtn = null;
    if (islastPage) {
      targetBtn = document.getElementById("submit-btn");
    } else {
      const nextBtn = document.getElementById("next-btn");
      if (nextBtn.classList.contains("invisible")) {
        handReset();
        console.log("次へボタンは非表示です");
        return;
      }

      targetBtn = nextBtn;
    }

    if (targetBtn == null) {
      console.log("ターゲットボタンが見つかりません");
      return;
    }

    targetBtn.classList.add("highlight");

    const targetBtnRect = targetBtn.getBoundingClientRect();
    const wrapperRect = document
      .querySelector(".form-wrapper")
      .getBoundingClientRect();

    const offsetX = -30;
    const offsetY = -20;

    const x = targetBtnRect.right - wrapperRect.left + offsetX;
    const y = targetBtnRect.bottom - wrapperRect.top + offsetY;

    //   console.log("x");
    //   console.log("y");
    //   console.log(x);
    //   console.log(y);
    const hand = document.getElementById("hand-icon");

    hand.style.position = "absolute";
    hand.style.left = `${x}px`;
    hand.style.top = `${y}px`;
    hand.style.display = "block";

    console.log("addDecorationAfterInputComplete end");
  }

  /**
   * フォーム入力後の装飾を削除する
   */
  function deleteDecorationAfterInputComplete() {
    backgroundReset();
    handReset();
  }

  /**
   * 次へボタンの無効化を解除する
   */
  function nextBtnInvalidationCancel() {
    const nextBtn = document.getElementById("next-btn");
    nextBtn.classList.remove("disabled");
  }

  /**
   * 次へボタンを無効化する
   */
  function nextBtnDisabled() {
    const nextBtn = document.getElementById("next-btn");
    nextBtn.classList.remove("disabled");
    nextBtn.classList.add("disabled");
  }

  /**
   * 送信ボタンを無効化する
   */
  function submitBtnDisabled() {
    const submitBtn = document.getElementById("submit-btn");
    submitBtn.classList.remove("disabled");
    submitBtn.classList.add("disabled");
  }

  /**
   * 送信ボタンの無効化を解除する
   */
  function submitBtnInvalidationCancel() {
    const submitBtn = document.getElementById("submit-btn");
    submitBtn.classList.remove("disabled");
  }

  const swiper = new Swiper(".swiper", {
    loop: true,
    slidesPerView: "auto", // スライド幅自動
    spaceBetween: 20,
    speed: 3000, // スライドにかかる時間（ms）
    autoplay: {
      delay: 0, // 遅延なし
      disableOnInteraction: false,
    },
    allowTouchMove: false, // スワイプ操作を無効
    freeMode: true, // 自由モード（常に流れる）
    freeModeMomentum: false, // 慣性無効（一定速度で流す）
  });

  /**
   * ターゲットのボタンまでスクロールする
   * @param {} target
   * @returns
   */
  function targetBtnScroll(target) {
    if (!target) {
      return;
    }
    document.getElementById(target).scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  }
});
