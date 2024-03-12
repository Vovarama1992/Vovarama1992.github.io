document.addEventListener("load", function() {
        
    container.style.display = "flex";
});
let asker = confirm("Жмякай по бутылке или нажимай на стрелочки");
let img;
let startHeight = water.offsetHeight;
let mobilerLeft= document.createElement("img");
container.append(mobilerLeft);
mobilerLeft.className = "move";
mobilerLeft.style.left = "10%";
mobilerLeft.src = "images/left.jpg";
let mobilerRight= document.createElement("img");
container.append(mobilerRight);
mobilerRight.className = "move";
mobilerRight.style.left = "78%";
mobilerRight.src = "images/right.jpg";
let mobilerDown= document.createElement("img");
container.append(mobilerDown);
mobilerDown.className = "move";
mobilerDown.style.left = "44%";
mobilerDown.src = "images/down.jpg";
mobilerDown.style.marginTop = "5%";
alertion.hidden = false;
let red = 20;
let score = 0;
let blue = 220;
let fires = 0;
let pause = false;
let inBottle = false;
let unders;
let drop;
let temperDiff = 0;
let bottom = [];
let row = [];
let dropTime;
let bottle = document.querySelector(".bottle");
let bottomLevel;
let speed = 9;
let changedSpeed = 9;
let waterSpeed = speed / 2;
tips.style.display = "none";
water.style.background = "rgb(20, 10, 220)";
palms.style.backgroundImage = 'url("images/palms.jpg")';
let level = 1;
let count = 0;
let temper = 0;
rulesList.style.display = "none";

