class ImgLook extends HTMLImageElement {
    constructor() {
        super();
        this.style.display = "block";
        this.className = "element";
        this.style.top = "10px";
        document.body.append(this);
    }
    up() {
        moveUp(this);
    }
};
rules.onmouseover = function(e) {
    rulesList.style.display = "flex";

}
rules.onmouseout = function() {
    rulesList.style.display = "none";
}
rulesList.style.display = "none";
let mouseOn = false;
let temperDiff = 0;
let level = 1;
tips.style.display = "none";
statistic.style.display = "none";
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
tipper = setTimeout(() => tipsShow(null, index + 1), 1500);

}
buttonTips.addEventListener("mouseover", () => tipsShow());
buttonTips.addEventListener("mouseout", () => tipsShow(true));

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
};
stats.onmouseout = function(e) {
    
    if (e.relatedTarget !== statistic) {
    statistic.style.display = "none";
    }

}
statistic.onmouseout = function(e) {
    statistic.style.display = "none";
    
};
statistic.onmouseover = function(e) {
    if (document.elementFromPoint(e.clientX, e.clientY) == stats) {
        statistic.style.display = "flex";
    }
}
statistic.onmousemove = function(e) {
    if (document.elementFromPoint(e.clientX, e.clientY) == menu || document.elementFromPoint(e.clientX, e.clientY) == document.body) {
        statistic.style.display = "none";
    }
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
freezone.style.backgroundImage = 'url("images/palms.jpg")';
customElements.define("img-new", ImgLook, { extends: 'img' });
function moveUp(img) {
    if (img.getBoundingClientRect().top > bottle.getBoundingClientRect().top) {
        let topper = img.getBoundingClientRect().top;
        topper -= 10;
        img.style.top = topper + "px";
        setTimeout(() => {
            clearInterval(dropTime);
        clearInterval(countChanger);
            moveUp(img);
        }, 100);
      } else {
    img.remove();
    push();
    countChanger = setInterval(() => {
        count += 1;
        checkChange();
    }, 1000);

    
    }
    }
    
let asker = confirm("Are u ready?");
let score = 0;
let temper = 0;
let count = 0;
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
let row = [];
alertion.hidden = true;
let changedSpeed = 9;
let countChanger;
let drop;
let undersGood;
let pause = false;
water.style.height = "300px";
let red = 20;
let blue = 220;
water.style.backgroundColor = "rgb(20, 10, 220)";
let img;
function findLevel() {
    unders = [];
        let left = img.getBoundingClientRect().left;
        let right = img.getBoundingClientRect().right;
        
    for (let section of bottom) {
        if (left == section[1]  && right == section[2])  {
            unders.push(section[0].getBoundingClientRect().top);
        }
    };
    undersGood = unders.filter(under => under > 0);
    if (undersGood.length > 0) {
        
        
    bottomLevel = Math.min(...undersGood);
    
    } else {
        bottomLevel = bottle.getBoundingClientRect().bottom;
    }
};


let fires = 0;
let snoflakes = 0;
let bottom = [];
let unders = [];
let bottomLevel = bottle.getBoundingClientRect().bottom;
let speed = 9;
let waterSpeed = speed / 2;
let dropTime;
function push() {
    if (water.getBoundingClientRect().top - freezone.getBoundingClientRect().top <= 7) {
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
    img = new ImgLook;
    
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

    img.style.left = bottle.getBoundingClientRect().left + Math.floor(Math.random() * 15) * img.offsetWidth - img.offsetWidth  + "px";
    img.style.right = parseInt(img.style.left) + 20 + "px";
    
    
    
    if (parseInt(img.style.left) < bottle.getBoundingClientRect().left) {
        img.style.left = parseInt(img.style.left) + img.offsetWidth + "px";
        
    };
    findLevel();
    function color(red, blue) {
        water.style.backgroundColor = `rgb(${red}, ${10}, ${blue})`;
       
        }
    

    img.style.top = "10px";
    drop = function() {
        let newTop = img.getBoundingClientRect().top + speed;
        img.style.top = newTop + "px";
        if (document.elementFromPoint(300, img.getBoundingClientRect().top) == water) {
            speed = waterSpeed;
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
            if (row.length == 13) {
                for (let r of row) {
                    if (r.look == img.look) {
                        finalRow.push(r);
                        score += 1;
                        r.remove();
                    }
                };
                for (let b of bottom) {
                    if ((bottom.filter(bot => row.includes(bot[0]) && !finalRow.includes(bot[0]) && bot[1] == b[1]).length == 0)&& (b[0].getBoundingClientRect().top < img.getBoundingClientRect().top)) {
                        let dropper = b[0];
                        dropper.style.top = dropper.getBoundingClientRect().top + 20 + "px";
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
            water.style.height = 300 + bottom.length * 3 + "px";
            row = [];
            
            unders = [];
            speed = changedSpeed;;
            bottomLevel = bottle.getBoundingClientRect().bottom;
            
            push();
            
        };
    
            
        
        


    };
    dropTime = setInterval(drop, 30);
    
}
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
    if (e.code == "KeyA") {
        
        img.style.left = img.getBoundingClientRect().left - 20 + "px";
        if (parseInt(img.style.left) < bottle.getBoundingClientRect().left) {
            img.style.left = bottle.getBoundingClientRect().left + "px";
        }
        
        findLevel();
        };
    if (e.code == "KeyD") {
        img.style.left = img.getBoundingClientRect().left + 20 + "px";
        if (parseInt(img.style.left) > bottle.getBoundingClientRect().right - img.offsetWidth) {
            img.style.left = bottle.getBoundingClientRect().right - img.offsetWidth + "px";
        }
        
        findLevel()
        
    };
    if (e.code = "KeyS") {
        if (bottomLevel - img.getBoundingClientRect().bottom >= 40) {
        img.style.top = img.getBoundingClientRect().top + 40 + "px";
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
mouseOn