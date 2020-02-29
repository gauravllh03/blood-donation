import flask
from flask import request, jsonify
import os
import pandas as pd

from flask_cors import CORS, cross_origin

app = flask.Flask(__name__)
cors = CORS(app)





@app.route('/pred', methods=['POST'])
def pred():
    str="python ff.py"
    str+=" "+request.form["Months since Last Donation"]
    str+=" "+request.form["Number of Donations"]
    str+=" "+request.form["Total Volume Donated (c.c.)"]
    str+=" "+request.form["Months since First Donation"]
    #print(str)
    #return str
    os.system(str)
    df=pd.read_csv("res.csv")
    #df=df['res']
    
    jsons=[{'res':int(df['res'].iloc[0])}]
  
    return jsonify(jsons)



app.run()