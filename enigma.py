from typing import List, Dict
import argparse

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
    

class Plugboard:
    def __init__(self, pairings: Dict[str, str]):
        self.map = {c: c for c in ALPHABET}
        for a, b in pairings.items():
            a = a.upper()
            b = b.upper()
            if a in ALPHABET and b in ALPHABET and a != b:
                self.map[a] = b
                self.map[b] = a

    def swap(self, char: str) -> str:
        return self.map.get(char.upper(), char.upper())
    

class Enigma:
    def __init__(self, rotors: List[Rotor], reflector: Reflector, plugboard: Plugboard, verbose: bool):
        self.left, self.mid, self.right = rotors
        self.reflector = reflector
        self.plugboard = plugboard
        self.encrypt_steps = ""
        self.verbose = verbose
        if self.verbose:
            print(f"Left Rotor: {self.left.wiring}, stepping at notch {self.left.notch}")
            print(f"Middle Rotor: {self.mid.wiring}, stepping at notch {self.mid.notch}")
            print(f"Right Rotor: {self.right.wiring}, stepping at notch {self.right.notch}")
            print(f"Plugboard pairings: {self.plugboard.map}")

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

    def get_rotors_pos(self):
        return [ALPHABET[self.left.pos], ALPHABET[self.mid.pos], ALPHABET[self.right.pos]]

    def encrypt_char(self, char: str) -> str:
        if char.upper() not in ALPHABET:
            return char
        
        # step before encode
        self.step_rotors()
        
        if self.verbose:
            print(f"Input letter: {char.upper()}")
            print(f"Rotors position: {ALPHABET[self.left.pos]}{ALPHABET[self.mid.pos]}{ALPHABET[self.right.pos]}")

        self.encrypt_steps += f"Input letter: {char.upper()}\n \
                Rotor position: {ALPHABET[self.left.pos]}{ALPHABET[self.mid.pos]}{ALPHABET[self.right.pos]}\n"

        plug_in = self.plugboard.swap(char.upper())
        idx = ALPHABET.index(plug_in)
        if self.verbose:
            print(f"Plugboard encryption: {plug_in}")
        self.encrypt_steps += f"Plugboard encryption: {plug_in}\n"

        idx = self.right.encode_forward(idx)
        if self.verbose:
            print(f"Wheel 3 Encryption: {ALPHABET[idx]}")
        self.encrypt_steps += f"Rotor 3 encryption: {ALPHABET[idx]}\n"
        
        idx = self.mid.encode_forward(idx)
        if self.verbose:
            print(f"Wheel 2 Encryption: {ALPHABET[idx]}")
        self.encrypt_steps += f"Rotor 2 encryption: {ALPHABET[idx]}\n"
        
        idx = self.left.encode_forward(idx)
        if self.verbose:
            print(f"Wheel 1 Encryption: {ALPHABET[idx]}")
        self.encrypt_steps += f"Rotor 1 encryption: {ALPHABET[idx]}\n"

        idx = self.reflector.reflect(idx)
        if self.verbose:
            print(f"Reflector Encryption: {ALPHABET[idx]}")
        self.encrypt_steps += f"Reflector encryption: {ALPHABET[idx]}\n"

        idx = self.left.encode_backward(idx)
        if self.verbose:
            print(f"Wheel 1 Encryption: {ALPHABET[idx]}")
        self.encrypt_steps += f"Rotor 1 encryption: {ALPHABET[idx]}\n"

        idx = self.mid.encode_backward(idx)
        if self.verbose:
            print(f"Wheel 2 Encryption: {ALPHABET[idx]}")
        self.encrypt_steps += f"Rotor 2 encryption: {ALPHABET[idx]}\n"

        idx = self.right.encode_backward(idx)
        if self.verbose:
            print(f"Wheel 3 Encryption: {ALPHABET[idx]}")
        self.encrypt_steps += f"Rotor 3 encryption: {ALPHABET[idx]}\n"

        plug_out = self.plugboard.swap(ALPHABET[idx])
        if self.verbose:
            print(f"Plugboard out: {plug_out}")
            print("="*25)
        
        self.encrypt_steps += f"Plugboard encryption: {plug_out}\n"
        self.encrypt_steps += "="*25
        self.encrypt_steps += "\n"

        return plug_out
    
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

    parser = argparse.ArgumentParser(description="Enigma Machine Simulator")
    parser.add_argument("-v", "--verbose", action="store_true", help="Show rotor mapping as encryption/decryption happens")
    parser.add_argument("-c", "--config", action="store_true", help="Change rotors for the enigma machine")
    parser.add_argument("-sp", "--starting_position", action="store_true", help="Change the starting position for rotors")

    args = parser.parse_args()

    rotor1_sp = 'A'
    rotor2_sp = 'A'
    rotor3_sp = 'A'
    if args.starting_position:
        rotor1_sp = input("Input left rotor starting position (A-Z) (<Enter> to use default): ")
        rotor2_sp = input("Input mid rotor starting position (A-Z) (<Enter> to use default): ")
        rotor3_sp = input("Input right rotor starting position (A-Z) (<Enter> to use default): ")

        if not rotor1_sp:
            rotor1_sp = 'A'
        if not rotor2_sp:
            rotor2_sp = 'A'
        if not rotor3_sp:
            rotor3_sp = 'A'
        
    rotor1 = ROTOR_1
    rotor1_notch = ROTOR_1_STEP
    rotor2 = ROTOR_2
    rotor2_notch = ROTOR_2_STEP
    rotor3 = ROTOR_3
    rotor3_notch = ROTOR_3_STEP

    if args.config:
        rotor1 = input("Input left rotor (<Enter> to use default): ")
        rotor1_notch = input("Input notch for left rotor (<Enter> to use default): ")
        rotor2 = input("Input middle rotor (<Enter> to use default): ")
        rotor2_notch = input("Input notch for middle rotor (<Enter> to use default): ")
        rotor3 = input("Input right rotor (<Enter> to use default): ")
        rotor3_notch = input("Input notch for right rotor (<Enter> to use default): ")

        if not rotor1:
            rotor1 = ROTOR_1
        if not rotor1_notch:
            rotor1_notch = ROTOR_1_STEP
        if not rotor2:
            rotor2 = ROTOR_2
        if not rotor2_notch:
            rotor2_notch = ROTOR_2_STEP
        if not rotor3:
            rotor3 = ROTOR_3
        if not rotor3_notch:
            rotor3_notch = ROTOR_3_STEP

    left = Rotor(rotor1, rotor1_notch, ring_setting=0, position=rotor1_sp)
    mid = Rotor(rotor2, rotor2_notch, ring_setting=0, position=rotor2_sp)
    right = Rotor(rotor3, rotor3_notch, ring_setting=0, position=rotor3_sp)

    reflector = Reflector(REFLECTOR)

    plugboard = Plugboard({})

    enigma = Enigma([left, mid, right], reflector, plugboard, verbose=args.verbose)

    user_input = input("Input text for encrypt/decrypt: ")
    cipher = enigma.encrypt(user_input)

    print("Input:", user_input)
    print("Result:", cipher)