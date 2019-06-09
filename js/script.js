var basket = $('#basket'),
    gameOverWindow = $('#gameOver'),
    selectedLevel = $('#level'),
    gameOverScore = $('#gameOverScore'),
    container = $('#container'),
    hen = $('.Monkey'),
    bananas = $('.banana'),
    banana1 = $('#banana1'),
    banana2 = $('#banana2'),
    banana3 = $('#banana3'),
    restart = $('#restart'),
    scoreSpan = $('#score'),
    score_1 = $('#score_1'),
    scoreHelp = $('#scoreHelp'),
    lifeSpan = $('#life'),
    floor = $('#floor'),
    basketHeight = basket.height(),
    containerHeight = container.height(),
    bananaHeight = bananas.height(),
    bananaInitialPosition = parseInt(bananas.css('top')),
    score = 0,
    life = 5,
    level = 2,
    scoreUpdated = false,
    theGame = 0,
    animId = 0,
    bananaCurrentPosition = 0,
    bananaTop = 0,
    basketTop = containerHeight - basketHeight,
    bullseyeNum = 0;
lifeSpan.text(life);

$(document).on('mousemove',function(e){
    basket.css('left', e.pageX);
})
function bananaDown(banana){
    bananaCurrentPosition = parseInt(banana.css('top'));
    banana.css('top',bananaCurrentPosition + level);
}

function checkbananaHitsFloor(banana){
    if(collision(banana,floor)){
        showBullsEye(banana);
        lifeMinus();
        return true;
    }return false;
}

function setbananaToInitialPosition(banana){
    banana.css('top',bananaInitialPosition);
};

function showBullsEye(banana){
    bullseyeNum = banana.attr('data-bullseye');
    $('#bullseye'+bullseyeNum).show(function(){
        $('#bullseye'+bullseyeNum).hide(); 

    }); 
    
}
function lifeMinus(){
    life--;
    lifeSpan.text(life);
}

function checkbananaHitsBasket(banana){
    if(collision(banana,basket)){
        updateScore();
        return true;
    }return false;
};

function updateScore(){
    score++;
    scoreSpan.text(score);
    score_1.text(score);
}

restart.click(function(){
    location.reload();
});

function gameOver(){
    gameOverWindow.slideDown(100);
    restart.slideDown(200);
    scoreHelp.hide();
}

function collision($div1, $div2) {
    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
}





$(function(){
    

    theGame = function(){
        gameOverScore.text(score);
        if(checkbananaHitsFloor(banana1) || checkbananaHitsBasket(banana1)){
            setbananaToInitialPosition(banana1);
        }else{
      
            bananaDown(banana1);
        }
        
        
        
        if(checkbananaHitsFloor(banana2) || checkbananaHitsBasket(banana2)){
            setbananaToInitialPosition(banana2);
        }else{
      
            bananaDown(banana2);
        }
        
        
        if(checkbananaHitsFloor(banana3) || checkbananaHitsBasket(banana3)){
            setbananaToInitialPosition(banana3);
        }else{
      
            bananaDown(banana3);
        }
        
        if(life > 0){
            animId = requestAnimationFrame(theGame);

        }else{
            cancelAnimationFrame(animId);
            gameOver();
        }
        
    }
    animId = requestAnimationFrame(theGame);
})