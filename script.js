const url = "http://127.0.0.1"
const port = 5000

let selected = [];
let pairings = [];
let usedColors = [];
let pbMaps = [];
let rotor1Maps = [];
let rotor2Maps = [];
let rotor3Maps = [];
let reflectorMaps = [];
let animIndex = 0;

const rotor1 = document.getElementById("rotor-1");
const rotor2 = document.getElementById("rotor-2");
const rotor3 = document.getElementById("rotor-3");
var rotor1Option = "EKMFLGDQVZNTOWYHXUSPAIBRCJ";
var rotor2Option = "AJDKSIRUXBLHWTMCQGZNPYFVOE";
var rotor3Option = "BDFHJLCPRTXVZNYEIWGAKMUSQO";
var rotor1Notch = "Q";
var rotor2Notch = "E";
var rotor3Notch = "V";
var ring1 = 0;
var ring2 = 0;
var ring3 = 0;
var reflectorOption = "YRUHQSLDPXNGOKMIEBFZCWVJAT";
var steps = "";
var count = 1;

const ITEM_HEIGHT = 40;
const rotors = [
    {"name": "Rotor I", "val": "EKMFLGDQVZNTOWYHXUSPAIBRCJ", "notch": "Q"},
    {"name": "Rotor II", "val": "AJDKSIRUXBLHWTMCQGZNPYFVOE", "notch": "E"},
    {"name": "Rotor III", "val": "BDFHJLCPRTXVZNYEIWGAKMUSQO", "notch": "V"},
    {"name": "Rotor IV", "val": "ESOVPZJAYQUIRHXLNFTGKDCMWB", "notch": "J"},
    {"name": "Rotor V", "val": "VZBRGITYUPSDNHLXAWMJQOFECK", "notch": "Z"},
    {"name": "Rotor VI", "val": "JPGVOUMFYQBENHZRDKASXLICTW", "notch": "ZM"},
    {"name": "Rotor VII", "val": "NZJHGRCXMYSWBOUFAIVLPEKQDT", "notch": "ZM"},
    {"name": "Rotor VIII", "val": "FKQHTLXOCBJSPDZRAMEWNIUYGV", "notch": "ZM"},
];
const reflectors = [
    {"name": "UKW-A", "val": "EJMZALYXVBWFCRQUONTSPIKHGD"},
    {"name": "UKW-B", "val": "YRUHQSLDPXNGOKMIEBFZCWVJAT"},
    {"name": "UKW-C", "val": "FVPJIAOYEDRZXWGCTKUQSBNMHL"},
];
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

    const reflectorCell = document.createElement("th");
    reflectorCell.innerText = "Reflector";
    const reflectorSelector = document.createElement("select");
    reflectorSelector.id = "reflector-option";
    for (let reflector of reflectors) {
        var opt = document.createElement("option");
        opt.value = reflector.val;
        opt.innerHTML = reflector.name;
        reflectorSelector.appendChild(opt);
    }
    reflectorSelector.value = reflectorOption;
    reflectorCell.appendChild(reflectorSelector);
    reflectorCell.className = "table-header";

    const headerRotor1 = document.createElement("th");
    headerRotor1.innerText = "Rotor 1";
    headerRotor1.className = "table-header";

    const headerRotor2 = document.createElement("th");
    headerRotor2.innerText = "Rotor 2";
    headerRotor2.className = "table-header";

    const headerRotor3 = document.createElement("th");
    headerRotor3.innerText = "Rotor 3";
    headerRotor3.className = "table-header";

    header.appendChild(reflectorCell);
    header.appendChild(headerRotor1);
    header.appendChild(headerRotor2);
    header.appendChild(headerRotor3);
    content.appendChild(header);

    const rotorSetting = document.createElement("tr");
    rotorSetting.className = "rotor-setting-section";
    const rotorSettingDesc = document.createElement("td");
    rotorSettingDesc.innerText = "Rotor:";

    const rotor1Cell = document.createElement("td");
    const rotor1Select = document.createElement("select");
    rotor1Select.id = "rotor1-option";
    for (let rotor of rotors) {
        var opt = document.createElement("option");
        opt.value = rotor.val;
        opt.innerHTML = rotor.name;
        rotor1Select.appendChild(opt);
    }
    rotor1Select.value = rotor1Option;

    const rotor2Cell = document.createElement("td");
    const rotor2Select = document.createElement("select");
    rotor2Select.id = "rotor2-option";
    for (let rotor of rotors) {
        var opt = document.createElement("option");
        opt.value = rotor.val;
        opt.innerHTML = rotor.name;
        rotor2Select.appendChild(opt);
    }
    rotor2Select.value = rotor2Option;
    
    const rotor3Cell = document.createElement("td");
    const rotor3Select = document.createElement("select");
    rotor3Select.id = "rotor3-option";
    for (let rotor of rotors) {
        var opt = document.createElement("option");
        opt.value = rotor.val;
        opt.innerHTML = rotor.name;
        rotor3Select.appendChild(opt);
    }
    rotor3Select.value = rotor3Option;
    
    rotor1Cell.appendChild(rotor1Select);
    rotor2Cell.appendChild(rotor2Select);
    rotor3Cell.appendChild(rotor3Select);
    rotorSetting.appendChild(rotorSettingDesc);
    rotorSetting.appendChild(rotor1Cell);
    rotorSetting.appendChild(rotor2Cell);
    rotorSetting.appendChild(rotor3Cell);

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

    content.appendChild(rotorSetting);
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

            rotor1Option = rotor1Select.value;
            rotor1Notch = rotors.find(r=>r.val === rotor1Select.value).notch;

            rotor2Option = rotor2Select.value;
            rotor2Notch = rotors.find(r=>r.val === rotor2Select.value).notch;

            rotor3Option = rotor3Select.value;
            rotor3Notch = rotors.find(r=>r.val === rotor3Select.value).notch;

            reflectorOption = reflectorSelector.value;
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
            return;
        } else if (existingPair && selected.length === 1) {
            return;
        }

        if (selected.includes(pair)) {
            pair.style.background = "black";
            selected = selected.filter(element => element !== pair);
            return;
        }


        selected.push(pair);


        pair.style.background = currentColor;

        if (selected.length === 2) {
            const [a,b] = selected;

            const mapping = {
                from: a.dataset.label,
                to: b.dataset.label,
                color: currentColor
            };
            

            pairings.push(mapping);
            
            selected = [];
            usedColors.push(currentColor);

            currentColor = getColor();

        }
    });
});

