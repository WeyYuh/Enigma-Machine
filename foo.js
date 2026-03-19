
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