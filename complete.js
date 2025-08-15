document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const isTestJs = params.get("test") ? true : false;
  console.log("test");
  console.log(params.has("complete"));
  console.log(isTestJs);

  if (params.has("complete") && !isTestJs) {
    console.log("最終CV発火");
    gtag("event", "conversion", {
      send_to: "AW-16680263633/U7UBCN_B-IYbENG_4pE-",
      value: 1000.0,
      currency: "JPY",
    });

    const utmJs = (params.get("utm_source") || "").toLowerCase();
    const isMetaJs =
      params.has("fbclid") || /facebook|instagram|meta/.test(utmJs);

    fbq("trackCustom", "auto_mechanic_register", {
      source: isMetaJs ? "meta" : "other",
      page: location.pathname,
    });
  }

  /**
   * 利用規約モーダルを閉じる（×ボタン）
   */
  document
    .getElementById("terms-dialog-close")
    .addEventListener("click", () => {
      const dialog = document.getElementById("terms-dialog");
      console.log(dialog);
      dialog.classList.add("invisible");
    });

  /**
   * 利用規約モーダルを閉じる（画面）
   */
  document.getElementById("terms-dialog").addEventListener("click", () => {
    const dialog = document.getElementById("terms-dialog");
    console.log(dialog);
    dialog.classList.add("invisible");
  });

  /**
   * 会社概要モーダルを閉じる（×ボタン）
   */
  document
    .getElementById("company-dialog-close")
    .addEventListener("click", () => {
      const dialog = document.getElementById("company-dialog");
      console.log(dialog);
      dialog.classList.add("invisible");
    });

  /**
   * 利用規約モーダルを閉じる（画面）
   */
  document.getElementById("company-dialog").addEventListener("click", () => {
    const dialog = document.getElementById("company-dialog");
    console.log(dialog);
    dialog.classList.add("invisible");
  });

  /**
   * 利用規約モーダルを開く
   */
  document.getElementById("terms-text").addEventListener("click", () => {
    console.log("利用規約");
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
});
