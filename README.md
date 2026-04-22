# Proyecto Final SO2 — Sistema de Log de Eventos Robot LiDAR

Sistema de monitoreo de eventos para proyecto de robótica LiDAR, compuesto por un backend, base de datos MongoDB y dashboard web, todo orquestado con Docker.

---

## Arquitectura del Sistema

[Sistema Robótico LiDAR]
│
│ HTTP POST /events
▼
[Backend — Node.js + Express] ←──→ [MongoDB]
│
│ HTTP GET /events
▼
[Frontend — Dashboard Nginx]

## Tecnologías Utilizadas

| Componente | Tecnología |
|---|---|
| Backend | Node.js + Express |
| Base de datos | MongoDB 6 |
| Frontend | HTML + Vanilla JS + Nginx |
| Contenedores | Docker + Docker Compose |
| Servidor | Ubuntu 22.04 (DigitalOcean) |

---

## Estructura del Proyecto
Proyecto-Final-SO2/
├── backend/
│   ├── src/
│   │   └── index.js       # Servidor Express
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── index.html         # Dashboard web
│   └── Dockerfile
├── docker-compose.yml
└── README.md

---

## Instrucciones de Uso

### Requisitos
- Docker
- Docker Compose

### Levantar el sistema

```bash
git clone https://github.com/Keyner-Rivera/Proyecto-Final-SO2.git
cd Proyecto-Final-SO2
docker compose up --build
```

### Acceder al dashboard
http://IP_PUBLICA:8080

### Endpoints del backend

| Método | Endpoint | Descripción |
|---|---|---|
| GET | /health | Verificar estado del servidor |
| GET | /events | Obtener todos los eventos |
| POST | /events | Registrar un nuevo evento |
| DELETE | /events | Eliminar todos los eventos |

### Ejemplo — Enviar un evento

```bash
curl -X POST http://IP_PUBLICA:3000/events \
  -H "Content-Type: application/json" \
  -d '{"type":"scan_started","data":{"angle":0,"distance":150}}'
```

---

## Servidor en Producción

**IP Pública:** `PENDIENTE — DigitalOcean`

---

## Contenedores Docker

| Contenedor | Imagen | Puerto |
|---|---|---|
| lidar_backend | node:18-alpine | 3000 |
| lidar_frontend | nginx:alpine | 8080 |
| lidar_mongo | mongo:6 | 27017 |