import pytest
import itertools
import subprocess
import sys

from enigma import Rotor, Reflector, Plugboard, Enigma

ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

ROTORS = [{"name": "Rotor I", "val": "EKMFLGDQVZNTOWYHXUSPAIBRCJ", "notch": "Q"},
    {"name": "Rotor II", "val": "AJDKSIRUXBLHWTMCQGZNPYFVOE", "notch": "E"},
    {"name": "Rotor III", "val": "BDFHJLCPRTXVZNYEIWGAKMUSQO", "notch": "V"},
    {"name": "Rotor IV", "val": "ESOVPZJAYQUIRHXLNFTGKDCMWB", "notch": "J"},
    {"name": "Rotor V", "val": "VZBRGITYUPSDNHLXAWMJQOFECK", "notch": "Z"},
    {"name": "Rotor VI", "val": "JPGVOUMFYQBENHZRDKASXLICTW", "notch": "ZM"},
    {"name": "Rotor VII", "val": "NZJHGRCXMYSWBOUFAIVLPEKQDT", "notch": "ZM"},
    {"name": "Rotor VIII", "val": "FKQHTLXOCBJSPDZRAMEWNIUYGV", "notch": "ZM"}]

REFLECTORS = [
    {"name": "UKW-A", "val": "EJMZALYXVBWFCRQUONTSPIKHGD"},
    {"name": "UKW-B", "val": "YRUHQSLDPXNGOKMIEBFZCWVJAT"},
    {"name": "UKW-C", "val": "FVPJIAOYEDRZXWGCTKUQSBNMHL"},
]


@pytest.mark.parametrize("rotor_data", ROTORS)
def test_forward_backward(rotor_data):
    # forward then backward will return same character for symmetry encryption
    rotor = Rotor(rotor_data['val'], rotor_data['notch'], ring_setting=0, position='A')

    for i in range(26):
        forward = rotor.encode_forward(i)
        backward = rotor.encode_backward(forward)
        assert i == backward

@pytest.mark.parametrize("rotor_data", ROTORS)
def test_increment_position(rotor_data):
    # move position up by 1
    rotor = Rotor(rotor_data['val'], rotor_data['notch'], ring_setting=0, position='A')
    initial = rotor.pos
    rotor.step()
    assert rotor.pos == (initial + 1)% 26
            
            
@pytest.mark.parametrize("rotor_data, notch_letter", [
    (rotor, notch)
    for rotor in ROTORS
    for notch in rotor['notch']
])
def test_notch_detection(rotor_data, notch_letter):
    # test detection whether rotor is at notch
    rotor = Rotor(rotor_data['val'], rotor_data['notch'], ring_setting=0, position=notch_letter)
    assert rotor.at_notch()

@pytest.mark.parametrize("rotor_data", ROTORS)
def test_effective_wiring_structure(rotor_data):
    rotor = Rotor(rotor_data['val'], rotor_data['notch'], ring_setting=0, position="A")
    mapping = rotor.effective_wiring()

    # map should be permutation of A-Z
    assert len(set(mapping.values())) == 26

    # A-Z keys mapped
    assert set(mapping.keys()) == set(ALPHABET)

    # values should be valid indices for list
    for value in mapping.values():
        assert 0 <= value < 26

@pytest.mark.parametrize("rotor_data", ROTORS)
def test_effective_wiring_encode_forward(rotor_data):
    rotor = Rotor(rotor_data['val'], rotor_data['notch'], ring_setting=0, position="A")
    mapping = rotor.effective_wiring()

    for letter in ALPHABET:
        idx = ALPHABET.index(letter)
        expected = rotor.encode_forward(idx)

        assert mapping[letter] == expected

@pytest.mark.parametrize("rotor_data", ROTORS)
def test_effective_wiring_change(rotor_data):
    rotor = Rotor(rotor_data['val'], rotor_data['notch'], ring_setting=0, position="A")
    mapping_before = rotor.effective_wiring()

    rotor.step()

    mapping_after = rotor.effective_wiring()

    assert mapping_before != mapping_after

@pytest.mark.parametrize("rotor_data", ROTORS)
def test_effective_wiring_ring_setting(rotor_data):
    rotor1 = Rotor(rotor_data['val'], rotor_data['notch'], ring_setting=0, position="A")
    rotor2 = Rotor(rotor_data['val'], rotor_data['notch'], ring_setting=1, position="A")

    assert rotor1.effective_wiring() != rotor2.effective_wiring()


