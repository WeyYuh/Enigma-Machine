const url = "http://localhost"
const port = 5000

let selected = [];
let pairings = [];
let usedColors = [];

const rotor1 = document.getElementById("rotor-1");
const rotor2 = document.getElementById("rotor-2");
const rotor3 = document.getElementById("rotor-3");
const ITEM_HEIGHT = 40;
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let currentIdx1 = 0;
let currentIdx2 = 0;
let currentIdx3 = 0;
let isScrolling = false;

for (let i = -1; i <= 1; i++) {
    const div = document.createElement("div");
    div.className = "item";
    rotor1.appendChild(div);
}
for (let i = -1; i <= 1; i++) {
    const div = document.createElement("div");
    div.className = "item";
    rotor2.appendChild(div);
}
for (let i = -1; i <= 1; i++) {
    const div = document.createElement("div");
    div.className = "item";
    rotor3.appendChild(div);
}

function rotorPosOverlay() {
    const overlay = document.createElement("div");
    overlay.className = "overlay";

    const content = document.createElement("div");
    content.className = "overlay-content";
    
    const rotor1PosSelector = document.createElement("select");
    for (let letter in letters) {
        var opt = document.createElement("option");
        opt.value = letters[letter];
        opt.innerHTML = letters[letter];
        rotor1PosSelector.appendChild(opt);
    }
    rotor1PosSelector.value = letters[currentIdx1];

    const rotor2PosSelector = document.createElement("select");
    for (let letter in letters) {
        var opt = document.createElement("option");
        opt.value = letters[letter];
        opt.innerHTML = letters[letter];
        rotor2PosSelector.appendChild(opt);
    }
    rotor2PosSelector.value = letters[currentIdx2];

    const rotor3PosSelector = document.createElement("select");
    for (let letter in letters) {
        var opt = document.createElement("option");
        opt.value = letters[letter];
        opt.innerHTML = letters[letter];
        rotor3PosSelector.appendChild(opt);
    }
    rotor3PosSelector.value = letters[currentIdx3];


    content.appendChild(rotor1PosSelector);
    content.appendChild(rotor2PosSelector);
    content.appendChild(rotor3PosSelector); 
    overlay.appendChild(content);
    document.body.appendChild(overlay);

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            setRotorPosition(rotor1, rotor1PosSelector.value);
            setRotorPosition(rotor2, rotor2PosSelector.value);
            setRotorPosition(rotor3, rotor3PosSelector.value);
            overlay.remove();
        }
    });
}

rotor1.addEventListener("click", () => {
    rotorPosOverlay();
});
rotor2.addEventListener("click", () => {
    rotorPosOverlay();
});
rotor3.addEventListener("click", () => {
    rotorPosOverlay();
});

function updateRotor1() {
    const items = rotor1.querySelectorAll(".item");
    for (let i = -1; i <= 1; i++) {
        let letterIdx = (currentIdx1 + i + letters.length) % letters.length;
        items[i+1].textContent = letters[letterIdx];
    }
}

function updateRotor2() {
    const items = rotor2.querySelectorAll(".item");
    for (let i = -1; i <= 1; i++) {
        let letterIdx = (currentIdx2 + i + letters.length) % letters.length;
        items[i+1].textContent = letters[letterIdx];
    }
}

function updateRotor3() {
    const items = rotor3.querySelectorAll(".item");
    for (let i = -1; i <= 1; i++) {
        let letterIdx = (currentIdx3 + i + letters.length) % letters.length;
        items[i+1].textContent = letters[letterIdx];
    }
}

updateRotor1();
updateRotor2();
updateRotor3();


function scrollRotor1(direction) {
    if (isScrolling) return;
    isScrolling = true;

    currentIdx1 = (currentIdx1 + direction + letters.length) % letters.length;
    updateRotor1();

    const items = rotor1.querySelectorAll(".item");
    items.forEach(item => {
        item.style.transition = "transform 0.15s";
        item.style.transform = `translateY(${-direction * ITEM_HEIGHT}px)`;
    });

    setTimeout(() => {
        items.forEach(item => {
            item.style.transition = "none";
            item.style.transform = "translateY(0)";
        });
        isScrolling = false;
    }, 150);
}

function scrollRotor2(direction) {
    if (isScrolling) return;
    isScrolling = true;

    currentIdx2 = (currentIdx2 + direction + letters.length) % letters.length;
    updateRotor2();

    const items = rotor2.querySelectorAll(".item");
    items.forEach(item => {
        item.style.transition = "transform 0.15s";
        item.style.transform = `translateY(${-direction * ITEM_HEIGHT}px)`;
    });

    setTimeout(() => {
        items.forEach(item => {
            item.style.transition = "none";
            item.style.transform = "translateY(0)";
        });
        isScrolling = false;
    }, 150);
}

function scrollRotor3(direction) {
    if (isScrolling) return;
    isScrolling = true;

    currentIdx3 = (currentIdx3 + direction + letters.length) % letters.length;
    updateRotor3();

    const items = rotor3.querySelectorAll(".item");
    items.forEach(item => {
        item.style.transition = "transform 0.15s";
        item.style.transform = `translateY(${-direction * ITEM_HEIGHT}px)`;
    });

    setTimeout(() => {
        items.forEach(item => {
            item.style.transition = "none";
            item.style.transform = "translateY(0)";
        });
        isScrolling = false;
    }, 150);
}

rotor1.scrollTop = ITEM_HEIGHT * 2;
rotor2.scrollTop = ITEM_HEIGHT * 2;
rotor3.scrollTop = ITEM_HEIGHT * 2;

