// Dynamically adjust the popup size based on content
function adjustPopupSize() {
  const bodyHeight = document.body.scrollHeight;
  const bodyWidth = document.body.scrollWidth;
  const popupHeight = Math.ceil(bodyHeight * window.devicePixelRatio);
  const popupWidth = Math.ceil(bodyWidth * window.devicePixelRatio);
  const minHeight = 250;
  const minWidth = 300;
  const maxHeight = 700;
  const maxWidth = 500;
  const height = Math.min(Math.max(popupHeight, minHeight), maxHeight);
  const width = Math.min(Math.max(popupWidth, minWidth), maxWidth);

  const popup = document.documentElement;
  popup.style.height = height + 'px';
  popup.style.width = width + 'px';
}

document.addEventListener('DOMContentLoaded', function() {
  adjustPopupSize();
});
