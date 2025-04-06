function getURLVar(key) {
	var value = [];

	var query = String(document.location).split('?');

	if (query[1]) {
		var part = query[1].split('&');

		for (i = 0; i < part.length; i++) {
			var data = part[i].split('=');

			if (data[0] && data[1]) {
				value[data[0]] = data[1];
			}
		}

		if (value[key]) {
			return value[key];
		} else {
			return '';
		}
	}
}

function scrollToElement(event) {
    $('#linkAnchor').on('click', function(event){
		event.preventDefault();
		let $anchor = $(this);
		if(window.matchMedia('(min-width: 992px)').matches) {
			$('html, body').animate({
				scrollTop: $($anchor.attr('href')).offset().top - 190
			}, 1500);
		} else {
			$('html, body').animate({
				scrollTop: $($anchor.attr('href')).offset().top - 100
			}, 1500);
		}
	});
}

function closeMenu() {
	$('.navbar-main--links').removeClass('show');
	$('#menuHeader, #overlayMenu').remove();
	$('.button-menu').removeClass('open');
	Cookies.set('menu-state', 'closed');
}

function highlightNavigationLinks(){
	navigationHref = location.pathname.substr(1);
	if( navigationHref == 'business') {
		$('.navbar .nav-list .nav-list--item a[href*="'+navigationHref+'"]').removeClass('active');
		$('.footer-contact .list .list-item a[href*="'+navigationHref+'"]').removeClass('active');
	} else {
		$('.navbar .nav-list .nav-list--item a[href*="'+navigationHref+'"]').addClass('active');
		$('.footer-contact .list .list-item a[href*="'+navigationHref+'"]').addClass('active');
	}
}


// Cookies
var purecookieDesc = "We use cookies to ensure you get the best experience on our website."; // Description
// var purecookieTermsLink = '<a href="/terms" title="Terms and Conditions">Terms and Conditions</a> '; // Terms
var purecookieLink = '<a href="/cookie-policy" title="Cookies Policy">Learn More</a>'; // Cookiepolicy link
var purecookieButton = "Accept"; // Button text

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}

function cookieConsent() {
  if (!getCookie('purecookieDismiss')) {
    document.body.innerHTML += '<div class="cookieConsentContainer" id="cookieConsentContainer"><div class="cookieTitle"><a>' + '</a></div><div class="cookieDesc"><p>' + purecookieDesc + ' ' + purecookieLink + '</p></div><div class="cookieButton"><a class="btn btn-success" onClick="purecookieDismiss();">' + purecookieButton + '</a></div></div>';
    // pureFadeIn("cookieConsentContainer");
    setTimeout(function(){ 
      document.querySelector('.cookieConsentContainer').classList.add('show');
    }, 1500);
    
  }
}

function purecookieDismiss() {
  setCookie('purecookieDismiss','1',7);
  // pureFadeOut("cookieConsentContainer");
  document.querySelector('.cookieConsentContainer').classList.remove('show');
}

