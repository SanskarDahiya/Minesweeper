let mainbody = document.getElementById("mainbody");
let row_limit = 10;
let col_limit = 15;
let MybombArray = [];

function GetMybombArray(i,j){
  return MybombArray[i][j] || false
}

function update_near_by(elem) {
  if (elem) {
    console.log(elem,'<<<id<<<Val');
    if (elem.value == 0) {
      elem.innerHTML = 0;
      elem.value = -1;
      let [i, j] = elem.id.toString().split("-");
      i = parseInt(i);
      j = parseInt(j);
      update_near_by(GetMybombArray(i,j - 1));
      update_near_by(GetMybombArray(i,j + 1));
      update_near_by(GetMybombArray(i - 1,j));
      update_near_by(GetMybombArray(i + 1,j));
      update_near_by(GetMybombArray(i - 1,j + 1));
      update_near_by(GetMybombArray(i - 1,j - 1));
      update_near_by(GetMybombArray(i + 1,j + 1));
      update_near_by(GetMybombArray(i + 1,j - 1));
      // console.log('<<<>>',)
    }
  }
}

function GetBombNumbers() {
  for (let i = 0; i < col_limit; i++)
    for (let j = 0; j < row_limit; j++)
      if (MybombArray[i][j].value != "B")
        MybombArray[i][j].value = get4values(MybombArray, i, j);
}

function get_This_Value(data) {
  data.innerHTML = data.value;
  update_near_by(data);
  // console.log(data.id, data.value);
}

function getBombArray(bomb) {
  bomb = bomb ? (bomb > 0 ? bomb : 10) : 10;
  let bombArray = [];
  for (let i = 0; i < row_limit * col_limit; i++) {
    if (i < bomb) bombArray.push("B");
    else bombArray.push(" ");
  }
  return bombArray;
}

function get_my_bomb_or_blank(bombArray) {
  index = Math.floor(Math.random() * bombArray.length);
  let data = bombArray[index] || " ";
  bombArray.splice(index, 1);
  // console.log('>>>>',bombArray.length);
  return data;
}

function startthegame(btn) {
  try {
    btn.remove();
  } catch (e) {}
  // row_limit = 10;
  // col_limit = 15;
  let number_of_bomb = 20;
  let bombArray = getBombArray(number_of_bomb);
  for (let i = 0; i < col_limit; i++) {
    let temp = [];
    let tempNode = document.createElement("div");
    for (let j = 0; j < row_limit; j++) {
      let newdiv = document.createElement("div");
      newdiv.id = `${i}-${j}`;
      newdiv.value = get_my_bomb_or_blank(bombArray);
      // newdiv.innerHTML = newdiv.value;
      newdiv.addEventListener("click", function() {
        get_This_Value(this);
      });
      tempNode.appendChild(newdiv);
      temp.push(newdiv);
    }
    mainbody.appendChild(tempNode);
    MybombArray.push(temp);
  }
  GetBombNumbers();
}

function get4values(ary, i, j) {
  let count = 0;
  try {
    if (ary[i][j + 1].value == "B") count++;
  } catch (e) {}
  try {
    if (ary[i][j - 1].value == "B") count++;
  } catch (e) {}
  try {
    if (ary[i + 1][j].value == "B") count++;
  } catch (e) {}
  try {
    if (ary[i - 1][j].value == "B") count++;
  } catch (e) {}
  try {
    if (ary[i + 1][j + 1].value == "B") count++;
  } catch (e) {}
  try {
    if (ary[i - 1][j + 1].value == "B") count++;
  } catch (e) {}
  try {
    if (ary[i + 1][j - 1].value == "B") count++;
  } catch (e) {}
  try {
    if (ary[i - 1][j - 1].value == "B") count++;
  } catch (e) {}
  return count;
}
