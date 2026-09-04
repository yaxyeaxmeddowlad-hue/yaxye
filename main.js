var typed = new Typed(".text", {
    strings: ["Frontend Developer", "Web Developer", "Graphic Designer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

const themeToggleBtn = document.getElementById('themeToggle');


if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    themeToggleBtn.textContent = '🌤️';
} else {
    themeToggleBtn.textContent = '🌙';
}

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeToggleBtn.textContent = isLight ? '🌤️' : '🌙';
});