$(document).ready(function() {

	if(window.matchMedia('(max-width: 992px)').matches) {
		if($('.nav-item:nth-child(2) .nav-link').text() == 'Fibre') {
			$('.nav-item:nth-child(2) .nav-link').text('Fibre Broadband');
		} 
		if($('.nav-item:nth-child(5) .nav-link').text() == 'Phone') {
			$('.nav-item:nth-child(5) .nav-link').text('Landline Service');
		}
	}

	cookieConsent(); 

	$('#successPage .card').addClass('show-card').delay(6000).queue(function () {
        $(this).addClass('loaded');
    });

	highlightNavigationLinks();

	feather.replace();

	// Active Link on Menu
	$.each($('#menu').find('li'), function() {
        $(this).toggleClass('active', window.location.pathname.indexOf($(this).find('a').attr('href')) > -1);
    }); 

	$('form').trigger('reset');

	$('.button-menu').click(function(){
		const elementsCloseButton = '<div id="menuHeader" class="d-flex align-items-center justify-content-between p-3 pl-4">' + 
			'<a href="/" title="Home">' +
				'<img itemprop="image" src="https://www.puretelecom.ie/image/catalog/Logo/pure_logo.png" alt="Pure Telecom v3.0" title="Pure Telecom v3.0" class="logo img-fluid" width="85">' +
			'</a>' +
			'<button onclick="closeMenu()" type="button" class="btn btn-light__close">' + 
				'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
					'<line x1="18" x2="6" y1="6" y2="18"></line>' +
					'<line x1="6" x2="18" y1="6" y2="18"></line>' +
				'</svg>' + 
			'</button>' +
		'</div>';
		const overlay = '<div onclick="closeMenu()" id="overlayMenu" class="overlay-menu">' + '</div>';
		$('.navbar-main--links .container').prepend($(elementsCloseButton));
		$('body').append($(overlay));
		$('.navbar-main--links').addClass('show');
		$(this).addClass('open');
		Cookies.set('menu-state', 'opened');
	});

	
	// Highlight any found errors
	$('.text-danger').each(function() {
		var element = $(this).parent().find(':input');

		if (element.hasClass('form-control')) {
			element.addClass('is-invalid');
		}
	});

	// tooltips on hover
	$('[data-toggle=\'tooltip\']').tooltip({container: 'body'});

	// Makes tooltips work on ajax generated content
	$(document).ajaxStop(function() {
		$('[data-toggle=\'tooltip\']').tooltip({container: 'body'});
	});

	// Currency
	$('#form-currency .dropdown-item').on('click', function(e) {
		e.preventDefault();

		$('#form-currency input[name=\'code\']').val($(this).attr('href'));

		$('#form-currency').submit();
	});

	/* Search */
	$('#search input[name=\'search\']').parent().find('button').on('click', function() {
		var url = $('base').attr('href') + 'index.php?route=product/search';

		var value = $('header #search input[name=\'search\']').val();

		if (value) {
			url += '&search=' + encodeURIComponent(value);
		}

		location = url;
	});

	$('#search input[name=\'search\']').on('keydown', function(e) {
		if (e.keyCode == 13) {
			$('header #search input[name=\'search\']').parent().find('button').trigger('click');
		}
	});

	// Menu
	$('#menu .dropdown-menu').each(function() {
		var menu = $('#menu').offset();
		var dropdown = $(this).parent().offset();

		var i = (dropdown.left + $(this).outerWidth()) - (menu.left + $('#menu').outerWidth());

		if (i > 0) {
			$(this).css('margin-left', '-' + (i + 10) + 'px');
		}
	});

	// Product List
	$('#list-view').click(function() {
		$('#content .product-grid > .clearfix').remove();

		$('#content .row > .product-grid').attr('class', 'product-layout product-list col-12');

		$('#grid-view').removeClass('active');
		$('#list-view').addClass('active');

		localStorage.setItem('display', 'list');
	});

	// Product Grid
	$('#grid-view').click(function() {
		// What a shame bootstrap does not take into account dynamically loaded columns
		var cols = $('#column-right, #column-left').length;

		if (cols == 2) {
			$('#content .product-list').attr('class', 'product-layout product-grid col-lg-6 col-md-6 col-sm-12 col-sm-12');
		} else if (cols == 1) {
			$('#content .product-list').attr('class', 'product-layout product-grid col-lg-4 col-md-4 col-sm-6 col-12');
		} else {
			$('#content .product-list').attr('class', 'product-layout product-grid col-lg-3 col-md-3 col-sm-6 col-12');
		}

		$('#list-view').removeClass('active');
		$('#grid-view').addClass('active');

		localStorage.setItem('display', 'grid');
	});

	if (localStorage.getItem('display') == 'list') {
		$('#list-view').trigger('click');
		$('#list-view').addClass('active');
	} else {
		$('#grid-view').trigger('click');
		$('#grid-view').addClass('active');
	}

	// Cookie Policy
	$('#button-cookie').on('click', function(e) {
		e.preventDefault();

		$.ajax({
			url: 'index.php?route=common/cookie/agree',
			dataType: 'json',
			beforeSend: function() {
				$('#button-cookie').button('loading');
			},
			complete: function() {
				$('#button-cookie').button('reset');
			},
			success: function(json) {
				if (json['success']) {
					$('#cookie').slideUp(400, function() {
						$('#cookie').remove();
					});
				}
			}
		});
	});
});

