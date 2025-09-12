## Продакшен-развёртывание (Debian/Ubuntu + Nginx + systemd)

Проект работает в режиме SSR Next.js с `output: "standalone"`. Nginx принимает HTTPS и проксирует на Node.js‑процесс, которым управляет systemd. Деплой занимает две команды: `npm run build`, затем рестарт сервиса systemd.

### Предпосылки
- Домен с A‑записью на сервер
- Nginx + действующие сертификаты Let’s Encrypt
- Node.js 20+ доступен для сервиса (системный `/usr/bin/node` или абсолютный путь из nvm)

### Конфигурация приложения
- В `next.config.ts` задано `output: "standalone"`, поэтому сервер можно запускать напрямую из `.next/standalone`.
- Скрипты `package.json`:
  - `build`: `next build`
  - `start`: `next start` (удобно для локального запуска; в проде запуск через systemd использует `standalone`)

### Nginx (пример)
Файл: `/etc/nginx/sites-available/default` (замени домен/пути при необходимости)

```nginx
server {
    listen 443 ssl;
    server_name poisk-metrov.ru www.poisk-metrov.ru;

    ssl_certificate /etc/letsencrypt/live/poisk-metrov.ru/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/poisk-metrov.ru/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Статика Next.js
    location /_next/static/ {
        alias /var/www/poisk.metrov.site/.next/static/;
        access_log off;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Файлы из public
    location /images/ {
        alias /var/www/poisk.metrov.site/public/images/;
        access_log off;
        expires 1y;
        add_header Cache-Control "public";
    }

    location ~* \.(txt|xml|json|ico)$ {
        root /var/www/poisk.metrov.site/public;
        access_log off;
        expires 1y;
        add_header Cache-Control "public";
        try_files $uri =404;
    }

    # Прокси на Next.js‑сервер
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 120s;
        proxy_send_timeout 120s;
    }
}

server {
    listen 80;
    server_name poisk-metrov.ru www.poisk-metrov.ru;
    return 301 https://$host$request_uri;
}
```

Проверка и перезагрузка Nginx:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

### Сервис systemd
Файл: `/etc/systemd/system/poisk-next.service`

```ini
[Unit]
Description=Next.js app poisk.metrov.site
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/var/www/poisk.metrov.site
Environment=NODE_ENV=production
Environment=PORT=3000
RuntimeDirectory=poisk-next
ExecStart=/bin/sh -lc 'echo $$ > /run/poisk-next/app.pid; exec /root/.nvm/versions/node/v21.0.0/bin/node .next/standalone/server.js'
Restart=always
RestartSec=5
LimitNOFILE=100000

[Install]
WantedBy=multi-user.target
```

Примечания:
- Если хочешь запускать не от root (например, `www-data`), установи системный Node в `/usr/bin/node` и укажи его в `ExecStart`. Также поменяй `User=`.
- PID текущего процесса пишется в `/run/poisk-next/app.pid` для удобства. Systemd и так знает основной PID.

Включение и запуск сервиса:

```bash
sudo systemctl daemon-reload
sudo systemctl enable poisk-next
sudo systemctl restart poisk-next
sudo systemctl status poisk-next -n 50
```

Просмотр логов:

```bash
journalctl -u poisk-next -f
```

### Процесс деплоя (2 команды)
Каждый раз при выкладке:

```bash
cd /var/www/poisk.metrov.site
npm run build
sudo systemctl restart poisk-next
```

Сайт продолжит работать после выхода из SSH и автоматически стартует после перезагрузки сервера.


