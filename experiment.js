//------Set up canvas begin---------
const canvas_L = document.getElementById('canvas_L');
var ctx_L = canvas_L.getContext('2d');
var canvasWidth = canvas_L.width;
var canvasHeight = canvas_L.height;

let screenWidth = screen.width;
let screeHeight = screen.height;
//--------------------------------------
//---------SET PARAMETERS BEGIN---------
//--------------------------------------
const secretCode = "kFe8fQy4dXE9".shuffle();
var colorArray_1 = [];

for(i=0;i<256;i++){ // QUESTION: why 256 here and 255 in other color arrays?
    colorArray_1[i] = 'rgb(255, ' + i + ', 0)'
}
var colorArray_2 = [];
for(i=0;i<255;i++){
    colorArray_2[i] = 'rgb(' + i + ', 255, 0)'
}
colorArray_2 = colorArray_2.reverse();
var colorArray_3 = [];
for(i=0;i<255;i++){
    j = i+1;
    colorArray_3[i] = 'rgb(0, 255, ' + j + ')'
}
var colorArray_4 = [];
for(i=0;i<255;i++){
    colorArray_4[i] = 'rgb(0, ' + i + ', 255)'
}
colorArray_4 = colorArray_4.reverse();
var colorArray_5 = [];
for(i=0;i<255;i++){
    j = i+1;
    colorArray_5[i] = 'rgb(' + j + ', 0, 255)'
}
var colorArray_6 = [];
for(i=0;i<255;i++){
    colorArray_6[i] = 'rgb(255, 0, ' + i + ')'
}
colorArray_6 = colorArray_6.reverse();
colorArray = colorArray_1.concat(colorArray_2);
colorArray = colorArray.concat(colorArray_3);
colorArray = colorArray.concat(colorArray_4);
colorArray = colorArray.concat(colorArray_5);
colorArray = colorArray.concat(colorArray_6);

var responseAcceptable = false;
var freshRate = 1000/60; // // QUESTION: what THIS?

var startTrialTime;
var endTrialTime;

// ======================== GET BROWSER ======================= //
// Get browser (credit to Nimesh and other users of StackOverflow)
function getBrowser() {
      if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf("OPR")) != -1) {
        return "Opera";
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        return "Chrome";
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
        return "Safari";
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        return "Firefox";
    } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) {
        // If IE > 10
        return "IE";
    } else {
        return "Unknown";
    }
}
// ======================== GET AMAZON MTURK WORKER ID ======================= //
    // Get inferred subject ID from URL (credit to Eyal Peer)
    function getSubjectID() {
      var paramstr = window.location.search.substring(1);
      var parampairs = paramstr.split("&");
      var foundId;
      for (i in parampairs) {
        var pair = parampairs[i].split("=");
        if (pair[0] == "workerId") {
          foundId = pair[1];
        }
      }
      if (foundId){
        return foundId;
      } else {
        return "testSubject";
      }
    }
// ======================== CONVERT JSON TO CSV ======================= //
// https://codingbeautydev.com/blog/javascript-convert-json-to-csv/ //
function jsonToCsv(items) {
    const header = Object.keys(items[0]);
    console.log(header);
  
    const headerString = header.join(',');
  
    // handle null or undefined values here
    const replacer = (key, value) => value ?? '';
  
    const rowItems = items.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
  
    // join header and body, and break into separate lines
    const csv = [headerString, ...rowItems].join('\r\n');
  
    return csv;
  }
function redirect() {
    // TODO: redirect elsewhere?
        window.location = "https://jhu.sona-systems.com/webstudy_credit.aspx?experiment_id=754&credit_token=2d6ab745370a4d0ba5567cdfdef69ee9&survey_code="+window.subjectID
}

// ======================== POST DATA TO SERVER ======================= //
function postData() {
      // Collect responses into JSON / csv file
      var dataString = JSON.stringify(window.frame);
      const csv = jsonToCsv(window.frame);

      // post response to server
      $.post("http://pclpsrescit2.services.brown.edu/blt_lab/mp-3/data/studysave.php", {
        fname: `${window.subjectID}.csv`,
        postresult_string: csv,  
      }).done(function(){
        $("#instructions").text(`Thank you! Your secret code is: ${secretCode}
        Please copy and paste this into your submission box! You may then close this window.`);
      });
      $("#instructions").show();  
      $("#instructions").text("Thank you! Please wait while your secret code is being generated. This may take up to 5 minutes...");  
  }

