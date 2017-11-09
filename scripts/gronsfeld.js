var idioms2 = [
    "Wenn der Berg nicht zum Propheten kommt, muss der Prophet zum Berge kommen.", 
    "Alles zu seiner Zeit.",
    "Den Vogel erkennt men an seinen Federn.",
    "Eile mit Weile.",
    "Keine Rosen ohne Dorn.",
    "Speie nicht in den Brunnen, denn du weisst nicht, ob du nicht einmal daraus trinken musst.",
    "Wo Rauch ist, ist auch Feuer.",
    "Jedem Tierchen sein Pläsierchen.",
    "Mein Name ist Hase (,ich weiß von nichts).",
    "Die Wände haben Ohren."
];

function randomPhrases(phraseArray) {
    randomIndex = Math.floor(Math.random() * 10);
    return phraseArray[randomIndex];
}
// первая часть программы для шифровки, работа с формой №1
var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var alphabetNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];
var key = undefined;
// функция преобразовывает строку текста в массив цифр
function preobrazovatSlovo(words) {
	var word1 = words.toLowerCase();
	var slovoArray = new Array;
	for(var i=0; i<word1.length; i++){
		for(var j=0; j<alphabet.length; j++) {
			if(word1.charAt(i) === alphabet[j]) {
				slovoArray[i] = alphabetNumbers[j];
			}
			if(word1.charAt(i) === ' ') {
				slovoArray[i] = 0;
			}		
		}			
	}
	return slovoArray;
}
// функция преобразовывает строку ключа в массив чисел
function preobrazovatKey(keystring) {
	var keyarra = new Array;
	for(var i=0; i<keystring.length; i++) {
		keyarra[i] = Number(keystring.charAt(i));
	}
	return keyarra;
}
// Функция шифрования массива чисел из строки (МАСКИРОВАНИЕ)
function crypt(keystr, stringarr) {
	var ArrayOne = stringarr;
	var ArrayTwo = keystr;
	var Schetchik = 0;

	for (var i=0; i<ArrayOne.length; i++){
		if (ArrayOne[i] == 0){
			ArrayOne[i] = 0;
			Schetchik = Schetchik + 1;
		}
		else {
			ArrayOne[i] = ArrayOne[i] + ArrayTwo[Schetchik];
			Schetchik = Schetchik + 1;
		}

		if (Schetchik == ArrayTwo.length)
			Schetchik = 0;
		else
			Schetchik=Schetchik;
	}

	var temparr = ArrayOne;

	for(var i=0; i<temparr.length; i++) {
		if(temparr[i] > 26)
			temparr[i] = temparr[i] - 26;
	} 

	return temparr;
}

function ConvertToCipher(temparra) {
	var tmpAr = temparra;
	var otvetstr = undefined;
	for(var i=0; i<alphabetNumbers.length; i++) {
		for(var j=0; j<tmpAr.length; j++) {
			if(tmpAr[j] == alphabetNumbers[i])
				tmpAr[j] = alphabet[i];
			if(tmpAr[j] == 0)
				tmpAr[j] = " ";
		}
	}
	otvetstr = tmpAr.join("");
	//console.log(otvetstr);
	return otvetstr;
}

document.getElementById("btn1").onclick = function() {
	//console.log("______encryption started_______");
	var slovo = $("#text1").val();
	var slovoArray = preobrazovatSlovo(slovo);
	//console.log(slovoArray);
	var keyStr = $("#key1").val();
	var keyArr = preobrazovatKey(keyStr);
	//console.log(keyArr);
	var OtvetArray = crypt(keyArr, slovoArray);
	//console.log(OtvetArray);
	var finalOtvet = ConvertToCipher(OtvetArray);
	$("#shifrResult1").val(finalOtvet);
	setTimeout(function() {
        sayComputer(randomPhrases(idioms2));
    }, 250);
    var scrol = $('.chatlogs');  
    scrol.scrollTop(500);
}

// Вторая часть программы для дешифровки, работа с формой №2

function decrypt(keyarr, numberarr) {
	var ArrayOne = numberarr;
	var ArrayTwo = keyarr;
	var Schetchik = 0;

	for (var i=0; i<ArrayOne.length; i++){
		if (ArrayOne[i] == 0){
			ArrayOne[i] = 0;
			Schetchik = Schetchik + 1;
		}
		else {
			ArrayOne[i] = ArrayOne[i] - ArrayTwo[Schetchik];
			Schetchik = Schetchik + 1;
		}

		if (Schetchik == ArrayTwo.length)
			Schetchik = 0;
		else
			Schetchik=Schetchik;
	}
	var temparr = ArrayOne;
	for(var i=0; i<temparr.length; i++) {
		if(temparr[i] < 0)
			temparr[i] = temparr[i] + 26;
	} 
	return temparr;
}

document.getElementById("btn2").onclick = function() {	
	//console.log("______decription started_______");
	var cypher = $("#text2").val();
	var cypherArray = preobrazovatSlovo(cypher);
	//console.log(cypherArray);
	var keyStr = $("#key2").val();
	var keyArr = preobrazovatKey(keyStr);
	//console.log(keyArr);
	var OtvetArray = decrypt(keyArr, cypherArray);
	//console.log(OtvetArray);
	var finalOtvet = ConvertToCipher(OtvetArray);
	$("#shifrResult2").val(finalOtvet);
	setTimeout(function() {
        sayComputer(randomPhrases(idioms2));
    }, 250);
    var scrol = $('.chatlogs');  
    scrol.scrollTop(500);
}
