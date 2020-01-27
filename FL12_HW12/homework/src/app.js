const nodeMain = document.getElementById('main');
const nodeAddSet = document.getElementById('/add');
const termsList = document.getElementById('terms');
// const pages = document.querySelectorAll('.page');
const buttonsNavigation = document.getElementsByClassName('navigation-buttons');
const buttonSaveSet = document.getElementById('add-save-set');
const buttonAddTerms = document.getElementById('add-add-terms');
let setList = [];

function pageNavigation(event) {
  let hash = event.target.dataset.hash;
  event.target.parentElement.classList.remove('active');
  if (hash) {
    location.hash = '#' + hash;
    document.getElementById(hash).classList.add('active');
  } else {
    location.hash = '';
    nodeMain.classList.add('active');
  }
}

function addTerm() {
  let div = document.createElement('div');
  div.setAttribute('class', 'term');

  let removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click', removeParentNode);

  div.appendChild(inputTag('term-input', 'Enter term'));
  div.appendChild(inputTag('term-input', 'Enter definition'));
  div.appendChild(removeButton);

  termsList.appendChild(div);
}

function removeParentNode(event) {
  event.target.parentElement.remove();
}

function saveSet(event) {
  const setNameField = document.getElementById('set-name');
  if (!isNameFilled(setNameField)) {
    return;
  }

  setList.push(formSetObject(setNameField, termsList.children));
  localStorage.setItem('simpleTodoList', JSON.stringify(setList));

  pageNavigation(event);
  termsList.innerHTML = '';
  setNameField.value = '';
}

function inputTag(tagClass, placeholder) {
  let input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', `${placeholder}`);
  input.setAttribute('class', `${tagClass}`);
  return input;
}

function isNameFilled(nameTag) {
  if (!nameTag.value) {
    nameTag.style.borderColor = 'red';
    return false;
  }
  if (nameTag.style.borderColor === 'red') {
    nameTag.style.borderColor = '';
  }
  return true;
}

function getSetId(arr) {
  if (Array.isArray(arr) && !arr.length) {
    return 0;
  }
  return Math.max.apply(null, arr.map(item => item.id)) + 1;
}

function getSetTerms(htmlCollection) {
  let setMap = [];
  for (let term of htmlCollection) {
    setMap.push({
      termName: term.children[0].value,
      termDefinition: term.children[1].value
    });
  }
  return setMap;
}

function formSetObject(setName, terms) {
  return {
    id: getSetId(setList),
    completed: 0,
    name: setName.value,
    terms: getSetTerms(terms)
  }
}

function readLocalStorage() {
  setList = JSON.parse(localStorage.simpleTodoList);
}

function displaySavedSets(set) {
  let setDiv = document.createElement('div');
  setDiv.setAttribute('class', 'set');

  let setName = document.createElement('span');
  setName.textContent = set.name;
  
  let changeButton = document.createElement('button');
  changeButton.textContent = 'Change';
  let removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  let br = document.createElement('br');
  removeButton.addEventListener('click', removeParentNode);

  [setName, br, changeButton, removeButton].forEach(item => setDiv.appendChild(item));
  nodeMain.appendChild(setDiv);
}

function runApp() {
  for (let button of buttonsNavigation) {
    button.addEventListener('click', pageNavigation);
  }

  buttonAddTerms.addEventListener('click', addTerm);
  buttonSaveSet.addEventListener('click', saveSet);
  readLocalStorage();

  for (let set of setList) {
    displaySavedSets(set);
  }

}

runApp();