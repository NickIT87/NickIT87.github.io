'use strict'

$(function(){
// Main logic for crypt file
var inputElement = document.getElementById('input');
var textareaElement = document.getElementById('textarea');
// событие считывания файла 
inputElement.onchange = function() {
  var fileList = this.files, // список указанных файлов
      textFile = fileList[0]; // для нашего примера берём один файл
  // Проверяем тип файла (текстовый файл)
  if (textFile.type == 'text/plain') {
    // Создаём новый FileReader, который и будет читать наш файл
    var reader = new FileReader();
    // Событие успешного чтения
    reader.onloadend = function(event) {
      var text = event.target.result,
          blob = new Blob([text], { type: 'text/plain' });
      // дальше любые манипуляции с данными
      textareaElement.value = text;
    };
    // Событие ошибки
    reader.onerror = function() {
      alert('Error read file!');
    };
    // Читаем наш файл как текст
    reader.readAsText(textFile);
  } else {
    alert('This is not a text file!');
  }
};

function checkRadio(selectorName) {
    var inp = document.getElementsByName(selectorName);
    for (var i = 0; i < inp.length; i++) {
        if (inp[i].type == "radio" && inp[i].checked) {
            //console.log("selected: " + inp[i].value + (i+1));
            return i+1;
        }
    }
}
// get user settings from settings module
/*
function getSettingsValues() {
	var userSettings = new Array();
	var arraycount = 0;
	for (var i = 2; i < 6; i++) {
		userSettings[arraycount] = checkRadio(i);
		arraycount++;
	}
	return userSettings;
}
*/
function download(text, name, type) {
  var a = document.getElementById("a");
  var file = new Blob([text], {type: type});
  a.href = URL.createObjectURL(file);
  a.download = name;
}

function createkey(secret, salt) {
	switch (checkRadio(2)) {
		case 1: 
			var key128Bits = CryptoJS.PBKDF2(secret, salt, { keySize: 128/32 }).toString();
			$("#fileKey").val(key128Bits);
			break;
		case 2:
			var key256Bits = CryptoJS.PBKDF2(secret, salt, { keySize: 256/32 }).toString();
			$("#fileKey").val(key256Bits);
			break;
		case 3:
			var key512Bits1000Iterations = CryptoJS.PBKDF2(secret, salt, { keySize: 512/32, iterations: 1000 });
			$("#fileKey").val(key512Bits1000Iterations);
			break;
		default:
			// by default this code newer execute
			var key256Bits = CryptoJS.PBKDF2(secret, salt, { keySize: 256/32 }).toString();
			$("#fileKey").val(key256Bits);
			break;
	}
}

function createSign(text, sign) {
	var hash;
	switch (checkRadio(4)) {
		case 1: 
			hash = CryptoJS.HmacMD5(text, sign);
			break;
		case 2:
			hash = CryptoJS.HmacSHA1(text, sign);
			break;
		case 3:
			hash = CryptoJS.HmacSHA256(text, sign);
			break;
		case 4: 
			hash = CryptoJS.HmacSHA512(text, sign);
			break;
		default:
			// by default this code newer execute
			hash = CryptoJS.HmacMD5(text, sign);
			break;
	}
	return hash.toString(CryptoJS.enc.Base64);
}

function protocolCipherFunc(message, key) {
	var CipherMsg = new Object();
	switch (checkRadio(3)) {
		case 1: 
			CipherMsg.cipher = CryptoJS.AES.encrypt(message, key).toString();
			break;
		case 2:
			CipherMsg.cipher = CryptoJS.TripleDES.encrypt(message, key).toString();
			break;
		case 3:
			CipherMsg.cipher = CryptoJS.Rabbit.encrypt(message, key).toString();
			break;
		case 4: 
			CipherMsg.cipher = CryptoJS.RC4Drop.encrypt(message, key).toString();
			break;
		default:
			// by default this code newer execute
			CipherMsg.cipher = CryptoJS.AES.encrypt(message, key).toString();
			break;
	}
	switch (checkRadio(5)) {
		case 1: 
			CipherMsg.checkSum = CryptoJS.SHA3(CipherMsg.cipher, { outputLength: 224 }).toString(CryptoJS.enc.Base64);
			break;
		case 2:
			CipherMsg.checkSum = CryptoJS.SHA3(CipherMsg.cipher, { outputLength: 256 }).toString(CryptoJS.enc.Base64);
			break;
		case 3:
			CipherMsg.checkSum = CryptoJS.SHA3(CipherMsg.cipher, { outputLength: 384 }).toString(CryptoJS.enc.Base64);
			break;
		case 4: 
			CipherMsg.checkSum = CryptoJS.SHA3(CipherMsg.cipher, { outputLength: 512 }).toString(CryptoJS.enc.Base64);
			break;
		case 5: 
			CipherMsg.checkSum = CryptoJS.RIPEMD160(CipherMsg.cipher).toString(CryptoJS.enc.Base64);
			break;
		default:
			// by default this code newer execute
			CipherMsg.checkSum = CryptoJS.SHA3(CipherMsg.cipher, { outputLength: 224 }).toString(CryptoJS.enc.Base64);
			break;
	}
	return CipherMsg;
}

function protocolDecipherFunc() {
	var CipherMsg, tested;
	var PlText = new Object(); // this variable must be returned
	try {
	  CipherMsg = JSON.parse($("#textarea").val());
	} catch (e) {
	  sayComputer("The checksum is not available.");
	  CipherMsg = $("#textarea").val();
	}
	if (typeof CipherMsg === "object") {
		switch (checkRadio(5)) {
			case 1: 
				tested = CryptoJS.SHA3(CipherMsg.cipher, { outputLength: 224 }).toString(CryptoJS.enc.Base64);
				if (tested === CipherMsg.checkSum) {
					sayComputer("checksum is ok.");
				} else {
					sayComputer("error checksum not equal");
				}
				break;
			case 2:
				tested = CryptoJS.SHA3(CipherMsg.cipher, { outputLength: 256 }).toString(CryptoJS.enc.Base64);
				if (tested === CipherMsg.checkSum) {
					sayComputer("checksum is ok.");
				} else {
					sayComputer("error checksum not equal");
				}
				break;
			case 3:
				tested = CryptoJS.SHA3(CipherMsg.cipher, { outputLength: 384 }).toString(CryptoJS.enc.Base64);
				if (tested === CipherMsg.checkSum) {
					sayComputer("checksum is ok.");
				} else {
					sayComputer("error checksum not equal");
				}
				break;
			case 4: 
				tested = CryptoJS.SHA3(CipherMsg.cipher, { outputLength: 512 }).toString(CryptoJS.enc.Base64);
				if (tested === CipherMsg.checkSum) {
					sayComputer("checksum is ok.");
				} else {
					sayComputer("error checksum not equal");
				}
				break;
			case 5: 
				tested = CryptoJS.RIPEMD160(CipherMsg.cipher).toString(CryptoJS.enc.Base64);
				if (tested === CipherMsg.checkSum) {
					sayComputer("checksum is ok.");
				} else {
					sayComputer("error checksum not equal");
				}
				break;
			default:
				// by default this code newer execute
				tested = CryptoJS.SHA3(CipherMsg.cipher, { outputLength: 224 }).toString(CryptoJS.enc.Base64);
				if (tested === CipherMsg.checkSum) {
					sayComputer("checksum is ok.");
				} else {
					sayComputer("error checksum not equal");
				}
				break;
		}
		switch (checkRadio(3)) {
			case 1: 
				tested = CryptoJS.AES.decrypt(CipherMsg.cipher, $("#fileKey").val()).toString(CryptoJS.enc.Utf8);
			
				PlText = JSON.parse(tested, function(key, value) {
				  if (key == 'date') return new Date(value);
				  return value;
				});

				break;
			case 2:
				tested = CryptoJS.TripleDES.decrypt(CipherMsg.cipher, $("#fileKey").val()).toString(CryptoJS.enc.Utf8);
				PlText = JSON.parse(tested, function(key, value) {
				  if (key == 'date') return new Date(value);
				  return value;
				});
				break;
			case 3:
				tested = CryptoJS.Rabbit.decrypt(CipherMsg.cipher, $("#fileKey").val()).toString(CryptoJS.enc.Utf8);
				PlText = JSON.parse(tested, function(key, value) {
				  if (key == 'date') return new Date(value);
				  return value;
				});
				break;
			case 4: 
				tested = CryptoJS.RC4Drop.decrypt(CipherMsg.cipher, $("#fileKey").val()).toString(CryptoJS.enc.Utf8);
				PlText = JSON.parse(tested, function(key, value) {
				  if (key == 'date') return new Date(value);
				  return value;
				});
				break;
			default:
				// by default this code newer execute
				tested = CryptoJS.AES.decrypt(CipherMsg.cipher, $("#fileKey").val()).toString(CryptoJS.enc.Utf8);
				PlText = JSON.parse(tested, function(key, value) {
				  if (key == 'date') return new Date(value);
				  return value;
				});
				break;
		}	
	} else if (typeof CipherMsg === "string") {
		switch (checkRadio(3)) {
			case 1: 
				tested = CryptoJS.AES.decrypt(CipherMsg, $("#fileKey").val()).toString(CryptoJS.enc.Utf8);
			
				PlText = JSON.parse(tested, function(key, value) {
				  if (key == 'date') return new Date(value);
				  return value;
				});

				break;
			case 2:
				tested = CryptoJS.TripleDES.decrypt(CipherMsg, $("#fileKey").val()).toString(CryptoJS.enc.Utf8);
				PlText = JSON.parse(tested, function(key, value) {
				  if (key == 'date') return new Date(value);
				  return value;
				});
				break;
			case 3:
				tested = CryptoJS.Rabbit.decrypt(CipherMsg, $("#fileKey").val()).toString(CryptoJS.enc.Utf8);
				PlText = JSON.parse(tested, function(key, value) {
				  if (key == 'date') return new Date(value);
				  return value;
				});
				break;
			case 4: 
				tested = CryptoJS.RC4Drop.decrypt(CipherMsg, $("#fileKey").val()).toString(CryptoJS.enc.Utf8);
				PlText = JSON.parse(tested, function(key, value) {
				  if (key == 'date') return new Date(value);
				  return value;
				});
				break;
			default:
				// by default this code newer execute
				tested = CryptoJS.AES.decrypt(CipherMsg, $("#fileKey").val()).toString(CryptoJS.enc.Utf8);
				PlText = JSON.parse(tested, function(key, value) {
				  if (key == 'date') return new Date(value);
				  return value;
				});
				break;
		}
	}
	return PlText;
}

function checkSign(messageObject) {
	var testHash = createSign(messageObject.ptext + messageObject.datatime, $("#fileSign").val());
	if (testHash === messageObject.hashsign) {
		sayComputer("all right, the electronic signature is the same");
	} else {
		sayComputer("danger, electronic signature does not match");
	}
}

$('#CreateCipherFile').click(function(){
	event.preventDefault(); // отключаем автоматическую очистку формы
	// all fields must be filled in
	if( ($("#textarea").val() == '') || 
		($("#fileSign").val() == '') || 
		($("#fileKey").val() == '')  ){
			alert("error, The text, sign and key field must be filled in!");
			throw new Error('The text, sign and key field must be filled in!');
	}
	var datatimeObj = new Date();
	var dattime = datatimeObj.toString();
	var PlainText = new Object();
	PlainText.ptext = $("#textarea").val();
	PlainText.datatime = dattime;
	PlainText.hashsign = createSign($("#textarea").val() + dattime, $("#fileSign").val());
	console.log(PlainText);
	var CiphrMsgObj = protocolCipherFunc(JSON.stringify(PlainText), $("#fileKey").val());
	console.log(CiphrMsgObj);
	$("#textarea").val(CiphrMsgObj.cipher);
	sayComputer(fixBugLenStr("checkSum:" + CiphrMsgObj.checkSum));
	download(JSON.stringify(CiphrMsgObj), 'outputText.txt', 'text/plain');
});


$('#CreateDecryptedFile').click(function(){
	event.preventDefault(); // отключаем автоматическую очистку формы
	// all fields must be filled in
	if( ($("#textarea").val() == '') || 
		($("#fileSign").val() == '') || 
		($("#fileKey").val() == '')  ){
			alert("error, The text, sign and key field must be filled in!");
			throw new Error('The text, sign and key field must be filled in!');
	}
	var PlainText = protocolDecipherFunc();
	checkSign(PlainText);
	$("#textarea").val(PlainText.ptext);
});


$('#GenerateKeyForFile').click(function(){
	event.preventDefault();
	if( ($("#fileKey").val() == '') || 
		($("#fileSign").val() == '') ){
			alert("error, no secret or salt phrase!");
			throw new Error('The key and salt field must be filled in!');
	}
	var salt = $("#fileSign").val();
	var secret = $("#fileKey").val();
	createkey(secret, salt);
});

$('#GenerateRandomKey').click(function(){
	event.preventDefault();
	$("#fileKey").val("");	
	var salt = CryptoJS.lib.WordArray.random(128/8);
	var secret = CryptoJS.lib.WordArray.random(128/8);
	createkey(secret, salt);
});

$('#clearAll').click(function(){
	event.preventDefault();
	$("#textarea").val("");
	$("#fileSign").val("");
	$("#fileKey").val("");	
});

});