var shape_A_preview_tmp;
var shape_A_test_tmp;
var shape_B_preview_tmp;
var shape_B_test_tmp;
var ball_A_color;
var ball_B_color;

var vertical_tmp_A;
var vertical_tmp_B;
var vertical_tmp_array = [-50,+50]; // QUESTION: what THIS?
function trialGenerator(nRepetitions,trialsInfo) {

    for (var j1 = 0; j1 < 2*nRepetitions; j1++) { // 44 trials?
        
        var arr = [];
        while(arr.length < 2) {
            var r = Math.floor(Math.random() * 5);
            if(arr.indexOf(r) === -1) arr.push(r);
        }
        shape_A_preview_tmp = arr[0];
        shape_A_test_tmp = shape_A_preview_tmp;
        shape_B_preview_tmp = arr[1];
        shape_B_test_tmp = shape_B_preview_tmp;   

        var arr_color = [];
        while(arr_color.length < 2) {
            var r = Math.floor(Math.random() * 5);
            if(arr_color.indexOf(r) === -1) arr_color.push(r);
        }
        ball_A_color = arr_color[0];
        ball_B_color = arr_color[1]; 

        var arr_vertical = [];
        while(arr_vertical.length < 2) {
        var r = Math.floor(Math.random() * 2);
        if(arr_vertical.indexOf(r) === -1) arr_vertical.push(r);
        }
        vertical_tmp_A = vertical_tmp_array[arr_vertical[0]];
        vertical_tmp_B = vertical_tmp_array[arr_vertical[1]];

        trialsInfo.push({
            "spatiotemporalType":"spatiotemporal_inconsistent",
            "matchType":"same",
            "shape_A_pre_ind":shape_A_preview_tmp,
            "shape_A_test_ind":shape_A_test_tmp,
            "shape_B_pre_ind":shape_B_preview_tmp,
            "shape_B_test_ind":shape_B_test_tmp,  
            "ball_A_color":ball_A_color,
            "ball_B_color":ball_B_color,   
            "ball_A_vertical":vertical_tmp_A,
            "ball_B_vertical":vertical_tmp_B,
            "responseC": "null",
            "browser": getBrowser(),
            "subjectID": getSubjectID(),
            "startTime": "null",
            "endTime": "null",
            "reactTime":"null",
        });                  
    }

    for (var j1 = 0; j1 < nRepetitions; j1++) { // 22 trials?

        var arr = [];
        while(arr.length < 3) {
            var r = Math.floor(Math.random() * 5);
            if(arr.indexOf(r) === -1) arr.push(r);
        }
        shape_A_preview_tmp = arr[0];
        shape_A_test_tmp = shape_A_preview_tmp;
        shape_B_preview_tmp = arr[1];
        shape_B_test_tmp = arr[2];   

        var arr_color = [];
        while(arr_color.length < 2) {
            var r = Math.floor(Math.random() * 5);
            if(arr_color.indexOf(r) === -1) arr_color.push(r);
        }
        ball_A_color = arr_color[0];
        ball_B_color = arr_color[1];

        var arr_vertical = [];
        while(arr_vertical.length < 2) {
        var r = Math.floor(Math.random() * 2);
        if(arr_vertical.indexOf(r) === -1) arr_vertical.push(r);
        }
        vertical_tmp_A = vertical_tmp_array[arr_vertical[0]];
        vertical_tmp_B = vertical_tmp_array[arr_vertical[1]];

        trialsInfo.push({
            "spatiotemporalType":"spatiotemporal_inconsistent",
            "matchType":"new",
            "shape_A_pre_ind":shape_A_preview_tmp,
            "shape_A_test_ind":shape_A_test_tmp,
            "shape_B_pre_ind":shape_B_preview_tmp,
            "shape_B_test_ind":shape_B_test_tmp,
            "ball_A_color":ball_A_color,
            "ball_B_color":ball_B_color,
            "ball_A_vertical":vertical_tmp_A,
            "ball_B_vertical":vertical_tmp_B,
            "responseC": "null",
            "browser": getBrowser(),
            "subjectID": getSubjectID(),
            "startTime": "null",
            "endTime": "null",
            "reactTime":"null",
        });
    }

    for (var j1 = 0; j1 < nRepetitions; j1++) { // 22 trials
        
        var arr = [];
        while(arr.length < 3) {
            var r = Math.floor(Math.random() * 5);
            if(arr.indexOf(r) === -1) arr.push(r);
        }
        shape_A_preview_tmp = arr[0];
        shape_A_test_tmp = arr[1];
        shape_B_preview_tmp = arr[2];
        shape_B_test_tmp = shape_B_preview_tmp;

        var arr_color = [];
        while(arr_color.length < 2) {
            var r = Math.floor(Math.random() * 5);
            if(arr_color.indexOf(r) === -1) arr_color.push(r);
        }
        ball_A_color = arr_color[0];
        ball_B_color = arr_color[1];

        var arr_vertical = [];
        while(arr_vertical.length < 2) {
        var r = Math.floor(Math.random() * 2);
        if(arr_vertical.indexOf(r) === -1) arr_vertical.push(r);
        }
        vertical_tmp_A = vertical_tmp_array[arr_vertical[0]];
        vertical_tmp_B = vertical_tmp_array[arr_vertical[1]];

        trialsInfo.push({
            "spatiotemporalType":"spatiotemporal_inconsistent",
            "matchType":"new",
            "shape_A_pre_ind":shape_A_preview_tmp,
            "shape_A_test_ind":shape_A_test_tmp,
            "shape_B_pre_ind":shape_B_preview_tmp,
            "shape_B_test_ind":shape_B_test_tmp,
            "ball_A_color":ball_A_color,
            "ball_B_color":ball_B_color,
            "ball_A_vertical":vertical_tmp_A,
            "ball_B_vertical":vertical_tmp_B,
            "responseC": "null",
            "browser": getBrowser(),
            "subjectID": getSubjectID(),
            "startTime": "null",
            "endTime": "null",
            "reactTime":"null",
        });
    }

    for (var j1 = 0; j1 < 2*nRepetitions; j1++) { // 44 trials
        
        var arr = [];
        while(arr.length < 2) {
            var r = Math.floor(Math.random() * 5);
            if(arr.indexOf(r) === -1) arr.push(r);
        }
        shape_A_preview_tmp = arr[0];
        shape_B_preview_tmp = arr[1];
        shape_A_test_tmp = shape_B_preview_tmp;
        shape_B_test_tmp = shape_A_preview_tmp;

        var arr_color = [];
        while(arr_color.length < 2) {
            var r = Math.floor(Math.random() * 5);
            if(arr_color.indexOf(r) === -1) arr_color.push(r);
        }
        ball_A_color = arr_color[0];
        ball_B_color = arr_color[1];

        var arr_vertical = [];
        while(arr_vertical.length < 2) {
        var r = Math.floor(Math.random() * 2);
        if(arr_vertical.indexOf(r) === -1) arr_vertical.push(r);
        }
        vertical_tmp_A = vertical_tmp_array[arr_vertical[0]];
        vertical_tmp_B = vertical_tmp_array[arr_vertical[1]];

        trialsInfo.push({
            "spatiotemporalType":"spatiotemporal_inconsistent",
            "matchType":"same_swap",
            "shape_A_pre_ind":shape_A_preview_tmp,
            "shape_A_test_ind":shape_A_test_tmp,
            "shape_B_pre_ind":shape_B_preview_tmp,
            "shape_B_test_ind":shape_B_test_tmp,
            "ball_A_color":ball_A_color,
            "ball_B_color":ball_B_color,
            "ball_A_vertical":vertical_tmp_A,
            "ball_B_vertical":vertical_tmp_B,
            "responseC": "null",
            "browser": getBrowser(),
            "subjectID": getSubjectID(),
            "startTime": "null",
            "endTime": "null",
            "reactTime":"null",
        });
    }
    trialsInfo = shuffle(trialsInfo);
    return trialsInfo;
}

