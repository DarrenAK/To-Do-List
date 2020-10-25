const form = document.querySelector('#form');
const input = document.querySelector('#add');
const btn = document.querySelector('#btn');
const list = document.querySelector('#list');
const doneList = document.querySelector('#doneList');
const delBtn = document.querySelector('#deleteButton');

let stateList = [];

function clearDoneList() {
  while (doneList.firstChild) {
    doneList.firstChild.remove();
  }
}
function renderDoneList() {
  stateList.forEach((task) => {
    const li = document.createElement('li');
    li.innerHTML = task.task;
    if (task.isDone === true) {
      doneList.appendChild(li);
    }
  });
}
function clearAndRenderDoneList() {
  clearDoneList();
  renderDoneList();
}
function clearList() {
  while (list.firstChild) {
    list.firstChild.remove();
  }
}
function renderList() {
  stateList.forEach((task) => {
    const li = document.createElement('li');
    li.innerHTML = task.task;
    if (task.isDone === false) {
      list.appendChild(li);
    }
  });
}
function clearAndRenderList() {
  clearList();
  renderList();
}
form.addEventListener('click', (e) => {
  e.preventDefault();
});
btn.addEventListener('click', () => {
  const txt = input.value;
  const blank = /^$|\s/g;
  if (!blank.test(txt)) {
    if (txt !== '' && stateList.length === 0) {
      stateList.unshift({ task: txt, isDone: false });
      input.value = '';
    } else if (!stateList.find((task) => task.task === txt)) {
      stateList.unshift({ task: txt, isDone: false });
      input.value = '';
    }
    clearAndRenderList();
  }
});
list.addEventListener('click', (ev) => {
  if (ev.target.tagName === 'LI') {
    const delSelf = document.createElement('button');
    stateList.forEach((task) => {
      const doneTask = task;
      if (ev.target.textContent === task.task) {
        doneTask.isDone = true;
      }
    });
    doneList.append(ev.target);
    delSelf.innerHTML = 'Delete';
    delSelf.classList.add('deleteSelfButton');
    ev.target.append(delSelf);
  }
});
doneList.addEventListener('click', (ev) => {
  if (ev.target.tagName === 'LI') {
    stateList.forEach((task) => {
      const pendingTask = task;
      if (ev.target.textContent === task.task) {
        pendingTask.isDone = false;
      }
    });
    list.append(ev.target);
    ev.target.childNodes[1].remove();
  }
});
delBtn.addEventListener('click', () => {
  stateList = stateList.filter((task) => task.isDone === false);
  clearAndRenderDoneList();
});
document.addEventListener('click', (ev) => {
  const domEl = ev.target.parentNode;
  const domElVal = ev.target.parentNode.childNodes[0].nodeValue;
  const test = stateList.find((task) => task.task === domElVal);
  if (ev.target.className === 'deleteSelfButton') {
    if (test) {
      stateList.splice(test.task, 1);
      domEl.remove();
    } else {
      domEl.remove();
    }
  }
});
