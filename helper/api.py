import flask
from flask import request, jsonify
import os
import pandas as pd

app = flask.Flask(__name__)
app.config["DEBUG"] = True

@app.route('/pred', methods=['POST'])
def pred():
    str="python ff.py"
    str+=" "+request.form["Months since Last Donation"]
    str+=" "+request.form["Number of Donations"]
    str+=" "+request.form["Total Volume Donated (c.c.)"]
    str+=" "+request.form["Months since First Donation"]
    os.system(str)
    df=pd.read_csv("res.csv")    
    jsons=[{'res':(df['res'].iloc[0])}]
    return jsonify(jsons)
app.run()