const keys = document.querySelectorAll(".key");
keys.forEach(key => {
    key.addEventListener('click', async () => {
        const letter = key.textContent;
        document.getElementById("input").textContent += letter;



        var rotor1Pos = getRotorPosition(1);
        var rotor2Pos = getRotorPosition(2);
        var rotor3Pos = getRotorPosition(3);



        const encrypted = await sendToEnigmaPy(letter, rotor1Pos, rotor2Pos, rotor3Pos, rotor1Option, rotor2Option, rotor3Option, rotor1Notch, rotor2Notch, rotor3Notch, reflectorOption);
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

        const encrypted = await sendToEnigmaPy(letter, rotor1Pos, rotor2Pos, rotor3Pos, rotor1Option, rotor2Option, rotor3Option, rotor1Notch, rotor2Notch, rotor3Notch, reflectorOption);

        document.getElementById("output").textContent += encrypted;
        
        lightOnOffAnim(encrypted.toLowerCase());
    }
});

async function sendToEnigmaPy(letter, rotor1Position, rotor2Position, rotor3Position, rotor1, rotor2, rotor3, rotor1Notch, rotor2Notch, rotor3Notch, reflectorOption) {
    console.log(pairings);
    
    const res = await fetch(`${url}:${port}/encrypt`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            char: letter, 
            ring1: ring1,
            ring2: ring2,
            ring3: ring3,
            rotor1: rotor1,
            rotor2: rotor2,
            rotor3: rotor3,
            rotor1Notch: rotor1Notch,
            rotor2Notch: rotor2Notch,
            rotor3Notch: rotor3Notch,
            rotor1Pos: rotor1Position, 
            rotor2Pos: rotor2Position,
            rotor3Pos: rotor3Position,
            reflector: reflectorOption,
            plugboardMap: pairings
        })
    });

    const data = await res.json();

    setRotorPosition(document.getElementById("rotor-1"), data.rotor1Pos);
    setRotorPosition(document.getElementById("rotor-2"), data.rotor2Pos);
    setRotorPosition(document.getElementById("rotor-3"), data.rotor3Pos);

    pbMaps.push(data.pbMap);
    rotor1Maps.push(data.rotor1Map);
    rotor2Maps.push(data.rotor2Map);
    rotor3Maps.push(data.rotor3Map);
    reflectorMaps.push(data.reflectorMap);

    const formatted = data.steps.replace(/\n/g, "<br>");
    steps = data.steps;
    
    if (document.getElementById("steps").innerText === "Encryption steps will appear here...") {
        document.getElementById("steps").innerText = "";
    }

    let stepDetails = document.createElement("div");
    stepDetails.id = "step-"+count+"-section";
    
    let stepText = document.createElement("p");
    stepText.id = "step-"+count+"-text";
    stepText.innerHTML = count + ". " + formatted;
    
    let stepButton = document.createElement("button");
    stepButton.id = "step-"+count+"-button";
    stepButton.innerHTML = "Show encryption path for "+count+".";

    stepButton.addEventListener("click", () => {

        const diagram = document.getElementById("viz");
        if (diagram.style.display === "none") {
            diagram.style.display = "block";
        }
        
        if (diagram) {
            diagram.scrollIntoView({behavior: "smooth", block: "start"});
        }

        const stepNumber = stepButton.id.split("-")[1];
        const stepText = document.getElementById(`step-${stepNumber}-text`).innerText;


        startAnimation(stepText.replace(/^\d+\.\s*/, ""), pbMaps[stepNumber-1], rotor1Maps[stepNumber-1], rotor2Maps[stepNumber-1], rotor3Maps[stepNumber-1], reflectorMaps[stepNumber-1]);
        
    });
    
    stepDetails.append(stepText);
    stepDetails.append(stepButton);
    document.getElementById("steps-section").insertBefore(stepDetails, document.getElementById("viz"));
    // document.getElementById("steps-section").append(stepDetails);

    count++; 
    return data.cipher;
}

