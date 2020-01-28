const nodeMain = document.getElementById('main');
const mainPageSets = document.getElementById('sets')
const nodeAddSet = document.getElementById('/add');
const termsList = document.getElementById('terms');
const nodeModifyTerms = document.getElementById('modify-terms');
const buttonsNavigation = document.getElementsByClassName('navigation-buttons');
const buttonSaveSet = document.getElementById('add-save-set');
const buttonAddTerms = document.getElementById('add-add-terms');
const buttonSaveModifiedSet = document.getElementById('modify-save-set');
let setList = [];
let completedSets = [];
let nextSetID = 0;

let toModifySet;

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

function toModify(event) {
  nodeMain.classList.remove('active');
  let hash = event.target.dataset.hash;
  if (hash) {
    location.hash = '#' + hash + `/${event.target.parentElement.setID}`;
    document.getElementById(hash).classList.add('active');
  }
  displayModifySet(event.target.parentElement.setID,
     event.target.previousElementSibling.className);
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

  function showTerms(termName, termDefinition) {
    let div = document.createElement('div');
    div.setAttribute('class', 'term');

    let removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', removeParentNode);
    let name = inputTag('term-input', 'Enter term');
    name.value = termName;
    let definition = inputTag('term-input', 'Enter definition');
    definition.value = termDefinition;
    
    div.appendChild(name);
    div.appendChild(definition);
    div.appendChild(removeButton);
    nodeModifyTerms.appendChild(div);
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
    updateLocalStorage();

    pageNavigation(event);
    termsList.innerHTML = '';
    setNameField.value = '';
  }

  function saveModified(event) {
    const setNameField = document.getElementById('modify-set-name');
    if (!isNameFilled(setNameField)) {
      return;
    }
    toModifySet.terms = getSetTerms(nodeModifyTerms.children);
    updateLocalStorage();

    pageNavigation(event);
    nodeModifyTerms.innerHTML = '';
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

  function getSetId() {
    return nextSetID += 1;
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
      id: getSetId(),
      completed: 0,
      name: setName.value,
      terms: getSetTerms(terms)
    }
  }

  function readLocalStorage() {
    if (localStorage.simpleTodoList) {
      setList = JSON.parse(localStorage.simpleTodoList);
    }
    if (localStorage.completedSets) {
      completedSets = JSON.parse(localStorage.completedSets);
    }
    if (localStorage.maxID) {
      nextSetID = JSON.parse(localStorage.maxID);
    }
  }

  function updateLocalStorage() {
    localStorage.setItem('simpleTodoList', JSON.stringify(setList));
    localStorage.setItem('completedSets', JSON.stringify(completedSets));
    localStorage.setItem('maxID', nextSetID);
  }

  function displaySavedSet(set) {
    let setDiv = document.createElement('div');
    setDiv.setAttribute('class', 'set');
    setDiv.setID = set.id;    

    let wrapper = document.createElement('div');
    if (set.completed) {
      wrapper.setAttribute('class', 'completed');
    }
    let setName = document.createElement('span');
    setName.textContent = set.name;
    wrapper.appendChild(setName);
    wrapper.addEventListener('click', completeSet);

    let changeButton = document.createElement('button');
    changeButton.textContent = 'Change';
    changeButton.addEventListener('click', toModify);
    changeButton.setAttribute('data-hash', '/modify');
    let removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', removeSet);

    removeButton.addEventListener('click', removeParentNode);

    [wrapper, changeButton, removeButton].forEach(item => setDiv.appendChild(item));
    mainPageSets.appendChild(setDiv);
  }

  function updateMainPage() {
    mainPageSets.innerHTML = '';
    for (let set of setList) {
      displaySavedSet(set);
    }
    for (let set of completedSets) {
      displaySavedSet(set);
    }
  }

  function removeSet(event) {
    let setID = event.target.parentElement.setID;
    let set = setList.find(item => item.id === setID);
    if (set) {
      setList.splice(setList.indexOf(set), 1);
    } else {
      completedSets.splice(completedSets.find(item => item.id === setID));
    }
    updateLocalStorage();
  }

  function cancelAdd() {
    termsList.innerHTML = '';
  }

  function cancelChange() {
    nodeModifyTerms.innerHTML = '';
  }

  function sortSets(set) {
    completedSets.push(setList.splice(setList.indexOf(set), 1)[0]);
  }

  function displayModifySet(setID, completed) {
    if (completed) {
      toModifySet = completedSets.find(item => item.id === setID);
    } else {
      toModifySet = setList.find(item => item.id === setID);
    }
    let name = document.getElementById('modify-set-name');
    name.value = toModifySet.name;

    for (let term of toModifySet.terms) {
      showTerms(term.termName, term.termDefinition);
    }
  }

  function completeSet(event) {
    if (event.target.classList.contains('completed')) {
      return;
    }
    let setID = event.target.parentElement.setID;
    let set = setList.find(item => item.id === setID);
    set.completed = 1;
    sortSets(set);
    updateLocalStorage();
    updateMainPage();
  }

  function runApp() {
    for (let button of buttonsNavigation) {
      button.addEventListener('click', pageNavigation);
    }
    let buttonCancelAdd = document.getElementById('add-cancel');
    buttonCancelAdd.addEventListener('click', cancelAdd);

    let buttonCancelChange = document.getElementById('modify-cancel');
    buttonCancelChange.addEventListener('click', cancelChange);

    buttonAddTerms.addEventListener('click', addTerm);
    buttonSaveSet.addEventListener('click', saveSet);
    buttonSaveSet.addEventListener('click', updateMainPage);
    buttonSaveModifiedSet.addEventListener('click', saveModified);
    buttonSaveModifiedSet.addEventListener('click', updateMainPage);


    readLocalStorage();
    updateMainPage();

  }

  runApp();