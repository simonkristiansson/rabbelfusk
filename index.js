const bricks = [
    ['d','t','y','n'],
    ['m','e','e','k'],
    ['i', 'n', 't', 'r'],
    ['n', 'p', 'o', 'b']
];
const min = 0;
const max = 3;
const startWords = [];
//filter trough bricks and create startwords with 3 letters, start on bricks[0][0] and it can only go right and down

for (let y = 0; y < bricks.length; y++) {
    for (let x = 0; x < bricks[y].length; x++) {
        let tempwords = initLetter(y,x);
        startWords.push(tempwords);
    }
}

function initLetter(y,x) {
        //clone bricks
        let tempBricks = JSON.parse(JSON.stringify(bricks));
        let words = [];
        let startCords = {x: x, y: y};
        let forbiddenCords = []
        tempBricks = removeLetter(startCords, tempBricks);
        let firstMoves = getPossibleMoves(startCords);

        firstMoves.forEach(firstMove => {
            
            console.log('---- first move ' + getLetter(startCords));
            forbiddenCords = [];
            forbiddenCords = forbiddenCords.concat(startCords);
            let secondMoves = getPossibleMoves(firstMove, forbiddenCords);
            
            
            secondMoves.forEach(secondMove => {
                
                words.push(getLetter(startCords) + getLetter(firstMove) + getLetter(secondMove));
                
                forbiddenCords = [];
                forbiddenCords = forbiddenCords.concat(startCords, firstMove);
                let thirdMoves = getPossibleMoves(secondMove, forbiddenCords);    
                thirdMoves.forEach(thirdMove => {
                    
                    words.push(getLetter(startCords) + getLetter(firstMove) + getLetter(secondMove) + getLetter(thirdMove));
                    
                    forbiddenCords = [];
                    forbiddenCords = forbiddenCords.concat(startCords, firstMove, secondMove);
                    let fourthMoves = getPossibleMoves(thirdMove, forbiddenCords);
                    fourthMoves.forEach(fourthMove => {
                        
                        words.push(getLetter(startCords) + getLetter(firstMove) + getLetter(secondMove) + getLetter(thirdMove) + getLetter(fourthMove));
                        
                        forbiddenCords = [];
                        forbiddenCords = forbiddenCords.concat(startCords, firstMove, secondMove, thirdMove);
                        let fifthMoves = getPossibleMoves(fourthMove, forbiddenCords);
                        fifthMoves.forEach(fifthMove => {
                            words.push(getLetter(startCords) + getLetter(firstMove) + getLetter(secondMove) + getLetter(thirdMove) + getLetter(fourthMove) + getLetter(fifthMove));

                            forbiddenCords = [];
                            forbiddenCords = forbiddenCords.concat(startCords, firstMove, secondMove, thirdMove, fourthMove);
                            let sixthMoves = getPossibleMoves(fifthMove, forbiddenCords);
                            sixthMoves.forEach(sixthMove => {
                                words.push(getLetter(startCords) + getLetter(firstMove) + getLetter(secondMove) + getLetter(thirdMove) + getLetter(fourthMove) + getLetter(fifthMove) + getLetter(sixthMove));

                                forbiddenCords = [];
                                forbiddenCords = forbiddenCords.concat(startCords, firstMove, secondMove, thirdMove, fourthMove, fifthMove);
                                let seventhMoves = getPossibleMoves(sixthMove, forbiddenCords);
                                seventhMoves.forEach(seventhMove => {
                                    words.push(getLetter(startCords) + getLetter(firstMove) + getLetter(secondMove) + getLetter(thirdMove) + getLetter(fourthMove) + getLetter(fifthMove) + getLetter(sixthMove) + getLetter(seventhMove));

                                });
                            });
                        });

                    });
                });
            
            });
        });
    
        return words;
}

function getPossibleMoves(cords, forbiddenCords = []){

    let possibleMoves = [];
    //move right
    if(cords.x < max){
        possibleMoves.push({x: cords.x+1, y: cords.y});
    }

    //move down
    if(cords.y < max){
        possibleMoves.push({x: cords.x, y: cords.y+1});
    }

    //move left
    if(cords.x > min){
        possibleMoves.push({x: cords.x-1, y: cords.y});
    }

    //move up
    if(cords.y > min){
        possibleMoves.push({x: cords.x, y: cords.y-1});
    }

    //move up and right
    if(cords.y > min && cords.x < max){
        possibleMoves.push({x: cords.x+1, y: cords.y-1});
    }
    
    //move up and left
    if(cords.y > min && cords.x > min){
        possibleMoves.push({x: cords.x-1, y: cords.y-1});
    }

    //move down and right
    if(cords.y < max && cords.x < max){
        possibleMoves.push({x: cords.x+1, y: cords.y+1});
    }

    //move down and left
    if(cords.y < max && cords.x > min){
        possibleMoves.push({x: cords.x-1, y: cords.y+1});
    }

    //remove forbidden cords
    possibleMoves = possibleMoves.filter(item => {
        //if item is in forbbiden cords array return false
        return !forbiddenCords.some(forbiddenCord => {
            return forbiddenCord.x === item.x && forbiddenCord.y === item.y;
        });
    });
    return possibleMoves;

}
function getLetter(cords) {
    if(cords.length === 0){
        return '';
    }
    return bricks[cords.y][cords.x];
}

function removeLetter(cords, tempBricks) {
    tempBricks[cords.y][cords.x] = '-';
    return tempBricks;
}


console.log('check towards list');
//include svenska-ord.json
const fs = require('fs');
let rawdata = fs.readFileSync('svenska-ord.json');
let words = JSON.parse(rawdata);

// search in the words that starts with the startwords
let foundWords = [];

startWords.forEach(startLetter => {
    console.log(startLetter);
    startLetter.forEach(startWord => {
        words.forEach(word => {
            if(word === startWord){
                foundWords.push(word);
            }
        });
    });
});
foundWords.sort((a, b) => a.length - b.length);
const uniqueArray = [...new Set(foundWords)];
console.log(uniqueArray);
//sort founds words by length






