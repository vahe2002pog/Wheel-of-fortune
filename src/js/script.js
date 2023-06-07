let canvas = document.getElementById('wheel');
let ctx = canvas.getContext("2d");
let W = null;
let H = null;
let wheelRadius = null;
let textSize = null;
let cW = null;
let cH = null;
let spin = document.getElementById("spin");
let sctx = spin.getContext("2d");
let spinAngle = window.innerWidth <= 800 ? 90 : 0;
let winnerField = document.getElementById("winnerField");
let rowCount;
let players = [];
let desPlayers = [];
let autoIncrement = 1;
let fortuneTextMaxLength = 16;
const headerHeight = 50;
const spinnerPadding = 40;
let ended = true, added = false;
let interval;
let randNumber, noneRandNumber, a = 0;
let pastItems = null;

resize();
readFromParams();

window.addEventListener('resize', resize);
$('#checkbox1').change(updateUrl);

function resize() {
    const isVertical = window.innerHeight > window.innerWidth * 1;
    setOrientation(isVertical ? 'vertical' : 'horizontal');
    if (!isVertical) {
        const inputMinWidth = 220;
        const winnerFieldWidth = 150;
        const width = window.innerWidth - inputMinWidth - winnerFieldWidth;
        W = Math.min(window.innerHeight - spinnerPadding - headerHeight, width * 0.8);
    } else {
        W = Math.min(window.innerWidth - spinnerPadding, window.innerHeight * 0.6);
    }
    H = W;

    wheelRadius = (W - 40) / 2;
    textSize = W > 500 ? 20 : W / 30;

    cW = W / 2;
    cH = H / 2;

    spinAngle = isVertical ? 90 : 0;
    ctx.canvas.width = W;
    ctx.canvas.height = H;
    sctx.canvas.width = W;
    sctx.canvas.height = H;
    fortuneTextMaxLength = window.innerWidth > 1200 || window.innerWidth <= 800 && window.innerWidth > 780 ? 16 : 12;

    try {
        drawSpin();
        drawWheel(players);
    } catch (error) {
        console.warn(error);
    }

};

function readFromParams() {
    const listItems = getParameterByName('list');
    if (listItems !== null){
        listItems.split('$_$').filter(Boolean).forEach((element,index) => {
            $(`#text${index}`).val(element);
            keyPressed(index,{code:'null'});
            textChanged(index);
        });
    }

    const desItems = getParameterByName('des');
    if (desItems !== null){
        const start = players.length;
        desItems.split('$_$').filter(Boolean).forEach((text, index) => {
            const id = start + index + 1;
            desPlayers.push({id: id, text: text, color: getRandomColor()});
            $('#destroyedList').append(getNewItem(id, 1, text));
        });
    }

    const titleParam = getParameterByName('title');
    if(titleParam !== 'null' && titleParam){
        $('#title').text(titleParam);
    }

    const checkedParams = getParameterByName('checked');

    if (checkedParams) {
        $('#checkbox1').prop('checked', checkedParams === 'true');
    }
}

function drawSpin() {
    sctx.beginPath();
    sctx.strokeStyle = "#3a3a3a";
    sctx.arc(cW, cH, wheelRadius - 3, 0, 2 * Math.PI);
    sctx.lineWidth = 8;
    sctx.stroke();

    sctx.fillStyle = "orange"
    sctx.font = "bold " + textSize + "px Comic Sans MS";
    
    sctx.beginPath();
    sctx.strokeStyle = "#3a3a3a";
    sctx.arc(cW, cH, wheelRadius / 6, 0, 2 * Math.PI);
    sctx.lineWidth = 5;
    const size = W > 500 ? 40 : W / 12;

    sctx.save();
    sctx.translate(cW, cH);
    sctx.rotate(-Math.PI * spinAngle / 180);
    sctx.translate(-cW, -cH);

    sctx.moveTo(cW + wheelRadius - size, cH);
    sctx.lineTo(cW + wheelRadius + size / 2, cH + size * 3 / 8);
    sctx.lineTo(cW + wheelRadius + size / 2, cH - size * 3 / 8);
    sctx.lineTo(cW + wheelRadius - size, cH);
    sctx.stroke();
    sctx.fill();
    sctx.restore();

    sctx.lineWidth = 5;
    sctx.fillStyle = "black";
    sctx.strokeStyle = "white";
    sctx.textAlign = "center";
    sctx.strokeText("Spin", cW, cH + 5);
    sctx.fillText("Spin", cW, cH + 5);
}