var trialsInfo = [];
/*
nRepetitions is used to determine the number of trials in the experiment!
There are four sets of trials, which results in the following numbers within
the trialGenerator:
nRepetitions * 2
+ nRepetitions
+ nRepetitions
+ nRepetitions * 2!

So with nRepetitions = 22, you would have
44 + 22 + 22 + 44 = 132 trials
*/
var nRepetitions = 44; // 22
var frame = trialGenerator(nRepetitions,trialsInfo);
var nTrials = frame.length;

var trialsInfo_training = [];
var nRepetitions_training = 1;
var frame_training = trialGenerator(nRepetitions_training,trialsInfo_training);
var nTrials_training = frame_training.length;

var browser = getBrowser();
var subjectID = getSubjectID();

//---------------------------------------
//-----------FUNCTIONS BEGIN-------------
//---------------------------------------
/* Fisher-Yates shuffle */
function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
}
/* String-specific shuffle for the secret code */
String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}
function random(min,max) {
    const num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}
function Ball(x,y,color,size) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
};
var nDots = 1; 
var dotRadius = 40; //Radius of each dot in pixels
var balls = [];
// colorNumb = 10, red/ 200, yellow /380, green/ 1000, blue/ 1200, purple
var balls_colorArray = [10,200,380,1000,1200]; // QUESTION: what THIS? Why these numbers??
var colorInd;
var x_0_A;
var y_0_A;
function generateNewBalls_A(ball_A_color) { // the ball on the left at beginning
    colorInd = balls_colorArray[ball_A_color];
    let colorNums = [];
    var x_0s = [];
    var y_0s = [];
    var dist_tmp = [];
    x_0_A = canvasWidth/2-230;
    y_0_A = canvasHeight/2;
    x_0s.push(x_0_A);
    y_0s.push(y_0_A);
    var colorNum = colorInd;
    let ball = new Ball(
        x_0_A,
        y_0_A,
        colorArray[colorNum],
        dotRadius,
        );
    balls.push(ball);
    colorNums.push(colorNum);
    return balls;
}
var x_0_B;
var y_0_B;
function generateNewBalls_B(ball_B_color) { // the ball on the right at beginning
    colorInd = balls_colorArray[ball_B_color];
    let colorNums = [];
    var x_0s = [];
    var y_0s = [];
    var dist_tmp = [];
    x_0_B = canvasWidth/2+230;
    y_0_B = canvasHeight/2;
    x_0s.push(x_0_B);
    y_0s.push(y_0_B);
    var colorNum = colorInd;
    let ball = new Ball(
        x_0_B,
        y_0_B,
        colorArray[colorNum],
        dotRadius,
        );
    balls.push(ball);
    colorNums.push(colorNum);
    return balls;
}
Ball.prototype.draw_balls = function() {
    ctx_L.beginPath();
    ctx_L.fillStyle = this.color;
    ctx_L.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx_L.fill();
};
Ball.prototype.updateColor = function() { // updates color, when color_change_rate is zero, no color change
    var pos = colorArray.indexOf(this.color);
    if(pos >= colorArray.length - 1 - color_change_rate) {
        pos = colorArray.length - 1 -  pos;
    } else {
        pos = colorArray.indexOf(this.color);
    }
    this.color = colorArray[pos+color_change_rate];
};
var velX = 4.5; // QUESTION: what THIS?
// var velY = 1.5;
var edgeX = 100; // QUESTION: what THIS?
Ball.prototype.updatePosition_A = function() { // define the moving path
    if (this.x < canvasWidth/2) {
        this.x = this.x + velX;
        if (this.x < x_0_A+dotRadius/4) {
            this.y = this.y+10;
        }
        if (x_0_A+dotRadius/4 <= this.x && this.x < x_0_A+dotRadius/2) {
            this.y = this.y+15;
        }
        if (x_0_A+dotRadius/2 <= this.x && this.x < x_0_A+1.5*dotRadius) {
            this.y = this.y-3;
        }
        if (x_0_A+1.5*dotRadius <= this.x && this.x < x_0_A+2*dotRadius) {
            this.y = this.y;
        }
        if (x_0_A+2*dotRadius <= this.x && this.x < x_0_A+3*dotRadius) {
            this.y = this.y-3;
        }
        if (x_0_A+3*dotRadius <= this.x && this.x < x_0_A+3*dotRadius) {
            this.y = this.y+3;
        }
        if (x_0_A+3*dotRadius <= this.x && this.x < canvasWidth/2) {
            this.y = canvasHeight/2;
        }
    } 
    else {
        this.x = canvasWidth/2;
        this.y = canvasHeight/2+vertical_tmp_A;
    }
};
Ball.prototype.updatePosition_B = function() {    
    if (this.x > canvasWidth/2) {
        this.x = this.x - velX;

        if (this.x > x_0_B-dotRadius/4) {
            this.y = this.y+10;
        }
        if (x_0_B-dotRadius/2 < this.x && this.x <= x_0_B-dotRadius/4) {
            this.y = this.y+15;
        }
        if (x_0_B-1.5*dotRadius < this.x && this.x <= x_0_B-dotRadius/2) { // QUESTION: WHY 1.5?? WHAT IS THIS?
            this.y = this.y-3;
        }
        if (x_0_B-2*dotRadius < this.x && this.x <= x_0_B-1.5*dotRadius) {
            this.y = this.y;
        }
        if (x_0_B-3*dotRadius < this.x && this.x <= x_0_B-2*dotRadius) {
            this.y = this.y-3;
        }
        if (x_0_B-5*dotRadius < this.x && this.x <= x_0_B-5*dotRadius) {
            this.y = this.y+3;
        }
        if (canvasWidth/2 < this.x && this.x <= x_0_B-5*dotRadius) {
            this.y = canvasHeight/2;
        }
    } 
    else {
        this.x = canvasWidth/2;
        this.y = canvasHeight/2+vertical_tmp_B;
    }
};


