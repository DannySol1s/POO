<div align="center">

# 🎮 POO Challenge: TVRG

### Trivia game full-stack para dominar Programación Orientada a Objetos

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-1.x-000000?style=for-the-badge&logo=bun&logoColor=white)
![Hono](https://img.shields.io/badge/Hono-4-E36002?style=for-the-badge&logo=hono&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)

> *"Demuestra tu lógica, supera las quests y ponte trucha con la POO... o catarreará tu código."*

</div>

---

## ¿Qué es?

**POO Challenge: TVRG** es una aplicación web gamificada para reforzar conceptos de Programación Orientada a Objetos (Clases, Objetos, Herencia, Polimorfismo y Encapsulamiento) a través de retos cronometrados, en formato de trivia con estética arcade/retro-hacker.

Nació como proyecto académico, pero está construido como una pieza de software completa: backend con autenticación, validación anti-trampa, persistencia en base de datos y un sistema de ranking competitivo, además de un frontend reactivo con animaciones, modos de juego balanceados y soporte PWA. El objetivo no es solo "responder preguntas", sino ofrecer una experiencia de juego con reglas claras, progresión y feedback con personalidad.

Está pensado para estudiantes que repasan POO antes de un examen o proyecto, pero también funciona como **muestra técnica de un flujo full-stack real**: desde el diseño del esquema de base de datos hasta la UI final, pasando por seguridad, validación de datos y arquitectura de componentes.

---

## ✨ Características Principales

| | Característica | Descripción |
|---|---|---|
| 🎯 | **Selección de Tema y Dificultad** | 5 temas de POO + modo mixto ("Todos"), combinados con 4 modos de juego (Fácil, Normal, Heroico, Legendario), cada uno con su propia regla de tiempo, vidas y multiplicador de puntos. |
| 🔀 | **Preguntas y Opciones Aleatorias** | Cada partida obtiene un set distinto de 10 preguntas (algoritmo Fisher-Yates en el backend) y las opciones de respuesta vienen barajadas — nunca memorizas posiciones. |
| ❤️ | **Sistema de Vidas y Game Over** | Heroico (3 vidas) y Legendario (muerte súbita) penalizan los errores; al agotar las vidas se activa una pantalla de Game Over con el puntaje parcial obtenido. |
| 💡 | **Pistas Contextuales** | En modo Fácil, fallar una pregunta desbloquea una pista relacionada con el concepto de POO evaluado. |
| 🧮 | **Puntuación Dinámica** | Puntos base + bono por velocidad de respuesta + bono por racha de aciertos, todo escalado por el multiplicador del modo (×0.7 a ×2.0). |
| 🛡️ | **Anti-Cheat en el Servidor** | El backend recalcula el puntaje máximo posible según la dificultad y rechaza cualquier envío que lo exceda. |
| 🏆 | **Ranking Global** | Tabla combinada de usuarios registrados y jugadores en modo arcade, con badges de rango acumulativo (10 niveles, desde "Copypaster de StackOverflow" hasta "Senior Master VRG"). |
| 🕹️ | **Modo Arcade (sin cuenta)** | El jugador deja sus iniciales estilo arcade clásico (A-Z0-9, máx. 5 caracteres) y compite por su mejor score, sin necesidad de registro. |
| 🔐 | **Panel Admin con JWT** | Login con usuario/contraseña hasheada (`Bun.password`), sesión vía JWT con expiración corta. |
| 📱 | **PWA Instalable** | Manifest + Service Worker (Workbox) — instalable en escritorio o móvil y con caché offline. |

---

## 📚 Contenido — Banco de Preguntas

75 desafíos repartidos en 5 temas (15 c/u), cada uno balanceado en 3 niveles de dificultad (fácil / medio / difícil — 25 de cada uno en total). El modo de juego decide qué mezcla de dificultades entra al pool.

| # | Tema | Preguntas | Enfoque del contenido |
|---|---|---|---|
| 1 | 🏛️ Clases | 15 | Constructores, campos estáticos, inicializadores |
| 2 | 📦 Objetos | 15 | Instancias, referencias vs. valores, `instanceof`, clonado |
| 3 | 🧬 Herencia | 15 | `extends`, `super()`, cadena de prototipos, mixins |
| 4 | 🔀 Polimorfismo | 15 | Sobreescritura de métodos, duck typing, arrays polimórficos |
| 5 | 🔒 Encapsulamiento | 15 | Campos privados, getters/setters, validación de invariantes |
| 🎯 | Todos (mixto) | 75 | Combinación equilibrada de los 5 temas anteriores |

### Modos de juego

| Modo | Tiempo / pregunta | Vidas | Multiplicador | Mezcla de dificultad |
|---|---|---|---|---|
| 🟢 Fácil | 30 s | ∞ | ×0.7 | Solo "fácil" + pistas al fallar |
| 🔵 Normal | 30 s | ∞ | ×1.0 | "Fácil" + "medio" |
| 🟠 Heroico | 30 s | 3 | ×1.4 | "Medio" + "difícil" |
| 🔴 Legendario | 15 s | 1 (muerte súbita) | ×2.0 | Solo "difícil" |

---

## 🏗️ Arquitectura del Proyecto

### Stack Tecnológico

| Tecnología | Por qué se eligió |
|---|---|
| **Bun** | Runtime + gestor de paquetes todo-en-uno: arranque casi instantáneo, soporte nativo de SQLite (`bun:sqlite`) y hashing de contraseñas (`Bun.password`) sin instalar dependencias extra. |
| **Hono** | Framework web minimalista y ultrarrápido, con middlewares listos para CORS, *secure headers* y JWT — el tamaño justo para una API pequeña, sin el overhead de Express o Nest. |
| **SQLite (`bun:sqlite`)** | Base de datos embebida, cero configuración de servidor externo, con journaling WAL para escrituras concurrentes seguras — adecuada al tamaño del proyecto y trivial de versionar/migrar. |
| **React 18 + Vite** | Vite aporta HMR instantáneo y un build de producción optimizado; React permite modelar el flujo del juego como una máquina de estados (`useGame`) con componentes pequeños y reutilizables. |
| **Framer Motion (`motion`)** | Animaciones declarativas (transiciones de pantalla, countdown, feedback de aciertos/errores) sin escribir keyframes CSS a mano. |
| **JWT (`hono/jwt`)** | Autenticación *stateless* con expiración corta — no requiere tabla de sesiones ni un store externo (Redis). |
| **vite-plugin-pwa (Workbox)** | Convierte la app en PWA instalable con caché offline, sin configurar un Service Worker manualmente. |

### Estructura de Archivos

```
POO/
├── api/                          # Backend — Bun + Hono
│   ├── src/
│   │   ├── data/
│   │   │   └── challenges.js     # Banco de 75 preguntas (5 temas × 3 dificultades)
│   │   ├── db/
│   │   │   └── index.js          # Conexión SQLite, esquema, migraciones idempotentes y seed del admin
│   │   ├── middleware/
│   │   │   ├── auth.js           # Verificación de JWT (requireAuth)
│   │   │   └── rateLimit.js       # Rate limiting en memoria por IP + ruta
│   │   ├── routes/
│   │   │   ├── auth.js           # POST /login
│   │   │   ├── challenges.js     # GET /random (shuffle), /topics, POST /:id/check
│   │   │   └── partidas.js       # POST /partidas, /arcade · GET /ranking, /mis-partidas
│   │   └── index.js               # App Hono: CORS, secure headers, montaje de rutas
│   ├── .env.example               # Variables requeridas (JWT_SECRET, ADMIN_*, ALLOWED_ORIGINS)
│   └── package.json
│
├── app/                           # Frontend — React + Vite
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChallengeCard.jsx  # Tarjeta de pregunta + opciones
│   │   │   ├── ProgressBar.jsx    # Progreso de la partida (X/10)
│   │   │   └── Timer.jsx          # Temporizador visual por pregunta
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Sesión JWT persistida en localStorage
│   │   ├── hooks/
│   │   │   └── useGame.js         # Máquina de estados del juego (timer, vidas, racha, score)
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Selección de tema + dificultad
│   │   │   ├── Game.jsx           # Pantalla de juego (countdown, preguntas, game over)
│   │   │   ├── Results.jsx        # Resultados, rango obtenido y guardado de partida
│   │   │   ├── Ranking.jsx        # Tabla de ranking global
│   │   │   └── Auth.jsx           # Login del panel admin
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── App.jsx                 # Enrutador de páginas + estado global de la sesión de juego
│   │   └── main.jsx
│   ├── vite.config.js              # Proxy de /api → API Hono + configuración PWA
│   └── package.json
│
├── game.db                          # SQLite (no versionado, se crea al arrancar la API)
└── package.json                     # Scripts del monorepo (dev:api, dev:app, build)
```

---

## ⚙️ Arquitectura Técnica Central — Ciclo de una Partida

El corazón del proyecto es el ciclo completo de una partida: desde que el jugador elige tema/dificultad hasta que su puntaje queda validado y reflejado en el ranking.

```
┌──────────────────────────────────────────────────────────────────────┐
│  1. SELECCIÓN  ·  Home.jsx                                            │
│     El jugador elige Tema (5 + mixto) y Modo                         │
│     (Fácil / Normal / Heroico / Legendario)                          │
└───────────────────────────────┬──────────────────────────────────────┘
                                  │ GET /api/challenges/random
                                  │   ?topic=..&difficulty=..&count=10
                                  ▼
┌──────────────────────────────────────────────────────────────────────┐
│  API  ·  routes/challenges.js                                        │
│   • Filtra el banco de 75 preguntas por tema y dificultad            │
│   • En modo "todos", balancea N preguntas por cada uno de los 5 temas │
│   • Fisher-Yates: baraja preguntas Y opciones de respuesta            │
└───────────────────────────────┬──────────────────────────────────────┘
                                  │ { data: [10 challenges] }
                                  ▼
┌──────────────────────────────────────────────────────────────────────┐
│  2. PARTIDA  ·  Game.jsx + hooks/useGame.js                           │
│     countdown(3s) → pregunta → respuesta → siguiente → ... → fin      │
│     puntos = (100 + bonoTiempo + bonoRacha) × multiplicador del modo  │
│     vidas (Heroico=3 / Legendario=1) → Game Over al llegar a 0        │
└───────────────────────────────┬──────────────────────────────────────┘
                                  │ onFinish({ score, answerHistory })
                                  ▼
┌──────────────────────────────────────────────────────────────────────┐
│  3. RESULTADOS  ·  Results.jsx                                        │
│     Calcula el rango obtenido (10 niveles) según el puntaje          │
│     POST /api/partidas         (usuario con sesión, JWT)             │
│     POST /api/partidas/arcade  (modo arcade, iniciales A-Z0-9)       │
└───────────────────────────────┬──────────────────────────────────────┘
                                  │ Validación en servidor:
                                  │ puntuación ≤ máximo permitido(dificultad)
                                  ▼
┌──────────────────────────────────────────────────────────────────────┐
│  4. RANKING  ·  Ranking.jsx                                           │
│     GET /api/partidas/ranking?tema=..                                │
│     UNION ALL (usuarios + partidas) ∪ (partidas_arcade)              │
│     GROUP BY username → ordenado por mejor puntuación                │
└──────────────────────────────────────────────────────────────────────┘
                                  │
                "⚡ Reintentar Quest" ──► vuelve al paso 1
                (nuevo fetch a /random → nuevo set de preguntas)
```

---

## 🚀 Cómo Ejecutar

### Prerrequisitos

- [Bun](https://bun.sh) ≥ 1.0

### Instalación y arranque

```bash
# Clonar el repositorio
git clone https://github.com/DannySol1s/POO.git
cd POO

# Instalar dependencias de api/ y app/
bun run install:all

# Configurar variables de entorno del backend
cp api/.env.example api/.env
# Editar api/.env: JWT_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD

# Terminal 1 — Backend (Hono) en http://localhost:3000
bun run dev:api

# Terminal 2 — Frontend (Vite) en http://localhost:5173
bun run dev:app
```

### Otros comandos útiles

| Comando | Descripción |
|---|---|
| `bun run dev:api` | Levanta la API Hono en modo watch (puerto 3000) |
| `bun run dev:app` | Levanta el frontend Vite con HMR (puerto 5173) |
| `bun run build` | Genera el build de producción del frontend |
| `cd app && bun run preview` | Sirve el build de producción localmente |

---

## 🎓 Valor Formativo

> Más que responder preguntas de POO, el reto fue construir el sistema que las genera, las valida y recuerda quién las domina.

- **Autenticación JWT + hashing de contraseñas** — login de administrador con `Bun.password` y tokens con expiración corta (`hono/jwt`).
- **Anti-cheat en el servidor** — cada partida enviada se valida contra el puntaje máximo real calculado por dificultad, sin confiar en el cliente.
- **Esquema relacional + migraciones idempotentes** — tablas `usuarios`, `partidas` y `partidas_arcade` con índices y `ALTER TABLE` seguro en cada arranque del servidor.
- **Consultas SQL agregadas** — `UNION ALL` + `GROUP BY` para combinar en un solo ranking las partidas de usuarios registrados y del modo arcade.
- **Estado complejo con hooks personalizados** — `useGame` como máquina de estados que coordina temporizador, vidas, rachas y finalización de partida.
- **Rate limiting propio** — middleware en memoria por IP + ruta para proteger login y registro de partidas contra abuso.
- **Diseño responsivo real** — depuración de overflow en layouts CSS Grid a través de múltiples breakpoints (360px–1920px).
- **PWA** — manifest + Service Worker (Workbox) para instalación y uso offline.

---

## 👤 Autor

**Ángel Solís**

[![GitHub](https://img.shields.io/badge/GitHub-DannySol1s-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/DannySol1s)

---

<div align="center">

© 2026 Ángel Solís — POO Challenge: TVRG

*Compílalo, juégalo, y que no te salga "undefined is not a function" en el examen.*

</div>