@pytest.mark.parametrize("reflector_data", REFLECTORS)
def test_reflector_reflect(reflector_data):
    reflector = Reflector(reflector_data['val'])

    for i in range(26):
        reflected = reflector.reflect(i)
        reflect_reflected = reflector.reflect(reflected)
        assert i == reflect_reflected

def test_plugboard_swap():
    plugboard = Plugboard({"A":"B"})
    assert plugboard.swap("A") == "B"
    assert plugboard.swap("B") == "A"
    assert plugboard.swap("C") == "C"

def build_enigma(left_pos="A", mid_pos="A", right_pos="A", verbose=False):
    left = Rotor(ROTORS[0]['val'], ROTORS[0]['notch'], position=left_pos)
    mid = Rotor(ROTORS[1]['val'], ROTORS[1]['notch'], position=mid_pos)
    right = Rotor(ROTORS[2]['val'], ROTORS[2]['notch'], position=right_pos)

    reflector = Reflector(REFLECTORS[1]['val'])
    plugboard = Plugboard({})

    return Enigma([left, mid, right], reflector, plugboard, verbose=verbose)

def test_encrypt_decrypt_symmetry():
    enigma1 = build_enigma()
    enigma2 = build_enigma()
    plaintext = "SOMERANDOMTEXT"

    cipher = enigma1.encrypt(plaintext)

    decrypted = enigma2.encrypt(cipher)

    assert plaintext == decrypted

def test_right_rotor_always_step():
    machine = build_enigma()
    right_initial = machine.right.pos
    mid_initial = machine.mid.pos
    left_initial = machine.left.pos
    machine.step_rotors()

    assert machine.right.pos == (right_initial+1) % 26
    assert machine.mid.pos == (mid_initial) % 26
    assert machine.left.pos == (left_initial) % 26

def test_mid_step_by_right_notch():
    machine = build_enigma(right_pos="V")

    right_initial = machine.right.pos
    mid_initial = machine.mid.pos
    left_initial = machine.left.pos
    machine.step_rotors()

    assert machine.right.pos == (right_initial+1) % 26
    assert machine.mid.pos == (mid_initial+1) % 26
    assert machine.left.pos == (left_initial) % 26

def test_left_step_by_mid_notch():
    machine = build_enigma(mid_pos="E")
    right_initial = machine.right.pos
    mid_initial = machine.mid.pos
    left_initial = machine.left.pos
    machine.step_rotors()

    assert machine.right.pos == (right_initial+1) % 26
    assert machine.mid.pos == (mid_initial+1) % 26
    assert machine.left.pos == (left_initial+1) % 26

def test_get_rotors_pos():
    machine = build_enigma("D", "Z", "G")
    assert machine.get_rotors_pos() == ["D", "Z", "G"]

def test_encrypt_char_steps_before_encoding():
    machine = build_enigma()
    initial_pos = machine.get_rotors_pos()
    machine.encrypt_char("A")
    new_pos = machine.get_rotors_pos()

    assert initial_pos != new_pos

def test_encrypt_char_symmetry():
    machine1 = build_enigma()
    machine2 = build_enigma()

    cipher = machine1.encrypt_char("A")
    decrypt = machine2.encrypt_char(cipher)

    assert decrypt == "A"

@pytest.mark.parametrize("text", ["%", "@", "!", " ", "{"])
def test_encrypt_non_alphabet(text):
    machine = build_enigma()
    cipher = machine.encrypt_char(text)

    assert cipher == text


def test_double_stepping_behavior():
    machine = build_enigma("A", "E", "V")
    plaintext = "AA"
    cipher = machine.encrypt(plaintext)

    assert cipher == "GI"
    assert machine.get_rotors_pos() == ["B", "F", "X"]

def test_verbose_output(capsys):
    build_enigma(verbose=True)

    captured = capsys.readouterr()
    output = captured.out

    assert "Left Rotor: EKMFLGDQVZNTOWYHXUSPAIBRCJ, stepping at notch Q" in output
    assert "Middle Rotor: AJDKSIRUXBLHWTMCQGZNPYFVOE, stepping at notch E" in output
    assert "Right Rotor: BDFHJLCPRTXVZNYEIWGAKMUSQO, stepping at notch V" in output
    assert "Plugboard pairings: {'A': 'A', 'B': 'B', 'C': 'C', 'D': 'D', 'E': 'E', 'F': 'F', 'G': 'G', 'H': 'H', 'I': 'I', 'J': 'J', 'K': 'K', 'L': 'L', 'M': 'M', 'N': 'N', 'O': 'O', 'P': 'P', 'Q': 'Q', 'R': 'R', 'S': 'S', 'T': 'T', 'U': 'U', 'V': 'V', 'W': 'W', 'X': 'X', 'Y': 'Y', 'Z': 'Z'}" in output

