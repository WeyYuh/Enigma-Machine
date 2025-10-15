from typing import List, Dict

ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

class Rotor:
    def __init__(self, wiring: str, notch: str, ring_setting: int=0, position: str="A"):
        """
        wiring: 26 letter string mapping that matches the output for input
        notch: letters that cause the next rotor to step
        ring_setting: 0-25 where 0 is A
        position: initial rotor position, by default "A"
        """
        assert len(wiring) == len(ALPHABET)
        self.wiring = wiring
        self.notch = notch
        self.ring = ring_setting % len(ALPHABET)
        self.pos = ALPHABET.index(position.upper())

        # forward mapping for speed
        self.forward_map = [ALPHABET.index(c) for c in wiring]
        # reverse mapping for speed
        self.reverse_map = [0]*len(ALPHABET)
        for i, v in enumerate(self.forward_map):
            self.reverse_map[v] = i

    def step(self):
        # function for rotor to increase by 1
        self.pos = (self.pos + 1) % len(ALPHABET)

    def at_notch(self) -> bool:
        # check if current pos shows notch letter
        return ALPHABET[self.pos] in self.notch
    
    def encode_forward(self, char_index: int) -> int:
        # char_index: A is 0 and Z is 25
        shifted = (char_index + self.pos - self.ring) % len(ALPHABET)
        wired = self.forward_map[shifted]
        out = (wired - self.pos + self.ring) % len(ALPHABET)
        return out
    
    def encode_backward(self, char_index: int) -> int:
        shifted = (char_index + self.pos - self.ring) % len(ALPHABET)
        wired = self.reverse_map[shifted]
        out = (wired - self.pos + self.ring) % len(ALPHABET)
        return out
    

class Reflector:
    def __init__(self, wiring: str):
        assert len(wiring) == len(ALPHABET)
        self.map = [ALPHABET.index(c) for c in wiring]

    def reflect(self, char_index: int) -> int:
        return self.map[char_index] 
    

class Enigma:
    def __init__(self, rotors: List[Rotor], reflector: Reflector):
        self.left, self.mid, self.right = rotors
        self.reflector = reflector

    def step_rotors(self):
        # if middle rotor at notch, left and mid rotor step
        # if right rotor at notch, middle rotor step
        # right rotor always step
        if self.mid.at_notch():
            self.mid.step()
            self.left.step()
        elif self.right.at_notch():
            self.mid.step()
        self.right.step()

    def encrypt_char(self, char: str) -> str:
        if char.upper() not in ALPHABET:
            return char
        
        # step before encode
        self.step_rotors()
        idx = ALPHABET.index(char.upper())

        idx = self.right.encode_forward(idx)
        idx = self.mid.encode_forward(idx)
        idx = self.left.encode_forward(idx)

        idx = self.reflector.reflect(idx)

        idx = self.left.encode_backward(idx)
        idx = self.mid.encode_backward(idx)
        idx = self.right.encode_backward(idx)

        return ALPHABET[idx]
    
    def encrypt(self, msg: str) -> str:
        return ''.join(self.encrypt_char(c) for c in msg)
    

ROTOR_1 = "EKMFLGDQVZNTOWYHXUSPAIBRCJ"
ROTOR_1_STEP = "Q"
ROTOR_2 = "AJDKSIRUXBLHWTMCQGZNPYFVOE"
ROTOR_2_STEP = "E"
ROTOR_3 = "BDFHJLCPRTXVZNYEIWGAKMUSQO"
ROTOR_3_STEP = "V"
REFLECTOR = "YRUHQSLDPXNGOKMIEBFZCWVJAT"

if __name__ == '__main__':
    left = Rotor(ROTOR_1, ROTOR_1_STEP, ring_setting=0, position='A')
    mid = Rotor(ROTOR_2, ROTOR_2_STEP, ring_setting=0, position='A')
    right = Rotor(ROTOR_3, ROTOR_3_STEP, ring_setting=0, position='A')

    reflector = Reflector(REFLECTOR)

    enigma = Enigma([left, mid, right], reflector)

    user_input = input("Input text for encrypt/decrypt: ")
    cipher = enigma.encrypt(user_input)

    print("Input:", user_input)
    print("Result:", cipher)