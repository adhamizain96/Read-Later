document.addEventListener('DOMContentLoaded', function() {
  const saveBtn = document.getElementById('saveBtn');
  const clearAllBtn = document.getElementById('clearAllBtn');
  const searchInput = document.getElementById('searchInput');
  const tagsInput = document.getElementById('tagsInput');
  const urlList = document.getElementById('urls');

  if (saveBtn) {
    saveBtn.addEventListener('click', saveCurrentPage);
  }

  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', clearAllUrls);
  }

  if (searchInput) {
    searchInput.addEventListener('input', renderSavedUrls);
  }

  if (tagsInput) {
    tagsInput.addEventListener('change', renderSavedUrls);
  }

  renderSavedUrls();
});

function saveCurrentPage() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    let url = tabs[0].url;
    let linkName = prompt('Enter a name for the link:');
    let tagName = prompt('Enter a name for the tag:');

    if (!linkName || !tagName) {
      return; // If the user cancels or doesn't provide a name, exit the function
    }

    chrome.storage.sync.get('urls', function(data) {
      let urls = data.urls || [];
      let duplicateArticle = urls.find(article => article.url === url);

      if (!duplicateArticle) {
        urls.push({ url, name: linkName, tags: [tagName] });

        chrome.storage.sync.set({ urls: urls }, function() {
          console.log('URL is saved:', url);
          renderSavedUrls();
        });
      } else {
        console.log('This article is already saved:', duplicateArticle.url);
      }
    });
  });
}


function removeUrl(url) {
  if (confirm('Are you sure you want to remove this URL?')) {
    chrome.storage.sync.get('urls', function(data) {
      let urls = data.urls || [];
      let updatedUrls = urls.filter(article => article.url !== url);

      chrome.storage.sync.set({ urls: updatedUrls }, function() {
        console.log('URL is removed:', url);
        renderSavedUrls();
      });
    });
  }
}

function clearAllUrls() {
  if (confirm('Are you sure you want to clear all URLs?')) {
    chrome.storage.sync.set({ urls: [] }, function() {
      console.log('All URLs are cleared.');
      renderSavedUrls();
    });

    document.getElementById('searchInput').value = '';
    document.getElementById('tagsInput').value = '';
  }
}

function renderSavedUrls() {
  chrome.storage.sync.get('urls', function(data) {
    let urls = data.urls || [];
    let searchQuery = (document.getElementById('searchInput')?.value || '').toLowerCase();
    let tagsFilter = (document.getElementById('tagsInput')?.value || '').toLowerCase();
    let urlList = document.getElementById('urls');

    if (urlList) {
      urlList.innerHTML = '';

      urls
        .filter(article => article.url.toLowerCase().includes(searchQuery) && article.tags.join(',').toLowerCase().includes(tagsFilter))
        .forEach(article => {
          let { url, name, tags } = article;

          let li = document.createElement('li');
          li.classList.add('url-item');

          let link = document.createElement('a');
          link.classList.add('link');
          link.href = url;
          link.textContent = name; // Display the name instead of the full URL
          link.target = '_blank'; // Open link in a new tab
          li.appendChild(link);

          let removeButton = document.createElement('button');
          removeButton.textContent = 'Remove';
          removeButton.classList.add('remove-button');
          removeButton.addEventListener('click', function() {
            removeUrl(url);
          });
          li.appendChild(document.createTextNode(' - '));
          li.appendChild(removeButton);

          let tagsSpan = document.createElement('span');
          tagsSpan.textContent = `Tags: ${tags.join(', ')}`;
          li.appendChild(document.createElement('br'));
          li.appendChild(tagsSpan);

          urlList.appendChild(li);
        });

      let countElement = document.createElement('div');
      countElement.textContent = `Total URLs: ${urls.length}`;
      countElement.classList.add('total-count');
      urlList.appendChild(countElement);
    }
  });
}
