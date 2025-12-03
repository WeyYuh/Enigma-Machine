const url = "http://localhost"
const port = 5000

let selected = [];
let pairings = [];
let usedColors = [];

const rotor1 = document.getElementById("rotor-1");
const rotor2 = document.getElementById("rotor-2");
const rotor3 = document.getElementById("rotor-3");
var ring1 = 0;
var ring2 = 0;
var ring3 = 0;
var steps = "";

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

    const content = document.createElement("table");
    content.className = "overlay-content";

    const header = document.createElement("tr");

    const headerDesc = document.createElement("th");
    headerDesc.innerText = "Setting";
    headerDesc.className = "table-header";

    const headerRotor1 = document.createElement("th");
    headerRotor1.innerText = "Rotor 1";
    headerRotor1.className = "table-header";

    const headerRotor2 = document.createElement("th");
    headerRotor2.innerText = "Rotor 2";
    headerRotor2.className = "table-header";

    const headerRotor3 = document.createElement("th");
    headerRotor3.innerText = "Rotor 3";
    headerRotor3.className = "table-header";

    header.appendChild(headerDesc);
    header.appendChild(headerRotor1);
    header.appendChild(headerRotor2);
    header.appendChild(headerRotor3);
    content.appendChild(header);

    const ringSetting = document.createElement("tr");
    ringSetting.className = "ring-setting-section";

    const ringSettingDesc = document.createElement("td");
    ringSettingDesc.innerText = "Ring Setting:";

    const rotor1RingCell = document.createElement("td");
    const rotor1RingSelector = document.createElement("select");
    rotor1RingSelector.id = "ring1";
    for (let letter in letters) {
        var opt = document.createElement("option");
        opt.value = letters[letter];
        opt.innerHTML = letters[letter];
        rotor1RingSelector.appendChild(opt);
    }
    rotor1RingSelector.value = letters[ring1];
    rotor1RingCell.appendChild(rotor1RingSelector);

    const rotor2RingCell = document.createElement("td");
    const rotor2RingSelector = document.createElement("select");
    for (let letter in letters) {
        var opt = document.createElement("option");
        opt.value = letters[letter];
        opt.innerHTML = letters[letter];
        rotor2RingSelector.appendChild(opt);
    }
    rotor2RingSelector.value = letters[ring2];
    rotor2RingCell.appendChild(rotor2RingSelector);

    const rotor3RingCell = document.createElement("td");
    const rotor3RingSelector = document.createElement("select");
    for (let letter in letters) {
        var opt = document.createElement("option");
        opt.value = letters[letter];
        opt.innerHTML = letters[letter];
        rotor3RingSelector.appendChild(opt);
    }
    rotor3RingSelector.value = letters[ring3];
    rotor3RingCell.appendChild(rotor3RingSelector);

    const rotorPos = document.createElement("tr");
    rotorPos.className = "rotor-pos-section";
    
    const rotorPosDesc = document.createElement("td");
    rotorPosDesc.innerText = "Rotor Positions:";
    
    const rotor1PosCell = document.createElement("td");
    const rotor1PosSelector = document.createElement("select");
    for (let letter in letters) {
        var opt = document.createElement("option");
        opt.value = letters[letter];
        opt.innerHTML = letters[letter];
        rotor1PosSelector.appendChild(opt);
    }
    rotor1PosSelector.value = letters[currentIdx1];
    rotor1PosCell.appendChild(rotor1PosSelector);

    const rotor2PosCell = document.createElement("td");
    const rotor2PosSelector = document.createElement("select");
    for (let letter in letters) {
        var opt = document.createElement("option");
        opt.value = letters[letter];
        opt.innerHTML = letters[letter];
        rotor2PosSelector.appendChild(opt);
    }
    rotor2PosSelector.value = letters[currentIdx2];
    rotor2PosCell.appendChild(rotor2PosSelector);

    const rotor3PosCell = document.createElement("td");
    const rotor3PosSelector = document.createElement("select");
    for (let letter in letters) {
        var opt = document.createElement("option");
        opt.value = letters[letter];
        opt.innerHTML = letters[letter];
        rotor3PosSelector.appendChild(opt);
    }
    rotor3PosSelector.value = letters[currentIdx3];
    rotor3PosCell.appendChild(rotor3PosSelector);

    ringSetting.appendChild(ringSettingDesc);
    ringSetting.appendChild(rotor1RingCell);
    ringSetting.appendChild(rotor2RingCell);
    ringSetting.appendChild(rotor3RingCell);

    rotorPos.appendChild(rotorPosDesc);
    rotorPos.appendChild(rotor1PosCell);
    rotorPos.appendChild(rotor2PosCell);
    rotorPos.appendChild(rotor3PosCell);

    content.appendChild(ringSetting)
    content.appendChild(rotorPos); 
    overlay.appendChild(content);
    document.body.appendChild(overlay);

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            ring1 = letters.indexOf(rotor1RingSelector.value);
            ring2 = letters.indexOf(rotor2RingSelector.value);
            ring3 = letters.indexOf(rotor3RingSelector.value);
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

