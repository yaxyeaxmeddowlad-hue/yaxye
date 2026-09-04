let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

const list = document.getElementById('list');
const sub = document.getElementById('sub');
const empty = document.getElementById('empty');

function save() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function render() {
    list.innerHTML = '';

    tasks.forEach((t, i) => {
        const li = document.createElement('li');
        if (t.done) {
            li.className = 'done';
        }

        li.innerHTML = `
            <div class="box" onclick="toggle(${i})"></div>
            <span class="txt">${t.text}</span>
            <button class="del" onclick="remove(${i})">×</button>
        `;

        list.appendChild(li);
    });

    const done = tasks.filter(t => t.done).length;

    sub.textContent = tasks.length
        ? `${done} of ${tasks.length} done`
        : 'Start adding your tasks below.';

    empty.style.display = tasks.length ? 'none' : 'block';

    save();
}

function add() {
    const inp = document.getElementById('inp');
    const v = inp.value.trim();

    if (!v) return;

    tasks.unshift({
        text: v,
        done: false
    });

    inp.value = '';
    render();
}

function toggle(i) {
    tasks[i].done = !tasks[i].done;
    render();
}

function remove(i) {
    tasks.splice(i, 1);
    render();
}

document.getElementById('inp').addEventListener('keydown', e => {
    if (e.key === 'Enter') add();
});




const themeBtn = document.getElementById('themeBtn');

const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeBtn.textContent = '☀️';
}

themeBtn.addEventListener('click', () => {

    document.body.classList.toggle('dark');

    if (document.body.classList.contains('dark')) {
        themeBtn.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeBtn.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }

});


render();