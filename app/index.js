/**
 * Quark Browser core
 *
 * @author Alan Hardman <alan@phpizza.com>
 * @link   http://electron.atom.io/docs/v0.37.8/api/web-view-tag/
 */
var Browser = {
  currentTab: 0,
  lastTab: 0,
  switchTab: function(id) {
    console.log('switchTab(' + id + ')');
    var webview = document.querySelector('#webview-list webview[data-id="' + id + '"]'),
      items, item, i;

    // Set active webview
    items = document.querySelectorAll('#webview-list webview');
    for (i = 0; item = items[i]; i++) {
      item.classList.remove('active');
    }
    webview.classList.add('active');

    // Set active tab
    items = document.querySelectorAll('#tabbar .tab');
    for (i = 0; item = items[i]; i++) {
      item.classList.remove('active');
    }
    document.querySelector('#tabbar .tab[data-id="' + id + '"]').classList.add('active');

    // Set address
    document.getElementById('address-bar').value = webview.getURL();

    this.currentTab = id;
    webview.focus();
  },
  navigate: function(url) {
    if(!url) {
      url = 'about:blank';
    }
    var webview = document.querySelector('#webview-list webview[data-id="' + Browser.currentTab + '"]');
    webview.src = url;
  }
};

/*
UI Events
*/

// Handle tab clicks
document.getElementById('tabbar').addEventListener('click', function(e) {
  console.log(e);
  if (e.target.classList.contains('tab')) {
    Browser.switchTab(e.target.dataset.id);
  }
});

// Handle address box submit
document.getElementById('address-box').addEventListener('submit', function(e) {
  console.log(e);
  var url = document.getElementById('address-bar').value;
  Browser.navigate(url);
  e.preventDefault();
});

/*
Webview Events
*/


