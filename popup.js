function saveCurrentPage() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    let url = tabs[0].url;

    chrome.storage.sync.get('urls', function(data) {
      let urls = data.urls || [];
      let duplicateArticle = urls.find(article => article === url);

      if (!duplicateArticle) {
        urls.push(url);
        chrome.storage.sync.set({ urls: urls }, function() {
          console.log('URL is saved:', url);
          renderSavedUrls();
        });
      } else {
        console.log('This article is already saved:', duplicateArticle);
      }
    });
  });
}

function renderSavedUrls() {
  chrome.storage.sync.get('urls', function(data) {
    let urls = data.urls || [];
    let urlList = document.getElementById('urls');
    urlList.innerHTML = '';

    urls.forEach(function(url) {
      let li = document.createElement('li');
      let a = document.createElement('a');
      a.href = url;
      a.textContent = url;
      li.appendChild(a);
      urlList.appendChild(li);
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  saveCurrentPage();
});
