from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/services/all')
def get_all_services():
    print("Listing all the services")
    # Container links are used, 9090 is the container port
    response = requests.get('http://database-service:9090/services')
    return jsonify(response.json())


@app.route('/services/')
def get_matching_services():
    response = requests.get('http://database-service:9090/services?search={0}'.format(request.args.get('find','')))
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=80,debug=True)