from flask import Flask, request, jsonify
from flask_cors import CORS
from enigma import Enigma, Rotor, Reflector, Plugboard

app = Flask(__name__)
CORS(app)

ROTOR_1 = "EKMFLGDQVZNTOWYHXUSPAIBRCJ"
ROTOR_1_STEP = "Q"
ROTOR_2 = "AJDKSIRUXBLHWTMCQGZNPYFVOE"
ROTOR_2_STEP = "E"
ROTOR_3 = "BDFHJLCPRTXVZNYEIWGAKMUSQO"
ROTOR_3_STEP = "V"
REFLECTOR = "YRUHQSLDPXNGOKMIEBFZCWVJAT"
PLUGBOARD_MAPPING = {}



@app.post("/encrypt")
def encrypt():
    
    data = request.get_json()
    char = data["char"]
    ring1 = data['ring1']
    ring2 = data['ring2']
    ring3 = data['ring3']
    rotor1 = data['rotor1']
    rotor2 = data['rotor2']
    rotor3 = data['rotor3']
    rotor1Notch = data['rotor1Notch']
    rotor2Notch = data['rotor2Notch']
    rotor3Notch = data['rotor3Notch']
    rotor1Pos = data["rotor1Pos"]
    rotor2Pos = data["rotor2Pos"]
    rotor3Pos = data["rotor3Pos"]

    left = Rotor(rotor1, rotor1Notch, ring_setting=ring1, position=rotor1Pos)
    mid = Rotor(rotor2, rotor2Notch, ring_setting=ring2, position=rotor2Pos)
    right = Rotor(rotor3, rotor3Notch, ring_setting=ring3, position=rotor3Pos)

    plugboard = Plugboard(PLUGBOARD_MAPPING)

    reflector = Reflector(REFLECTOR)
    machine = Enigma([left, mid, right], reflector, plugboard, verbose=False)
    encrypted = machine.encrypt_char(char)
    steps = machine.encrypt_steps
    rotorsPos = machine.get_rotors_pos()
    return jsonify({"cipher": encrypted, "rotor1Pos": rotorsPos[0], "rotor2Pos": rotorsPos[1], "rotor3Pos": rotorsPos[2], "steps": steps})

@app.post("/plugboard")
def plugboard():
    global PLUGBOARD_MAPPING
    data = request.get_json()

    PLUGBOARD_MAPPING = {}

    for pair in data:
        a = pair["from"].upper()
        b = pair["to"].upper()
        PLUGBOARD_MAPPING[a] = b
        PLUGBOARD_MAPPING[b] = a

    return jsonify({"status": "ok"})

app.run(port=5000)