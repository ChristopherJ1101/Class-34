var ball;
var database;
var lball;
var position;
function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    //initialise database
    database=firebase.database();
    //.ref() , refers to the location of the database
    lball=database.ref('ball/positions');
    //read the ball positions from this location,listener function
    lball.on("value",readPosition);

}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}
//write the ball changing positions in the database
function writePosition(x,y){
    database.ref('ball/positions').set ({
        'x':position.x+x,
        'y':position.y+y
    })
}
function readPosition(data){
        position=data.val();  // position={x:200,y:200} ,,JSON
            ball.x= position.x;
            ball.y=position.y;
}
