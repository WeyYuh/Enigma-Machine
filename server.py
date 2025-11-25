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




@app.post("/encrypt")
def encrypt():
    
    data = request.get_json()
    char = data["char"]
    rotor1Pos = data["rotor1Pos"]
    rotor2Pos = data["rotor2Pos"]
    rotor3Pos = data["rotor3Pos"]

    left = Rotor(ROTOR_1, ROTOR_1_STEP, position=rotor1Pos)
    mid = Rotor(ROTOR_2, ROTOR_2_STEP, position=rotor2Pos)
    right = Rotor(ROTOR_3, ROTOR_3_STEP, position=rotor3Pos)

    reflector = Reflector(REFLECTOR)
    machine = Enigma([left, mid, right], reflector, verbose=False)
    encrypted = machine.encrypt_char(char)
    rotorsPos = machine.get_rotors_pos()
    return jsonify({"cipher": encrypted, "rotor1Pos": rotorsPos[0], "rotor2Pos": rotorsPos[1], "rotor3Pos": rotorsPos[2]})

app.run(port=5000)