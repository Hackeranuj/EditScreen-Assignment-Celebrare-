let selectedText = null;
let undoStack = [];
let redoStack = [];
let isDragging = false;
let offsetX, offsetY;

document.getElementById('font-family').addEventListener('change', function () {
  if (selectedText) {
    selectedText.style.fontFamily = this.value;
  }
});

document.getElementById('font-size').addEventListener('input', function () {
  if (selectedText) {
    selectedText.style.fontSize = `${this.value}px`;
  }
});

document.getElementById('color-picker').addEventListener('input', function () {
  if (selectedText) {
    selectedText.style.color = this.value;
  }
});

document.getElementById('add-text-btn').addEventListener('click', function () {
  const textValue = document.getElementById('text-editor').value;
  if (textValue) {
    const newText = document.createElement('div');
    newText.textContent = textValue;
    newText.className = 'draggable';
    newText.contentEditable = true;
    document.querySelector('.left-panel').appendChild(newText);
    newText.style.marginTop = '10px'; // Ensuring new line with margin space
    makeDraggable(newText);
    document.getElementById('text-editor').value = '';
  }
});

document.getElementById('undo-btn').addEventListener('click', function () {
  if (undoStack.length > 0) {
    const action = undoStack.pop();
    redoStack.push(action);
    document.querySelector('.left-panel').innerHTML = action;
    refreshDraggables();
  }
});

document.getElementById('redo-btn').addEventListener('click', function () {
  if (redoStack.length > 0) {
    const action = redoStack.pop();
    undoStack.push(action);
    document.querySelector('.left-panel').innerHTML = action;
    refreshDraggables();
  }
});

function makeDraggable(element) {
  element.addEventListener('mousedown', function (event) {
    selectedText = this;
    saveState();
    isDragging = true;
    offsetX = event.clientX - element.getBoundingClientRect().left;
    offsetY = event.clientY - element.getBoundingClientRect().top;
  });

  document.addEventListener('mousemove', function (event) {
    if (isDragging && selectedText) {
      selectedText.style.left = event.clientX - offsetX + 'px';
      selectedText.style.top = event.clientY - offsetY + 'px';
    }
  });

  document.addEventListener('mouseup', function () {
    isDragging = false;
  });

  element.addEventListener('click', function () {
    selectedText = this;
    saveState();
  });
}

function saveState() {
  undoStack.push(document.querySelector('.left-panel').innerHTML);
}

function refreshDraggables() {
  document.querySelectorAll('.draggable').forEach(makeDraggable);
}

document.querySelectorAll('.draggable').forEach(makeDraggable);
