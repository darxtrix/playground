from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/products/all')
def get_all_products():
    print("Listing all the products")
    response = requests.get('http://database-service:9090/products')
    return jsonify(response.json())


@app.route('/products/')
def get_matching_products():
    response = requests.get('http://database-service:9090/products?search={0}'.format(request.args.get('find','')))
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=80,debug=True)