function parseSteps(text) {
    const lines = text.split("\n").map(l=>l.trim()).filter(l=>l && !l.startsWith("="));

    const result = {};

    lines.forEach(line => {
        const [key, value] = line.split(":").map(s => s.trim());

        // Normalize keys to dictionary-friendly names
        switch (key) {
            case "Input letter":
                result.input = value;
                break;
            case "Rotor position":
                result.rotorPosition = value;
                break;

            case "Plugboard encryption":
                if (!result.plugboard) result.plugboard = { in: null, out: null };
                if (result.plugboard.in === null) result.plugboard.in = value;
                else result.plugboard.out = value;
                break;

            case "Rotor 3 encryption":
                if (!result.rotor3) result.rotor3 = { in: value, out: null };
                else result.rotor3.out = value;
                break;

            case "Rotor 2 encryption":
                if (!result.rotor2) result.rotor2 = { in: value, out: null };
                else result.rotor2.out = value;
                break;

            case "Rotor 1 encryption":
                if (!result.rotor1) result.rotor1 = { in: value, out: null };
                else result.rotor1.out = value;
                break;

            case "Reflector encryption":
                result.reflector = value;
                break;
        }
    });

    return result;
}

function drawRotor1Connections(rotor1Mapping) {
    const colors = ["#FF4D4D",
            "#4DFF4D", 
            "#FFD24D", 
            "#4DA6FF", 
            "#FF944D", 
            "#B84DFF", 
            "#4DFFFF", 
            "#FF4DDA", 
            "#DFFF4D", 
            "#FFC0CB",
            "#33CCCC", 
            "#E6CCFF",
            "#CC9966", 
            "#FFFF99", 
            "#FF6666", 
            "#99FFCC", 
            "#CCCC33",
            "#FFCC99",
            "#6699FF", 
            "#B3B3B3", 
            "#FFFFFF", 
            "#FF99CC", 
            "#99CCFF", 
            "#CCFF66", 
            "#CC66FF"
    ];
    for (const [key, value] of Object.entries(rotor1Mapping)) {
        drawRotorLine(key, letters[value], 1, colors[value]);
    }
}

function drawRotor2Connections(rotor2Mapping) {
    const colors = ["#FF4D4D",
            "#4DFF4D", 
            "#FFD24D", 
            "#4DA6FF", 
            "#FF944D", 
            "#B84DFF", 
            "#4DFFFF", 
            "#FF4DDA", 
            "#DFFF4D", 
            "#FFC0CB",
            "#33CCCC", 
            "#E6CCFF",
            "#CC9966", 
            "#FFFF99", 
            "#FF6666", 
            "#99FFCC", 
            "#CCCC33",
            "#FFCC99",
            "#6699FF", 
            "#B3B3B3", 
            "#FFFFFF", 
            "#FF99CC", 
            "#99CCFF", 
            "#CCFF66", 
            "#CC66FF"
    ];

    for (const [key, value] of Object.entries(rotor2Mapping)) {
        drawRotorLine(key, letters[value], 2, colors[value]);
    }
}

function drawRotor3Connections(rotor3Mapping) {
    const colors = ["#FF4D4D",
            "#4DFF4D", 
            "#FFD24D", 
            "#4DA6FF", 
            "#FF944D", 
            "#B84DFF", 
            "#4DFFFF", 
            "#FF4DDA", 
            "#DFFF4D", 
            "#FFC0CB",
            "#33CCCC", 
            "#E6CCFF",
            "#CC9966", 
            "#FFFF99", 
            "#FF6666", 
            "#99FFCC", 
            "#CCCC33",
            "#FFCC99",
            "#6699FF", 
            "#B3B3B3", 
            "#FFFFFF", 
            "#FF99CC", 
            "#99CCFF", 
            "#CCFF66", 
            "#CC66FF"
    ];

    for (const [key, value] of Object.entries(rotor3Mapping)) {
        drawRotorLine(key, letters[value], 3, colors[value]);
    }
}

function drawRotorLine(a, b, rotorId, color) {
    const from = document.querySelector(`#rotor${rotorId}-${a}-out text`);
    const to = document.querySelector(`#rotor${rotorId}-${b}-in text`);

    from.setAttribute("fill", color);
    from.setAttribute("stroke", "black");
    from.setAttribute("stroke-width", "0.4");
    to.setAttribute("fill", color);
    to.setAttribute("stroke", "black");
    to.setAttribute("stroke-width", "0.4");
}