// Cart add remove functions
var cart = {
	'add': function(product_id, quantity) {
		$.ajax({
			url: 'index.php?route=checkout/cart/add',
			type: 'post',
			data: 'product_id=' + product_id + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').button('loading');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},
			success: function(json) {
				$('.text-danger, .toast').remove();
				$('.form-control').removeClass('is-invalid');

				if (json['redirect']) {
					location = json['redirect'];
				}

				if (json['success']) {
					html  = '<div id="toast" class="toast">';
					html += '  <div class="toast-header">';
					html += '    <strong class="mr-auto"><i class="fas fa-shopping-cart"></i> Shopping Cart</strong>';
					html += '    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast">&times;</button>';
					html += '  </div>';
					html += '  <div class="toast-body">' + json['success'] + '</div>';
					html += '</div>';

					$('body').append(html);

					$('#toast').toast({'delay': 3000});

					$('#toast').toast('show');

					// Need to set timeout otherwise it wont update the total
					$('#cart').parent().load('index.php?route=common/cart/info');
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	},
	'update': function(key, quantity) {
		$.ajax({
			url: 'index.php?route=checkout/cart/edit',
			type: 'post',
			data: 'key=' + key + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').button('loading');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},
			success: function(json) {
				if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
					location = 'index.php?route=checkout/cart';
				} else {
					$('#cart').parent().load('index.php?route=common/cart/info');
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	},
	'remove': function(key) {
		$.ajax({
			url: 'index.php?route=checkout/cart/remove',
			type: 'post',
			data: 'key=' + key,
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').button('loading');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},
			success: function(json) {
				if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
					location = 'index.php?route=checkout/cart';
				} else {
					$('#cart').parent().load('index.php?route=common/cart/info');
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	}
};

var voucher = {
	'add': function() {

	},
	'remove': function(key) {
		$.ajax({
			url: 'index.php?route=checkout/cart/remove',
			type: 'post',
			data: 'key=' + key,
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').button('loading');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},
			success: function(json) {
				if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
					location = 'index.php?route=checkout/cart';
				} else {
					$('#cart').parent().load('index.php?route=common/cart/info');
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	}
};

var wishlist = {
	'add': function(product_id) {
		$.ajax({
			url: 'index.php?route=account/wishlist/add',
			type: 'post',
			data: 'product_id=' + product_id,
			dataType: 'json',
			success: function(json) {
				$('#toast').remove();

				if (json['redirect']) {
					location = json['redirect'];
				}

				if (json['success']) {
					html  = '<div id="toast" class="toast">';
					html += '  <div class="toast-header">';
					html += '    <strong class="mr-auto"><i class="fas fa-shopping-cart"></i> Shopping Cart</strong>';
					html += '    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast">&times;</button>';
					html += '  </div>';
					html += '  <div class="toast-body">' + json['success'] + '</div>';
					html += '</div>';

					$('body').append(html);

					$('#toast').toast({'delay': 3000});

					$('#toast').toast('show');
				}

				$('#wishlist-total span').html(json['total']);
				$('#wishlist-total').attr('title', json['total']);
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	},
	'remove': function() {

	}
};

var compare = {
	'add': function(product_id) {
		$.ajax({
			url: 'index.php?route=product/compare/add',
			type: 'post',
			data: 'product_id=' + product_id,
			dataType: 'json',
			success: function(json) {
				$('#toast').remove();

				if (json['success']) {
					html  = '<div id="toast" class="toast">';
					html += '  <div class="toast-header">';
					html += '    <strong class="mr-auto"><i class="fas fa-shopping-cart"></i> Shopping Cart</strong>';
					html += '    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast">&times;</button>';
					html += '  </div>';
					html += '  <div class="toast-body">' + json['success'] + '</div>';
					html += '</div>';

					$('body').append(html);

					$('#toast').toast({'delay': 3000});

					$('#toast').toast('show');

					$('#compare-total').html(json['total']);
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	},
	'remove': function() {

	}
};

/* Agree to Terms */
$(document).delegate('.agree', 'click', function(e) {
	e.preventDefault();

	$('#modal-agree').remove();

	var element = this;

	$.ajax({
		url: $(element).attr('href'),
		type: 'get',
		dataType: 'html',
		success: function(data) {
			html = '<div id="modal-agree" class="modal fade">';
			html += '  <div class="modal-dialog">';
			html += '    <div class="modal-content">';
			html += '      <div class="modal-header">';
			html += '        <h4 class="modal-title">' + $(element).text() + '</h4>';
			html += '        <button type="button" class="close" data-dismiss="modal">&times;</button>';
			html += '      </div>';
			html += '      <div class="modal-body">' + data + '</div>';
			html += '    </div>';
			html += '  </div>';
			html += '</div>';

			$('body').append(html);

			$('#modal-agree').modal('show');
		}
	});
});

// Chain ajax calls.
class Chain {
	constructor() {
		this.start = false;
		this.data = [];
	}

	attach(call) {
		this.data.push(call);

		if (!this.start) {
			this.execute();
		}
	}

	execute() {
		if (this.data.length) {
			this.start = true;

			(this.data.shift())().done(function() {
				chain.execute();
			});
		} else {
			this.start = false;
		}
	}
}

var chain = new Chain();

// Autocomplete
(function($) {
	$.fn.autocomplete = function(option) {
		return this.each(function() {
			var $this = $(this);
			var $dropdown = $('<div class="dropdown-menu"/>');

			this.timer = null;
			this.items = [];

			$.extend(this, option);

			if (!$(this).parent().hasClass('input-group')) {
				$(this).wrap('<div class="dropdown">');
			} else {
				$(this).parent().wrap('<div class="dropdown">');
			}

			$this.attr('autocomplete', 'off');
			$this.active = false;

			// Focus
			$this.on('focus', function() {
				this.request();
			});

			// Blur
			$this.on('blur', function(e) {
				if (!$this.active) {
					this.hide();
				}
			});

			$this.parent().on('mouseover', function(e) {
				$this.active = true;
			});

			$this.parent().on('mouseout', function(e) {
				$this.active = false;
			});

			// Keydown
			$this.on('keydown', function(event) {
				switch (event.keyCode) {
					case 27: // escape
						this.hide();
						break;
					default:
						this.request();
						break;
				}
			});

			// Click
			this.click = function(event) {
				event.preventDefault();

				var value = $(event.target).attr('href');

				if (value && this.items[value]) {
					this.select(this.items[value]);

					this.hide();
				}
			}

			// Show
			this.show = function() {
				$dropdown.addClass('show');
			}

			// Hide
			this.hide = function() {
				$dropdown.removeClass('show');
			}

			// Request
			this.request = function() {
				clearTimeout(this.timer);

				this.timer = setTimeout(function(object) {
					object.source($(object).val(), $.proxy(object.response, object));
				}, 50, this);
			}

			// Response
			this.response = function(json) {
				var html = '';
				var category = {};
				var name;
				var i = 0, j = 0;

				if (json.length) {
					for (i = 0; i < json.length; i++) {
						// update element items
						this.items[json[i]['value']] = json[i];

						if (!json[i]['category']) {
							// ungrouped items
							html += '<a href="' + json[i]['value'] + '" class="dropdown-item">' + json[i]['label'] + '</a>';
						} else {
							// grouped items
							name = json[i]['category'];

							if (!category[name]) {
								category[name] = [];
							}

							category[name].push(json[i]);
						}
					}

					for (name in category) {
						html += '<h6 class="dropdown-header">' + name + '</h6>';

						for (j = 0; j < category[name].length; j++) {
							html += '<a href="' + category[name][j]['value'] + '" class="dropdown-item">&nbsp;&nbsp;&nbsp;' + category[name][j]['label'] + '</a>';
						}
					}
				}

				if (html) {
					this.show();
				} else {
					this.hide();
				}

				$dropdown.html(html);
			}

			$dropdown.on('click', '> a', $.proxy(this.click, this));

			$this.after($dropdown);
		});
	}
})(window.jQuery);

+function($) {
	'use strict';

	// BUTTON PUBLIC CLASS DEFINITION
	// ==============================

	var Button = function(element, options) {
		this.$element = $(element)
		this.options = $.extend({}, Button.DEFAULTS, options)
		this.isLoading = false
	}

	Button.VERSION = '3.3.5'

	Button.DEFAULTS = {
		loadingText: 'loading...'
	}

	Button.prototype.setState = function(state) {
		var d = 'disabled'
		var $el = this.$element
		var val = $el.is('input') ? 'val' : 'html'
		var data = $el.data()

		state += 'Text'

		if (data.resetText == null) $el.data('resetText', $el[val]())

		// push to event loop to allow forms to submit
		setTimeout($.proxy(function() {
			$el[val](data[state] == null ? this.options[state] : data[state])

			if (state == 'loadingText') {
				this.isLoading = true
				$el.addClass(d).attr(d, d)
			} else if (this.isLoading) {
				this.isLoading = false
				$el.removeClass(d).removeAttr(d)
			}
		}, this), 0)
	}

	Button.prototype.toggle = function() {
		var changed = true
		var $parent = this.$element.closest('[data-toggle="buttons"]')

		if ($parent.length) {
			var $input = this.$element.find('input')
			if ($input.prop('type') == 'radio') {
				if ($input.prop('checked')) changed = false
				$parent.find('.active').removeClass('active')
				this.$element.addClass('active')
			} else if ($input.prop('type') == 'checkbox') {
				if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
				this.$element.toggleClass('active')
			}
			$input.prop('checked', this.$element.hasClass('active'))
			if (changed) $input.trigger('change')
		} else {
			this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
			this.$element.toggleClass('active')
		}
	}


	// BUTTON PLUGIN DEFINITION
	// ========================

	function Plugin(option) {
		return this.each(function() {
			var $this = $(this)
			var data = $this.data('bs.button')
			var options = typeof option == 'object' && option

			if (!data) $this.data('bs.button', (data = new Button(this, options)))

			if (option == 'toggle') data.toggle()
			else if (option) data.setState(option)
		})
	}

	var old = $.fn.button

	$.fn.button = Plugin
	$.fn.button.Constructor = Button


	// BUTTON NO CONFLICT
	// ==================

	$.fn.button.noConflict = function() {
		$.fn.button = old
		return this
	}


	// BUTTON DATA-API
	// ===============

	$(document).on('click.bs.button.data-api', '[data-toggle^="button"]', function(e) {
		var $btn = $(e.target);

		if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn');

		Plugin.call($btn, 'toggle');

		if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]'))) e.preventDefault();
	}).on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function(e) {
		$(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type));
	});
}(jQuery);