const stepsBtn = document.getElementById("steps-btn");
const stepsSection = document.getElementById("steps-section");
stepsBtn.addEventListener("click", () => {
    if (stepsBtn.innerText === "Show steps") {
        stepsBtn.innerText = "Hide steps";
        stepsSection.style.display = "block";
    } else {
        stepsBtn.innerText = "Show steps";
        stepsSection.style.display = "none";
    }
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

        console.log(ring1);
        console.log(ring2);
        console.log(ring3);

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
        body: JSON.stringify({
            char: letter, 
            ring1: ring1,
            ring2: ring2,
            ring3: ring3,
            rotor1Pos: rotor1Position, 
            rotor2Pos: rotor2Position,
            rotor3Pos: rotor3Position})
    });

    const data = await res.json();

    setRotorPosition(document.getElementById("rotor-1"), data.rotor1Pos);
    setRotorPosition(document.getElementById("rotor-2"), data.rotor2Pos);
    setRotorPosition(document.getElementById("rotor-3"), data.rotor3Pos);

    const formatted = data.steps.replace(/\n/g, "<br>");
    steps = data.steps;

    if (document.getElementById("steps").innerText === "Encryption steps will appear here...") {
        document.getElementById("steps").innerHTML = formatted;
    } else {
        document.getElementById("steps").innerHTML += "<br>" + formatted;
    }
    return data.cipher;
}

async function lightOnOffAnim(letter) {
    document.getElementById("light-"+letter).classList.add('light-light');
    document.getElementById("light-"+letter).classList.remove('light-dim');

    await new Promise(resolve => setTimeout(resolve, 300));

    document.getElementById("light-"+letter).classList.remove('light-light');
    document.getElementById("light-"+letter).classList.add('light-dim');
}


const width = 1200;
const height = 800;

const svg = d3.select("#viz")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", `0 0 ${width} ${height}`);

const components = {
            keyboard: { x: 0, y: 500, width: 400, height: 225, cols: 13 },
            plugboard: { x: 0, y: 300, width: 900, height: 175, cols: 13 },
            rotor3: { x: 200, y: 300, width: 100, height: 100 },
            rotor2: { x: 400, y: 300, width: 100, height: 100 },
            rotor1: { x: 600, y: 300, width: 100, height: 100 },
            reflector: { x: 800, y: 300, width: 100, height: 100 },
            lampboard: { x: 500, y: 500, width: 400, height: 225, cols: 13 }
        };

const kb = components.keyboard;
const keySize = 35;
const spacing = 5;

const keyboardWidth = kb.width;
const keyboardHeight = kb.height;

const keyboardSection = svg.append("g")
    .attr("class", "keyboard-section")
    .attr("transform", "translate("+ kb.x+", "+kb.y +")");

// Add rectangle box around the keyboard
keyboardSection.append("rect")
    .attr("class", "section-box")
    .attr("width", keyboardWidth)
    .attr("height", keyboardHeight)
    .attr("fill", "#f5f5f5")
    .attr("stroke", "#4cc9f0")
    .attr("stroke-width", 2)
    .attr("rx", 10)
    .attr("ry", 10);

keyboardSection.append("text")
    .attr("class", "section-title")
    .attr("x", keyboardWidth/2) // Center of the rectangle (500/2)
    .attr("y", 25)
    .attr("text-anchor", "middle")
    .attr("font-size", "18px")
    .attr("font-weight", "bold")
    .attr("fill", "#333")
    .text("Keyboard");