function checkChange() {
    if (count % 30 == 0 && count > 0) {
        level += 1;
        changedSpeed += 1;
        alertion.textContent = `Be safed! Level ${level} now `;
        alertion.hidden = false;
        setTimeout(() => {
            alertion.hidden = true
        }, 1500)
    }
}
function findLevel() {
    unders = [];
        let left = img.getBoundingClientRect().left;
        let right = img.getBoundingClientRect().right;
        if (img.getBoundingClientRect().right > bottle.getBoundingClientRect().right) {
            img.style.right = bottle.getBoundingClientRect().right + "px";
        }
        
    for (let section of bottom) {
        if (left == section[1]  && right == section[2])  {
            unders.push(section[0].getBoundingClientRect().top);
        }
    };
    if (unders.length > 0) {
        
        
    bottomLevel = Math.min(...unders);
    
    } else {
        bottomLevel = bottle.getBoundingClientRect().bottom;
    }
};
function push() {
    if (water.getBoundingClientRect().top - palms.getBoundingClientRect().top <= 5) {
        alert("Game over! U cannot hold level(((");
        clearInterval(countChanger);
        return;
    }
    temper = bottom.filter(bot => bot[0].look == "fire").length - bottom.filter(bot => bot[0].look == "snowflake").length;
    waterSpeed = speed / 2 - (bottom.filter(bot => bot[0].look == "fire").length - bottom.filter(bot => bot[0].look == "snowflake").length) * 1.5;
    if (waterSpeed > speed + 5 + temperDiff) {
        temperDiff += 1;
        alertion.textContent = `Warm the water! `;
        alertion.hidden = false;
        setTimeout(() => {
            alertion.hidden = true;
        }, 1300)
    };
    if (waterSpeed < 1) {
        waterSpeed = 1;
    };
    function color(red, blue) {
        water.style.background = `rgb(${red}, ${10}, ${blue})`;
       
        }
    
    img = document.createElement("img");
    img.className = "element";
    let changer = Math.random();
    img.src = changer > 0.6 ? "images/fire.jpg" : "images/snowflake.jpg";
    if (changer > 0.6) {
        fires += 1;
        red += 20;
        img.look = "fire";
        temperDiff -= 1;
        
        
        blue -= 20;
        
    };
    if (changer <= 0.6) {
        fires -= 1;
        blue += 20;
        
        red -= 20;
        img.look = "snowflake";
        
    };
    img.style.height = bottle.offsetHeight / 26 + "px";
    img.style.width = bottle.offsetWidth / 12 + "px";
    bottle.append(img);
    img.style.left = bottle.getBoundingClientRect().left + Math.floor(Math.random() * 13 ) * img.offsetWidth - img.offsetWidth  + "px";
    document.body.append(img);
    if (img.getBoundingClientRect().left < bottle.getBoundingClientRect().left) {
        img.style.left = bottle.getBoundingClientRect().left + "px";
    }
    findLevel();
    img.style.top = "5px";
    drop = function() {
        let newTop = img.getBoundingClientRect().top + speed;
        img.style.top = newTop + "px";
        let x = img.getBoundingClientRect().left;
        let y = img.getBoundingClientRect().top;
        if ((document.elementFromPoint(x - img.offsetWidth, y) == water) || (document.elementFromPoint(x + img.offsetWidth + 2, y) == water)) {
            
            speed = waterSpeed;
            color(red, blue);
            water.classList.add('darker');
            setTimeout(() => water.classList.remove('darker'), 450);
            
            color(red, blue);
            
        };
        if (img.getBoundingClientRect().top >= bottomLevel - img.offsetHeight) {
            img.style.top = bottomLevel - img.offsetHeight + "px";
            for (let bot of bottom) {
                if (bot[0].getBoundingClientRect().top == img.getBoundingClientRect().top) {
                    row.push(bot[0]);

                }
            }
            clearInterval(dropTime);
            let finalRow = [];
            if (row.length == 11) {
                for (let r of row) {
                    if (r.look == img.look) {
                        finalRow.push(r);
                        score += 1;
                        r.remove();
                    }
                }
                for (let b of bottom) {
                    finalBottom = bottom.filter(bot => row.includes(bot[0]) && !finalRow.includes(bot[0]));
                    if (finalBottom.filter(f => f[1] == b[1]).length == 0) {
                        let dropper = b[0];
                        dropper.style.top = dropper.getBoundingClientRect().top + img.offsetHeight + "px";
                    
                }
            }
                bottom = bottom.filter(bot => !finalRow.includes(bot[0]));
                img.remove();
                row = [];
                finalRow = [];
            } else {
                let [a, b] = [img.getBoundingClientRect().left, img.getBoundingClientRect().right];
                bottom.push([img, a , b ]);
            }
            
                row = [];
            
            unders = [];
            
            bottomLevel = bottle.getBoundingClientRect().bottom;
            if (count <= 10) {
                
                startHeight += 0.5;
            }
            grow = bottom.length / 3;
            water.style.height = startHeight + grow + "px";
            
            
            
            speed = changedSpeed;
            push();
    
}
}

    
    dropTime = setInterval(drop, 30)

}

