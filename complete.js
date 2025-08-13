document.addEventListener("DOMContentLoaded", () => {
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