function drawWheel(players) {
    const playerCount = players.length;
    let angle = (2 / playerCount) * Math.PI;
    ctx.clearRect(0, 0, W, H);
    ctx.font = "bold " + textSize + "px Comic Sans MS";
    ctx.strokeStyle = "black";
    
    for (let i = 0; i < playerCount; i++) {
        ctx.fillStyle = players[i].color;
        ctx.beginPath();
        ctx.lineTo(cW, cH);
        ctx.lineTo(Math.cos(i * angle) * wheelRadius + cW, Math.sin(i * angle) * wheelRadius + cH);
        ctx.arc(cW, cH, wheelRadius, i * angle, (i + 1) * angle);
        ctx.lineTo(cW, cH);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fill();
        if (players[i].text != undefined) {
            ctx.save();
            ctx.translate(cW, cH);
            let ra = angle * (i + 0.5);
            ctx.rotate(ra);
            ctx.lineWidth = 5;
            ctx.fillStyle = "black";
            ctx.strokeStyle = "white";
            ctx.textAlign = "center";
            const text = players[i].text.substring(0, fortuneTextMaxLength) + (
                players[i].text.length > fortuneTextMaxLength ? '...' : ''
            );
            ctx.strokeText(text, wheelRadius / 1.8, textSize / 2 - 6);
            ctx.fillText(text, wheelRadius / 1.8, textSize / 2 - 6);
            ctx.restore();
        }
    }
}


function rotate() {
    let delta = noneRandNumber / 800;
    canvas.style.transform = `rotate(${a}deg)`;
    if(noneRandNumber > 20){
        a += 30 - noneRandNumber;
    }
    else{
        a += noneRandNumber;
    }
    if(noneRandNumber < 20.5 && noneRandNumber > 19.5 && !added){
        a += randNumber;
        added = true;
    }
    noneRandNumber -= delta;
    if(noneRandNumber < 0.01) {
        clearInterval(interval);
        noneRandNumber = 0;
        ended = true;
        $("#lefColumn input").prop('disabled', false);
    }
    getWinner(a + spinAngle);
}

function spinButton() {
    if (ended && players.length > 1) {
        interval = setInterval(rotate, 1);
        randNumber = Math.floor(Math.random() * Math.floor(360));
        noneRandNumber = 30;
        ended = false;
        added = false;
        $("#lefColumn input").prop('disabled', true);
    }
}