// exp procedures 
function continueInstruction1() {
    $('#Instruction1').hide();
    $('#continueInstructionButton1').hide();
    $('#Instruction2').show(); 
    $('#startTrainingButton').show();
}
let balls_A = [];
let balls_B = [];
var trainingTrial = 0;
function showTrials_training_0() {
    responseAcceptable = false;
    $('#title').hide();
    $('#Instruction2').hide();
    $('#startTrainingButton').hide();

    balls = generateNewBalls_A(trialsInfo_training[trainingTrial].ball_A_color);
    balls_A = balls;
    balls = [];
    balls = generateNewBalls_B(trialsInfo_training[trainingTrial].ball_B_color);
    balls_B = balls;
    balls = [];

    $('#canvas_L').show(); 
    ctx_L.drawImage(occluder,canvasWidth/2-50,canvasHeight/2-100);
    balls_A[0].draw_balls();
    balls_A[0].updateColor();
    balls_B[0].draw_balls();
    balls_B[0].updateColor();
    stimuliPreview(); 
}
function showTrials_training() {
    responseAcceptable = false;
    $('#Instruction4').hide();
    $('#nextTrainingTrialButton').hide();
    trainingTrial ++;

    if (trainingTrial <= trialsInfo_training.length-1) {
        balls = generateNewBalls_A(trialsInfo_training[trainingTrial].ball_A_color);
        balls_A = balls;
        balls = [];
        balls = generateNewBalls_B(trialsInfo_training[trainingTrial].ball_B_color);
        balls_B = balls;
        balls = [];
        $('#Instruction2').hide();
        ctx_L.fillStyle = 'gray';
        ctx_L.clearRect(0,0,canvas_L.width, canvas_L.height);  
        $('#canvas_L').show();
        ctx_L.drawImage(occluder,canvasWidth/2-50,canvasHeight/2-100);
        balls_A[0].draw_balls();
        balls_A[0].updateColor();
        balls_B[0].draw_balls();
        balls_B[0].updateColor();
        stimuliPreview(); 
    } else {
        $('#Instruction3').show();
        $('#startExpButton').show();
    }
}
var curTrial = 0;
function showTrials_exp_0() {
    responseAcceptable = false;
    $('#title').hide();
    $('#Instruction3').hide();
    $('#startExpButton').hide();

    balls = generateNewBalls_A(trialsInfo[curTrial].ball_A_color);
    balls_A = balls;
    balls = [];
    balls = generateNewBalls_B(trialsInfo[curTrial].ball_B_color);
    balls_B = balls;
    balls = [];

    ctx_L.fillStyle = 'gray';
    ctx_L.clearRect(0,0,canvas_L.width, canvas_L.height);  
    startTrialTime = new Date();
    trialsInfo[curTrial].startTime= startTrialTime;
    $('#canvas_L').show();
    ctx_L.drawImage(occluder,canvasWidth/2-50,canvasHeight/2-100);
    balls_A[0].draw_balls();
    balls_A[0].updateColor();
    balls_B[0].draw_balls();
    balls_B[0].updateColor();
    stimuliPreview(); 
}
function showTrials_exp() {
    responseAcceptable = false;
    curTrial++;
    $('#Instruction4').hide();
    $('#nextTrialButton').hide();
    
    if (curTrial <= trialsInfo.length - 1) {

        balls = generateNewBalls_A(trialsInfo[curTrial].ball_A_color);
        balls_A = balls;
        balls = [];
        balls = generateNewBalls_B(trialsInfo[curTrial].ball_B_color);
        balls_B = balls;
        balls = [];

        ctx_L.fillStyle = 'gray';
        ctx_L.clearRect(0,0,canvas_L.width, canvas_L.height);  
        startTrialTime = new Date();
        trialsInfo[curTrial].startTime= startTrialTime;
        $('#canvas_L').show(); 
        ctx_L.drawImage(occluder,canvasWidth/2-50,canvasHeight/2-100);
        balls_A[0].draw_balls();
        balls_A[0].updateColor();
        balls_B[0].draw_balls();
        balls_B[0].updateColor();
        stimuliPreview(); 
    } else {
        $('#Instruction5').show();
        $('#submitButton').show();
    }
}

