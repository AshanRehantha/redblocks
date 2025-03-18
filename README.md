# Todo App

This is a Todo application that allows task assignment, status updates, and integrates a notification system. The backend is built with **NestJS** and uses **PostgreSQL** for the database, **BullMQ** for task queuing, and **Pusher** for notifications.

## Features
- Assign tasks to users.
- Change task status (e.g., To Do, In Progress, Done).
- Logs monitoring system.
- Background task management using BullMQ.
- Real-time notifications via Pusher.

## Requirements

- Docker
- Node.js (Recommended version: 18.x)
- npm (Recommended version: 10.x)

## Getting Started

Follow the steps below to set up the project:

### 1. Clone the Repository
First, clone the repository to your local machine.

```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
docker-compose up -d

```
Set up database
first Insert tables

folder path 
datatables/tables.sql

``` bash
-- Insert modules
INSERT INTO public.app_modules (module_name,module_description) VALUES('user','User Module'),('task','Task Module');

-- Insert actions
INSERT INTO public.app_modules_actions (action_name,action_description) VALUES
	 ('add','Add Action'),
	 ('update','Update Action'),
	 ('list','List Action'),
	 ('edit','Edit Action'),
	 ('delete','Delete Action');

-- Insert priorities
INSERT INTO public.app_priority ("name") VALUES
	 ('low'),
	 ('medium'),
	 ('high');

-- Insert status
INSERT INTO public.app_status (status_name,description) VALUES
	 ('active','Active'),
	 ('done','Done');

-- Insert user types
INSERT INTO public.app_user_types ("name") VALUES
	 ('admin'),
	 ('user');

-- Insert permissions
INSERT INTO public.app_permission (module_id,action_id,user_id) VALUES
	 (1,1,1),
	 (1,2,1),
	 (2,1,1),
	 (2,3,1),
	 (2,5,1),
	 (1,3,1),
	 (1,5,1);

-- Insert user data
INSERT INTO public.users_master (email,first_name,last_name,department,contact_number,user_name) VALUES
	 ('ashan.hettiarachchi@ideahub.lk','Ashan','Hettiarachchi','Engineering','0704302684','ashan');

-- Insert user credentials
INSERT INTO public.users (user_id,"password",status_id,user_type) VALUES
	 (1,'$2b$15$0n6GVknG9Y3AFrb2JZ4pKuJX9E1XIlgAHQNB10iPocck1OMPrguza',1,1);

```

This version is more professional and clearer for users who may need to contact you.