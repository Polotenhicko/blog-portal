Blog Portal - это портал с блогами, разработанный для предоставления пользователям возможности создавать и делиться своими постами. Каждый пост включает в себя заголовок, текст, автора, время создания поста, рейтинг, и опционально изображение. Пользователи имеют возможность оценивать посты других пользователей и оставлять комментарии, что способствует активному взаимодействию в сообществе. Кроме того, каждый пост имеет счетчик просмотров, отображающий количество уникальных просмотров

## Технологии

Проект был реализован с использованием следующих технологий и инструментов:

- React
- React Router
- MobX
- Node.js Express
- TypeScript
- Firebase Firestore

## Что я узнал

При разработке проекта Blog Portal были приобретены следующие знания и навыки:

- Создание полноценного веб-приложения с использованием React
- Работа с классовыми и функциональными компонентами React
- Использование хуков и методов жизненного цикла компонентов
- Работа с маршрутизацией в React с помощью React Router
- Работа с реактивным состоянием компонентов с помощью MobX
- Разработка серверной части с использованием Node.js Express
- Создание маршрутов на сервере и обработка запросов
- Взаимодействие с базой данных Firestore в Firebase
- Использование TypeScript для типизации кода
- Настройка CORS для обеспечения безопасности при работе с сервером
- Углубленные знания по работе с сетевыми запросами
- Создание адаптивного и кроссбраузерного веб-приложения

## Время разработки

Разработка велась с 03.23 по 06.23, в сумме было потрачено примерно 105 часов.

## Установка и запуск

1. Склонируйте репозиторий на локальную машину.
2. Убедитесь, что у вас установлен Node.js и npm.
3. Перейдите в корневую папку проекта и выполните команду `npm install`, чтобы установить зависимости.
4. Зайдите в папку `functions` и выполните команду `yarn install`, чтобы установить зависимости.
5. Перенесите полученный в Firebase файл `firebase-keys.ts` в папку `functions/src/config`, для подключения к Firebase Firestore.
6. Запустите серверную часть, выполните команду `yarn start` в папке `functions`.
7. Запустите клиентскую часть, выполните команду `npm start` в корневой папке клиента.
8. Откройте приложение в браузере по адресу `http://localhost:3000`.

## Готовый деплой

https://maximumjavascript.github.io/firebase-study/

## Прочее

Файл README.MD написан 09.07.2023