var myTimeout10;
var myTimeout11;
var myTimeout12;
var shapeInd_A_pre;
var shapeInd_A_test;
var shapeInd_B_pre;
var shapeInd_B_test;
var colorDisk = 500; // QUESTION: WHY 500
var previewShape = 1200; // QUESTION: WHAT THIS???

function stimuliPreview() { // the phases before the diska and shapes move
    myTimeout10 = setTimeout(function() {
        if (trainingTrial <= trialsInfo_training.length-1) {
            shapeInd_A_pre = trialsInfo_training[trainingTrial].shape_A_pre_ind;
            shapeInd_B_pre = trialsInfo_training[trainingTrial].shape_B_pre_ind;  
        }
        if (trainingTrial == trialsInfo_training.length && curTrial>=0) {
            shapeInd_A_pre = trialsInfo[curTrial].shape_A_pre_ind;
            shapeInd_B_pre = trialsInfo[curTrial].shape_B_pre_ind;
        }
            if (shapeInd_A_pre == 0) {
                shapeTmp = document.getElementById("shape0");
            } else if (shapeInd_A_pre == 1) {
                shapeTmp = document.getElementById("shape1");
            } else if (shapeInd_A_pre == 2) {
                shapeTmp = document.getElementById("shape2");
            } else if (shapeInd_A_pre == 3) {
                shapeTmp = document.getElementById("shape3");
            } else if (shapeInd_A_pre == 4) {
                shapeTmp = document.getElementById("shape4");
            }
            ctx_L.drawImage(shapeTmp, balls_A[0].x-27, balls_A[0].y-27)
            // ctx_L.fillStyle = 'white';
            // ctx_L.font = "20px Arial";
            // ctx_L.fillText(shapeInd_A_pre, balls_A[0].x, balls_A[0].y);

            if (shapeInd_B_pre == 0) { // shapeTmp is being set to the shape objects in the DOM
                shapeTmp = document.getElementById("shape0");
            } else if (shapeInd_B_pre == 1) {
                shapeTmp = document.getElementById("shape1");
            } else if (shapeInd_B_pre == 2) {
                shapeTmp = document.getElementById("shape2");
            } else if (shapeInd_B_pre == 3) {
                shapeTmp = document.getElementById("shape3");
            } else if (shapeInd_B_pre == 4) {
                shapeTmp = document.getElementById("shape4");
            }
            ctx_L.drawImage(shapeTmp, balls_B[0].x-27, balls_B[0].y-27)
            // ctx_L.fillStyle = 'white';
            // ctx_L.font = "20px Arial";
            // ctx_L.fillText(shapeInd_B_pre, balls_B[0].x, balls_B[0].y);

        myTimeout11 = setTimeout(function() {  
            balls_A[0].draw_balls();
            balls_A[0].updateColor();
            balls_B[0].draw_balls();
            balls_B[0].updateColor();
            myTimeout12 = setTimeout(function() {
                animate();
            },colorDisk)
        },previewShape)
    },colorDisk)
}

