function cleanBufer() {
    if($("[name='msg']").length > 8) {
        $("[name='msg']")[0].remove();
        var scrol = $('.chatlogs');  
        scrol.scrollTop(500);
    }
}
//for fix bug
function cleanAllBufer() {
    $("[name='msg']")[0].remove();
}
// функция сказать
function say(word) {
    cleanBufer();
	$('.chatlogs').append('<div name="msg" class="chat self"><div class="user-photo"><img src="img/shwarz.png"></div><p class="chat-message">'+word+'</p></div>');
    var scrol = $('.chatlogs');  
    scrol.scrollTop(500);
}

// сказать боту
function sayComputer(word) {
    cleanBufer();
	$('.chatlogs').append('<div name="msg" class="chat friend"><div class="user-photo1"><img src="img/terminator.png"></div><p class="chat-message">'+word+'</p></div>');
    var scrol = $('.chatlogs');  
    scrol.scrollTop(500);
}

function getUserAnsver() {
    let lastTxt = $(".chat-message:last").text();
    let lsttxt = lastTxt.toLowerCase();
    return lsttxt;
}



// count for function choiceAnswer
var count = 0;

function choiceAnswer() {
    var answer = "Error, check choiceAnswer";

    switch (count) {
        case 0:
            if ((getUserAnsver() == "start")) {
                answer = "Does this shit work?";
                count++;
            }
            else if ((getUserAnsver() == "no")) {
                answer = "Watch yourself, be careful!";
                count = 0;
            }
            else {
                answer = randomPhrase(idioms);
                count = 0;
            } 
            break;
        case 1:
            if ((getUserAnsver() == "yes")) {
                answer = "Do not touch anything. NO PROBLEM";
                count = 0;
            }
            else if ((getUserAnsver() == "no")) {
                answer = "You touched it?";
                count++;
            } 
            else {
                answer = randomPhrase(idioms);
                count = 0;
            } 
            break;
        case 2:
            if ((getUserAnsver() == "yes")) {
                answer = "In vain, someone knows about it?";
                count++;
            }
            else if ((getUserAnsver() == "no")) {
                answer = "Someone will be angry or upset?";
                count++;
            } 
            else {
                answer = randomPhrase(idioms);
                count = 0;
            } 
            break;
        case 3:
            if ((getUserAnsver() == "yes")) {
                answer = "Do you have problems, can you blame someone?";
                count++;
            }
            else if ((getUserAnsver() == "no")) {
                answer = "do not tell anyone, NO PROBLEM";
                count = 0;
            } 
            else {
                answer = randomPhrase(idioms);
                count = 0;
            } 
            break;
        case 4:
            if ((getUserAnsver() == "yes")) {
                answer = "You problem are ok, type 'start' if you want run new test";
                count = 0;
            }
            else if ((getUserAnsver() == "no")) {
                answer = "You Hawe a PROBLEM....run!";
                count++;
            } 
            else {
                answer = randomPhrase(idioms);
                count = 0;
            } 
            break;
        default:
            count = 0;
            answer = "run Vasya, run!";
    }
    //console.log(count);
    return answer;
}

var idioms = [
    "All or nothing.", 
    "Don’t judge a book by it's cover.",
    "Your roof is running away from you",
    "Nobody's perfect, but me.",
    "You rock!",
    "After a storm comes a calm.",
    "Better late than never.",
    "Being between hammer and anvil",
    "It takes two to tango.",
    "It takes two to lie. One to lie and one to listen. "
];

function randomPhrase(phraseArray) {
    randomIndex = Math.floor(Math.random() * 10);
    return phraseArray[randomIndex];
}

/*
document.onkeyup = function (e) {
    e = e || window.event;
    if (e.keyCode === 13) {
      var otvet = $('#txt').val();
      say(otvet);
      $('#txt').val('');
    }
    // Отменяем действие браузера
    return false;
}
*/
// отправка сообщения на ctrl + e
$('#txt').keydown(function(e){
	if(e.ctrlKey && e.keyCode == 13) {
        if (checkInvalidInput()) {
            var otvet = $('#txt').val();
            var answ = otvet.trimMiddle();
            say(fixBugLenStr(answ));      
            setTimeout(function() {
                sayComputer(choiceAnswer());
            }, 500);
            var scrol = $('.chatlogs');  
            scrol.scrollTop(500);
            $('#txt').val('');
        } else {
            setTimeout(function() {
                sayComputer('Incorrect input, try again!');
            }, 500);
            var scrol = $('.chatlogs');  
            scrol.scrollTop(500);
            $('#txt').val('');
        }		
	}
});
// отправка сообщения кнопкой
document.getElementById("btn").onclick = function() {
    //cleanAllBufer(); // for fix bug
    if (checkInvalidInput()) {
        var otvet = $('#txt').val();
        var answ = otvet.trimMiddle();
        say(fixBugLenStr(answ));      
        setTimeout(function() {
            sayComputer(choiceAnswer());
        }, 500);
        var scrol = $('.chatlogs');  
        scrol.scrollTop(500);
        $('#txt').val('');
    } else {
        setTimeout(function() {
            sayComputer('Incorrect input, try again!');
        }, 500);
        $('#txt').val('');
        var scrol = $('.chatlogs');  
        scrol.scrollTop(500);
        $('#txt').val('');
    }
}

function checkInvalidInput() {
    var otv = $('#txt').val();
    var annsw = otv.trimAll()
    if (annsw.length > 0) {
        return true;
    } else {
        return false;
    }
}

// ########### for string methods ################

String.prototype.trimRight=function()
// убирает все пробелы в конце строки
{
  var r=/\s+$/g;
  return this.replace(r,'');
}
String.prototype.trimLeft=function()
// убирает все пробелы в начале строки
{
  var r=/^\s+/g;
  return this.replace(r,'');
}
String.prototype.trim=function()
// убирает все пробелы в начале и в конце строки
{
  return this.trimRight().trimLeft();
}
String.prototype.trimMiddle=function()
// убирает все пробелы в начале и в конце строки
// помимо этого заменяет несколько подряд
// идущих пробелов внутри строки на один пробел
{
  var r=/\s\s+/g;
  return this.trim().replace(r,' ');
}
String.prototype.trimAll=function()
// убирает все пробелы в строке s
{
  var r=/\s+/g;
  return this.replace(r,'');
}
String.prototype.addprobel = function(pos,str){
    var beforeSubStr = this.substring(0,pos);
    var afterSubStr = this.substring(pos,this.length);
    return beforeSubStr+str+afterSubStr;
}


// фиксим баг интерфейса, баг не критичный 
function fixBugLenStr(bugStrn) {
    var fixstrArr = bugStrn.split(" ");
    var lastfixstr = new Array();
    if (fixstrArr.length > 1) {
        for (var i=0; i<fixstrArr.length; i++) {
            if (fixstrArr[i].length > 30) {
                lastfixstr[i] = assa(fixstrArr[i]);
            } else {
                lastfixstr[i] = fixstrArr[i];
            }
        }
    } 
    if (fixstrArr[0].length > 30) {
        lastfixstr[0] = assa(fixstrArr[0]);
    } else {
        for (var m=0; m<fixstrArr.length; m++) {      
            lastfixstr[m] = fixstrArr[m];
        }
    }
    return lastfixstr.join(" ");
}
function assa(bugStr) {
    var count = 30;
    var prohod = Math.floor(bugStr.length / 30);
    var temstr = bugStr;
    for (var i=0; i<prohod; i++) {
        temstr = temstr.addprobel(count, " ");
        count += 31;
    }
    return temstr;
}


// ########### for string methods ################
