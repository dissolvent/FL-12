const structure = [
    {
      'folder': true,
      'title': 'Films',
      'children': [
        {
          'title': 'Iron Man.avi'
        },
        {
          'folder': true,
          'title': 'Fantasy',
          'children': [
            {
              'title': 'The Lord of the Rings.avi'
            },
            {
              'folder': true,
              'title': 'New folder 1',
              'children': false
            }
          ]
        }
      ]
    },
    {
      'folder': true,
      'title': 'Documents',
      'children': [
        {
          'folder': true,
          'title': 'EPAM Homework answers',
          'children': null
        }
      ]
    }
];

const rootNode = document.getElementById('root');

function buildTree(structure, parentNode) {
  let parent = parentNode.appendChild(
    document.createElement('ul')
  );

  for (let item of structure) {

    let child = document.createElement('li');
    let captureArea = document.createElement('div');
    let icon = document.createElement('i');
    captureArea.setAttribute('class', 'capture-area');
    icon.setAttribute('class', 'material-icons');

    let addInsertion = function(nodeText, iconText) {
      icon.textContent = iconText;
      captureArea.appendChild(icon);
      captureArea.innerHTML += nodeText;
      child.appendChild(captureArea);
      parent.appendChild(child);
    }

    if (item.folder) {
      child.setAttribute('class', 'folder collapsed');
      captureArea.addEventListener('click', toggleFolder);
      addInsertion(item.title, 'folder');
    } else {
      child.setAttribute('class', 'file');
      addInsertion(item.title, 'insert_drive_file');
    }
    if (item.children) {
      buildTree(item.children, child);
    }
    if (item.folder && !item.children) {
      let span = document.createElement('span');
      span.textContent = 'Folder is empty';
      child.appendChild(span);
    }
  }
}

function toggleFolder(node) {
  let classes = node.srcElement.parentNode.classList;
  let icon = node.srcElement.children;
  if (classes.contains('collapsed')) {  
    classes.remove('collapsed') 
    icon.item('material-icons').textContent = 'folder_open';
  } else {
    classes.add('collapsed');
    icon.item('material-icons').textContent = 'folder';
  }
}

buildTree(structure, rootNode);