var refresh_stimuliOnset_test = 0;
var color_change_rate = 0;
var myTimeout;
var myReq;
var startResponseTiming = false;
var occluder_velX = 0;
var occluder_velY = 40;
var occluder_posX = 0;
var occluder_posY = 40;

function animate() { // make the balls and the shapes move together, and occluder when spatiotemporal feature is inconsistent
    myTimeout = setTimeout (function() {     
    ctx_L.fillStyle = 'gray';
    ctx_L.clearRect(0,0,canvas_L.width, canvas_L.height);
if (trainingTrial < trialsInfo_training.length) {
    vertical_tmp_A = trialsInfo_training[trainingTrial].ball_A_vertical;
    vertical_tmp_B = trialsInfo_training[trainingTrial].ball_B_vertical;
}
if (trainingTrial == trialsInfo_training.length && curTrial < trialsInfo.length) {
    vertical_tmp_A = trialsInfo[curTrial].ball_A_vertical;
    vertical_tmp_B = trialsInfo[curTrial].ball_B_vertical;
}
    
    balls_A[0].draw_balls();
    balls_A[0].updateColor();
    balls_A[0].updatePosition_A();
    balls_B[0].draw_balls();
    balls_B[0].updateColor();
    balls_B[0].updatePosition_B();
    refresh_stimuliOnset_test ++;
    
    if (refresh_stimuliOnset_test < 76) {
        ctx_L.drawImage(occluder,canvasWidth/2-50,canvasHeight/2-100);
    }
    
    if (refresh_stimuliOnset_test >= 76) { // QUESTION: WHY 76
       if (trainingTrial <= trialsInfo_training.length-1) {
            shapeInd_A_test = trialsInfo_training[trainingTrial].shape_A_test_ind;
            shapeInd_B_test = trialsInfo_training[trainingTrial].shape_B_test_ind;
        }

        if (trainingTrial == trialsInfo_training.length && curTrial>=0) {
            shapeInd_A_test = trialsInfo[curTrial].shape_A_test_ind;
            shapeInd_B_test = trialsInfo[curTrial].shape_B_test_ind;
        }

            if (shapeInd_A_test == 0) {
                shapeTmp = document.getElementById("shape0");
            } else if (shapeInd_A_test == 1) {
                shapeTmp = document.getElementById("shape1");
            } else if (shapeInd_A_test == 2) {
                shapeTmp = document.getElementById("shape2");
            } else if (shapeInd_A_test == 3) {
                shapeTmp = document.getElementById("shape3");
            } else if (shapeInd_A_test == 4) {
                shapeTmp = document.getElementById("shape4");
            }
            ctx_L.drawImage(shapeTmp, balls_A[0].x-27, balls_A[0].y-27) // QUESTION: WHY -27?????
            // ctx_L.fillStyle = 'white';
            // ctx_L.font = "20px Arial";
            // ctx_L.fillText(shapeInd_A_test, balls_A[0].x, balls_A[0].y);
            
            if (shapeInd_B_test == 0) {
                shapeTmp = document.getElementById("shape0");
            } else if (shapeInd_B_test == 1) {
                shapeTmp = document.getElementById("shape1");
            } else if (shapeInd_B_test == 2) {
                shapeTmp = document.getElementById("shape2");
            } else if (shapeInd_B_test == 3) {
                shapeTmp = document.getElementById("shape3");
            } else if (shapeInd_B_test == 4) {
                shapeTmp = document.getElementById("shape4");
            }
            ctx_L.drawImage(shapeTmp, balls_B[0].x-27, balls_B[0].y-27);
            // ctx_L.fillStyle = 'white';
            // ctx_L.font = "20px Arial";
            // ctx_L.fillText(shapeInd_B_test, balls_B[0].x, balls_B[0].y);

        // QUESTION: WHY THESE NUMBERS???
        ctx_L.drawImage(occluder,canvasWidth/2-50-occluder_posX,canvasHeight/2-100-occluder_posY);
        occluder_posY = occluder_posY + occluder_velY;

        if (occluder_posY>canvasHeight) {
            responseAcceptable = true; // only allow response when the occlude is removed/equivalent time in no occluder condition
        }
    }  
        myReq = requestAnimationFrame(animate);
    }, freshRate)
};

