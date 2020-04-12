let keyboard = document.createElement('div');
let input = document.createElement('textarea');
let keyboardCodesEng = [96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 91, 93, 92, 97, 115, 100, 102, 103, 104, 106, 107, 108, 59, 39, 122, 120, 99, 118, 98, 110, 109, 44, 46, 47];
let keyboardCodesRus = [1105, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 1081, 1094, 1091, 1082, 1077, 1085, 1075, 1096, 1097, 1079, 1093, 1098, 92, 1092, 1099, 1074, 1072, 1087, 1088, 1086, 1083, 1076, 1078, 1101, 1103, 1095, 1089, 1084, 1080, 1090, 1100, 1073, 1102, 46];
let keyboardWhich = [192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191];
let keyboardCodesShift = [126, 33, 64, 35, 36, 37, 94, 38, 42, 40, 41, 95, 43];
let firstRow = document.createElement('div');
let secondRow = document.createElement('div');
let thirdRow = document.createElement('div');
let fourthRow = document.createElement('div');
let fifthRow = document.createElement('div');
let description = document.createElement('p');

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
capsLk.innerHTML = 'CapsLock';
shiftLeft.innerHTML = 'Shift';
ctrlLeft.innerHTML = 'Ctrl';
win.innerHTML = 'Win';
altLeft.innerHTML = 'Alt';
up.innerHTML = '­↑';
down.innerHTML = '↓';
left.innerHTML = '←';
right.innerHTML = '→';
space.innerHTML = 'Space';
description.innerHTML = 'Клавиатура создана в операционной системе <b>Windows</b>.<br> Переключение языка: <b>Ctrl (левый) + Alt (левый)</b>';

keyboard.after(description);

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

let keyboardKeys = (document.cookie == 'language=rus') ? init(keyboardCodesRus) : init(keyboardCodesEng);
let keyboardKeysRegular = [];
for (let i = 0; i < keyboardKeys.length; i++) {
   if (keyboardKeys[i].classList.length < 2) {
      keyboardKeysRegular.push(keyboardKeys[i]);
   }
};
let keyboardLetters = [];
for (let i = 13; i < keyboardKeysRegular.length; i++) {
   keyboardLetters.push(keyboardKeysRegular[i]);
}

/* снятие выделения текста при двойном нажатии ЛКМ */

keyboard.onmousedown = keyboard.onselectstart = function () {
   return false;
};

/* нажатие на кнопку виртуальной клавиатуры */

keyboardKeys.forEach(elem => {
   elem.addEventListener('mousedown', function () {
      let cursorPos = getCaret(input);
      switch (elem.innerHTML) {
         case 'Space':
            input.innerHTML += ' ';
            break;
         case 'Enter':
            input.innerHTML += '\r\n';
            break;
         case 'Tab':
            toActive(elem);
            input.innerHTML += '    ';
            break;
         case 'Alt':
            toActive(elem);
            break;
         case 'Ctrl':
            elem.classList.toggle('keyboard__keys_active');
            toDeactiveByClick(elem);
            toDeactiveByPress(elem);
            break;
         case 'Shift':
            toActiveCapsOrShift(elem);
            changeFirstRow();
            toDeactiveByClick(elem);
            toDeactiveByPress(elem);
            break;
         case 'Backspace':
            toBackspace();
            break;
         case 'CapsLock':
            toActiveCapsOrShift(elem);
            break;
         case 'Delete':
            toDelete(input, cursorPos);
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
   });

   elem.addEventListener('mouseup', function () {
      if (elem == shiftLeft || elem == shiftRight || elem == capsLk || elem == ctrlLeft) {
         return;
      }
      elem.classList.remove('keyboard__keys_active');
      if (ctrlLeft.classList.contains('keyboard__keys_active') && elem == altLeft) {
         elem.classList.add('keyboard__keys_active');
         checkActiveKeys(ctrlLeft, altLeft);
         keyboardKeys.forEach(key =>
            key.classList.remove('keyboard__keys_active'));
      }
   })
});

/* нажатие на кнопку физической клавиатуры */

document.addEventListener('keydown', function (event) {

   /* подсветка нужной клавиши */

   if (event.which == 16) {
      let shift = (event.location == 1) ? shiftLeft : shiftRight;
      shift.classList.add('keyboard__keys_active');
      keyboardKeysRegular.forEach(elem => {
         elem.classList.add('keyboard__keys_upperCase');
      });
      changeFirstRow();
      return;
   }
   if (event.which == 18) {
      let alt = (event.location == 1) ? altLeft : altRight;
      toActive(alt);
      event.preventDefault();
      checkActiveKeys(ctrlLeft, altLeft);
      return;
   }
   if (event.which == 17) {
      let ctrl = (event.location == 1) ? ctrlLeft : ctrlRight;
      ctrl.classList.add('keyboard__keys_active');
      event.preventDefault();
      checkActiveKeys(ctrlLeft, altLeft);
      return;
   }
   toActive(document.querySelector(`.keyboard__keys[data='${event.which}']`));

   /* вывод при нажатии клавиши */

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
         toActiveCapsOrShift(capsLk);
         event.preventDefault();
         break;
      case 8:
      case 46:
      case 91:
         break;
      default:
         if (document.querySelectorAll('.keyboard__keys_upperCase').length === 0) {
            input.innerHTML += document.querySelector(`.keyboard__keys[data='${event.which}']`).innerHTML;
         }
         else {
            input.innerHTML += (document.querySelector(`.keyboard__keys[data='${event.which}']`).innerHTML).toUpperCase();
         }
   }
});

