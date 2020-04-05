let keyboard = document.createElement('div');
let input = document.createElement('textarea');
let keyboardCodesEng = [96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 91, 93, 92, 97, 115, 100, 102, 103, 104, 106, 107, 108, 59, 39, 122, 120, 99, 118, 98, 110, 109, 44, 46, 47];
let keyboardCodesRus = [1105, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 1081, 1094, 1091, 1082, 1077, 1085, 1075, 1096, 1097, 1079, 1093, 1098, 92, 1092, 1099, 1074, 1072, 1087, 1088, 1086, 1083, 1076, 1078, 1101, 1103, 1095, 1089, 1084, 1080, 1090, 1100, 1073, 1102, 46];
let keyboardWhich = [192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191];
let firstRow = document.createElement('div');
let secondRow = document.createElement('div');
let thirdRow = document.createElement('div');
let fourthRow = document.createElement('div');
let fifthRow = document.createElement('div');

input.classList.add('input');
keyboard.classList.add('keyboard');
firstRow.classList.add('row', 'first-row');
secondRow.classList.add('row', 'second-row');
thirdRow.classList.add('row', 'third-row');
fourthRow.classList.add('row', 'fourth-row');
fifthRow.classList.add('row', 'fifth-row');

document.body.append(input);
document.body.append(keyboard);
keyboard.prepend(firstRow);
firstRow.after(secondRow);
secondRow.after(thirdRow);
thirdRow.after(fourthRow);
fourthRow.after(fifthRow);

let backspace = document.createElement('div');
let del = document.createElement('div');
let enter = document.createElement('div');
let tab = document.createElement('div');
let capsLk = document.createElement('div');
let shiftLeft = document.createElement('div');
let ctrlLeft = document.createElement('div');
let win = document.createElement('div');
let altLeft = document.createElement('div');
let space = document.createElement('div');
let up = document.createElement('div');
let down = document.createElement('div');
let left = document.createElement('div');
let right = document.createElement('div');

backspace.innerHTML = 'Backspace';
del.innerHTML = 'Delete';
enter.innerHTML = 'Enter';
tab.innerHTML = 'Tab';
capsLk.innerHTML = 'CapsLk';
shiftLeft.innerHTML = 'Shift';
ctrlLeft.innerHTML = 'Ctrl';
win.innerHTML = 'Win';
altLeft.innerHTML = 'Alt';
up.innerHTML = '­↑';
down.innerHTML = '↓';
left.innerHTML = '←';
right.innerHTML = '→';
space.innerHTML = 'Space';

backspace.setAttribute('data', '8');
del.setAttribute('data', '46');
enter.setAttribute('data', '13');
tab.setAttribute('data', '9');
capsLk.setAttribute('data', '20');
shiftLeft.setAttribute('data', '16');
ctrlLeft.setAttribute('data', '17');
win.setAttribute('data', '91');
altLeft.setAttribute('data', '18');
up.setAttribute('data', '38');
down.setAttribute('data', '40');
left.setAttribute('data', '37');
right.setAttribute('data', '39');
space.setAttribute('data', '32');

shiftLeft.classList.add('keyboard__shift');
ctrlLeft.classList.add('keyboard__ctrl');
space.classList.add('keyboard__space');
backspace.classList.add('keyboard__backspace');
capsLk.classList.add('keyboard__capslk');
del.classList.add('keyboard__del');
enter.classList.add('keyboard__enter');
tab.classList.add('keyboard__tab');
win.classList.add('keyboard__win');
altLeft.classList.add('keyboard__alt');
up.classList.add('keyboard__arrow');
down.classList.add('keyboard__arrow');
left.classList.add('keyboard__arrow');
right.classList.add('keyboard__arrow');



let shiftRight = shiftLeft.cloneNode(true);
let ctrlRight = ctrlLeft.cloneNode(true);
let altRight = altLeft.cloneNode(true);

/* создание кнопок */
function init(keyboardCodes) {
   for (let i = 0; i < 13; i++) {
      addKeyboardKeys(firstRow, i, keyboardCodes);
   }

   for (let i = 13; i < 26; i++) {
      addKeyboardKeys(secondRow, i, keyboardCodes);
   }

   for (let i = 26; i < 37; i++) {
      addKeyboardKeys(thirdRow, i, keyboardCodes);
   }

   for (let i = 37; i < keyboardCodes.length; i++) {
      addKeyboardKeys(fourthRow, i, keyboardCodes);
   }

   let keyboardKeys = document.querySelectorAll('.keyboard div');


   firstRow.append(backspace);
   secondRow.prepend(tab);
   secondRow.append(del);
   thirdRow.prepend(capsLk);
   thirdRow.append(enter);
   fourthRow.prepend(shiftLeft);
   fourthRow.append(up, shiftRight);
   fifthRow.prepend(ctrlLeft, win, altLeft, space, altRight, left, down, right, ctrlRight);

   keyboardKeys = document.querySelectorAll('.row div');

   keyboardKeys.forEach(elem => {
      elem.classList.add('keyboard__keys');
   });

   return keyboardKeys;
}
let keyboardKeys = init(keyboardCodesEng);

/* нажатие на кнопку виртуальной клавиатуры */