function drawReflectorConnections(reflectorMapping) {
    const colors = ["#FF4D4D",
            "#4DFF4D", 
            "#FFD24D", 
            "#4DA6FF", 
            "#FF944D", 
            "#B84DFF", 
            "#4DFFFF", 
            "#FF4DDA", 
            "#DFFF4D", 
            "#FFC0CB",
            "#33CCCC", 
            "#E6CCFF",
            "#CC9966", 
            "#FFFF99", 
            "#FF6666", 
            "#99FFCC", 
            "#CCCC33",
            "#FFCC99",
            "#6699FF", 
            "#B3B3B3", 
            "#FFFFFF", 
            "#FF99CC", 
            "#99CCFF", 
            "#CCFF66", 
            "#CC66FF"
    ];

    for (const [key, value] of Object.entries(reflectorMapping)) {
        drawReflectorLine(letters[key], letters[value], colors[value]);
        drawReflectorLine(letters[value], letters[key], colors[value]);
    }
}

function drawReflectorLine(a, b, color) {
    const from = document.querySelector(`#reflector-${a}-out text`);
    const to = document.querySelector(`#reflector-${b}-in text`);

    from.setAttribute("fill", color);
    from.setAttribute("stroke", "black");
    from.setAttribute("stroke-width", "0.4");
    to.setAttribute("fill", color);
    to.setAttribute("stroke", "black");
    to.setAttribute("stroke-width", "0.4");
}

function startAnimation(text, pbMapping, rotor1Mapping, rotor2Mapping, rotor3Mapping, reflectorMapping) {
    animIndex++;
    const currAnimIdx = animIndex;
    const result = parseSteps(text);

    svg.selectAll(".flow-arrow").remove();
    svg.selectAll(".plugboard-connection").remove();
    svg.selectAll(".plugboard-connection-outline").remove();
    svg.selectAll(".rotor-connection").remove();
    svg.selectAll(".rotor-connection-outline").remove();
    svg.selectAll(".reflector-connection-outline").remove();
    svg.selectAll(".reflector-connection").remove();
    svg.selectAll(".key-node rect")
        .attr("fill", "#eee")
        .attr("stroke", "#000");

    svg.selectAll(".key-node text")
        .attr("fill", "#000");

    keyPressText = document.querySelector(`#key-${result.input} text`);
    keyPressRect = document.querySelector(`#key-${result.input} rect`);
    keyPressRect.setAttribute("fill", "#000");
    keyPressRect.setAttribute("stroke", "#eee");
    keyPressText.setAttribute("fill", "#eee");

    lampRect = document.querySelector(`#lampboard-${result.plugboard.out} rect`);
    lampRect.setAttribute("fill", "#edde05");

    drawPbConnections(pbMapping);
    drawRotor1Connections(rotor1Mapping);
    drawRotor2Connections(rotor2Mapping);
    drawRotor3Connections(rotor3Mapping);
    drawReflectorConnections(reflectorMapping);

    const arrows = [
        [`key-${result.input}`, `pb-${result.input}-in`, "#4cc9f0", "arrowKbToPb"],

        [`pb-${result.input}-in`, `pb-${result.plugboard.in}-out`, "#4cf052ff", "arrowPbToPbIn"],
        [`pb-${result.plugboard.in}-out`, `rotor3-${result.plugboard.in}-out`, "#4cf052ff", "arrowPbToRotor3"],

        [`rotor3-${result.plugboard.in}-out`, `rotor3-${result.rotor3.in}-in`, "#575757ff", "arrowRotor3ToRotor3"],
        [`rotor3-${result.rotor3.in}-in`, `rotor2-${result.rotor3.in}-out`, "#575757ff", "arrowRotor3ToRotor2"],

        [`rotor2-${result.rotor3.in}-out`, `rotor2-${result.rotor2.in}-in`, "#575757ff", "arrowRotor2ToRotor2"],
        [`rotor2-${result.rotor2.in}-in`, `rotor1-${result.rotor2.in}-out`, "#575757ff", "arrowRotor2ToRotor1"],

        [`rotor1-${result.rotor2.in}-out`, `rotor1-${result.rotor1.in}-in`, "#575757ff", "arrowRotor1ToRotor1"],
        [`rotor1-${result.rotor1.in}-in`, `reflector-${result.rotor1.in}-out`, "#575757ff", "arrowRotor1ToReflector"],

        [`reflector-${result.rotor1.in}-out`, `reflector-${result.reflector}-in`, "#7300d8ff", "arrowReflectorToReflector"],
        [`reflector-${result.reflector}-in`, `reflector-${result.reflector}-out`, "#7300d8ff", "arrowReflectorToReflectorBack"],
        [`reflector-${result.reflector}-out`, `rotor1-${result.reflector}-in`, "#7300d8ff", "arrowReflectorToRotor1"],

        [`rotor1-${result.reflector}-in`, `rotor1-${result.rotor1.out}-out`, "#575757ff", "arrowRotor1ToRotor1Back"],
        [`rotor1-${result.rotor1.out}-out`, `rotor2-${result.rotor1.out}-in`, "#575757ff", "arrowRotor1ToRotor2"],

        [`rotor2-${result.rotor1.out}-in`, `rotor2-${result.rotor2.out}-out`, "#575757ff", "arrowRotor2ToRotor2Back"],
        [`rotor2-${result.rotor2.out}-out`, `rotor3-${result.rotor2.out}-in`, "#575757ff", "arrowRotor2ToRotor3"],

        [`rotor3-${result.rotor2.out}-in`, `rotor3-${result.rotor3.out}-out`, "#575757ff", "arrowRotor3ToRotor3Back"],
        [`rotor3-${result.rotor3.out}-out`, `pb-${result.rotor3.out}-out`, "#575757ff", "arrowRotor3ToPb"],

        [`pb-${result.rotor3.out}-out`, `pb-${result.plugboard.out}-in`, "#4cf052ff", "arrowPbToPbOut"],
        [`pb-${result.plugboard.out}-in`, `lampboard-${result.plugboard.out}`, "#4cf052ff", "arrowPbToLampboard"]
    ];

    function animateArrow(index) {
        if (animIndex !== currAnimIdx) return; 
        if (index >= arrows.length) return;
        const [fromId, toId, color, arrowId] = arrows[index];
        if (index < 10) {
            drawUpArrow(fromId, toId, color, arrowId, 500, () => {
                animateArrow(index + 1);
            });
        } else {
            drawDownArrow(fromId, toId, color, arrowId, 500, () => {
                animateArrow(index + 1);
            });
        }
        
    }

    animateArrow(0);
}

