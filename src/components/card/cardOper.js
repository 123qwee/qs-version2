define(function (require, exports, module) {

	var Velocity = require('../../../node_modules/velocity-animate/velocity.min.js')

	function card_fullscreen(params) {
		var easing_swiftOut = [0.35, 0, 0.25, 1];
		var $body = $('body'),
			$window = $(window);

		$(params.fullElement).on('click', function () {
			var $thisCard = $(this).closest('.md-card');
			if (!$thisCard.hasClass('md-card-fullscreen')) {
				// get card atributes
				var mdCard_h = $thisCard.height(),
					mdCardToolbarFixed = $(this).hasClass('toolbar_fixed'),
					mdCard_w = $thisCard.width(),
					body_scroll_top = $body.scrollTop(),
					mdCard_offset = $thisCard.offset();

				// create placeholder for card
				$thisCard.after('<div class="md-card-placeholder" style="width:' + mdCard_w + 'px;height:' + mdCard_h + 'px;"/>');
				// add overflow hidden to #page_content (fix for ios)
				//$body.addClass('md-card-fullscreen-active');
				// add width/height to card (preserve original size)
				$thisCard
					.addClass('md-card-fullscreen')
					.css({
						'width': mdCard_w,
						'height': mdCard_h,
						'left': mdCard_offset.left,
						'top': mdCard_offset.top - body_scroll_top
					});

				Velocity($thisCard[0], {
					left: 0,
					top: 0
				}, {
					duration: 400,
					easing: easing_swiftOut,
					begin: function (elements) {
						// add back button
						var $toolbar = $thisCard.find('.md-card-toolbar');
						if ($toolbar.length) {
							$toolbar.prepend('<span class="md-icon md-card-fullscreen-deactivate material-icons uk-float-left">&#xE5C4;</span>');
						} else {
							$thisCard.append('<span class="md-icon md-card-fullscreen-deactivate material-icons uk-position-top-right" style="margin:10px 10px 0 0">&#xE5CD;</span>')
						}


						/** 绑定回退事件 */
						$toolbar.find(".md-card-fullscreen-deactivate").click(deactivateFunc);

						// altair_page_content.hide_content_sidebar();
					}
				});

				Velocity($thisCard[0], {
					height: '100%',
					width: '100%'
				}, {
					duration: 400,
					easing: easing_swiftOut,
					complete: function (elements) {
						/** 调整统计图高度 */
						// $(elements).find(".md-card-content").height($(window).height() - 48);

						this.callback && this.callback.call();

						if (mdCardToolbarFixed) {
							$thisCard.addClass('mdToolbar_fixed')
						}
					}.bind(params)
				});
				// animate card to top/left position

			}
		});

		var deactivateFunc = function () {
			var easing_swiftOut = [0.35, 0, 0.25, 1];
			var $body = $('body'),
				$window = $(window);

			// get card placeholder width/height and offset
			var $thisPlaceholderCard = $('.md-card-placeholder'),
				mdPlaceholderCard_h = $thisPlaceholderCard.height(),
				mdPlaceholderCard_w = $thisPlaceholderCard.width(),
				body_scroll_top = $body.scrollTop(),
				mdPlaceholderCard_offset_top = $thisPlaceholderCard.offset().top - body_scroll_top,
				mdPlaceholderCard_offset_left = $thisPlaceholderCard.offset().left,
				$thisCard = $('.md-card-fullscreen'),
				mdCardToolbarFixed = $thisCard.hasClass('mdToolbar_fixed');

			Velocity($thisCard, {
				height: mdPlaceholderCard_h,
				width: mdPlaceholderCard_w
			}, {
				duration: 400,
				easing: easing_swiftOut,
				begin: function (elements) {
					// hide fullscreen content
					if (mdCardToolbarFixed) {
						$thisCard.removeClass('mdToolbar_fixed')
					}
				},
				complete: function (elements) {
					// activate onResize callback for js plugins

					$window.resize();
					// remove back button
					$thisCard.find('.md-card-fullscreen-deactivate').remove();
					// altair_page_content.show_content_sidebar();
				}
			});

			Velocity($thisCard, {
				left: mdPlaceholderCard_offset_left,
				top: mdPlaceholderCard_offset_top
			}, {
				duration: 400,
				easing: easing_swiftOut,
				complete: function (elements) {
					/** 调整统计图高度 */
					// $(elements).find(".md-card-content").height($(elements).height() - 48);

					this.callback && this.callback.call();

					// remove some styles added by velocity.js
					$thisCard.removeClass('md-card-fullscreen').css({
						width: '',
						height: '',
						left: '',
						top: ''
					});
					// remove card placeholder
					$thisPlaceholderCard.remove();
					// remove overflow:hidden from #page_content (ios fix)
					$body.removeClass('md-card-fullscreen-active');
				}.bind(params)
			});
		}

		/** 绑定事件前先注销事件 */
		// $("#container").off('click', '.md-card-fullscreen-deactivate', deactivateFunc);

		// /** 绑定回退事件 */
		// $("#container").on('click', '.md-card-fullscreen-deactivate', deactivateFunc);

	}

	return {
		card_fullscreen: card_fullscreen
	}

});