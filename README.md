
# myHealth

Visit website here: ([https://www.google.com](https://myhealth-kwcy.onrender.com)https://myhealth-kwcy.onrender.com)

### About myHealth:

This application is used for tracking health symptoms on a daily basis.
It's main purpose is for people experiencing chronic health issues to maintain a record of their commonly occuring symptoms so they can build
a plan to better manage those symptoms and have improved quality of life.\
Some additional features that could be added would be a daily diet log that would compare if particular food choices created an increase in a particular symptom so the user
could alter their diet accordingly. An activity log could also be added for comparison. Another addition would be in-application resources as well as links to outside resources for tips to make better lifestyle choices to manage their condition.

### User Flow:
- User is directed to homepage with login or sign up in the navigation bar
- If user is new, they register first with Auth0 using email and password and then are directed to a register form that takes First Name, Last Name, and Date of Birth
- If user has a profile, then will login using email and password through Auth0
- They are then directed to a profile page where they can navigate to conditions to add a condition to their page, which redirects them directly back to profile, or they can go to symptom daily log where they can add a symptoms for that day and then navigate back to profile
- Once conditions and daily logs added to a user profile, the conditions will display on the page and there are search buttons to find symptom log entries either by date or symptom

### API:

The api used in this application is a database built using PostgreSQL. The tables included are for user information, condition information, and symptom information as well as tables for 
users to add condtions to their profile and create a daily log of their symptoms with the severity of the symptom.

### Technology Stack Used:

- Frontend: React- utilizes Auth0 starter application
- Backend: Express- utilizes Auth0 starter application
- Database: PostgreSQL
- Authentication: Auth0
- Tests are made using Jest and can be run using NPM test
  
