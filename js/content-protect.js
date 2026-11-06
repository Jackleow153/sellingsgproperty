document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  alert("Content protected. Please contact us for more information.");
  return false;
});

document.addEventListener("keydown", function (e) {
  if (!e.key) return;
  if (
    (e.ctrlKey && ["s", "u", "c", "a", "p"].includes(e.key.toLowerCase())) ||
    e.key === "F12"
  ) {
    e.preventDefault();
    return false;
  }
});
