/**
 * Quark Browser core
 *
 * @author Alan Hardman <alan@phpizza.com>
 * @link   http://electron.atom.io/docs/v0.37.8/api/web-view-tag/
 */
var Browser = {
  tabs: [],
  webviews: [],
  currentTab: null,
  lastTab: -1,
  newTab: function(url, activate) {
    var id = ++Browser.lastTab;
    console.log(url, activate, id);

    // Create webview
    var webview = document.createElement('webview');
    webview.src = url;
    webview.setAttribute('partition', 'persist:ext');
    webview.dataset.id = id;
    document.getElementById('webview-list').appendChild(webview);
    webview.removeAttribute('tabindex');
    Browser.webviews.push(webview);
    registerWebviewEvents(webview);
    console.log(webview);

    // Create tab
    var tab = document.createElement('button');
    tab.classList.add('tab');
    tab.dataset.id = id;
    Browser.tabs.push(tab);
    document.getElementById('tabbar').insertBefore(tab, document.getElementById('btn-newtab'));
    console.log(tab);

    // Switch to new tab
    if (activate) {
      Browser.switchTab(id);
    }

    return id;
  },
  switchTab: function(id) {
    // var webview = document.querySelector('#webview-list webview[data-id="' + id + '"]'),
      // tab = document.querySelector('#tabbar .tab[data-id="' + id + '"]'),
    var webview = this.webviews[id],
      tab = this.tabs[id],
      items, item, i;

    console.log(webview);

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
    tab.classList.add('active');

    // Set address
    if('getURL' in webview) {
      document.getElementById('address-bar').value = webview.getURL();
    }

    this.currentTab = id;
    webview.focus();
    return webview;
  },
  navigate: function(url) {
    if(!url) {
      url = 'about:blank';
    }
    var webview = document.querySelector('#webview-list webview[data-id="' + Browser.currentTab + '"]');

    webview.src = url;
    return webview;
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

// Handle new tab button
document.getElementById('btn-newtab').addEventListener('click', function(e) {
  Browser.newTab('about:blank', true);
});


/*
Webview Events
*/
var registerWebviewEvents = function(webview) {

  // Finished navigation
  webview.addEventListener('did-navigate', function(e) {
    console.log(e);
    if (webview.dataset.id === Browser.currentTab) {
      document.getElementById('address-bar').value = webview.getURL();
      document.querySelector('#tabbar .tab[data-id="' + Browser.currentTab + '"]').textContent = webview.getTitle();
    }
  });

  // DOM Ready
  webview.addEventListener('dom-ready', function(e) {
    console.log(e);
    if (webview.dataset.id === Browser.currentTab) {
      document.querySelector('#tabbar .tab[data-id="' + Browser.currentTab + '"]').textContent = webview.getTitle();
    }
  });

};

/*
Initialize new window
*/
(function() {
  var octicons = require('octicons');
  var iconButtons = document.querySelectorAll('button[data-octicon]');
  var button;
  for (var i = 0; i < iconButtons.length; i++) {
    button = iconButtons[i];
    button.innerHTML = octicons[button.getAttribute('data-octicon')].toSVG();
  }
})();
Browser.newTab('about:blank', true);