const keyboardGroup = keyboardSection.append("g")
                .attr("class", "keyboard-group");

const row1Letters = "QWERTZUIO".split("");
const row2Letters = "ASDFGHJK".split("");
const row3Letters = "PYXCVBNML".split("");

row1Letters.forEach((letter, i) => {
    const row = 1;
    const col = i % kb.cols

    const x = col * (keySize+spacing) + 20;
    const y = row * (keySize+spacing) + 45;

    const key = keyboardGroup.append("g")
                    .attr("class", "key-node")
                    .attr("id", `key-${letter}`)
                    .attr("transform", `translate(${x}, ${y})`);

    key.append("rect")
                    .attr("width", keySize)
                    .attr("height", keySize)
                    .attr("rx", 5)
                    .attr("ry", 5)
                    .attr("fill", "#4361ee")
                    .attr("stroke", "#4cc9f0")
                    .attr("stroke-width", 2);
                
    // Key letter
    key.append("text")
        .attr("x", keySize/2)
        .attr("y", keySize/2 + 5)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-weight", "bold")
        .attr("font-size", "16px")
        .text(letter);
});

row2Letters.forEach((letter, i) => {
    const row = 2;
    const col = i % kb.cols

    const x = col * (keySize+spacing) + 40;
    const y = row * (keySize+spacing) + 45;

    const key = keyboardGroup.append("g")
                    .attr("class", "key-node")
                    .attr("id", `key-${letter}`)
                    .attr("transform", `translate(${x}, ${y})`);

    key.append("rect")
                    .attr("width", keySize)
                    .attr("height", keySize)
                    .attr("rx", 5)
                    .attr("ry", 5)
                    .attr("fill", "#4361ee")
                    .attr("stroke", "#4cc9f0")
                    .attr("stroke-width", 2);
                
    // Key letter
    key.append("text")
        .attr("x", keySize/2)
        .attr("y", keySize/2 + 5)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-weight", "bold")
        .attr("font-size", "16px")
        .text(letter);
});

row3Letters.forEach((letter, i) => {
    const row = 3;
    const col = i % kb.cols

    const x = col * (keySize+spacing) + 20;
    const y = row * (keySize+spacing) + 45;

    const key = keyboardGroup.append("g")
                    .attr("class", "key-node")
                    .attr("id", `key-${letter}`)
                    .attr("transform", `translate(${x}, ${y})`);

    key.append("rect")
                    .attr("width", keySize)
                    .attr("height", keySize)
                    .attr("rx", 5)
                    .attr("ry", 5)
                    .attr("fill", "#4361ee")
                    .attr("stroke", "#4cc9f0")
                    .attr("stroke-width", 2);
                
    // Key letter
    key.append("text")
        .attr("x", keySize/2)
        .attr("y", keySize/2 + 5)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-weight", "bold")
        .attr("font-size", "16px")
        .text(letter);
});

const lampboard = components.lampboard;
const lampboardWidth = lampboard.width;
const lampboardHeight = lampboard.height;

const lampboardSection = svg.append("g")
    .attr("class", "lampboard-section")
    .attr("transform", "translate("+ lampboard.x+", "+ lampboard.y +")");

lampboardSection.append("rect")
    .attr("class", "section-box")
    .attr("width", lampboardWidth)
    .attr("height", lampboardHeight)
    .attr("fill", "#f5f5f5")
    .attr("stroke", "#f04c4cff")
    .attr("stroke-width", 2)
    .attr("rx", 10)
    .attr("ry", 10);

lampboardSection.append("text")
    .attr("class", "section-title")
    .attr("x", lampboardWidth/2) // Center of the rectangle (500/2)
    .attr("y", 25)
    .attr("text-anchor", "middle")
    .attr("font-size", "18px")
    .attr("font-weight", "bold")
    .attr("fill", "#333")
    .text("Lampboard");

const lampboardGroup = lampboardSection.append("g")
                .attr("class", "lampboard-group");

