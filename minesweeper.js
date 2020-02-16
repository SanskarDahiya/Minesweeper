let mainbody = document.getElementById('mainbody');
let row_limit, col_limit;
let arr = [];
let bombArray;

function get4values(ary, i, j) {
  let count = 0;
  try {
    if (ary[i][j + 1].value == 'B')
      count++;
  } catch (e) {}
  try {
    if (ary[i][j - 1].value == 'B')
      count++;
  } catch (e) {}
  try {
    if (ary[i + 1][j].value == 'B')
      count++;
  } catch (e) {}
  try {
    if (ary[i - 1][j].value == 'B')
      count++;
  } catch (e) {}
  return count;
}

function GetBombNumbers() {
  for (let i = 0; i < col_limit; i++) {
    for (let j = 0; j < row_limit; j++) {
      if (arr[i][j].value != 'B') {
        arr[i][j].value = get4values(arr, i, j);
      }
    }

  }
}

function throw_array(data) {
  data.innerHTML = data.value;
  console.log(data.id, data.value);
}

function getBombArray(bomb, level) {
  bomb = bomb ? ((bomb > 0) ? bomb : 10) : 10;
  switch (level || 1) {
    case 1:
      level = 5
      break;
    case 2:
      level = 3
      break;
    default:
      level = 1;
  }
  let maxlevel = Math.floor(((row_limit * col_limit) / bomb)) - 1;
  level = (maxlevel >= level) ? maxlevel : level;
  // console.log(level, maxlevel, (level + 1) * bomb);
  let bombArray = [];
  for (var i = 0; i < bomb; i++) {
    bombArray.push('B');
    for (let j = 0; j < level; j++)
      bombArray.push(' ');
  }
  // console.log(bombArray.length);
  return bombArray;
}

function getBomb() {
  index = Math.floor(Math.random() * bombArray.length);
  let data = bombArray[index];
  bombArray.splice(index, 1);
  return data;
}

function startthegame(btn) {
  try {
    btn.remove();
  } catch (e) {}
  let index = 0;
  row_limit = 10;
  col_limit = 15;
  bombArray = getBombArray(25);
  for (let i = 0; i < col_limit; i++) {
    let temp = []
    let tempNode = document.createElement('div');
    for (let j = 0; j < row_limit; j++) {
      let newdiv = document.createElement('div');
      newdiv.id = ++index;
      newdiv.value = getBomb();
      // console.log(bombArray.length);
      newdiv.addEventListener('click', function() {
        throw_array(this);
      });
      tempNode.appendChild(newdiv);
      temp.push(newdiv);
    }
    mainbody.appendChild(tempNode);
    arr.push(temp);
  }
  GetBombNumbers();
  // console.log(arr);
}