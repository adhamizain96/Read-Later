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

      let removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.classList.add('remove-button');
      removeButton.addEventListener('click', function() {
        removeUrl(url);
      });

      li.appendChild(document.createTextNode(' - '));
      li.appendChild(removeButton);

      urlList.appendChild(li);
    });

    adjustPopupSize();
  });
}

function removeUrl(url) {
  chrome.storage.sync.get('urls', function(data) {
    let urls = data.urls || [];
    let index = urls.indexOf(url);
    if (index !== -1) {
      urls.splice(index, 1);
      chrome.storage.sync.set({ urls: urls }, function() {
        console.log('URL is removed:', url);
        renderSavedUrls();
      });
    }
  });
}

function adjustPopupSize() {
  const height = document.body.offsetHeight + 40;
  const width = document.body.offsetWidth;

  window.resizeTo(width, height);
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('saveBtn').addEventListener('click', saveCurrentPage);
  document.getElementById('clearAllBtn').addEventListener('click', clearAllUrls);

  renderSavedUrls();
});

function clearAllUrls() {
  chrome.storage.sync.set({ urls: [] }, function() {
    console.log('All URLs are cleared.');
    renderSavedUrls();
  });
}