row1Letters.forEach((letter, i) => {
    const row = 1;
    const col = i % kb.cols

    const x = col * (keySize+spacing) + 20;
    const y = row * (keySize+spacing) + 45;

    const key = lampboardGroup.append("g")
                    .attr("class", "key-node")
                    .attr("id", `key-${letter}`)
                    .attr("transform", `translate(${x}, ${y})`);

    key.append("rect")
                    .attr("width", keySize)
                    .attr("height", keySize)
                    .attr("rx", 5)
                    .attr("ry", 5)
                    .attr("fill", "#4361ee")
                    .attr("stroke", "#4cc9f0")
                    .attr("stroke-width", 2);
                
    // Key letter
    key.append("text")
        .attr("x", keySize/2)
        .attr("y", keySize/2 + 5)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-weight", "bold")
        .attr("font-size", "16px")
        .text(letter);
});

row2Letters.forEach((letter, i) => {
    const row = 2;
    const col = i % kb.cols

    const x = col * (keySize+spacing) + 40;
    const y = row * (keySize+spacing) + 45;

    const key = lampboardGroup.append("g")
                    .attr("class", "key-node")
                    .attr("id", `key-${letter}`)
                    .attr("transform", `translate(${x}, ${y})`);

    key.append("rect")
                    .attr("width", keySize)
                    .attr("height", keySize)
                    .attr("rx", 5)
                    .attr("ry", 5)
                    .attr("fill", "#4361ee")
                    .attr("stroke", "#4cc9f0")
                    .attr("stroke-width", 2);
                
    // Key letter
    key.append("text")
        .attr("x", keySize/2)
        .attr("y", keySize/2 + 5)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-weight", "bold")
        .attr("font-size", "16px")
        .text(letter);
});

row3Letters.forEach((letter, i) => {
    const row = 3;
    const col = i % kb.cols

    const x = col * (keySize+spacing) + 20;
    const y = row * (keySize+spacing) + 45;

    const lamp = lampboardGroup.append("g")
                    .attr("class", "key-node")
                    .attr("id", `key-${letter}`)
                    .attr("transform", `translate(${x}, ${y})`);

    lamp.append("rect")
                    .attr("width", keySize)
                    .attr("height", keySize)
                    .attr("rx", 5)
                    .attr("ry", 5)
                    .attr("fill", "#4361ee")
                    .attr("stroke", "#4cc9f0")
                    .attr("stroke-width", 2);
                
    // Key letter
    lamp.append("text")
        .attr("x", keySize/2)
        .attr("y", keySize/2 + 5)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-weight", "bold")
        .attr("font-size", "16px")
        .text(letter);
});

const plugboard = components.plugboard;
const plugboardSection = svg.append("g")
    .attr("class", "plugboard-section")
    .attr("transform", "translate("+ plugboard.x+", "+ plugboard.y +")");

plugboardSection.append("rect")
    .attr("class", "section-box")
    .attr("width", plugboard.width)
    .attr("height", plugboard.height)
    .attr("fill", "#f5f5f5")
    .attr("stroke", "#4cf052ff")
    .attr("stroke-width", 2)
    .attr("rx", 10)
    .attr("ry", 10);

plugboardSection.append("text")
    .attr("class", "section-title")
    .attr("x", plugboard.width/2) // Center of the rectangle (500/2)
    .attr("y", 25)
    .attr("text-anchor", "middle")
    .attr("font-size", "18px")
    .attr("font-weight", "bold")
    .attr("fill", "#333")
    .text("Plugboard");

const plugboardGroup = plugboardSection.append("g")
                .attr("class", "plugboard-group");

letters.forEach((letter, i) => {
    const x = i * (keySize-2)+20;
    const y = 1 * (keySize+spacing);
    const pbLetter = plugboardGroup.append("g")
                    .attr("class", "key-node")
                    .attr("id", `key-${letter}`)
                    .attr("transform", `translate(${x}, ${y})`);

    pbLetter.append("text")
        .attr("x", keySize/2)
        .attr("y", keySize/2 + 5)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-weight", "bold")
        .attr("font-size", "16px")
        .text(letter);
});

letters.forEach((letter, i) => {
    const x = i * (keySize-2)+20;
    const y = 2 * (keySize+spacing) + 45;
    const pbLetter = plugboardGroup.append("g")
                    .attr("class", "key-node")
                    .attr("id", `key-${letter}`)
                    .attr("transform", `translate(${x}, ${y})`);

    pbLetter.append("text")
        .attr("x", keySize/2)
        .attr("y", keySize/2 + 5)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-weight", "bold")
        .attr("font-size", "16px")
        .text(letter);
});