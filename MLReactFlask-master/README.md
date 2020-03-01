# MLReactFlask

# Note: You will need Node.js, Yarn, VS Code and the latest stable version of Python to do this sucesfully:

- Node: https://nodejs.org/en/download/

- Python: https://www.python.org/downloads/ (only use the installer which corresponds to your OS bit type e.g. x64)

- VS Code: https://code.visualstudio.com/

- Yarn: https://classic.yarnpkg.com/latest.msi

Once you have done that it is time to proceed...
 
# Step One: open VS Code, open a terminal, cd into the ui folder and type in:

- serve -s build -l 3000


# Step Two: open another terminal cd into the service folder and type in:


- pip install virtualenv (this installs the virtual environment, which requires Python)

- virtualenv venv (this creates a virtual environment folder called venv)

- venv\scripts\activate (this activates the Virtual Environment)

- pip install flask (this installs the Flask API backend)

- pip install flask-restplus

- pip install sklearn (restplus and sklearn are required for the ML part)

- Now try typing in flask run (you will likely get an error that says something like ‘Cannot import name ‘cached_property’, if you get that, use the link below to see my solution). 

- LINK: https://stackoverflow.com/a/60136605/12867200

- Once you have fixed the errors type flask run again, it should work now! :)

- To test that its working go into your browser and type in http://localhost:3000


# For more info and a step-by-step video check my blog: https://flaskml.design.blog
