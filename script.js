let canvas = document.getElementById("wheel");
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
let playerCount, rowCount;
let players = [];
let desPlayers = [];
let params = getParameterByName("list", window.location.href);
let autoIncrement = 1;

resize();

window.addEventListener('resize', resize);

function resize() {
    if (window.innerWidth > 800) {
        const inputsWidth = 220;
        const winnerFieldWidth = 150;
        const width = window.innerWidth - inputsWidth - winnerFieldWidth;
        W = Math.min(window.innerHeight * 0.9 , width * 0.8);
    } else {
        W = Math.min(window.innerWidth, window.innerHeight) * 0.8;
    }
    H = W;

    wheelRadius = (W - 40) / 2;
    textSize = W > 500 ? 20 : W / 30;

    cW = W / 2;
    cH = H / 2;

    spinAngle = window.innerWidth <= 800 ? 90 : 0;
    ctx.canvas.width = W;
    ctx.canvas.height = H;
    sctx.canvas.width = W;
    sctx.canvas.height = H;
    
    drawSpin();
};

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

if(params != null){
    params = params.split('$_$');
    params.forEach((element,index) => {
        $(`#text${index}`).val(element);
        keyPressed(index,{code:"null"});
        textChanged(index);
    });
}

params = getParameterByName("title", window.location.href);
if(params != "null"){
    $("#title").text(params);
}

params = getParameterByName("checked", window.location.href);

$("#checkbox1").prop("checked", params === null ? true : params === 'true');


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
    playerCount = players.length;
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
            ctx.strokeText(players[i].text, wheelRadius / 1.8, textSize / 2 - 6);
            ctx.fillText(players[i].text, wheelRadius / 1.8, textSize / 2 - 6);
            ctx.restore();
        }
    }
}

let ended = true, added = false;
let interval;
let randNumber, noneRandNumber, a = 0;
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
    let angle = value - (Math.floor(value / 360) * 360);
    let id = playerCount - Math.floor(angle / (360 / playerCount)) - 1;
    let winnder = players[id].text;
    winnerField.innerHTML = winnder;
    if (ended) {
        if ($("#checkbox1").prop('checked')) {
            setTimeout(function () {
                removeByIndex(players[id].id, 1);
                $("#destroyedList").append(getNewItem(desPlayers[desPlayers.length-1].id, 1, winnder));
                drawWheel(players)
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
    <input id="text${id}" class="nicksInput"  maxlength="16" onchange="textChanged(${id})" value="${text}" onkeydown="keyPressed(${id}, event)" type="text">
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
            drawWheel(players)
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
                drawWheel(players)
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
            break;
        }
    }
}