function drawPbConnections(pbMapping) {
    const drawn = new Set();
    var count = 0;
    const colors = ["#FF4D4D",
            "#4DFF4D", 
            "#FFD24D", 
            "#4DA6FF", 
            "#FF944D", 
            "#B84DFF", 
            "#4DFFFF", 
            "#FF4DDA", 
            "#DFFF4D", 
            "#FFC0CB",
            "#33CCCC", 
            "#E6CCFF",
            "#CC9966", 
            "#FFFF99", 
            "#FF6666", 
            "#99FFCC", 
            "#CCCC33",
            "#FFCC99",
            "#6699FF", 
            "#B3B3B3", 
            "#FFFFFF", 
            "#FF99CC", 
            "#99CCFF", 
            "#CCFF66", 
            "#CC66FF"
    ];

    letters.forEach(letter => {
        if (drawn.has(letter)) return;
        const pair = pbMapping[letter];
        console.log(`${pair}, ${letter}`);
        if (pair) {
            drawPbLine(letter, pair, colors[count]);
            drawPbLine(pair, letter, colors[count]);
            drawn.add(letter);
            drawn.add(pair);
        } else {
            drawPbLine(letter, letter, colors[count]);
        }
        count++;
        
        
    });
}

function drawPbLine(a, b, color) {

    const from = document.querySelector(`#pb-${a}-in text`);
    const to = document.querySelector(`#pb-${b}-out text`);

    from.setAttribute("fill", color);
    from.setAttribute("stroke", "black");
    from.setAttribute("stroke-width", "0.4");
    to.setAttribute("fill", color);
    to.setAttribute("stroke", "black");
    to.setAttribute("stroke-width", "0.4");
    
}

function getNodeCenter(id) {
    const node = d3.select(`#${id}`).node();
    const bbox = node.getBBox();
    const matrix = node.getCTM();

    return {
        x: matrix.e + bbox.x + bbox.width / 2,
        y: matrix.f + bbox.y + bbox.height / 2
    };
}

function drawUpArrow(fromId, toId, color, arrowId, duration = 1000, callback) {
    const p1 = getNodeCenter(fromId);
    const p2 = getNodeCenter(toId);
    const length = Math.hypot(p2.x - p1.x, p2.y - p1.y);

    const line = svg.append("line")
        .attr("class", "flow-arrow")
        .attr("x1", p1.x)
        .attr("y1", p1.y-10)
        .attr("x2", p2.x)
        .attr("y2", p2.y+10)
        .attr("stroke", color)
        .attr("stroke-width", 3)
        .attr("stroke-dasharray", length)
        .attr("stroke-dashoffset", length);

    line.transition()
        .duration(duration)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0)
        .on("end", () => {
            line.attr("marker-end", `url(#${arrowId})`);
            if (callback) callback();
        });
}

function drawDownArrow(fromId, toId, color, arrowId, duration = 1000, callback) {
    const p1 = getNodeCenter(fromId);
    const p2 = getNodeCenter(toId);
    const length = Math.hypot(p2.x - p1.x, p2.y - p1.y);

    const line = svg.append("line")
        .attr("class", "flow-arrow")
        .attr("x1", p1.x)
        .attr("y1", p1.y+10)
        .attr("x2", p2.x)
        .attr("y2", p2.y-10)
        .attr("stroke", color)
        .attr("stroke-width", 3)
        .attr("stroke-dasharray", length)
        .attr("stroke-dashoffset", length);

    line.transition()
        .duration(duration)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0)
        .on("end", () => {
            line.attr("marker-end", `url(#${arrowId})`);
            if (callback) callback();
        });
}

async function lightOnOffAnim(letter) {
    document.getElementById("light-"+letter).classList.add('light-light');
    document.getElementById("light-"+letter).classList.remove('light-dim');

    await new Promise(resolve => setTimeout(resolve, 300));

    document.getElementById("light-"+letter).classList.remove('light-light');
    document.getElementById("light-"+letter).classList.add('light-dim');
}


const width =1200;
const height = 1122;
const keySize = 35;
const spacing = 5;

