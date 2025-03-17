CREATE TABLE app_amp_logger (
  id SERIAL PRIMARY KEY,
  status_code INT NOT NULL,
  method VARCHAR(100) NOT NULL,
  path VARCHAR(100) NOT NULL,
  response_time VARCHAR(100) NOT NULL
);

CREATE TABLE app_apm_cpu_process_time (
    id SERIAL PRIMARY KEY,
    total_cpus VARCHAR(50),
    over_all_cpu_usage VARCHAR(20),
    active_cpus VARCHAR(30),
    cpu_details VARCHAR(200),
    date DATE,
    time VARCHAR(50)
);

CREATE TABLE app_cpu_usage_details (
    id SERIAL PRIMARY KEY,
    cpu_id VARCHAR(50),
    cpu VARCHAR(50),
    cpu_usage VARCHAR(50),
    isActive VARCHAR(50)
);

CREATE TABLE app_apm_query_execution (
  id SERIAL PRIMARY KEY,
  table_name VARCHAR(50) NOT NULL,
  execution_time VARCHAR(100) NOT NULL,
  is_low_query VARCHAR(10) DEFAULT NULL
);

CREATE TABLE users (
    user_id INT NOT NULL PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    status_id INT NOT null,
    CONSTRAINT fk_users_customer FOREIGN KEY (user_id) REFERENCES users_master(id) ON DELETE CASCADE
);

CREATE TABLE users_master (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    designation VARCHAR(255) NOT NULL,
    department INT NOT NULL,
    is_first_time_login INT not null,
    contact_number VARCHAR(255) NOT NULL
);

CREATE TABLE app_status (
  id SERIAL PRIMARY KEY,
  status_name varchar(255) NOT NULL,
  description varchar(255) NOT NULL
);

ALTER TABLE users
ADD CONSTRAINT fk_users_status
FOREIGN KEY (status_id) REFERENCES app_status(id) ON DELETE CASCADE;


CREATE TABLE IF NOT EXISTS app_apm_api_excution_details (
    id SERIAL PRIMARY KEY,
    method VARCHAR(50),
    path VARCHAR(250),
    time VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS app_modules (
    id SERIAL PRIMARY KEY,
    module_name VARCHAR(50),
    module_description VARCHAR(250)
);

CREATE TABLE IF NOT EXISTS app_modules_actions (
    id SERIAL PRIMARY KEY,
    action_name VARCHAR(50),
    action_description VARCHAR(250)
);

CREATE TABLE IF NOT EXISTS app_permission (
    id SERIAL PRIMARY KEY,
    module_id INT NOT NULL,
    action_id INT NOT NULL,
    user_id INT NOT NULL
);

ALTER TABLE app_permission ADD CONSTRAINT app_permission_fk FOREIGN KEY (module_id) REFERENCES app_modules(id) ON UPDATE CASCADE;
ALTER TABLE app_permission ADD CONSTRAINT app_permission_action_fk FOREIGN KEY (action_id) REFERENCES app_modules_actions(id) ON UPDATE CASCADE;
ALTER TABLE app_permission ADD CONSTRAINT app_permission_user_fk FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE;

CREATE TABLE app_user_types (
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    task_name VARCHAR(200) NOT NULL,
    task_description VARCHAR(200) NOT NULL,
    priority INT NOT NULL,
    due_date DATE NOT NULL,
    user_id INT NOT NULL
);

ALTER TABLE tasks ADD CONSTRAINT tasks_fk FOREIGN KEY (user_id) REFERENCES users_master(id) ON UPDATE CASCADE;

