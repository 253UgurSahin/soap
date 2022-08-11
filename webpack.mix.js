let mix = require('laravel-mix');
let tailwindcss = require('tailwindcss');

mix.js('src/js/app.js', 'public/js');

mix.postCss('src/css/app.css', 'public/css', [
    tailwindcss('./tailwind.config.js'),
]);