const svg = d3.select("#viz")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", `0 0 ${width} ${height}`)
            ;
            
svg.append("defs").append("marker")
    .attr("id", "arrowKbToPb")
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 10)
    .attr("refY", 5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("markerUnits", "strokeWidth")
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 z")
    .attr("fill", "#4cc9f0");

svg.append("defs").append("marker")
    .attr("id", "arrowPbToPbIn")
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 10)
    .attr("refY", 5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("markerUnits", "strokeWidth")
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 z")
    .attr("fill", "#4cf052ff");

svg.append("defs").append("marker")
    .attr("id", "arrowPbToRotor3")
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 10)
    .attr("refY", 5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("markerUnits", "strokeWidth")
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 z")
    .attr("fill", "#4cf052ff");

svg.append("defs").append("marker")
    .attr("id", "arrowRotor3ToRotor3")
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 10)
    .attr("refY", 5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("markerUnits", "strokeWidth")
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 z")
    .attr("fill", "#575757ff");

svg.append("defs").append("marker")
    .attr("id", "arrowRotor3ToRotor3Back")
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 10)
    .attr("refY", 5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("markerUnits", "strokeWidth")
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 z")
    .attr("fill", "#575757ff");

svg.append("defs").append("marker")
    .attr("id", "arrowRotor3ToRotor2")
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 10)
    .attr("refY", 5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("markerUnits", "strokeWidth")
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 z")
    .attr("fill", "#575757ff");

svg.append("defs").append("marker")
    .attr("id", "arrowRotor2ToRotor2")
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 10)
    .attr("refY", 5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("markerUnits", "strokeWidth")
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 z")
    .attr("fill", "#575757ff");

svg.append("defs").append("marker")
    .attr("id", "arrowRotor2ToRotor2Back")
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 10)
    .attr("refY", 5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("markerUnits", "strokeWidth")
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 z")
    .attr("fill", "#575757ff");


svg.append("defs").append("marker")
    .attr("id", "arrowRotor2ToRotor1")
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 10)
    .attr("refY", 5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("markerUnits", "strokeWidth")
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 z")
    .attr("fill", "#575757ff");

svg.append("defs").append("marker")
    .attr("id", "arrowRotor1ToRotor1")
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 10)
    .attr("refY", 5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("markerUnits", "strokeWidth")
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 z")
    .attr("fill", "#575757ff");

svg.append("defs").append("marker")
    .attr("id", "arrowRotor1ToRotor1Back")
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 10)
    .attr("refY", 5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("markerUnits", "strokeWidth")
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 z")
    .attr("fill", "#575757ff");

svg.append("defs").append("marker")
    .attr("id", "arrowRotor1ToReflector")
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 10)
    .attr("refY", 5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("markerUnits", "strokeWidth")
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 z")
    .attr("fill", "#575757ff");

svg.append("defs").append("marker")
    .attr("id", "arrowReflectorToReflector")
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 10)
    .attr("refY", 5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("markerUnits", "strokeWidth")
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 z")
    .attr("fill", "#7300d8ff");

svg.append("defs").append("marker")
    .attr("id", "arrowReflectorToReflectorBack")
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 10)
    .attr("refY", 5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("markerUnits", "strokeWidth")
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 z")
    .attr("fill", "#7300d8ff");

svg.append("defs").append("marker")
    .attr("id", "arrowReflectorToRotor1")
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 10)
    .attr("refY", 5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("markerUnits", "strokeWidth")
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 z")
    .attr("fill", "#7300d8ff");
    
svg.append("defs").append("marker")
    .attr("id", "arrowRotor1ToRotor2")
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 10)
    .attr("refY", 5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("markerUnits", "strokeWidth")
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 z")
    .attr("fill", "#575757ff");

svg.append("defs").append("marker")
    .attr("id", "arrowRotor2ToRotor3")
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 10)
    .attr("refY", 5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("markerUnits", "strokeWidth")
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 z")
    .attr("fill", "#575757ff");

svg.append("defs").append("marker")
    .attr("id", "arrowRotor3ToPb")
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 10)
    .attr("refY", 5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("markerUnits", "strokeWidth")
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 z")
    .attr("fill", "#575757ff");

svg.append("defs").append("marker")
    .attr("id", "arrowPbToPbOut")
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 10)
    .attr("refY", 5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("markerUnits", "strokeWidth")
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 z")
    .attr("fill", "#4cf052ff");

svg.append("defs").append("marker")
    .attr("id", "arrowPbToLampboard")
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 10)
    .attr("refY", 5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("markerUnits", "strokeWidth")
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 z")
    .attr("fill", "#4cf052ff");

const components = {
            keyboard: { x: 0, y: 947, width: 400, height: 175, cols: 13 },
            plugboard: { x: 0, y: 760, width: 900, height: 175, cols: 13 },
            rotor3: { x: 0, y: 573, width: 900, height: 175 },
            rotor2: { x: 0, y: 386, width: 900, height: 175 },
            rotor1: { x: 0, y: 199, width: 900, height: 175 },
            reflector: { x: 0, y: 10, width: 900, height: 175 },
            lampboard: { x: 500, y: 947, width: 400, height: 175, cols: 13 }
        };

const rotor1Component = components.rotor1
const rotor1Section = svg.append("g")
        .attr("class", "rotor-section")
        .attr("transform", "translate("+rotor1Component.x+", "+rotor1Component.y+")")

rotor1Section.append("rect")
    .attr("class", "section-box")
    .attr("width", rotor1Component.width)
    .attr("height", rotor1Component.height)
    .attr("fill", "#f5f5f5")
    .attr("stroke", "#575757ff")
    .attr("stroke-width", 2)
    .attr("rx", 10)
    .attr("ry", 10);

rotor1Section.append("text")
    .attr("class", "section-title")
    .attr("x", rotor1Component.width/2) // Center of the rectangle (500/2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .attr("font-size", "18px")
    .attr("font-weight", "bold")
    .attr("fill", "#333")
    .text("Rotor 1");

letters.forEach((letter, i) => {
    const x = i * (keySize-2)+20;
    const y = (keySize+spacing);
    const rotor1Letter = rotor1Section.append("g")
                    .attr("class", "key-node")
                    .attr("id", `rotor1-${letter}-in`)
                    .attr("transform", `translate(${x}, ${y})`);

    rotor1Letter.append("text")
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
    const rotor1Letter = rotor1Section.append("g")
                    .attr("class", "key-node")
                    .attr("id", `rotor1-${letter}-out`)
                    .attr("transform", `translate(${x}, ${y})`);

    rotor1Letter.append("text")
        .attr("x", keySize/2)
        .attr("y", keySize/2 + 5)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-weight", "bold")
        .attr("font-size", "16px")
        .text(letter);
});

const rotor2Component = components.rotor2
const rotor2Section = svg.append("g")
        .attr("class", "rotor-section")
        .attr("transform", "translate("+rotor2Component.x+", "+rotor2Component.y+")")

rotor2Section.append("rect")
    .attr("class", "section-box")
    .attr("width", rotor2Component.width)
    .attr("height", rotor2Component.height)
    .attr("fill", "#f5f5f5")
    .attr("stroke", "#575757ff")
    .attr("stroke-width", 2)
    .attr("rx", 10)
    .attr("ry", 10);

rotor2Section.append("text")
    .attr("class", "section-title")
    .attr("x", rotor2Component.width/2) // Center of the rectangle (500/2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .attr("font-size", "18px")
    .attr("font-weight", "bold")
    .attr("fill", "#333")
    .text("Rotor 2");

letters.forEach((letter, i) => {
    const x = i * (keySize-2)+20;
    const y = (keySize+spacing);
    const rotor2Letter = rotor2Section.append("g")
                    .attr("class", "key-node")
                    .attr("id", `rotor2-${letter}-in`)
                    .attr("transform", `translate(${x}, ${y})`);

    rotor2Letter.append("text")
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
    const rotor2Letter = rotor2Section.append("g")
                    .attr("class", "key-node")
                    .attr("id", `rotor2-${letter}-out`)
                    .attr("transform", `translate(${x}, ${y})`);

    rotor2Letter.append("text")
        .attr("x", keySize/2)
        .attr("y", keySize/2 + 5)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-weight", "bold")
        .attr("font-size", "16px")
        .text(letter);
});

const rotor3Component = components.rotor3
const rotor3Section = svg.append("g")
        .attr("class", "rotor-section")
        .attr("transform", "translate("+rotor3Component.x+", "+rotor3Component.y+")")

rotor3Section.append("rect")
    .attr("class", "section-box")
    .attr("width", rotor3Component.width)
    .attr("height", rotor3Component.height)
    .attr("fill", "#f5f5f5")
    .attr("stroke", "#575757ff")
    .attr("stroke-width", 2)
    .attr("rx", 10)
    .attr("ry", 10);

rotor3Section.append("text")
    .attr("class", "section-title")
    .attr("x", rotor3Component.width/2) // Center of the rectangle (500/2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .attr("font-size", "18px")
    .attr("font-weight", "bold")
    .attr("fill", "#333")
    .text("Rotor 3");

letters.forEach((letter, i) => {
    const x = i * (keySize-2)+20;
    const y = (keySize+spacing);
    const rotor3Letter = rotor3Section.append("g")
                    .attr("class", "key-node")
                    .attr("id", `rotor3-${letter}-in`)
                    .attr("transform", `translate(${x}, ${y})`);

    rotor3Letter.append("text")
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
    const rotor3Letter = rotor3Section.append("g")
                    .attr("class", "key-node")
                    .attr("id", `rotor3-${letter}-out`)
                    .attr("transform", `translate(${x}, ${y})`);

    rotor3Letter.append("text")
        .attr("x", keySize/2)
        .attr("y", keySize/2 + 5)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-weight", "bold")
        .attr("font-size", "16px")
        .text(letter);
});


const reflectorComponent = components.reflector
const reflectorSection = svg.append("g")
        .attr("class", "rotor-section")
        .attr("transform", "translate("+reflectorComponent.x+", "+reflectorComponent.y+")")

reflectorSection.append("rect")
    .attr("class", "section-box")
    .attr("width", reflectorComponent.width)
    .attr("height", reflectorComponent.height)
    .attr("fill", "#f5f5f5")
    .attr("stroke", "#7300d8ff")
    .attr("stroke-width", 2)
    .attr("rx", 10)
    .attr("ry", 10);

reflectorSection.append("text")
    .attr("class", "section-title")
    .attr("x", reflectorComponent.width/2) // Center of the rectangle (500/2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .attr("font-size", "18px")
    .attr("font-weight", "bold")
    .attr("fill", "#333")
    .text("Reflector");

letters.forEach((letter, i) => {
    const x = i * (keySize-2)+20;
    const y = (keySize+spacing);
    const reflectorLetter = reflectorSection.append("g")
                    .attr("class", "key-node")
                    .attr("id", `reflector-${letter}-in`)
                    .attr("transform", `translate(${x}, ${y})`);

    reflectorLetter.append("text")
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
    const reflectorLetter = reflectorSection.append("g")
                    .attr("class", "key-node")
                    .attr("id", `reflector-${letter}-out`)
                    .attr("transform", `translate(${x}, ${y})`);

    reflectorLetter.append("text")
        .attr("x", keySize/2)
        .attr("y", keySize/2 + 5)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-weight", "bold")
        .attr("font-size", "16px")
        .text(letter);
});



const kb = components.keyboard;


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
    const row = 0;
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
                    .attr("fill", "#eee")
                    .attr("stroke", "#000")
                    .attr("stroke-width", 2);
                
    // Key letter
    key.append("text")
        .attr("x", keySize/2)
        .attr("y", keySize/2 + 5)
        .attr("text-anchor", "middle")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("font-size", "16px")
        .text(letter);
});

