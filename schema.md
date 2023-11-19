# MyHealth Schema

  users \
 id VARCHAR(50) PRIMARY KEY,\
 first_name TEXT NOT NULL,\
 last_name TEXT NOT NULL,\
 email VARCHAR(256),\
 DOB INT NOT NULL,\
 comments TEXT\


  conditions \
 id SERIAL PRIMARY KEY,\
 name TEXT NOT NULL,\
 Description TEXT NOT NULL,\
 Comments TEXT\


  symptoms \
 id SERIAL PRIMARY KEY,\
 name TEXT NOT NULL,\
 description TEXT \


 users_conditions \
user_id TEXT\
REFERENCES users ON DELETE CASCADE,\
condition_id INTEGER\
REFERENCES conditions ON DELETE CASCADE,\
PRIMARY KEY (user_id, condition_id)\



  daily_symptoms_log \
 log_id SERIAL PRIMARY KEY,\
 user_id VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE,\
 log_date DATE NOT NULL DEFAULT CURRENT_DATE,\
 symptom_name TEXT,\
 severity TEXT\
