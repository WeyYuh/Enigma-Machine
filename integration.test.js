/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8");
const { getByText, getByTestId, getAllByText } = require('@testing-library/dom');

require('@testing-library/jest-dom');

describe("Enigma Machine Simulator HTML Integration Test", ()=>{
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    test("rotors exists with yellow highlights", () => {
        const rotor1 = document.getElementById('rotor-1');
        const rotor2 = document.getElementById('rotor-2');
        const rotor3 = document.getElementById('rotor-3');

        expect(rotor1).toBeInTheDocument();
        expect(rotor2).toBeInTheDocument();
        expect(rotor3).toBeInTheDocument();

        expect(rotor1.querySelector('.highlight')).toBeInTheDocument();
        expect(rotor2.querySelector('.highlight')).toBeInTheDocument();
        expect(rotor3.querySelector('.highlight')).toBeInTheDocument();
    });

    test("every letter is in lampboard", () => {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        letters.forEach(letter => {
            const light = document.getElementById(`light-${letter.toLowerCase()}`);
            expect(light).toBeInTheDocument();
            expect(light.textContent).toBe(letter);
        });
    });

    test("every letter is in keyboard", () => {
        const keys = document.querySelectorAll(".key");
        expect(keys.length).toBe(26);
        const letters = Array.from(keys).map(k=>k.textContent);
        expect(letters).toEqual(expect.arrayContaining("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")));
    });

    test("plugboard pairs exist with right labels", () => {
        const pairs = document.querySelectorAll(".pair")
    });
});