def test_enigma_no_verbose_output(capsys):
    # Build Enigma with verbose=False
    build_enigma(verbose=False)

    captured = capsys.readouterr()
    output = captured.out

    # Should be empty
    assert output == ""

def test_enigma_verbose_encrypt(capsys):
    machine = build_enigma(verbose=True)
    cipher = machine.encrypt_char("A")

    captured = capsys.readouterr()
    output = captured.out
    assert "Input letter: A" in output
    assert "Rotors position: AAB" in output
    assert "Plugboard encryption: A" in output
    assert "Wheel 3 Encryption: C" in output
    assert "Wheel 2 Encryption: D" in output
    assert "Wheel 1 Encryption: F" in output
    assert "Reflector Encryption: S" in output
    assert "Wheel 1 Encryption: S" in output
    assert "Wheel 2 Encryption: E" in output
    assert "Wheel 3 Encryption: B" in output
    assert "Plugboard out: B" in output

def test_main_cli_run():
    result = subprocess.run([sys.executable, "enigma.py"], input="HELLOWORLD\n", capture_output=True, text=True)
    assert "Input: HELLOWORLD" in result.stdout
    assert "Result: ILBDAAMTAZ" in result.stdout
    assert result.returncode == 0

def test_main_cli_starting_pos_flag():
    inputs = "G\nH\nZ\nHELLOWORLD\n"
    result = subprocess.run([sys.executable, "enigma.py", "--starting_position"], input=inputs, capture_output=True, text=True)
    assert "Input: HELLOWORLD" in result.stdout
    assert "Result: NAZFVQMLHQ" in result.stdout

    result = subprocess.run([sys.executable, "enigma.py", "-sp"], input=inputs, capture_output=True, text=True)
    assert "Input: HELLOWORLD" in result.stdout
    assert "Result: NAZFVQMLHQ" in result.stdout

def test_main_cli_default_starting_pos_flag():
    inputs = "\n\n\nHELLOWORLD\n"
    result = subprocess.run([sys.executable, "enigma.py", "--starting_position"], input=inputs, capture_output=True, text=True)
    assert "Input: HELLOWORLD" in result.stdout
    assert "Result: ILBDAAMTAZ" in result.stdout

    result = subprocess.run([sys.executable, "enigma.py", "-sp"], input=inputs, capture_output=True, text=True)
    assert "Input: HELLOWORLD" in result.stdout
    assert "Result: ILBDAAMTAZ" in result.stdout

def test_main_cli_default_config_flag():
    inputs = "\n\n\n\n\n\nHELLOWORLD\n"
    result = subprocess.run([sys.executable, "enigma.py", "--config"], input=inputs, capture_output=True, text=True)
    assert "Input: HELLOWORLD" in result.stdout
    assert "Result: ILBDAAMTAZ" in result.stdout

    result = subprocess.run([sys.executable, "enigma.py", "-c"], input=inputs, capture_output=True, text=True)
    assert "Input: HELLOWORLD" in result.stdout
    assert "Result: ILBDAAMTAZ" in result.stdout

def test_main_cli_config_flag():
    inputs = "BDFHJLCPRTXVZNYEIWGAKMUSQO\nV\nVZBRGITYUPSDNHLXAWMJQOFECK\nZ\nEKMFLGDQVZNTOWYHXUSPAIBRCJ\nQ\nHELLOWORLD\n"
    result = subprocess.run([sys.executable, "enigma.py", "--config"], input=inputs, capture_output=True, text=True)
    assert "Input: HELLOWORLD" in result.stdout
    assert "Result: LWWORQINBI" in result.stdout

    result = subprocess.run([sys.executable, "enigma.py", "-c"], input=inputs, capture_output=True, text=True)
    assert "Input: HELLOWORLD" in result.stdout
    assert "Result: LWWORQINBI" in result.stdout