function getWinner(value) {
    const playerCount = players.length;
    let angle = value - (Math.floor(value / 360) * 360);
    let id = playerCount - Math.floor(angle / (360 / playerCount)) - 1;
    let winnder = players[id].text;
    winnerField.innerHTML = winnder;
    if (ended) {
        if ($("#checkbox1").prop('checked')) {
            setTimeout(function () {
                removeByIndex(players[id].id, 1);
                $("#destroyedList").append(getNewItem(desPlayers[desPlayers.length-1].id, 1, winnder));
                drawWheel(players);
                updateUrl();
            }, 800);
        }
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getNewItem(id, param = 0, text = ""){
    let className = ["cross", "arrow"];
    let methodName = ["removeByIndex", "returnItem"]
    let div = `
    <div class="playerItem" id="playerItem${id}">
    <input id="text${id}" class="nicksInput"  maxlength="50" onchange="textChanged(${id})" value="${text}" onkeydown="keyPressed(${id}, event)" type="text" onPaste="onPaste(event)">
    <span class="inputButton ${className[param]}" onclick="${methodName[param]}(${id})"></span>
    </div>`;
    return div;
}

function textChanged(id){
    if (rowCount > 0) {
        let text = $(`#text${id}`).val();
        if (text != "") {
            let r = 0;
            players.forEach(element => {
                if (element.id == id) {
                    element.text = text;
                }
                else
                r++;
            });
            if (r == players.length) {
                players.push({
                    id: id,
                    text: text,
                    color: getRandomColor()
                })
            }
            drawWheel(players);
            updateUrl();
        }
        else {
            removeByIndex(id);
        }
    }
}

function keyPressed(id, event) {
    let rows = $("#playerList input");
    let index = 0;
    newItem(id);
    if(event.code == "Enter"){
        for (let i = 0; i < rows.length; i++) {
            if($(rows[i]).attr('id') == `text${id}`){
                index = i+1;
                break;
            }
        }
        $(rows[index]).focus();
    }
}

function newItem(id){
    let table = $("#playerList");
    let rows = $("#playerList input");
    rowCount = rows.length;
    
    if ($(rows[rowCount - 1]).attr('id') == `text${id}`) {
        table.append(getNewItem(autoIncrement));
        autoIncrement++;
    }
}

function removeByIndex(id, param = 0) {
    if($(`#playerList input`).length > 1){
        $(`#playerItem${id}`).remove();
        for (let i = 0; i < players.length; i++) {
            if (players[i].id == id) {
                if(param != 0){
                    desPlayers.push(players[i]);
                }
                players.splice(i, 1);
                drawWheel(players);
                updateUrl();
                break;
            }
        }
    }
}

function returnItem(id){
    $(`#playerItem${id}`).remove();
    for (let i = 0; i < desPlayers.length; i++) {
        if (desPlayers[i].id == id) {
            desPlayers[i].id = autoIncrement-1;
            $(`#text${autoIncrement-1}`).val(desPlayers[i].text);
            newItem(autoIncrement-1);
            players.push(desPlayers[i]);
            desPlayers.splice(i, 1);
            drawWheel(players)
            updateUrl();
            break;
        }
    }
}

function updateUrl() {
    try {
        window.history.replaceState('', '', getUrlParams());
    } catch (error) {}
}

function setOrientation(orientation) {
    if (orientation === 'vertical') {
        addClass('vertical');
        removeClass('horizontal');
    } else {
        addClass('horizontal');
        removeClass('vertical');
    }
}

/**
 * @param {string[]} items
 */
function pushPlayers(items) {
    players.splice(0);
    $("#playerList").empty();

    items.forEach((text, index) => {
        players.push({
            id: index,
            text: text,
            color: getRandomColor()
        });
        $("#playerList").append(getNewItem(index, 0, text));
    });
}

function onPaste(event) {
    if (players.length === 0 && autoIncrement < 3) {
        const pastString = event.clipboardData.getData('text/plain');
        return pasteByString(pastString);
    }
};

function pasteByString(pastString) {
    if (!pastString) {
        return;
    }

    const clear = (items) => {
        return items.map((item) => {
            return item.trim();
        }).filter(Boolean);
    };

    if (pastString.search(/\n/) !== -1) {
        pastItems = clear(pastString.split(/\n/));
    } else {
        pastItems = clear(pastString.split(/\s/));
    }

    pastItems.forEach((item) => {
        $('#pastList').append(`<div class="past-item">${item}</div>`);
    });

    if (pastItems.length > 1) {
        pastDialog.showModal();
        return false;
    }
}

function applyPast() {
    pastDialog.close();
    if (pastItems && pastItems.length) {
        pushPlayers(pastItems);
        drawWheel(players);
        updateUrl();
        keyPressed($("#playerList input").length - 1, { code: 'null' });
    }
}