function tipsShow(stop, index) {
    let arr = ["save palms, but...",
               "...fires too!",
               "cause fire increases the temperature",
               "more time to think",
            "the last element destroys its relatives in the row"
];
if (stop) {
    tips.style.display = "none";
    clearTimeout(tipper);
    return;
};
tips.style.display = "flex";
index = !index || index + 1 > arr.length ? 0 : index;
tips.textContent = arr[index];
tips.style.left = buttonTips.getBoundingClientRect().left + "px";
tips.style.top = buttonTips.getBoundingClientRect().bottom + "px";
tips.style.width = buttonTips.offsetWidth * 3 + "px";
tips.style.height = buttonTips.offsetHeight * 3 + "px";
tipper = setTimeout(() => tipsShow(null, index + 1), 1500);

}
buttonTips.addEventListener("mouseover", () => tipsShow());
buttonTips.addEventListener("mouseout", () => tipsShow(true));
window.addEventListener("keydown", function(e) {
    if (e.code == "KeyQ") {
        if (!pause) {
        clearInterval(dropTime);
        clearInterval(countChanger);
        } else {
        dropTime = setInterval(drop, 30);
        countChanger = setInterval(() => {
            count += 1;
            checkChange();
        }, 1000);
       
    }
        pause = !pause;
}
if (!pause) {
    if (e.code == "KeyA" || e.code == "ArrowLeft") {
        
        img.style.left = img.getBoundingClientRect().left - img.offsetWidth + "px";
        if (img.getBoundingClientRect().left < bottle.getBoundingClientRect().left) {
            img.style.left = bottle.getBoundingClientRect().left + "px";
        }
        
        findLevel();
        };
    if (e.code == "KeyD" || e.code == "ArrowRight") {
        img.style.left = img.getBoundingClientRect().left + img.offsetWidth + "px";
        if (img.getBoundingClientRect().left > bottle.getBoundingClientRect().right - img.offsetWidth) {
            img.style.left = bottle.getBoundingClientRect().right - img.offsetWidth + "px";
        }
        
        findLevel()
        
    };
    if (e.code == "KeyS" || e.code == "ArrowDown") {
        if (bottomLevel - img.getBoundingClientRect().bottom >= img.offsetHeight * 2) {
        img.style.top = img.getBoundingClientRect().top + img.offsetHeight * 2 + "px";
        };
        findLevel();

    }
}
    })
    if (asker) {
        push();
        countChanger = setInterval(() => {
            count += 1;
            checkChange();
        }, 1000);
    }
    mechanix.onmouseover = function(e) {
        rulesList.style.display = "flex";
        rulesList.style.top = mechanix.getBoundingClientRect().bottom + 3 + "px";
        rulesList.style.left = mechanix.getBoundingClientRect().left + "px";
        rulesList.style.width = mechanix.offsetWidth + "px";
        mobilerLeft.style.display = "none";
        
    
    }
    mechanix.onmouseout = function() {
        rulesList.style.display = "none";
        mobilerLeft.style.display = "block";
    }
    stopper.onclick = function() {
        if (!pause) {
        pause = !pause;
        clearInterval(dropTime);
            clearInterval(countChanger);
        }
    
    };
    start.onclick = function() {
        if (pause) {
            pause = !pause;
        dropTime = setInterval(drop, 30);
            countChanger = setInterval(() => {
                count += 1;
                checkChange();
            }, 1000);
        }
    }
    stats.onmouseover = function(e) {
    
        statistic.style.display = "flex";
        statistic.classList.add('releaseDark');
        
        statistic.innerHTML = `<p>
            Survive-time = ${count}<br><br>
            Speed = ${waterSpeed}<br><br>
            Temperature = ${temper}<br><br>
            Score = ${score}<br><br>
            <strong style="color: red">Level = ${level}</strong>
        </p>`;
        statistic.style.left = stats.getBoundingClientRect().right + 2 + "px";
        statistic.style.top = stats.getBoundingClientRect().top + "px";
    }
    stats.onmouseout = function(e) {
    
        
        statistic.style.display = "none";
        
    
    }
    function lefter() {
        img.style.left = img.getBoundingClientRect().left - img.offsetWidth + "px";
        if (img.getBoundingClientRect().left < bottle.getBoundingClientRect().left) {
            img.style.left = bottle.getBoundingClientRect().left + "px";
        }
        
        findLevel();
    }
    function righter() {
        img.style.left = img.getBoundingClientRect().left + img.offsetWidth + "px";
        if (img.getBoundingClientRect().left > bottle.getBoundingClientRect().right - img.offsetWidth) {
            img.style.left = bottle.getBoundingClientRect().right - img.offsetWidth + "px";
        }
        
        findLevel();
    }
    
    mobilerLeft.onmousedown = lefter;
    mobilerRight.onmousedown = righter;
    mobilerDown.onmouseDown = function() {
        {
            if (bottomLevel - img.getBoundingClientRect().bottom >= img.offsetHeight * 2) {
            img.style.top = img.getBoundingClientRect().top + img.offsetHeight * 2 + "px";
            };
            findLevel();
    
        }
    }
    