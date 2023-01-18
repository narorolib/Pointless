let path = location.pathname.substring(1);
if (path) {
	$('.nav-link[href$="' + path + '"]').addClass('active');
}
$(".code-selector").hide();
$(".code-selector[data-id=curl]").fadeIn('fast');
$(".code-lang a").click(function(e){
    e.preventDefault();
    let $id = $(this).attr("href");
    $(".code-lang a").removeClass("active");
    $("a[href='"+$id+"']").addClass("active");
    $(".code-selector").hide();
    let c = $id.replace("#","");
    $(".code-selector[data-id='"+c+"']").fadeIn();
});

'use strict';

var Coupon = (function(){
	
	var $coupon = $("#coupon");
	var $button = $('[data-trigger=applycoupon]');
	var $discount = $("#discount");
	var $total = $("#total");

	function validate($coupon){
		$coupon.next('.form-text').remove();
		$.ajax({
            type: "GET",
            url: $coupon.data('url'),
            data: "code="+$coupon.val()+"&country="+$("#country").val(),        
            success: function (response) { 
              if(response.error){
                $coupon.addClass("is-invalid");    
				$coupon.after('<p class="form-text text-sm text-danger">'+response.message+'</p>');
              }else{				
                $coupon.removeClass("is-invalid");
                $coupon.after("<p class='form-text text-sm text-success'>"+response.message+"</p>");
				$discount.text(response.discount).parents('.collapse').addClass('show');
				$total.text(response.newprice);
				if(response.tax){
					$("#taxamount").text(response.tax);
				}
              }
            }
        }); 		
	}

	if($coupon.length > 0){		
		$button.click(function(e){
			e.preventDefault();
			validate($coupon);
		})
	}

})();

//
// Sticky
//

'use strict';

var SvgInjector = (function() {

	//
	// Variables
	//

	var $svg = document.querySelectorAll('img.svg-inject');
	var status = false;


	//
	// Methods
	//

	function init($this) {

		var options = {

		};

		SVGInjector($this, options, function(result) {
			status = true
		});
	}


	//
	// Events
	//

	if ($svg.length) {
		init($svg);
	}


	//
	// Return
	//

	return {
		status: status
	};
})();

//
// Tooltip
//

'use strict';

var Tooltip = (function() {

	// Variables

	var $tooltip = $('[data-toggle="tooltip"]');


	// Methods

	function init() {
		$tooltip.tooltip();
	}


	// Events

	if ($tooltip.length) {
		init();
	}

})();
//
// Dropdown
//

'use strict';

var Dropdown = (function() {

	// Variables

	var $dropdown = $('.dropdown-animate'),
		$dropdownSubmenu = $('.dropdown-submenu [data-toggle="dropdown"]');


	// Methods

	function hideDropdown($this) {

		// Add additional .hide class for animated dropdown menus in order to apply some css behind

		var $dropdownMenu = $this.find('.dropdown-menu');

        $dropdownMenu.addClass('hide');

        setTimeout(function(){
            $dropdownMenu.removeClass('hide');
        }, 300);

	}

	function initSubmenu($this) {
        if (!$this.next().hasClass('show')) {
            $this.parents('.dropdown-menu').first().find('.show').removeClass("show");
        }

        var $submenu = $this.next(".dropdown-menu");

        $submenu.toggleClass('show');
        $submenu.parent().toggleClass('show');

        $this.parents('.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
            $('.dropdown-submenu .show').removeClass("show");
        });
	}

	// Events

	if ($dropdown.length) {
    	$dropdown.on({
    		'hide.bs.dropdown': function(e) {
    			hideDropdown($(this));
    		}
    	})
	}

	if ($dropdownSubmenu.length) {
		$dropdownSubmenu.on('click', function(e) {

			initSubmenu($(this))

			return false;
		});
	}


	// Prevent dropdown-menu on closing

	// Stop closing dropdown-menu when clicked inside
    $('.dropdown-menu').on('click', function (event) {
        var events = $._data(document, 'events') || {};

        events = events.click || [];

        for(var i = 0; i < events.length; i++) {
            if(events[i].selector) {

                //Check if the clicked element matches the event selector
                if($(event.target).is(events[i].selector)) {
                    events[i].handler.call(event.target, event);
                }

                // Check if any of the clicked element parents matches the
                // delegated event selector (Emulating propagation)
                $(event.target).parents(events[i].selector).each(function(){
                    events[i].handler.call(this, event);
                });
            }
        }

        event.stopPropagation();
    });
})();


//
// Toggle password visibility
//

'use strict';

var PasswordText = (function() {

	//
	// Variables
	//

	var $trigger = $('[data-toggle="password-text"]');


	//
	// Methods
	//

	function init($this) {
		var $password = $($this.data('target'));

		$password.attr('type') == 'password' ? $password.attr('type', 'text') : $password.attr('type', 'password');

		return false;
	}


	//
	// Events
	//

	if ($trigger.length) {
		// Init scroll on click
		$trigger.on('click', function(event) {
			init($(this));
		});
	}

})();

