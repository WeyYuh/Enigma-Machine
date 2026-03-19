/**
 * @jest-environment jsdom
 */

// ------------------------
// 1. Mock globals BEFORE require
// ------------------------

global.letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
global.rotors = [
    {"name": "Rotor I", "val": "EKMFLGDQVZNTOWYHXUSPAIBRCJ", "notch": "Q"},
    {"name": "Rotor II", "val": "AJDKSIRUXBLHWTMCQGZNPYFVOE", "notch": "E"},
    {"name": "Rotor III", "val": "BDFHJLCPRTXVZNYEIWGAKMUSQO", "notch": "V"},
];
global.reflectors = [
    {"name": "UKW-A", "val": "EJMZALYXVBWFCRQUONTSPIKHGD"},
    {"name": "UKW-B", "val": "YRUHQSLDPXNGOKMIEBFZCWVJAT"},
];

// Mock rotor and DOM elements so appendChild does not fail
global.rotor1 = { appendChild: jest.fn(), querySelectorAll: jest.fn().mockReturnValue([]) };
global.rotor2 = { appendChild: jest.fn(), querySelectorAll: jest.fn().mockReturnValue([]) };
global.rotor3 = { appendChild: jest.fn(), querySelectorAll: jest.fn().mockReturnValue([]) };

// Other globals used in script.js
global.reflectorOption = 'YRUHQSLDPXNGOKMIEBFZCWVJAT';
global.rotor1Option = 'EKMFLGDQVZNTOWYHXUSPAIBRCJ';
global.rotor2Option = 'AJDKSIRUXBLHWTMCQGZNPYFVOE';
global.rotor3Option = 'BDFHJLCPRTXVZNYEIWGAKMUSQO';
global.ring1 = 0;
global.ring2 = 0;
global.ring3 = 0;
global.currentIdx1 = 0;
global.currentIdx2 = 0;
global.currentIdx3 = 0;
global.rotor1Notch = "Q";
global.rotor2Notch = "E";
global.rotor3Notch = "V";
global.isScrolling = false;
global.ITEM_HEIGHT = 20;
global.svg = { selectAll: jest.fn().mockReturnThis(), append: jest.fn().mockReturnThis(), attr: jest.fn().mockReturnThis() };
global.animIndex = 0;
global.count = 1;
global.pbMaps = [];
global.rotor1Maps = [];
global.rotor2Maps = [];
global.rotor3Maps = [];
global.reflectorMaps = [];
global.usedColors = [];
global.pairings = {};
global.setRotorPosition = jest.fn();
global.url = 'http://localhost';
global.port = 8000;
global.steps = '';

// ------------------------
// 2. Now require the module
// ------------------------

const { rotorPosOverlay, updateRotor1, updateRotor2, updateRotor3, scrollRotor1, scrollRotor2, scrollRotor3,
        getRotorPosition, setRotorPosition, getColor, parseSteps, drawRotor1Connections, drawRotor2Connections,
        drawRotor3Connections, drawReflectorConnections, drawPbConnections, drawUpArrow, drawDownArrow,
        lightOnOffAnim, sendToEnigmaPy } = require('./script.js');

// ------------------------
// 3. Tests
// ------------------------

describe("UI module", () => {

    beforeEach(() => {
        document.body.innerHTML = "";
        jest.clearAllMocks();
    });

    it("creates overlay with correct elements", () => {
        rotorPosOverlay();
        const overlay = document.querySelector(".overlay");
        expect(overlay).not.toBeNull();
        expect(document.querySelectorAll("select").length).toBe(7); // 3 rotors + 3 ring + reflector
    });

    it("updates rotor and reflector options on overlay click", () => {
        rotorPosOverlay();
        const overlay = document.querySelector(".overlay");

        const rotor1Select = document.getElementById("rotor1-option");
        rotor1Select.value = "AJDKSIRUXBLHWTMCQGZNPYFVOE";

        const reflectorSelect = document.getElementById("reflector-option");
        reflectorSelect.value = "FVPJIAOYEDRZXWGCTKUQSBNMHL";

        // Simulate click on overlay
        overlay.click();

        expect(global.rotor1Option).toBe('AJDKSIRUXBLHWTMCQGZNPYFVOE');
        expect(global.reflectorOption).toBe('FVPJIAOYEDRZXWGCTKUQSBNMHL');
        expect(global.rotor1Notch).toBe('E');
        expect(document.querySelector('.overlay')).toBeNull();
    });

    it("parseSteps returns correct object", () => {
        const text = `
        Input letter: A
        Rotor position: B
        Plugboard encryption: C
        Plugboard encryption: D
        Rotor 3 encryption: E
        Rotor 3 encryption: F
        Rotor 2 encryption: G
        Rotor 2 encryption: H
        Rotor 1 encryption: I
        Rotor 1 encryption: J
        Reflector encryption: K
        `;
        const result = parseSteps(text);
        expect(result.input).toBe("A");
        expect(result.rotorPosition).toBe("B");
        expect(result.plugboard.in).toBe("C");
        expect(result.plugboard.out).toBe("D");
        expect(result.rotor3.in).toBe("E");
        expect(result.rotor3.out).toBe("F");
        expect(result.rotor2.in).toBe("G");
        expect(result.rotor2.out).toBe("H");
        expect(result.rotor1.in).toBe("I");
        expect(result.rotor1.out).toBe("J");
        expect(result.reflector).toBe("K");
    });

    it("getColor returns first unused color", () => {
        global.usedColors = ["#ff0000", "#ff8800"];
        const color = getColor();
        expect(color).toBe("#fff700");
    });

});