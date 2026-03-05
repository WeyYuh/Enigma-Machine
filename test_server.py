import pytest
from server import app

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

def test_encrypt_endpoint_basic(client):
    payload = {
        "char": "H",
        "ring1": 0,
        "ring2": 0,
        "ring3": 0,
        "rotor1": "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
        "rotor2": "AJDKSIRUXBLHWTMCQGZNPYFVOE",
        "rotor3": "BDFHJLCPRTXVZNYEIWGAKMUSQO",
        "rotor1Notch": "Q",
        "rotor2Notch": "E",
        "rotor3Notch": "V",
        "rotor1Pos": "A",
        "rotor2Pos": "A",
        "rotor3Pos": "A",
        "reflector": "YRUHQSLDPXNGOKMIEBFZCWVJAT",
        "plugboardMap": []
    }

    response = client.post("/encrypt", json=payload)

    assert response.status_code == 200

    data = response.get_json()

    assert "cipher" in data
    assert "rotor1Pos" in data
    assert "rotor2Pos" in data
    assert "rotor3Pos" in data
    assert "steps" in data

def test_encrypt_with_plugboard(client):
    payload = {
        "char": "H",
        "ring1": 0,
        "ring2": 0,
        "ring3": 0,
        "rotor1": "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
        "rotor2": "AJDKSIRUXBLHWTMCQGZNPYFVOE",
        "rotor3": "BDFHJLCPRTXVZNYEIWGAKMUSQO",
        "rotor1Notch": "Q",
        "rotor2Notch": "E",
        "rotor3Notch": "V",
        "rotor1Pos": "A",
        "rotor2Pos": "A",
        "rotor3Pos": "A",
        "reflector": "YRUHQSLDPXNGOKMIEBFZCWVJAT",
        "plugboardMap": [
            {"from": "A", "to": "B"}
        ]
    }

    response = client.post("/encrypt", json=payload)

    assert response.status_code == 200

    data = response.get_json()

    assert data["pbMap"]["A"] == "B"
    assert data["pbMap"]["B"] == "A"

def test_encrypt_missing_all_fields(client):
    payload = {}

    expected_missing_fields = ["char", "ring1", "ring2", "ring3",
        "rotor1", "rotor2", "rotor3",
        "rotor1Notch", "rotor2Notch", "rotor3Notch",
        "rotor1Pos", "rotor2Pos", "rotor3Pos",
        "reflector", "plugboardMap"]

    response = client.post("/encrypt", json=payload)

    assert response.status_code == 400
    data = response.get_json()
    error_fields = eval(data["error"].replace("Missing fields: ", ""))

    assert "error" in data
    assert "Missing fields" in data["error"]

    assert set(error_fields) == set(expected_missing_fields)

def test_encrypt_missing_some_fields_1(client):
    payload = {
        "char": "H",
        "ring1": 0,
        "ring3": 0,
        "rotor2": "AJDKSIRUXBLHWTMCQGZNPYFVOE",
        "rotor3": "BDFHJLCPRTXVZNYEIWGAKMUSQO",
        "rotor1Notch": "Q",
        "rotor2Notch": "E",
        "rotor3Notch": "V",
        "rotor3Pos": "A",
        "reflector": "YRUHQSLDPXNGOKMIEBFZCWVJAT",
        "plugboardMap": []
    }

    expected_missing_fields = ["ring2",
        "rotor1",
        "rotor1Pos", "rotor2Pos",
        ]

    response = client.post("/encrypt", json=payload)

    
    assert response.status_code == 400
    data = response.get_json()
    error_fields = eval(data["error"].replace("Missing fields: ", ""))

    assert "error" in data
    assert "Missing fields" in data["error"]

    assert set(error_fields) == set(expected_missing_fields)

def test_encrypt_missing_some_fields_2(client):
    payload = {
        "ring1": 0,
        "ring2": 0,
        "ring3": 0,
        "rotor1": "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
        "rotor2": "AJDKSIRUXBLHWTMCQGZNPYFVOE",
        "rotor3": "BDFHJLCPRTXVZNYEIWGAKMUSQO",
        "rotor1Notch": "Q",
        "rotor3Notch": "V",
        "rotor1Pos": "A",
        "rotor2Pos": "A",
        "rotor3Pos": "A",
    }

    expected_missing_fields = ["char",
        "rotor2Notch",
        "reflector", "plugboardMap"]

    response = client.post("/encrypt", json=payload)

    
    assert response.status_code == 400
    data = response.get_json()
    error_fields = eval(data["error"].replace("Missing fields: ", ""))

    assert "error" in data
    assert "Missing fields" in data["error"]

    assert set(error_fields) == set(expected_missing_fields)

def test_encrypt_missing_some_fields_3(client):
    payload = {
        "rotor3": "BDFHJLCPRTXVZNYEIWGAKMUSQO",
        "rotor1Notch": "Q",
        "rotor2Notch": "E",
        "rotor3Notch": "V",
        "rotor1Pos": "A",
        "rotor2Pos": "A",
        "reflector": "YRUHQSLDPXNGOKMIEBFZCWVJAT",
        "plugboardMap": []
    }

    expected_missing_fields = ["char", "ring1", "ring2", "ring3",
        "rotor1", "rotor2",
        "rotor3Pos"]
    
    response = client.post("/encrypt", json=payload)

    
    assert response.status_code == 400
    data = response.get_json()
    error_fields = eval(data["error"].replace("Missing fields: ", ""))

    assert "error" in data
    assert "Missing fields" in data["error"]

    assert set(error_fields) == set(expected_missing_fields)