# Spotify-Collaborative-Player-
This is my first completed personal fullstack project, following TechwithTim for the boilerplates and codebase of working with Spotify API. I touched with a new, intuitive UI and add further functionality/features like:

  - Developed a Chrome extension to read current Youtube playback state on a seperate tab => solve the lack of Youtube API avaiable
  - Upgrade from client-polling to websocket connection => improve resource management and reduce network traffic

- What I have learned?
Technology - React, Django, Webpack, Git, Github, Websocket, Redis, DRF

- What I want to improve?
Currently, I am still implementing features like adding video/soundtrack to current playlist, but due to time constraint, I will be putting this to a hiatus. I am also looking for ways to bring this app to mobile friendly version, where it could read YouTube Music data (seems not possible due to strict content-policy app of IOS)

# Setup Instructions
Install Required Python Modules
pip install -r requirements.txt

# # Start Web Server
To start the web server you need to run the following sequence of commands.

First cd into the main project folder 

```
python3 manage.py runserver
```

# # # Install Node.js
Install Node Modules
First cd into the frontend folder.

```
cd frontend
```

Next install all dependicies.
```
npm i
```
Compile the Front-End
Run the production compile script

```
npm run build
```
or for development:
```
npm run dev
```