document.addEventListener('keyup', function toDeactive(event) {
   if (event.key == 'CapsLock') {
      return;
   }
   else if (event.key == 'Shift') {
      shiftLeft.classList.remove('keyboard__keys_active');
      shiftRight.classList.remove('keyboard__keys_active');
      keyboardKeysRegular.forEach(key =>
         key.classList.remove('keyboard__keys_upperCase'));
   }
   else {
      keyboardKeys.forEach(elem =>
         elem.classList.remove('keyboard__keys_active')
      )
   }
});

/* функция создания клавиатуры */

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

function addKeyboardKeys(row, i, codes) {
   row.innerHTML += `<div data='${keyboardWhich[i]}'> ${String.fromCharCode(codes[i])}</div>`;
}

function changeKeyboardKeys(elem, codes, i) {
   elem.innerHTML = String.fromCharCode(codes[i]);
}

function changeFirstRow() {
   if (keyboardKeysRegular[0].innerHTML == '~') {
      if (keyboardKeysRegular[13].innerHTML === 'q') {
         changeFirstRowKeys(keyboardCodesEng);
      }
      else {
         changeFirstRowKeys(keyboardCodesRus);
      }
   }
   else {
      changeFirstRowKeys(keyboardCodesShift);
   }
}

function changeFirstRowKeys(codes) {
   let firstRowKeys = document.querySelectorAll('.first-row > div');
   for (let i = 0; i < firstRowKeys.length - 1; i++) {
      changeKeyboardKeys(firstRowKeys[i], codes, i);
   }
}

function toActive(elem) {
   if (elem == shiftLeft || elem == shiftRight || elem == capsLk || elem == ctrlLeft) {
      return;
   }
   elem.classList.add('keyboard__keys_active');
}

function toActiveCapsOrShift(elem) {
   elem.classList.toggle('keyboard__keys_active');
   keyboardLetters.forEach(key => {
      key.classList.toggle('keyboard__keys_upperCase');
   })
}

function toDeactiveByClick(elem) {
   keyboardLetters.forEach(key =>
      key.onclick = function () {
         elem.classList.remove('keyboard__keys_active');
         keyboardKeysRegular.forEach(key =>
            key.classList.remove('keyboard__keys_upperCase'));
         if (elem == shiftLeft) {
            changeFirstRow();
         }
      })
}

function toDeactiveByPress(elem) {
   document.onkeypress = function () {
      keyboardKeysRegular.forEach(key =>
         key.classList.remove('keyboard__keys_upperCase'));
      elem.classList.remove('keyboard__keys_active');
      if (elem == shiftLeft) {
         changeFirstRow();
      }
   }
}

function getCaret(element) {
   if (element.selectionStart) {
      return element.selectionStart;
   }
   else if (document.selection) {
      element.focus();
      let range = document.selection.createRange();
      if (range == null) {
         return 0;
      }
      let textRange = element.createTextRange(),
         clonedTextRange = textRange.duplicate();
      textRange.moveToBookmark(range.getBookmark());
      clonedTextRange.setEndPoint('EndToStart', textRange);
      return clonedTextRange.text.length;
   }
   return 0;
}

function resetCursor(txtElement, currentPos) {
   if (txtElement.setSelectionRange) {
      txtElement.focus();
      txtElement.setSelectionRange(currentPos, currentPos);
   }
   else if (txtElement.createTextRange) {
      let range = txtElement.createTextRange();
      range.moveStart('character', currentPos);
      range.select();
   }
}

function toBackspace() {
   let textarea = document.querySelector('.input');
   let currentPos = getCaret(textarea);
   let text = textarea.value;
   let backSpace = text.substr(0, currentPos - 1) + text.substr(currentPos, text.length);
   textarea.value = backSpace;
   resetCursor(textarea, currentPos - 1);
}

function toDelete(input, cursorPos) {
   let inputValue = input.innerHTML.split('');
   inputValue.splice(cursorPos, 1);
   input.innerHTML = inputValue.join('');
}

/* функция переключения языка */

function checkActiveKeys(elem1, elem2) {
   if (elem1.classList.contains('keyboard__keys_active') && elem2.classList.contains('keyboard__keys_active')) {
      keyboardKeysRegular.forEach(key =>
         key.classList.remove('keyboard__keys_active', 'keyboard__keys_upperCase'));
      if (keyboardKeysRegular[0].innerHTML == '`') {
         for (let i = 0; i < keyboardKeysRegular.length; i++) {
            changeKeyboardKeys(keyboardKeysRegular[i], keyboardCodesRus, i);
         }
         document.cookie = "language=rus";
      }
      else {
         for (let i = 0; i < keyboardKeysRegular.length; i++) {
            changeKeyboardKeys(keyboardKeysRegular[i], keyboardCodesEng, i);
         }
         document.cookie = 'language=eng';
      }
      shiftLeft.classList.remove('keyboard__keys_active');
      capsLk.classList.remove('keyboard__keys_active');
   }
}

