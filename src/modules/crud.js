const addTask = document.getElementById('input');
const list = document.getElementById('tasks-list');

function crud() {
  list.innerHTML = '';
  const tasksList = localStorage.getItem('data')
    ? JSON.parse(localStorage.getItem('data'))
    : [];
  for (let i = 0; i < tasksList.length; i += 1) {
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.classList.add('checkbox');
    input.id = i + 1;
    if (tasksList[i].completed) {
      input.checked = true;
    }

    const label = document.createElement('input');
    label.value = `${tasksList[i].description}`;
    label.classList.add('description');
    label.setAttribute('type', 'text');
    if (tasksList[i].completed) {
      label.style.textDecorationLine = 'line-through';
    }

    label.setAttribute('readOnly', 'readOnly');
    label.classList.add('description');

    const edit = document.createElement('button');
    edit.id = i + 1;
    edit.innerHTML = '✍';
    edit.classList.add('edit-btn');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.id = i + 1;

    const li = document.createElement('li');
    li.classList.add('container-li');
    li.id = i + 1;

    li.appendChild(input);
    li.appendChild(label);
    li.appendChild(edit);
    li.appendChild(deleteBtn);
    list.appendChild(li);

    addTask.value = '';

    input.addEventListener('input', (event) => {
      if (input.checked) {
        const idChecked = event.target.id;
        const data = JSON.parse(localStorage.getItem('data'));
        data[idChecked - 1].completed = true;
        label.style.textDecorationLine = 'line-through';
        localStorage.setItem('data', JSON.stringify(data));
      } else if (!input.checked) {
        const idNoChecked = event.target.id;
        const data = JSON.parse(localStorage.getItem('data'));
        data[idNoChecked - 1].completed = false;
        label.style.textDecorationLine = 'none';
        localStorage.setItem('data', JSON.stringify(data));
      }
      window.location.reload();
    });

    edit.addEventListener('click', (event) => {
      if (edit.innerHTML === '✍') {
        label.removeAttribute('readonly');
        label.focus();
        edit.innerHTML = '👌';
      } else {
        const edited = label.value;
        const idNumber = event.target.id;
        label.setAttribute('readonly', 'readonly');
        edit.innerHTML = '✍';

        const data = JSON.parse(localStorage.getItem('data'));
        data[idNumber - 1].description = `${edited}`;
        localStorage.setItem('data', JSON.stringify(data));
      }
    });

    deleteBtn.addEventListener('click', (event) => {
      if (event.target.textContent === '🗑️') {
        event.target.parentElement.remove();
        const taskid = event.target.id;
        const taskID = Number(taskid);
        const data = JSON.parse(localStorage.getItem('data'));
        const notDeleted = data.filter((x) => x.index !== taskID);
        for (let i = 0; i < notDeleted.length; i += 1) {
          notDeleted[i].index = i + 1;
        }
        localStorage.setItem('data', JSON.stringify(notDeleted));
      }
    });
  }
}

window.addEventListener('load', () => {
  crud();
});

export { addTask, crud };
