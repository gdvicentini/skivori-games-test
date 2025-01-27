# Full-Stack Project with NestJS (Backend) and Vue 3 with Quasar (Frontend)

This project demonstrates a full-stack application using **NestJS** for the backend and **Vue 3 with Quasar** for the frontend. Below are instructions on how to set up both the backend and frontend environments.

## Table of Contents

- [Backend - NestJS Setup](#backend---nestjs-setup)
- [Frontend - Vue 3 with Quasar Setup](#frontend---vue-3-with-quasar-setup)
- [Running the Application](#running-the-application)
- [Folder Structure](#folder-structure)
- [API Routes](#api-routes)

---

## Backend - NestJS Setup

### Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (Recommended version: 16.x or higher)
- [NestJS CLI](https://nestjs.com/) (Optional, but recommended for development)

Also make sure you clone this repository:

git clone [git@github.com:gdvicentini/skivori-games-test.git](https://github.com/gdvicentini/skivori-games-test.git)
cd skivori-games-test

### Steps to Set Up the Backend

1. **Install NestJS globally (optional)**

  If you don't have the NestJS CLI installed globally, you can install it using npm:

  ```bash
  npm install -g @nestjs/cli

2. **Install Dependencies**
  
  ```bash
  cd skivori-game-backend
  npm install

3. **Run the Backend Project**
  
  Open the terminal and run:
  ```bash
  npm run start

## Frontend - Vue 3 with Quasar Setup

### Prerequisites

Ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (Recommended version: 16.x or higher)
- [Vue CLI](https://cli.vuejs.org)
- [Quasar CLI](https://quasar.dev/start/quick-start)


### Steps to Set Up the Frontend

1. **Install Vue CLI**

  If you don't have the Vue CLI installed, you can install it globally using npm:

  ```bash
  npm install -g @vue/cli

2. **Install Quasar CLI**
  
  If you haven't installed Quasar CLI yet, install it globally:

  ```bash
  npm install -g @quasar/cli

3. **Install Dependencies**
  
  ```bash
  cd skivori-game-frontend
  npm install

4. **Run the Frontend Project**
  
  Open the terminal and run: 
  ```bash
  quasar dev


## API Routes

Below are the available API routes for the backend:

### GET /api/v1/games
List all games of game-data.json
### GET /api/v1/games/search?query=value
Search games in game-data.json using queries
### POST /api/v1/slot-machine/start
Start a new game with initial balance of 20 coins
### POST /api/v1/slot-machine/spin
Spin slot machine to see the rewards
### POST /api/v1/slot-machine/convert-currency
Convert currency from USD to another by user selection

When the backend project is running, access the Swagger link to test the routes more easily: [Skivori Game Swagger Docs](http://localhost:3000/api/v1/docs)

If you prefer to run it using Insomnia or Postman, a collection has been created and attached to the project. Just download it and import it into them.