keyboardKeys.forEach(elem => {
   elem.onmousedown = function () {
      let cursorPos = getCursorPosition(input);
      switch (elem.innerHTML) {
         case 'space':
            input.innerHTML += ' ';
            break;
         case 'Enter':
            input.innerHTML += '\r\n';
            break;
         case 'Tab':
            input.innerHTML += '    ';
            break;
         case 'Alt':
         case 'Ctrl':
         case 'Shift':
            break;
         case 'Backspace':
            toBackspace(input, cursorPos);
            break;
         case 'CapsLk':
            keyboardKeys.forEach(elem => {
               elem.classList.toggle('keyboard__keys_upperCase');
            });
            break;
         case 'Delete':
            toDelete(input, cursorPos);
            break;
         case 'Win':
            break;
         default:
            if (document.querySelectorAll('.keyboard__keys_upperCase').length === 0) {
               input.innerHTML += elem.innerHTML;
            }
            else {
               input.innerHTML += elem.innerHTML.toUpperCase();
            }
      }
      toActive(elem);
   }
   elem.onmouseup = function () {
      elem.classList.remove('keyboard__keys_active');
      cursorPos = getCursorPosition(input);
   }
});
let a = [];

// document.onkeypress = function (event) {
//    a.push(event.charCode);
//    console.log(a);
// }

/* нажатие на кнопку физической клавиатуры */
document.addEventListener('keydown', function (event) {
   if (event.which == 16) {
      let shift = (event.location == 1) ? shiftLeft : shiftRight;
      toActive(shift);
      checkActiveKeys(shiftLeft, altLeft);
      return;
   }
   if (event.which == 18) {
      let alt = (event.location == 1) ? altLeft : altRight;
      toActive(alt);
      event.preventDefault();
      checkActiveKeys(shiftLeft, altLeft);
      return;
   }
   if (event.which == 17) {
      let ctrl = (event.location == 1) ? ctrlLeft : ctrlRight;
      toActive(ctrl);
      event.preventDefault();
      return;
   }
   toActive(document.querySelector('.keyboard__keys[data="' + event.which + '"]'));
   switch (event.which) {
      case 13:
         input.innerHTML += '\r\n';
         break;
      case 9:
         input.innerHTML += '    ';
         event.preventDefault();
         break;
      case 32:
         input.innerHTML += ' ';
         break;
      case 20:
         keyboardKeys.forEach(elem => {
            elem.classList.toggle('keyboard__keys_upperCase');
         })
         event.preventDefault();
         break;
      case 8:
      case 46:
      case 91:
         break;
      default:
         if (document.querySelectorAll('.keyboard__keys_upperCase').length === 0) {
            input.innerHTML += document.querySelector('.keyboard__keys[data="' + event.which + '"]').innerHTML;
         }
         else {
            input.innerHTML += (document.querySelector('.keyboard__keys[data="' + event.which + '"]').innerHTML).toUpperCase();
         }
   }
})

document.addEventListener('keyup', function toDeactive() {
   keyboardKeys.forEach(elem => {
      elem.classList.remove('keyboard__keys_active');
   })
})




function addKeyboardKeys(row, i, codes) {
   row.innerHTML += '<div data = "' + keyboardWhich[i] + '" >' + String.fromCharCode(codes[i]) + '</div > ';
}

function changeKeyboardKeys(elem, codes, i) {
   elem.innerHTML = String.fromCharCode(codes[i]);
}


function toActive(elem) {
   elem.classList.add('keyboard__keys_active');
}


function getCursorPosition(ctrl) {
   var CaretPos = 0;
   if (document.selection) {
      ctrl.focus();
      var Sel = document.selection.createRange();
      Sel.moveStart('character', -ctrl.value.length);
      CaretPos = Sel.text.length;
   } else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
      CaretPos = ctrl.selectionStart;
   }
   return CaretPos;
}


function toBackspace(input, cursorPos) {
   let inputValue = input.innerHTML.split('');
   if (cursorPos == inputValue.length - 1) {
      inputValue.pop();
   }
   else {
      inputValue.splice(cursorPos - 1, 1);
   }
   input.innerHTML = inputValue.join('');
}

function toDelete(input, cursorPos) {
   let inputValue = input.innerHTML.split('');
   inputValue.splice(cursorPos, 1);
   input.innerHTML = inputValue.join('');
}


function checkActiveKeys(a, b) {
   if (a.classList.contains('keyboard__keys_active') && b.classList.contains('keyboard__keys_active')) {
      let elem = document.querySelectorAll('.keyboard__keys');
      let keys = [];
      for (let i = 0; i < elem.length; i++) {
         if (elem[i].classList.length < 2) {
            keys.push(elem[i]);
            console.log(keys);
         };
      }


      keys.forEach(key =>
         key.classList.remove('keyboard__keys_active'))
      if (keys[0].innerHTML == '`') {
         for (let i = 0; i < keys.length; i++) {
            changeKeyboardKeys(keys[i], keyboardCodesRus, i);
         }
      }
      else {
         for (let i = 0; i < keys.length; i++) {
            changeKeyboardKeys(keys[i], keyboardCodesEng, i);
         }
      }
   }
}