Messenger
==============================

A messenger for Yandex Practicum using [handlerbars](https://handlebarsjs.com/) and typescript

Figma - https://www.figma.com/file/7n0qOO1icKrAqh1sL0qjKy/Chat-Dashboard?node-id=102%3A426

👉 [Pull request](https://github.com/hosyaeuw/middle.messenger.praktikum.yandex/pull/4)
---
Setup
-----
Clone the repo:

    git clone https://github.com/hosyaeuw/middle.messenger.praktikum.yandex.git -b sprint_4

Move to the project path:

    cd middle.messenger.praktikum.yandex

Install dependencies:

    npm install

Run the project:

    npm run start

Project will be available at http://localhost:3000

Release:
-----
    heroku login
    heroku container:login
    heroku create chat-hosyaeuw
    heroku container:push web
    heroku container:release web
    heroku open

Demo:
-----
https://chat-hosyaeuw.herokuapp.com/