// record keyboard response
window.addEventListener('keydown', function(e) {
if (responseAcceptable == true) {
    if (e.key == '1') {
        endTrialTime = new Date();
        window.cancelAnimationFrame(myReq);
        clearTimeout(myTimeout);
        refresh_stimuliOnset_test = 0;
        $('#canvas_L').hide();
        $('#Instruction4').show();
        if (trainingTrial <= trialsInfo_training.length-1) {
            $('#nextTrainingTrialButton').show();
        } 
        if (trainingTrial == trialsInfo_training.length && curTrial>=0) {
            $('#nextTrialButton').show();
        }
        balls_A[0].x = canvasWidth/2-230;
        balls_A[0].y = canvasHeight/2;
        balls_B[0].x = canvasWidth/2+230;
        balls_B[0].y = canvasHeight/2;
        trialsInfo[curTrial].endTime = endTrialTime;
        trialsInfo[curTrial].reactTime = endTrialTime - startTrialTime-colorDisk-previewShape-colorDisk-76*20;
        trialsInfo[curTrial].responseC = 1;     
    }
    if (e.key == '0') {
        endTrialTime = new Date();
        window.cancelAnimationFrame(myReq);
        clearTimeout(myTimeout);
        refresh_stimuliOnset_test = 0;
        $('#canvas_L').hide();
        $('#Instruction4').show();
        if (trainingTrial <= trialsInfo_training.length-1) {
            $('#nextTrainingTrialButton').show();
        } 
        if (trainingTrial == trialsInfo_training.length && curTrial>=0) {
            $('#nextTrialButton').show();
        }
        balls_A[0].x = canvasWidth/2-230;
        balls_A[0].y = canvasHeight/2;
        balls_B[0].x = canvasWidth/2+230;
        balls_B[0].y = canvasHeight/2;        
        trialsInfo[curTrial].endTime = endTrialTime;
        trialsInfo[curTrial].reactTime = endTrialTime - startTrialTime-colorDisk-previewShape-colorDisk-76*20;
        trialsInfo[curTrial].responseC = 0;  
    }
}           
}, false);
// save json file to local device
function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
};

function doneExperiment() {
    JSONObj = JSON.stringify(window.frame);
    download(JSONObj, "test_data.json", "json"); 
};
/* wait for clicks */

// Testing data posting
//$('#continueInstructionButton1').click(postData);

$('#continueInstructionButton1').click(continueInstruction1);
$('#startTrainingButton').click(showTrials_training_0);
$('#nextTrainingTrialButton').click(showTrials_training);
$('#startExpButton').click(showTrials_exp_0);
$('#nextTrialButton').click(showTrials_exp);

//$('#submitButton').attr("onclick", "doneExperiment()");
$('#submitButton').attr("onclick", "postData()");

// this script is written by Qihan Wu on 10/11/2022 for experiments investigating what dominates object correspondece