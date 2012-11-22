(function() {
	'use strict';

	// skips old browsers
	if (typeof document.querySelectorAll != 'function') {
		return;
	}

	function forEachNode(nodes, fn) {
		Array.prototype.forEach.call(nodes, fn);
	}

	var contentDiv = document.getElementById('content');

	var scrollState = {
		get: function() {
			return {top: contentDiv.scrollTop};
		},
		set: function(state) {
			setTimeout(function() {
				contentDiv.scrollTop = state.top;
			}, 1);
		}
	};

	var sections = {
		elements: document.querySelectorAll('#content > article'),
		links: document.querySelectorAll('nav a'),
		show: function(id) {
			forEachNode(this.elements, function(s) {
				if (s.id == id) {
					s.style.display = 'block';
				} else {
					s.style.display = 'none';
				}
			});
			forEachNode(this.links, function(link) {
				if (link.hash.substr(1) == id) {
					link.parentNode.className = 'selected';
				}
				else {
					link.parentNode.className = '';
				}
			});
		}
	};

	var storeScrollState, restoreScrollState;
	if (window.history && window.history.replaceState) {
		storeScrollState = function() {
			window.history.replaceState(scrollState.get(), '');
		};

		restoreScrollState = function() {};

		window.onpopstate = function(event) {
			if (event.state && event.state.top) {
				scrollState.set(event.state);
			}
			else {
				scrollState.set({top: 0});
			}
		};
	}
	else {
		var states = {};
		storeScrollState = function() {
			if (window.location.hash != '') {
				states[window.location.hash] = scrollState.get();
			}
		};

		restoreScrollState = function() {
			if (window.location.hash != '') {
				scrollState.set(states[window.location.hash] || {top: 0});
			}
		};
	}

	forEachNode(document.querySelectorAll('a'), function(link) {
		link.onclick = function() {
			storeScrollState();
			return true;
		};
	});

	var goToSection = function(sectionHash) {
		var parts = sectionHash.split("-");
		sections.show(parts[0]);

		if (parts.length > 1) {
			window.location.hash = sectionHash;
		}

		restoreScrollState();
	}

  // either an old browser or a big screen (i.e. not a phone)
  if (!window.matchMedia || window.matchMedia("handled, (min-width: 800px)").matches) {
    window.onhashchange = function() {
      if (window.location.hash != '') {
        goToSection(window.location.hash.substr(1));
      }
    };

    if (window.location.hash == '') {
      window.location.hash = '#presentation';
    }
    else {
      goToSection(window.location.hash.substr(1));
    }
  }
})();