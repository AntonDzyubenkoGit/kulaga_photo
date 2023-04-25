import replace from "gulp-replace"; // Плагин поиска и замены значений
import plumber from "gulp-plumber"; // Обработка ошибок
import notify from "gulp-notify" // Сообщения (подсказки)
import browserSync from "browser-sync"; // Локальный сервер
import newer from "gulp-newer"; // Проверка обновления картинок
import ifPlugin from "gulp-if"; //Условное ветвление gulpIf


// Экспортируем объект
export const plugins = {
   replace: replace,
   plumber: plumber,
   notify: notify,
   browsersync: browserSync,
   newer: newer,
   if: ifPlugin 
}