row2Letters.forEach((letter, i) => {
    const row = 1;
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
                    .attr("fill", "#eee")
                    .attr("stroke", "#000")
                    .attr("stroke-width", 2);
                
    // Key letter
    key.append("text")
        .attr("x", keySize/2)
        .attr("y", keySize/2 + 5)
        .attr("text-anchor", "middle")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("font-size", "16px")
        .text(letter);
});

row3Letters.forEach((letter, i) => {
    const row = 2;
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
                    .attr("fill", "#eee")
                    .attr("stroke", "#000")
                    .attr("stroke-width", 2);
                
    // Key letter
    key.append("text")
        .attr("x", keySize/2)
        .attr("y", keySize/2 + 5)
        .attr("text-anchor", "middle")
        .attr("fill", "#000")
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
    const row = 0;
    const col = i % kb.cols

    const x = col * (keySize+spacing) + 20;
    const y = row * (keySize+spacing) + 45;

    const key = lampboardGroup.append("g")
                    .attr("class", "lamp-node")
                    .attr("id", `lampboard-${letter}`)
                    .attr("transform", `translate(${x}, ${y})`);

    key.append("rect")
                    .attr("width", keySize)
                    .attr("height", keySize)
                    .attr("rx", 5)
                    .attr("ry", 5)
                    .attr("fill", "#edde05")
                    .attr("stroke", "#000")
                    .attr("stroke-width", 2);
                
    // Key letter
    key.append("text")
        .attr("x", keySize/2)
        .attr("y", keySize/2 + 5)
        .attr("text-anchor", "middle")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("font-size", "16px")
        .text(letter);
});

