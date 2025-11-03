# TinyURL WebApp (Angular Frontend)

This is the **frontend** of the TinyURL project — a simple URL shortener built using **Angular** for the UI and **ASP.NET Core** for the backend API.

---

## Features

- Create short URLs from long links  
- Mark URLs as **private** or **public**  
- List all public URLs  
- Search and delete URLs  
- Redirect to original links using short codes  

---

## Tech Stack

- **Frontend:** Angular 17  ,   Typescript, Bootstrap , REST API Integration.
- **Backend:** ASP.NET Core Web API (Entity Framework + SQLite)  
- **Hosting:** Netlify (Frontend), Render (Backend)

---

## How It Works

1. The Angular app calls backend API endpoints like:
2. The backend stores and returns shortened URLs.
3. The frontend displays the list and allows management.


git clone https://github.com/Abilash-35/tinyurl-frontend.git
cd Tinyurl-webapp

 ## Install dependencies 
npm install

## angular development server
ng serve

## To create build production-ready
ng build

Output will be in the dist/ directory.
This folder can be deployed to Netlify. 