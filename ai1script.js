var board = [["T", "I", "C"], ["C", "A", "T"], ["T", "O", "E"]];
turn = "X";
selected = [];
names = ["X", "0"];
window.onload = function(){
    generateBoard();
    updateTurn(turn);
};
function updateTurn(turn){
    if(turn == "X"){
        document.getElementById("turn").innerHTML = names[0] + "'s turn";
    } else{
        document.getElementById("turn").innerHTML = names[1] + "'s turn";
    }
}
function generatePosition(){
    var selected = [0, 0];
    var x = Math.floor(Math.random() * 3);
    var y = Math.floor(Math.random() * 3);
    selected[0] = x;
    selected[1] = y;
    var tile = board[x][y];
    if(tile != "X" && tile != "0"){
        return selected;
    } else {
        return generatePosition();
    }
}
function AIturn(){
    var selected = generatePosition();
    placeTile(selected);
}
function placeTile(selected){
    var tile = board[selected[0]][selected[1]];
    if(tile != "X" && tile != "0"){
        board[selected[0]][selected[1]] = turn;
        removeBoard();
        checkWin(turn);
        generateBoard();
        switchTurns();
        if(turn == "0"){
            AIturn();
        }
    }
}
function playerNames(){
    name1 = document.getElementById("name1").value;
    name2 = document.getElementById("name2").value;
    if(name1 == "" || name2 == ""){
        document.getElementById("nameWarning").innerHTML = "Pleas fill in all fields.";
    } else {
        names[0] = name1;
        names[1] = name2;
    }
    updateTurn(turn);
}
function row1col1(){
    selected = [0,0];
    placeTile(selected);
}
function row1col2(){
    selected = [0,1];
    placeTile(selected);
}
function row1col3(){
    selected = [0,2];
    placeTile(selected);
}
function row2col1(){
    selected = [1,0];
    placeTile(selected);
}
function row2col2(){
    selected = [1,1];
    placeTile(selected);
}
function row2col3(){
    selected = [1,2];
    placeTile(selected);
}
function row3col1(){
    selected = [2,0];
    placeTile(selected);
}
function row3col2(){
    selected = [2,1];
    placeTile(selected);
}
function row3col3(){
    selected = [2,2];
    placeTile(selected);
}
function switchTurns(){
    if(turn == "X"){
        turn = "0";
    } else {
        turn = "X";
    }
    updateTurn(turn);
}
function removeBoard(){
    for(var i = 0; i < 3; i++){
        var div = document.getElementById("row" + (i + 1).toString());
        div.parentNode.removeChild(div);
    }
}
function generateBoard(){
    for(var i = 0; i < board.length; i++){
        var div = document.createElement("DIV");
        div.setAttribute("id", ("row" + (i + 1).toString()));
        document.body.appendChild(div);
        for(var j = 0; j < board.length; j++){
            var button = document.createElement("BUTTON");
            var text = document.createTextNode(board[i][j]);
            button.appendChild(text);
            button.setAttribute("onclick", ("row" + (i + 1).toString() + "col" + (j + 1).toString() + "()"));
            document.getElementById("row" + (i + 1).toString()).appendChild(button);
        }
    }
}
function checkWin(turn){
    for(var i = 0; i < 3; i++){
        if(board[i][0] == board[i][1] &&  board[i][1] == board[i][2]){
            win();
            return;
        } else if(board[0][i] == board[1][i] && board[1][i]== board[2][i]){
            win();
            return;
        }
    }
    if(board[0][0] == board[1][1] && board[1][1] == board[2][2]){
        win();
        return;
    } else if(board[0][2] == board[1][1] && board[1][1] == board[2][0]){
        win();
        return;
    }
    tilesPlaced = 0;
    for(var j = 0; j < 3; j++){
        for(var k = 0; k < 3; k++){
            if(board[j][k] == "X" || board[j][k] == "0"){
                tilesPlaced += 1;
            }
        }
    }
    if(tilesPlaced == 9){
        switchTurns();
        document.getElementById("winText").innerHTML = "It's a draw.";
        board = [["T", "I", "C"], ["C", "A", "T"], ["T", "O", "E"]];
    }
}
function win(){
    if(turn == "X"){
        winner = names[0];
    } else {
        winner = names[1];
    }
    switchTurns();
    updateTurn(turn);
    document.getElementById("winText").innerHTML = winner + " has won.";
    board = [["T", "I", "C"], ["C", "A", "T"], ["T", "O", "E"]];
}