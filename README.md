Daylist — Full-Stack Task Management System

Organize your day. Manage your tasks. Stay productive.

Daylist is a task management application designed to help users organize their daily activities, track their progress, and manage their work efficiently.

The project aims to evolve into a complete Full-Stack task management platform built with React, Laravel, and MySQL, following a clean architecture and modern development practices.

Project Status: Frontend Prototype — Backend Development Planned

Overview

Daylist provides a simple and intuitive interface for managing personal tasks.

The current version focuses on the core task management experience, including task creation, completion tracking, deletion, and progress visualization.

The long-term vision is to extend the application into a complete productivity platform supporting projects, teams, task assignments, authentication, and collaboration.

Features

Currently Implemented

Create new tasks.

Mark tasks as completed or pending.

Delete existing tasks.

Display task progress.

Calculate remaining tasks.

Show an empty state when no tasks are available.

Responsive user interface.

Dynamic UI updates using React state.

Planned Features

User authentication and authorization.

Personal and collaborative projects.

Task assignment and management.

Task priorities and categories.

Kanban board.

Calendar integration.

Comments and file attachments.

Notifications.

Search, filtering, and pagination.

Persistent data storage.

Role-based access control.

Technology Stack

Technology

Purpose

React 19

Frontend development

Vite 6

Development server and build tool

JavaScript

Application logic

CSS3

Styling and responsive design

Laravel

Planned backend API

MySQL

Planned relational database

REST API

Planned frontend/backend communication

Architecture

Current Architecture

The current implementation is a frontend-only application. Task data is managed using React state and stored temporarily in memory.

flowchart TD
    User[User] --> Browser[Web Browser]
    Browser --> React[React Application]
    React --> State[React State]
    State --> UI[Task Management Interface]
    UI --> User

Target Architecture

The planned architecture separates the frontend, backend, and database into independent layers.

flowchart TD
    User[User] --> Frontend[React Frontend]
    Frontend -->|HTTP / JSON| API[Laravel REST API]
    API --> Auth[Authentication & Authorization]
    API --> Services[Business Logic]
    Services --> DB[(MySQL Database)]
    API --> Storage[File Storage]
    API --> Notifications[Notification System]
    API -->|JSON Response| Frontend

Project Structure

task-management-system/
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx
│   │   └── App.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/             # Planned Laravel application
│
└── README.md

Getting Started

Prerequisites

Make sure you have the following installed:

Node.js

npm

Git

1. Clone the Repository

git clone https://github.com/YOUR_USERNAME/task-management-system.git

2. Navigate to the Frontend

cd task-management-system/frontend

3. Install Dependencies

npm install

4. Start the Development Server

npm run dev

5. Build for Production

npm run build
