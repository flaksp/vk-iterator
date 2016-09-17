(function($, window) {
	'use strict';

	function stop_iterator() {
		if (typeof window.interval_loop !== 'undefined') {
			clearInterval(window.interval_loop);

			$('form').find('fieldset').removeAttr('disabled');
			$('#stop_iteration').attr('disabled', true);
		}
	}

	function getTIMESTAMP(timestamp) {
		var date = new Date(timestamp);
		var year = date.getFullYear();
		var month = ('0' + (date.getMonth() + 1)).substr(-2);
		var day = ('0' + date.getDate()).substr(-2);
		var hour = ('0' + date.getHours()).substr(-2);
		var minutes = ('0' + date.getMinutes()).substr(-2);
		var seconds = ('0' + date.getSeconds()).substr(-2);

		return day + '.' + month + '.' + year + ' ' + hour + ':' + minutes + ':' + seconds;
	}

	window.onload = function() {
		toastr.options.progressBar = true;

		VK.init(function() {
			// toastr.success('VK API успешно инициализирован.');
		}, function() {
			toastr.error('Ошибка при инициализации VK API. Обновите страницу.');
		}, '5.53');

		$('form').on('submit', function(event) {
			event.preventDefault();

			var $_this = $(this);
			var current_doc_id = parseInt($('#min_value').val());
			var STEP = parseInt($('#step').val());
			//var MAX_VALUE = $('#max_value').val().length > 0
			//	? parseInt($('#max_value').val())
			//	: Infinity;

			$_this.find('fieldset').attr('disabled', true);
			$_this.find('#stop_iteration').removeAttr('disabled');

			$('#progress').text(0);
			$('#progress_from, #progress_to').text(parseInt(current_doc_id));

			$('ol li').addClass('text-muted');

			window.interval_loop = setInterval(function() {
				var docs = [];
				/*
				if (current_doc_id / 25 >= MAX_VALUE) {
					stop_iterator();

					var audio = new Audio('/public/mp3/fail.mp3');
					audio.volume = 0.5;
					audio.play();

					return;
				}
				*/

				for (var n = 0; n < STEP; n++) {
					docs.push($('#user_id').val() + '_' + current_doc_id++);
				}

				VK.api('docs.getById', {
					'docs': docs.join(',')
				}, function(data) {
					if (typeof data['error'] !== 'undefined') {
						toastr.error('Ошибка #' + data['error']['error_code'] + ': ' + data['error']['error_msg'], null, {
							"closeButton": true,
							"timeOut": 1000 * 60 * 10
						});
						stop_iterator();
					} else {
						$('#progress').text(parseInt($('#progress').text()) + (STEP * 25));
						$('#progress_to').text(parseInt($('#progress_to').text()) + (STEP * 25));

						if (typeof data !== 'undefined' && typeof data['response'] !== 'undefined' && data['response'].length > 0) {
							data['response'].forEach(function(value_docs) {
								$('ol').append('<li>doc' + value_docs['owner_id'] + '_' + value_docs['id'] + ' &mdash; <a href="//vk.com/doc' + value_docs['owner_id'] + '_' + value_docs['id'] + '" target="_blank">' + value_docs['title'] + '</a> <span class="text-muted">(создан ' + getTIMESTAMP(value_docs['date'] * 1000) + ')</span></li>');

								var audio = new Audio('/public/mp3/success.mp3');
								audio.volume = 0.5;
								audio.play();
							});
						}
					}
				});
			}, parseInt($('#speed').val()));
		});

		$('#stop_iteration').on('click', function() {
			stop_iterator();
		});

		$('#get_id').on('click', function() {
			var screen_name;

			if (/^[a-zA-Z0-9\._]+$/.test($('#user_id').val())) {
				screen_name = $('#user_id').val();
			} else if (/^https?:\/\/vk\.com\/[a-zA-Z0-9\._]+$/.test($('#user_id').val())) {
				screen_name = $('#user_id').val().replace(/^https?:\/\/vk\.com\/([a-zA-Z0-9\._]+)$/, '$1');
			}

			VK.api('utils.resolveScreenName', {
				'screen_name': screen_name
			}, function(data) {
				if (typeof data['error'] !== 'undefined') {
					toastr.error('Ошибка #' + data['error']['error_code'] + ': ' + data['error']['error_msg'], null, {
						"closeButton": true,
						"timeOut": 1000 * 60 * 10
					});
				} else {
					if (data['response']['type'] !== 'user') {
						toastr.error('Проверять можно только документы пользователя. Введенный вами ID является типа ' + data['response']['type'] + '.');
					} else {
						$('#user_id').val(data['response']['object_id']);
					}
				}
			});
		});
	};
})(jQuery, window);

// Yandex.Metrika

(function(d, w, c) {
	(w[c] = w[c] || []).push(function() {
		try {
			w.yaCounter39637050 = new Ya.Metrika({id: 39637050, clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true});
		} catch (e) {}
	});

	var n = d.getElementsByTagName("script")[0],
		s = d.createElement("script"),
		f = function() {
			n.parentNode.insertBefore(s, n);
		};
	s.type = "text/javascript";
	s.async = true;
	s.src = "https://mc.yandex.ru/metrika/watch.js";

	if (w.opera == "[object Opera]") {
		d.addEventListener("DOMContentLoaded", f, false);
	} else {
		f();
	}
})(document, window, "yandex_metrika_callbacks");
