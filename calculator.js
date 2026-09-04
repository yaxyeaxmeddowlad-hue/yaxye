const input = document.getElementById("inputBox");
const buttons = document.querySelectorAll(".calculator button");
const themeToggle = document.getElementById("themeToggle");

let string = "";



buttons.forEach(button => {

button.addEventListener("click", () => {

    const value = button.innerText;

    if (value === "=") {

        if (string === "") return;

        try {
            string = String(eval(string));
            input.value = string;
        } catch {
            string = "";
            input.value = "Error";

            setTimeout(() => {
                input.value = "";
            }, 1000);
        }

    } else if (value === "AC") {

        string = "";
        input.value = "";

    } else if (value === "DEL") {

        string = string.slice(0, -1);
        input.value = string;

    } else {


        if (value === ".") {

            const parts = string.split(/[\+\-\*\/%]/);
            const currentNumber = parts[parts.length - 1];

            if (currentNumber.includes(".")) {
                return;
            }
        }


        if ("+-*/%".includes(value)) {

            if (string === "") return;

            const lastCharacter = string.slice(-1);

            if ("+-*/%".includes(lastCharacter)) {
                string = string.slice(0, -1);
            }
        }

        string += value;
        input.value = string;
    }

});

});




const savedTheme = localStorage.getItem("calculator-theme");

if (savedTheme === "dark") {
document.body.classList.add("dark");
themeToggle.innerText = "☀️";
} else {
themeToggle.innerText = "🌙";
}

themeToggle.addEventListener("click", () => {

document.body.classList.toggle("dark");

if (document.body.classList.contains("dark")) {

    themeToggle.innerText = "☀️";

    localStorage.setItem("calculator-theme", "dark");

} else {

    themeToggle.innerText = "🌙";

    localStorage.setItem("calculator-theme", "light");
}

});