row2Letters.forEach((letter, i) => {
    const row = 1;
    const col = i % kb.cols

    const x = col * (keySize+spacing) + 40;
    const y = row * (keySize+spacing) + 45;

    const key = lampboardGroup.append("g")
                    .attr("class", "lamp-node")
                    .attr("id", `lampboard-${letter}`)
                    .attr("transform", `translate(${x}, ${y})`);

    key.append("rect")
                    .attr("width", keySize)
                    .attr("height", keySize)
                    .attr("rx", 5)
                    .attr("ry", 5)
                    .attr("fill", "#edde05")
                    .attr("stroke", "#000")
                    .attr("stroke-width", 2);
                
    // Key letter
    key.append("text")
        .attr("x", keySize/2)
        .attr("y", keySize/2 + 5)
        .attr("text-anchor", "middle")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("font-size", "16px")
        .text(letter);
});

row3Letters.forEach((letter, i) => {
    const row = 2;
    const col = i % kb.cols

    const x = col * (keySize+spacing) + 20;
    const y = row * (keySize+spacing) + 45;

    const lamp = lampboardGroup.append("g")
                    .attr("class", "lamp-node")
                    .attr("id", `lampboard-${letter}`)
                    .attr("transform", `translate(${x}, ${y})`);

    lamp.append("rect")
                    .attr("width", keySize)
                    .attr("height", keySize)
                    .attr("rx", 5)
                    .attr("ry", 5)
                    .attr("fill", "#edde05")
                    .attr("stroke", "#000")
                    .attr("stroke-width", 2);
                
    // Key letter
    lamp.append("text")
        .attr("x", keySize/2)
        .attr("y", keySize/2 + 5)
        .attr("text-anchor", "middle")
        .attr("fill", "#000")
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
                    .attr("id", `pb-${letter}-out`)
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
                    .attr("id", `pb-${letter}-in`)
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