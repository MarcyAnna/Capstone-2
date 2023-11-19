# MyHealth
### An App That Tracks Daily Symptoms

#### Frontend - utilizes React, Javascript, HTML, CSS 
- Main focus of the application. User logs in to app and creates a daily log by entering which symptoms they are experiencing and a rating of how severe that symptom is. There is a list of symptoms provided from a database, as well as an option for a user to add a new one. Also a place for additional comments.
#### Backend - utilizes Express, Javascipt, SQL 
- Database with common physical and mental symptoms. User adds from general bank to their own account as well as adding new to their account.

#### Goal
- Designing a website application for a person with chronic illness to track daily what they are experiencing physically. This is a basic protoype that could have additional features added for more complete data gathering.

#### API
- User can create account
- User can update profile/create daily logs
- Admin can update/delete user
- Admin can create symptom/condition
- User/Admin authentication

##### Schema:
- User: id, username, first_name, last_name, password, DOB, condition_id, comments
- Symptom_Log: id/date, user_id, symptom_id, severity_id
- Symptom: id, name, description
- Severity: id, value, description
- Condition: id, name, description, comments
###### Potential Schema:
- Activity_Log: id/date, user_id, activity_id, duration, comments, Symptom_Log_id/date
- Diet_Log: id/date, user_id, food_id, comments, Symptom_log_id/date
- Activity: id, name, description
- Food: id, name

##### Additional Features:
- Visual graph showing symptom trends over week, month, year
- Visual graph showing correlations between instances of symptoms and activity/diet
