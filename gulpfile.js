var gulp = require('gulp');
var replace = require('gulp-string-replace');

gulp.task('default', function() {
    return gulp.src('./build/index.html')
        .pipe(replace('lang="ru"', 'lang="en"'))
        .pipe(replace('Колесо фортуны «Колесо удачи или рандома»', 'Wheel of Fortune Spinner online'))
        .pipe(replace('Колесо удачи или фортуны онлайн. Простой способ не делать выбор самому и надеется на случай. Выбор из нескольких вариантов или выбор с помощью исключения вариантов', 'Feel the heat of excitement with the online Wheel of Fortune Spinner. Take the easy route and let fate decide for you. Choose from multiple options or eliminate them one by one to reach your desired outcome.'))
        .pipe(replace('Колесо Фортуны онлайн', 'Wheel of Fortune Spinner online'))
        .pipe(replace('На выбывание', 'Elimination mode'))
        .pipe(replace('Игроки', 'Players'))
        .pipe(replace('Введите игрока', 'Enter player'))
        .pipe(replace('Вставить текст из буфера', 'Paste text from clipboard'))
        .pipe(replace('Скопировать ссылку', 'Copy link'))
        .pipe(replace('Справка', 'Help'))
        .pipe(replace('Настройки', 'Settings'))
        .pipe(replace('.webmanifest', '.webmanifest_en'))
        .pipe(replace('Да', 'Yes'))
        .pipe(replace('Нет', 'No'))
        .pipe(gulp.dest('./build/en/'));
});