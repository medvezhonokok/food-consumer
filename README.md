# cake-app

Деплой:

(Если не трогали `nginx.conf`)

- Удалить `./backend/target` и `./frontend/build` 
- Локально необходимо пересобрать архив с фронтом `npm run build` и бэк `mvn  clean package install`. Должны появиться две новые директории вместо старых `(build, target)` 
- Залить обновления на сервер. 
- Затем на сервере просто пишешь `cp -r ~/food-consumer/frontend/build/ /usr/share/nginx/html`
- Ну и докер наверное перезапустить

(Если трогали `nginx.conf`)

- Все те же шаги, а далее скопировать содержимое нового конфига в `~/etc/nginx/conf.d/react.conf`
- Рестартануть nginx на сервере: `sudo systemctl restart nginx.service`
