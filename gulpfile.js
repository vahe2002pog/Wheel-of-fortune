var gulp = require('gulp');
var replace = require('gulp-string-replace');

gulp.task('default', function() {
    return gulp.src('./build/index.html')
        .pipe(replace('lang="ru"', 'lang="en"'))
        .pipe(replace('Колесо фортуны «Колесо удачи или рандома»', 'Wheel of Fortune'))
        .pipe(replace('Колесо удачи или фортуны онлайн. Простой способ не делать выбор самому и надеется на случай. Выбор из нескольких вариантов или выбор с помощью исключения вариантов', 'Wheel of fortune online. An easy way to not make the choice yourself and hope for a chance. Select from multiple options or select by dropping options'))
        .pipe(replace('Колесо Фортуны онлайн', 'Wheel of Fortune online'))
        .pipe(replace('На выбывание', 'For knockout'))
        .pipe(replace('Игроки', 'Players'))
        .pipe(replace('Вставить текст из буфера', 'Paste text from clipboard'))
        .pipe(replace('Скопировать ссылку', 'Copy link'))
        .pipe(replace('.webmanifest', '.webmanifest_en'))
        .pipe(gulp.dest('./build/en/'));
});