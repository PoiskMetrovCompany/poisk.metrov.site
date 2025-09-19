он #!/bin/bash

# Скрипт для создания symlink папки public в standalone сборку Next.js
# Используется после npm run build

echo "Создание symlink для папки public в standalone сборку..."

# Проверяем, что standalone сборка существует
if [ ! -d ".next/standalone" ]; then
    echo "Ошибка: Папка .next/standalone не найдена. Сначала выполните npm run build"
    exit 1
fi

# Удаляем существующий symlink или папку, если есть
if [ -e ".next/standalone/public" ]; then
    rm -rf .next/standalone/public
fi

# Создаем symlink на папку public
ln -sf "$(pwd)/public" .next/standalone/public

echo "Symlink для папки public успешно создан в .next/standalone/"
echo "Теперь можно перезапустить сервис: systemctl restart poisk-next"
