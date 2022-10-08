loadSavedList();
let addNoteBtn = document.getElementById("addNoteBtn");
addNoteBtn.addEventListener("click", addNote);

function addNote() {
    addNewNote(newNote.value, false);
}

let clearMarkedBtn = document.getElementById("clearMarkedBtn");
clearMarkedBtn.addEventListener("click", clearNote);

function clearNote() {
    let delSelectedItem = document.getElementsByClassName("selected");

    while(delSelectedItem.length>0){
        delSelectedItem.item(0).remove();
    }
}

let emptyNotesBtn = document.getElementById("emptyNotesBtn");
emptyNotesBtn.addEventListener("click", emptyNote);

function emptyNote() {
    let emptyAllNotes = notesList.children;

    while(emptyAllNotes.length>0){
        emptyAllNotes.item(0).remove();
    }
}

let saveNotesBtn = document.getElementById("saveNotesBtn");
saveNotesBtn.addEventListener("click", saveNote);

function saveNote() {
    let mySaveNotes = [];

    for(i=0; i<notesList.length; i++) {
        let myNote = notesList.children.item(i);

        myNoteInfo = {
            "note" : myNote.innerHTML,
            "selected" : myNote.classList.contains("selected")
        }

        mySaveNotes.push(myNoteInfo);
    }

    localStorage.setItem("mySaveNotes", JSON.stringify(mySaveNotes));
}

function loadSavedList(){
    if(localStorage.getItem("mySaveNote") != null){
        let retrivedItem = JSON.parse(localStorage.getItem("mySaveNote"));

        for(i=0; i<retrivedItem.length; i++){
            let retItem = retrivedItem[i];
            addNewNote(retItem.note,retItem.selected);
        }
    }
}

let newNote = document.getElementById("note");
let notesList = document.getElementById("myNotes");

function addNewNote(note, selected){
    loadSavedList();
    if(note){
        let listTag = document.createElement("li");
        let noteText = document.createTextNode(note);

        if(selected){
            listTag.classList.add("selected");
        }

        listTag.appendChild(noteText);
        notesList.appendChild(listTag);
        listTag.addEventListener("dblclick",selectUnselectList);
        newNote.value=null;
    }
}

function selectUnselectList(){
    if(this.classList.contains("selected")){
        this.classList.remove("selected");
    } else{
        this.classList.add("selected");
    }
}