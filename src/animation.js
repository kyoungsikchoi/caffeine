onload = function startAnimation() { 
    var isStarted = false;

    // main btn 
    document.getElementById('pause').onclick = function(){
        document.getElementById('main').style.display = "block";
        document.getElementById('playground').style.display = "none";
        if(isStarted) {
            isStarted = false;  // 일시정지
        } else {
            isStarted = true;
        }
    };
    document.getElementById('close').onclick = function(){
        var element = document.getElementById("app");
        element.parentNode.removeChild(element);
    };
    document.getElementById('start').onclick = function(){
        document.getElementById('main').style.display = "none";
        document.getElementById('playground').style.display = "block";

        setTimeout(function() {
            if (!isStarted) {
                isStarted = true;
                bugLoop();
                developerLoop();
                backgroundLoop();
            }
            var element = document.getElementById("letsCoding");
            if (element) {
                element.parentNode.removeChild(element);
            }
        }, 2000);
    };
    document.getElementById('exit').onclick = function(){
        var element = document.getElementById("app");
        element.parentNode.removeChild(element);
    };

    // get user speed
    let userSpeed = localStorage.getItem('recent_count');
    if (!userSpeed) {
        userSpeed = 1;
    } else if (userSpeed == 0) {
        userSpeed = 1;
    }

    // init
    let bugSpeed = 50;
    let developerSpeed = 100;
    let bgSpeed = 10;

    setInterval(function(){
        userSpeed = localStorage.getItem('recent_count');
        if (!userSpeed) {
            userSpeed = 1;
        } else if (userSpeed == 0) {
            userSpeed = 1;
        }
        
        console.log(">>>", userSpeed);

        bugSpeed = 1 / userSpeed * 200
        developerSpeed = 1 / userSpeed * 500
        bgSpeed = 1 / userSpeed * 50
    }, 500);

    var bugFrames = document.getElementById("bug").children;
    var bugFrameCount = bugFrames.length;

    var developerFrames = document.getElementById("developer").children;
    var developerFrameCount = developerFrames.length;

    var developerInfectedFrames = document.getElementById("developer_infected").children;

    var bugCnt = 0;
    var developerCnt = 0;
    
    var bg1_left = 0;
    var bg2_left = 600;
    var bg3_left = 1200;
    var bg4_left = 1800;

    var bugLeftPos = 50;


    backgroundLoop = function() {
        bg1_left-= 6;
        bg2_left-= 6;
        bg3_left-= 6;
        bg4_left-= 6;
        if (bg1_left <= -600) bg1_left = 1800;
        if (bg2_left <= -600) bg2_left = 1800;
        if (bg3_left <= -600) bg3_left = 1800;
        if (bg4_left <= -600) bg4_left = 1800;
        
        document.getElementById('bg1').style.left = bg1_left + "px";
        document.getElementById('bg2').style.left = bg2_left + "px";
        document.getElementById('bg3').style.left = bg3_left + "px";
        document.getElementById('bg4').style.left = bg4_left + "px";

        window.setTimeout(backgroundLoop, bugSpeed);
    }
    bugLoop = function() {
        
        bugFrames[bugCnt % bugFrameCount].style.display = "none";
        bugFrames[bugCnt % bugFrameCount].style.display = "block";

        ++bugCnt;
        if(bugCnt < 0){ // 계속 구동 시 오버플로우로 음수 될 여지 있음
            bugCount = 0;
        }
        

        if (bugSpeed > 100) {
            if (bugLeftPos < 400) bugLeftPos += 10;
            document.getElementById('bug').style.left = bugLeftPos + "px";
        } else if (bugSpeed < 20) {
            if (bugLeftPos > -50) bugLeftPos -= 1;
            document.getElementById('bug').style.left = bugLeftPos + "px";
        }

        // window.setTimeout(bugLoop, bugSpeed);
        if(isStarted) {
            window.setTimeout(bugLoop, bugSpeed);
        }
    }
    developerLoop = function() {
        developerFrames[developerCnt % developerFrameCount].style.display = "none";
        developerFrames[++developerCnt % developerFrameCount].style.display = "block";
        document.getElementById('developer').style.display="block";
        document.getElementById('developer_infected').style.display="none";

        if (bugLeftPos < 390) {
            window.setTimeout(developerLoop, developerSpeed);
        } else {
            developerInfectedLoop();
        }
    }
    developerInfectedLoop = function() {
        developerInfectedFrames[developerCnt % 2].style.display = "none";
        developerInfectedFrames[++developerCnt % 2].style.display = "block";
        document.getElementById('developer').style.display="none";
        document.getElementById('developer_infected').style.display="block";

        ygImgs = document.getElementById('yg').children;
        for (let yg_cnt=0; yg_cnt<4; yg_cnt++) {
            ygImgs[yg_cnt].style.top = Math.floor(Math.random()*140)-30 + "px";
            ygImgs[yg_cnt].style.left = Math.floor(Math.random()*170)-50 + "px";
        }

            if (bugLeftPos < 390) {
                developerLoop();
            } else {
                window.setTimeout(developerInfectedLoop, 100);
            }
        }
    
    
} 