import bottle
from bottle import Bottle, route, run, request, response, static_file
from json import dumps
import json

app = Bottle()

# # Static Routes
# @get('/<filename:re:.*\.js>')
# def javascripts(filename):
#     return static_file(filename, root='static/js')

# @get('/<filename:re:.*\.css>')
# def stylesheets(filename):
#     return static_file(filename, root='static/css')

# @get('/<filename:re:.*\.(jpg|png|gif|ico)>')
# def images(filename):
#     return static_file(filename, root='static/img')

# @get('/<filename:re:.*\.(eot|ttf|woff|svg)>')
# def fonts(filename):
#     return static_file(filename, root='static/fonts')


@app.hook('after_request')
def enable_cors():
    """
    You need to add some headers to each request.
    Don't use the wildcard '*' for Access-Control-Allow-Origin in production.
    """
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS, GET'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

@app.get('/<filename:path>')
def server_static(filename):
    print(filename)
    return static_file(filename, root='static')


@app.route('/cast.js')
def cast():
    return static_file('cast.js', '')

@app.route('/')
def index():
    return static_file('index.html', '')

# run(app, host='localhost', port=9000, debug=True)
run(app, host='localhost', port=9000, debug=True)