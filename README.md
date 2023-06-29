# WEB messenger

Практическое задание на курсе "Мидл фронтенд разработчик"

[Дизайн](https://www.figma.com/file/6Ohg5xBagTV4J8MVpYknQr/yandex-chat?t=QU0ArEqMw2354gSL-6)
[Ссылка на проект](https://melodious-bubblegum-7b87db.netlify.app)

Проект работает на node v16.17.1

Перед запуском проекта создайте в корне `.env` файл со следующим содержимым
```dotenv
API_URL=<урл_для_доступа_к_апи>
RESOURCES_URL=<урл_для_доступа_к_ресурсам(картинки, файлы)>
API_WS_URL=<урл_для_доступа_к_вебсокету>
```



## Команды запуска
```shell
npm i # установка зависимости
npm run start # сборка проекта и запуск express
npm run dev # cборка проекта для разработки
npm run build # сборка билда
```

## Спринт №1:
* Настроена сборка с использованием Parcel
* Настроена локальная раздача статики Express-сервером
* Подключен шаблонизатор Handlebars
* Свёрстаны страницы:
  - Авторизация
  - Регистрация
  - Профиль
  - Чат
  - Страницы ошибок

## Спринт №2
* Внедрен Typescript
* Добавлен компонентный подход (реализован Block и EventBus)
* Добавлен сбор полей форм и валидация форм и полей

## Спринт №3
* Добавлен стор и роутинг
* Добавлен функционал авторизации и регистрации
* Добавлен профиль и его настройки:
  - изменение пароля
  - изменение Аватара
  - изменение данных

* Добавлены чаты:
  - функционал создания чата
  - выведены чаты
  - реализован реалтайм вывод отправку и получение сообщений