//
// Pricing
//

'use strict';


var Pricing = (function() {

	// Variables

	var $pricingContainer = $('.pricing-container'),
		$btn = $('.pricing-container button[data-pricing]');


	// Methods

	function init($this) {
        var a = $this.data('pricing'),
            b = $this.parents('.pricing-container'),
            c = $('.'+b.attr('class')+' [data-pricing-'+a+']');

        if(!$this.hasClass('btn-primary')) {
            $('.'+b.attr('class')+' button[data-pricing]').removeClass('btn-primary').addClass('btn-light');
            $this.removeClass('btn-light').addClass('btn-primary');
            c.each(function() {
                var new_price = $(this).data('pricing-'+a);
                var old_price = $(this).find('span.price').text();
                $(this).find('span.price').text(new_price);
                $(this).data('pricing-value', old_price);
            });
			$('a.checkout').each(function(){
				let link = $(this).attr('href').split('/');
				if(link != "#"){
					link.pop();
					$(this).attr('href', link.join('/')+'/'+a);
				}
			})
        }
	}


	// Events

	if ($pricingContainer.length) {
		$btn.on({
    		'click': function() {
    			init($(this));
    		}
    	})
	}

})();

//
// Scroll to (anchor links)
//

'use strict';

var ScrollTo = (function() {

	//
	// Variables
	//

	var $scrollTo = $('.scroll-me, [data-scroll-to], .toc-entry a'),
		urlHash = window.location.hash;


	//
	// Methods
	//

	function init(hash) {
		$('html, body').animate({
	        scrollTop: $(hash).offset().top
	    }, 'slow');
	}

	function scrollTo($this) {
		var $el = $this.attr('href');
        var offset = $this.data('scroll-to-offset') ? $this.data('scroll-to-offset') : 0;
		var options = {
			scrollTop: $($el).offset().top - offset
		};

        // Animate scroll to the selected section
        $('html, body').stop(true, true).animate(options, 300);
		window.location.hash = $el;
        event.preventDefault();
	}


	//
	// Events
	//

	if ($scrollTo.length) {
		// Init scroll on click
		$scrollTo.on('click', function(event) {
			scrollTo($(this));
		});
	}

	$(window).on("load", function () {
		// Init scroll on page load if a hash is present
		if(urlHash && urlHash != '#!' && $(urlHash).length) {
			init(urlHash)
		}
	});
})();

//
// Select2
//

'use strict';

var Select = (function() {

	var $select = $('[data-toggle="select"]');

	function init($this) {
		var options = {};

		$this.select2(options);
	}

	if ($select.length) {
		$select.each(function() {
			init($(this));
		});
	}

})();

if($('#cookieconsent-script').length > 0){
	var cc = initCookieConsent();
	cc.run({
		current_lang : 'app',
		autoclear_cookies : true,
		cookie_name: 'cc_cookie',
		cookie_expiration : 365,
		page_scripts: true,
		autorun: true,
		languages: {
			'app': {
				consent_modal: {
					title: lang.cookie.title,
					description: lang.cookie.description + lang.cookie.button,
					primary_btn: {
						text: lang.cookie.accept_all,
						role: 'accept_all'
					},
					secondary_btn: {
						text: lang.cookie.accept_necessary,
						role: 'accept_necessary'
					}
				},
				settings_modal: {
					title: lang.cookie.title,
					save_settings_btn: lang.cookie.save,
					accept_all_btn: lang.cookie.accept_all,
					reject_all_btn: lang.cookie.accept_necessary,
					close_btn_label: lang.cookie.close,
					blocks: [
						{
							description: lang.cookie.description,
						}, {
							title: lang.cookie.necessary.title,
							description: lang.cookie.necessary.description,
							toggle: {
								value: 'necessary',
								enabled: true,
								readonly: true
							}
						}, {
							title: lang.cookie.analytics.title,
							description: lang.cookie.analytics.description,
							toggle: {
								value: 'analytics',
								enabled: false,
								readonly: false
							},
						}, {
							title: lang.cookie.ads.title,
							description: lang.cookie.ads.description,
							toggle: {
								value: 'ads',
								enabled: false,
								readonly: false
							}
						},{
							title: lang.cookie.extra.title,
							description: lang.cookie.extra.description,
							toggle: {
								value: 'extra',
								enabled: false,
								readonly: false
							}
						}, {
							title: lang.cookie.privacy.title,
							description: lang.cookie.privacy.description,
						}
					]
				}
			}
		}

	});
}

$(document).ready(()=>{
	let typingTimer;               

	$(document).on('keyup', '[data-trigger=faqsearchbox]', () => {
		clearTimeout(typingTimer);
		typingTimer = setTimeout(livesearch, 500);
	});
});

function livesearch() {

    let query = $("[data-trigger=faqsearchbox]").val();

    $('.accordion').each(function(){
        if($(this).text().toLowerCase().includes(query.toLowerCase())) {
            $(this).removeClass('d-none');
        }else{
            $(this).addClass('d-none');
        }
    });
}
  