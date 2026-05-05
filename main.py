import os
from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS

app = Flask(__name__, static_folder='dist')
CORS(app)

@app.route('/api/health')
def health():
    return jsonify({
        "status": "ok",
        "version": "2.7.2",
        "engine": "FORGE Brain v2.0",
        "layer": "Allergen Enforcement v1.0",
        "integrity_score": 93
    })

@app.route('/api/integrity')
def integrity():
    return jsonify({
        "score": 93,
        "status": "Strategic Control Active",
        "drift_prediction": "0.02%",
        "allergen_compliance": "100%",
        "shield_status": "ACTIVE"
    })

# Serve Static Files
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    # Cloud Run provides the PORT environment variable
    port = int(os.environ.get('PORT', 3000))
    app.run(host='0.0.0.0', port=port)
