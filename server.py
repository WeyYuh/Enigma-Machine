from flask import Flask, request, jsonify
from flask_cors import CORS
from enigma import Enigma, Rotor, Reflector

app = Flask(__name__)
CORS(app)

ROTOR_1 = "EKMFLGDQVZNTOWYHXUSPAIBRCJ"
ROTOR_1_STEP = "Q"
ROTOR_2 = "AJDKSIRUXBLHWTMCQGZNPYFVOE"
ROTOR_2_STEP = "E"
ROTOR_3 = "BDFHJLCPRTXVZNYEIWGAKMUSQO"
ROTOR_3_STEP = "V"
REFLECTOR = "YRUHQSLDPXNGOKMIEBFZCWVJAT"


left = Rotor(ROTOR_1, ROTOR_1_STEP)
mid = Rotor(ROTOR_2, ROTOR_2_STEP)
right = Rotor(ROTOR_3, ROTOR_3_STEP)
reflector = Reflector(REFLECTOR)
machine = Enigma([left, mid, right], reflector, verbose=False)

@app.post("/encrypt")
def encrypt():
    data = request.get_json()
    char = data["char"]
    encrypted = machine.encrypt_char(char)
    return jsonify({"cipher": encrypted})

app.run(port=5000)