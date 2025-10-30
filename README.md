# Authentication Application - NestJS + Next.js

Полнофункциональное веб-приложение с системой аутентификации, построенное на современном стеке технологий.

## 🚀 Технологический стек

### Frontend
- **Next.js** 14 (App Router)
- **React** 18
- **TypeScript** 5.x
- **Tailwind CSS** 3.x - Utility-first CSS фреймворк
- **React Hook Form** - Управление формами
- **Axios** - HTTP клиент

### Backend
- **NestJS** 10.x - Progressive Node.js framework
- **TypeScript** 5.x
- **PostgreSQL** 15 - Реляционная база данных
- **TypeORM** 0.3.x - ORM для работы с БД
- **JWT** - Токены для аутентификации
- **bcrypt** - Хеширование паролей
- **class-validator** - Валидация данных
- **Passport** - Middleware для аутентификации

### DevOps
- **Docker** & **Docker Compose**
- **PostgreSQL** контейнер

## 📋 Функциональность

- ✅ Регистрация пользователей с валидацией
- ✅ Вход в систему (по email или login)
- ✅ JWT аутентификация
- ✅ Защищенные маршруты
- ✅ Просмотр и редактирование профиля
- ✅ Хеширование паролей с bcrypt
- ✅ Глобальная обработка ошибок
- ✅ Валидация на клиенте и сервере

## 🏗️ Структура проекта

```
root-authentication-app/
├── backend/              # NestJS API
│   ├── src/
│   │   ├── auth/        # Модуль аутентификации
│   │   ├── users/       # Модуль пользователей
│   │   ├── common/      # Общие утилиты
│   │   └── main.ts      # Точка входа
│   ├── Dockerfile
│   └── package.json
├── frontend/            # Next.js приложение
│   ├── src/
│   │   ├── app/        # Pages (App Router)
│   │   ├── components/ # React компоненты
│   │   ├── lib/        # API, utils
│   │   └── types/      # TypeScript типы
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

## 🚦 Быстрый старт

### Предварительные требования

- Node.js 20+
- Docker & Docker Compose
- Git

### 1. Клонирование репозитория

```bash
git clone https://github.com/paranoica/test-task-authentication-app.git
cd auth-app
```

### 2. Запуск через Docker Compose (рекомендуется)

```bash
# Запуск всех сервисов
docker-compose up -d # или docker-compose up --build

# Проверка логов
docker-compose logs -f

# Остановка сервисов
docker-compose down
```

Приложение будет доступно:
- **Frontend**: http://localhost:5000
- **Backend API**: http://localhost:5173/api
- **PostgreSQL**: localhost:5432

### 3. Запуск в режиме разработки

#### Backend

```bash
cd backend

# Установка зависимостей
npm install

# Создание .env файла
cp .env.example .env

# Редактирование .env (настройка БД и JWT_SECRET)
nano .env

# Запуск в dev режиме
npm run start:dev
```

Backend будет доступен на http://localhost:5173/api

#### Frontend

```bash
cd frontend

# Установка зависимостей
npm install

# Создание .env файла
cp .env.example .env.local

# Запуск в dev режиме
npm run dev
```

Frontend будет доступен на http://localhost:5000

## 🔐 Переменные окружения

### Backend (.env)

```env
NODE_ENV=development # development | production | etc.
PORT=5173

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=dev
DB_NAME=authentication-app

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# CORS
FRONTEND_URL=http://localhost:5000
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5173/api
```

## 🔌 API Endpoints

### Authentication

#### POST /api/auth/register
Регистрация нового пользователя

**Request Body:**
```json
{
  "login": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "login": "johndoe",
    "email": "john@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-20T10:00:00.000Z"
  }
}
```

#### POST /api/auth/login
Вход в систему

**Request Body:**
```json
{
  "loginOrEmail": "johndoe",
  "password": "SecurePass123!"
}
```

**Response:** (аналогичен регистрации)

### Users (Protected)

#### GET /api/users/profile
Получение профиля текущего пользователя

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```json
{
  "id": "uuid",
  "login": "johndoe",
  "email": "john@example.com",
  "name": "John Doe",
  "createdAt": "2024-01-20T10:00:00.000Z"
}
```

#### PATCH /api/users/profile
Обновление профиля

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request Body:**
```json
{
  "name": "John Updated"
}
```

## 🛡️ Безопасность

### Хеширование паролей
- Используется **bcrypt** с автоматической генерацией соли
- Salt rounds: 10
- Пароли никогда не хранятся в открытом виде

### Валидация паролей
Пароль должен содержать:
- Минимум 8 символов
- Хотя бы одну заглавную букву
- Хотя бы одну строчную букву
- Хотя бы одну цифру
- Хотя бы один специальный символ (@$!%*?&)

### JWT токены
- Срок действия: 7 дней (настраивается)
- Хранятся в localStorage на клиенте
- Передаются в header Authorization: Bearer {token}

### Защита API
- Эндпоинты профиля защищены JWT Guard
- Автоматическая проверка токена через Passport Strategy
- Перенаправление на /login при истечении токена

## 🧪 Тестирование API

### Примеры curl запросов

**Регистрация:**
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "login": "testuser",
    "email": "test@example.com",
    "password": "Test123!@#",
    "name": "Test User"
  }'
```

**Вход:**
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "loginOrEmail": "testuser",
    "password": "Test123!@#"
  }'
```

**Получение профиля:**
```bash
curl -X GET http://localhost:4000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🐳 Docker команды

```bash
# Пересборка контейнеров
docker-compose up -d --build

# Просмотр логов конкретного сервиса
docker-compose logs -f backend

# Вход в контейнер
docker-compose exec backend sh

# Удаление volumes (очистка БД)
docker-compose down -v

# Остановка без удаления
docker-compose stop

# Запуск остановленных сервисов
docker-compose start
```

## 📝 Соглашения по коду

### Naming Conventions
- **Файлы**: kebab-case (user-profile.dto.ts)
- **Классы**: PascalCase (UserService, AuthController)
- **Переменные**: camelCase (accessToken, isLoading)
- **Константы**: UPPER_SNAKE_CASE (JWT_SECRET)
- **Интерфейсы**: PascalCase с префиксом I опционально (User, IAuthResponse)

## 🔧 Troubleshooting

### Проблемы с подключением к БД

```bash
# Проверка статуса PostgreSQL
docker-compose ps

# Перезапуск БД
docker-compose restart postgres

# Проверка логов БД
docker-compose logs postgres
```

### Ошибки при сборке

```bash
# Очистка кеша Docker
docker system prune -a

# Пересборка без кеша
docker-compose build --no-cache
```

### CORS ошибки
Убедитесь, что в backend/.env указан правильный FRONTEND_URL