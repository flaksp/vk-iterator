'use strict';

const elixir = require('laravel-elixir');

elixir(mix => {
	mix.sass('./resources/assets/sass/app.scss', './public/css/app.css')
	//.webpack('app.js')
	//.copy('./node_modules/font-awesome/fonts', './public/fonts/font-awesome')
		.scripts([
		'./node_modules/jquery/dist/jquery.min.js',
		//'./node_modules/bootstrap/js/dist/util.js',
		//'./node_modules/bootstrap/js/dist/collapse.js',
		//'./node_modules/bootstrap/js/dist/modal.js',
		'./node_modules/toastr/build/toastr.min.js',
		'./resources/assets/js/main.js'
	], './public/js/app.js');
});
