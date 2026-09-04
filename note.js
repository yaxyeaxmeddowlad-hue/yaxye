const addBtn = document.getElementById("addBtn");
const modal = document.getElementById("modal");
const cancelBtn = document.getElementById("cancelBtn");
const saveBtn = document.getElementById("saveBtn");

const noteTitle = document.getElementById("noteTitle");
const noteText = document.getElementById("noteText");

const notesContainer = document.getElementById("notesContainer");

const search = document.getElementById("search");

const themeBtn = document.getElementById("themeBtn");

const modalTitle = document.getElementById("modalTitle");




let notes = JSON.parse(localStorage.getItem("notes")) || [];

let editIndex = null;




addBtn.addEventListener("click", () => {

    modal.classList.add("active");

    noteTitle.value = "";
    noteText.value = "";

    editIndex = null;

    modalTitle.textContent = "Add New Note";

});




cancelBtn.addEventListener("click", () => {

    modal.classList.remove("active");

});




saveBtn.addEventListener("click", () => {

    const title = noteTitle.value.trim();
    const text = noteText.value.trim();


    if(title === "" || text === ""){

        alert("Please fill all fields!");

        return;

    }


    if(editIndex === null){

        notes.unshift({

            title:title,
            text:text,
            date:new Date().toLocaleDateString()

        });

    }

    else{

        notes[editIndex].title = title;
        notes[editIndex].text = text;

    }


    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );


    modal.classList.remove("active");

    displayNotes();

});


/* DISPLAY NOTES */

function displayNotes(){

    notesContainer.innerHTML = "";


    if(notes.length === 0){

        notesContainer.innerHTML = `

        <div class="empty">

            <h2>No Notes Yet 📝</h2>

            <p>Click "Add Note" to create your first note.</p>

        </div>

        `;

        return;

    }


    notes.forEach((note,index) => {

        const noteElement = document.createElement("div");

        noteElement.classList.add("note");


        noteElement.innerHTML = `

            <h3>${note.title}</h3>

            <p>${note.text}</p>

            <small>📅 ${note.date}</small>

            <br><br>

            <div class="note-buttons">

                <button
                    class="edit-btn"
                    onclick="editNote(${index})"
                >
                    ✏ Edit
                </button>


                <button
                    class="delete-btn"
                    onclick="deleteNote(${index})"
                >
                    🗑 Delete
                </button>

            </div>

        `;


        notesContainer.appendChild(noteElement);

    });

}




function editNote(index){

    editIndex = index;

    noteTitle.value = notes[index].title;

    noteText.value = notes[index].text;

    modalTitle.textContent = "Edit Note";

    modal.classList.add("active");

}




function deleteNote(index){

    const confirmDelete = confirm(
        "Are you sure you want to delete this note?"
    );


    if(confirmDelete){

        notes.splice(index,1);

        localStorage.setItem(
            "notes",
            JSON.stringify(notes)
        );

        displayNotes();

    }

}




search.addEventListener("input", () => {

    const value = search.value.toLowerCase();


    const filteredNotes = notes.filter(note =>

        note.title.toLowerCase().includes(value)

        ||

        note.text.toLowerCase().includes(value)

    );


    notesContainer.innerHTML = "";


    if(filteredNotes.length === 0){

        notesContainer.innerHTML = `

        <div class="empty">

            <h2>No Notes Found 🔍</h2>

        </div>

        `;

        return;

    }


    filteredNotes.forEach(note => {

        const index = notes.indexOf(note);

        const noteElement = document.createElement("div");

        noteElement.classList.add("note");


        noteElement.innerHTML = `

            <h3>${note.title}</h3>

            <p>${note.text}</p>

            <small>📅 ${note.date}</small>

            <br><br>

            <div class="note-buttons">

                <button
                    class="edit-btn"
                    onclick="editNote(${index})"
                >
                    ✏ Edit
                </button>


                <button
                    class="delete-btn"
                    onclick="deleteNote(${index})"
                >
                    🗑 Delete
                </button>

            </div>

        `;


        notesContainer.appendChild(noteElement);

    });

});




themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");


    if(document.body.classList.contains("light")){

        themeBtn.textContent = "🌙";

        localStorage.setItem("theme","light");

    }

    else{

        themeBtn.textContent = "☀️";

        localStorage.setItem("theme","dark");

    }

});




if(localStorage.getItem("theme") === "light"){

    document.body.classList.add("light");

    themeBtn.textContent = "🌙";

}

else{

    themeBtn.textContent = "☀️";

}




modal.addEventListener("click", (e) => {

    if(e.target === modal){

        modal.classList.remove("active");

    }

});




displayNotes();

