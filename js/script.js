(function($) {
	
	$(function() {

		var $ao = $('#cf-asset-optimizer-settings');

		var AO = {
			$ao : $ao,
			$js_compile_all : $('#js-compile-all'),
			$js_compile : $('.js-compile', $ao),
			$js_min_all : $('#js-min-all'),
			$js_min : $('.js-min', $ao),
			$css_compile_all : $('#css-compile-all'),
			$css_compile : $('.css-compile', $ao),
			$js_default_min : $('#minset-whitespace'),

			init: function() {
				this.initialConfig();
				this.userPreference();
				this.masterCheck();
				this.obliterateHandler();
				this.tableSorter();
				this.toggleMinify();
				this.toggleCompile();
			},

			// Checks for settings and establishes settings on page load
			initialConfig: function() {
				var $custom = $('#custom');
				var $save = $('.save-container', $ao);
				var $advanced = $('.advanced', $ao);

				if ( $custom.is(':checked') ) {
					$save.addClass('fix');
					$advanced.show();
				}
			},

			// Toggles advanced preferences
			userPreference: function() {
				var $advanced = $('.advanced', $ao);
				var $settings = $('.settings', $ao);
				var $custom = $('#custom');
				var $on = $('#on');
				var $off = $('#off');
				var $save = $('.save-container', $ao);

				$settings.on('click', function() {
					if ( $custom.is(':checked') ) {
						$advanced.show();
						$save.addClass('fix');
					}
					else if ( $on.is(':checked') ) {
						// AO.massCheck([ AO.$js_compile_all, AO.$js_compile, AO.$js_min_all, AO.$js_min, AO.$css_compile_all, AO.$css_compile, AO.$js_default_min ] , 'on');
						$advanced.hide();
						$save.removeClass('fix');
					}
					else if ( $off.is(':checked') ) {
						// AO.massCheck([ AO.$js_compile_all, AO.$js_compile, AO.$js_min_all, AO.$js_min, AO.$css_compile_all, AO.$css_compile, AO.$js_default_min ] , 'off');
						$advanced.hide();
						$save.removeClass('fix');
					}
				});
			},

			// Checks or unchecks boxes depending on on_or_off, utility to other methods
			massCheck: function (checkboxes, on_or_off) {
				var state = (on_or_off === 'on') ? true : false;

				for (var j = 0; j < checkboxes.length; j++) {
					if ( !(checkboxes[j].prop('disabled'))) {
						checkboxes[j].attr('checked', state);
					}
				}
			},

			// Allows master boxes to check/uncheck children
			masterCheck: function() {

				AO.$js_compile_all.on('click', function() {
					$(AO.$js_compile)
						.attr('checked', $(this).prop('checked'))
						.closest('tr')
							.toggleClass('compiled', $(this).prop('checked'))
							.toggleClass('not', !$(this).prop('checked'))
						.find('.js-min').prop('disabled', !$(this).prop('checked'));
				});

				AO.$js_min_all.on('click', function() {
					$(AO.$js_min).not(':disabled').attr('checked', $(this).prop('checked'));
				});

				AO.$css_compile_all.on('click', function() {
					$(AO.$css_compile)
						.attr('checked', $(this).prop('checked'))
						.closest('tr')
							.toggleClass('compiled', $(this).prop('checked'))
							.toggleClass('not', !$(this).prop('checked'));
				});

			},

			// Show/hide minification if a JS file is enabled, default to checked
			toggleMinify: function() {
				AO.$js_compile.on('click', function() {
					var com_id = $(this).attr('id');
					var min_id = '#' + com_id.replace('com','min');

					if ($(this).attr('checked')) {
						window.console && console.log('checked');

						$(min_id).attr({
							'checked': true,
							'disabled': false
						});
					}
					else {
						$(min_id).attr({
							'checked': false,
							'disabled': true
						});
					}
				});
			},

			toggleCompile: function() {
				AO.$js_compile.add(AO.$css_compile).on('click', function() {
					$(this).closest('tr')
						.toggleClass('compiled', $(this).prop('checked'))
						.toggleClass('not', !$(this).prop('checked'))
					.find('.js-min').prop('disabled', !$(this).prop('checked'));
				});
			},

			// Pop up confirm box on "Obliterate" submission
			obliterateHandler: function() {
				$('#js-obliterate').on('click', function() {
					return window.confirm("ALERT, OBLITERATING YOUR JAVASCRIPT IS THE MOST EXTREME THING YOU COULD EVER DO! ARE YOU SURE?");
				});

				$('#css-obliterate').on('click', function() {
					return window.confirm("ALERT, OBLITERATING YOUR CSS IS THE MOST EXTREME THING YOU COULD EVER DO! ARE YOU SURE?");
				});
			},

			// Table sorting functionality
			tableSorter: function() {

				// Disable certain columns from sorting.
				try {
					$("#js-table").tablesorter( {
						headers: {
							2: {
								sorter: false
							},
							3: {
								sorter: false
							}
						}
					});
				}
				catch (e) {

				}

				try {
					$("#css-table").tablesorter( {
						headers: {
							2: {
								sorter: false
							}
						}
					});
				}
				catch (e) {

				}
			}
		};

		AO.init();
	});
	
})(jQuery);