rotor1.addEventListener('wheel', (e) => {
    e.preventDefault();
    scrollRotor1(e.deltaY > 0 ? 1 : -1);
});
rotor2.addEventListener('wheel', (e) => {
    e.preventDefault();
    scrollRotor2(e.deltaY > 0 ? 1 : -1);
});
rotor3.addEventListener('wheel', (e) => {
    e.preventDefault();
    scrollRotor3(e.deltaY > 0 ? 1 : -1);
});

function getRotorPosition(rotorIdx) {
    switch (rotorIdx) {
        case 1:
            return letters[currentIdx1];
        case 2:
            return letters[currentIdx2];
        case 3:
            return letters[currentIdx3];
    }
}

function setRotorPosition(rotorElement, letter) {
    const idx = letters.indexOf(letter.toUpperCase());

    if (rotorElement === rotor1) {
        currentIdx1 = idx;
        updateRotor1();
    } else if (rotorElement === rotor2) {
        currentIdx2 = idx;
        updateRotor2();
    } else if (rotorElement === rotor3) {
        currentIdx3 = idx;
        updateRotor3();
    }
}

function getColor() {
    let colors = [
        "#ff0000", "#ff8800", "#fff700", "#55ff00",
        "#0000ff", "#9900ff", "#ff00ff", "#910101",
        "#069101", "#018391", "#80003c", "#570080",
        "#a47aff"
    ];

    colors = colors.filter(function(el) {
        return !usedColors.includes(el);
    });

    return colors[0]
}

document.getElementById("clear-btn").addEventListener("click", () => {
    document.getElementById("input").textContent = "";
    document.getElementById("output").textContent = "";
});

let currentColor = getColor();
const pairs = document.querySelectorAll(".pair");
pairs.forEach(pair => {
    pair.addEventListener('click', () => {
        const existingPair = pairings.find(p => 
            p.from === pair.dataset.label || p.to === pair.dataset.label
        );

        if (existingPair && selected.length !== 1) {
            const elemA = document.querySelector(`[data-label='${existingPair.from}']`);
            const elemB = document.querySelector(`[data-label='${existingPair.to}']`);

            elemA.style.background = "black";
            elemB.style.background = "black";

            pairings = pairings.filter(p => p !== existingPair);
            usedColors = usedColors.filter(c => c !== existingPair.color);
            currentColor = existingPair.color;
            selected = selected.filter(el => el !== elementA && el !== elementB);
            sendPlugboardToEnigma();
            return;
        } else if (existingPair && selected.length === 1) {
            return;
        }

        if (selected.includes(pair)) {
            pair.style.background = "black";
            selected = selected.filter(element => element !== pair);
            return;
        }

        // console.log(selected);
        selected.push(pair);
        // console.log(selected);

        pair.style.background = currentColor;

        if (selected.length === 2) {
            const [a,b] = selected;

            const mapping = {
                from: a.dataset.label,
                to: b.dataset.label,
                color: currentColor
            };
            

            pairings.push(mapping);

            sendPlugboardToEnigma();
            
            selected = [];
            usedColors.push(currentColor);
            console.log(usedColors);
            currentColor = getColor();
            console.log(currentColor);
        }
    });
});

async function sendPlugboardToEnigma() {
    try {
        await fetch(`${url}:${port}/plugboard`, {
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(pairings)
        });
    } catch (e) {
        console.error("Error sending:", e);
    }
}

const keys = document.querySelectorAll(".key");
keys.forEach(key => {
    key.addEventListener('click', async () => {
        const letter = key.textContent;
        document.getElementById("input").textContent += letter;

        var rotor1Pos = getRotorPosition(1);
        var rotor2Pos = getRotorPosition(2);
        var rotor3Pos = getRotorPosition(3);

        console.log("sending to server with position:"+rotor1Pos+rotor2Pos+rotor3Pos)

        const encrypted = await sendToEnigmaPy(letter, rotor1Pos, rotor2Pos, rotor3Pos);
        document.getElementById("output").textContent += encrypted;

        lightOnOffAnim(encrypted.toLowerCase());
    });
});

document.addEventListener("keydown", async function (e) {
    if (e.key.length === 1 && e.key.match(/[a-zA-Z]/)) {
        const letter = e.key.toUpperCase();
        document.getElementById("input").textContent += letter;

        var rotor1Pos = getRotorPosition(1);
        var rotor2Pos = getRotorPosition(2);
        var rotor3Pos = getRotorPosition(3);

        const encrypted = await sendToEnigmaPy(letter, rotor1Pos, rotor2Pos, rotor3Pos);

        document.getElementById("output").textContent += encrypted;
        
        lightOnOffAnim(encrypted.toLowerCase());
    }
});

async function sendToEnigmaPy(letter, rotor1Position, rotor2Position, rotor3Position) {
    const res = await fetch(`${url}:${port}/encrypt`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({char: letter, rotor1Pos: rotor1Position, rotor2Pos: rotor2Position, rotor3Pos: rotor3Position})
    });

    const data = await res.json();

    console.log(data.rotor3Pos)
    setRotorPosition(document.getElementById("rotor-1"), data.rotor1Pos);
    setRotorPosition(document.getElementById("rotor-2"), data.rotor2Pos);
    setRotorPosition(document.getElementById("rotor-3"), data.rotor3Pos);
    return data.cipher;
}

async function lightOnOffAnim(letter) {
    document.getElementById("light-"+letter).classList.add('light-light');
    document.getElementById("light-"+letter).classList.remove('light-dim');

    await new Promise(resolve => setTimeout(resolve, 300));

    document.getElementById("light-"+letter).classList.remove('light-light');
    document.getElementById("light-"+letter).classList.add('light-dim');
}