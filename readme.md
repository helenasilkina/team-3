Редактор кода
===============
Серверная часть написана на Node.js не без помощи Express.js, клиентская часть представляет из себя жуткую смесь Backbone.js, jQuery, стилей "а-ля" БЭМ и самого редактора Ace.js. Магию синхронизации создает Swarm.

Запуск приложения 
============
Сборка проекта осуществляется через сборщик Gulp. Проект должен стартовать на 80 порту. В идеале он должен даже работать.

Сделано после
============
Добавлены swarm модели и коллекции для синхронизации пользователей и мультикурсорности. 
Реализована поддержка тем для всего редактора. 
Переписана событийная модель

Планируется
============
1. Повысить производительность синхронизации мультикурсорности для нескольких пользователей
2. Сохранение документов в базе (Mongo)
3. Стартовая страница редактора
4. Редизайн редактора 
5. Unit-тестирование 
6. Захватить мир и основать империю


