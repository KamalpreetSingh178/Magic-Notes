console.log("Welcome to the Notes App");
showNotes();//To have Notes stored in Local Storage to display on Reloading Webpage

//If User adds a note-Add it to the Local Storage
//EventListener-To Update Local Storage
let addBtn=document.getElementById("addBtn");
//Event Listener for Click Event
addBtn.addEventListener("click",function(e){
    //e->Event Object
    let addTxt=document.getElementById("addTxt");
    let notes=localStorage.getItem("notes");//Getting already stored Notes in the Local Storage
    if(notes==null){
        //notes will be stored in an array
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);//Parsing the string to get the array
    }
    notesObj.push(addTxt.value);//On Clicking Add btn-Push the note created in the array
    //Update the local Storage
    localStorage.setItem("notes",JSON.stringify(notesObj));
    /*We have used JSON.stringify to make notes array into strings as Local Storage stores only strings*/
    addTxt.value="";//Making AddTxt Blank as Note is created
    console.log(notesObj);//Logging the notes array
    /*In Javascript Console-Write "localStorage" to access the notes stored yet
    localStorage.clear()-To clear the local Storage*/
    showNotes();
})

/*Displaying notes added in the List on our Website */
function showNotes(){
    let notes=localStorage.getItem("notes");
    if(notes==null){
        //notes will be stored in an array
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);//Parsing the string to get the array
    }

    let html="";//html Blank String
    notesObj.forEach(function(element,index){
        html+=`
            <div class="noteCard card my-2 mx-2" style="width: 18rem;"><!-- my-2 and mx-2 for padding-->
                <div class="card-body">
                  <h5 class="card-title">Note ${index+1}</h5>
                  <p class="card-text">${element}</p>
                  <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>`/*Iterating over the template*/
        /* ${index+1}=Using Javascript inside HTML Notes Template 
        this.id-Id of element which was clicked gets passed*/
    });
    let notesElement=document.getElementById("notes");
    /*<div id="notes" class="row container-fluid"><!--Bootstrap class-Container-fluid -->
    We are populating this div with id notes */
    if(notesObj.length!=0){
        notesElement.innerHTML=html;
    }
    else{
        notesElement.innerHTML=`No Notes to show yet!`;
        /*In Backticks,we can use both Single and Double quotes-So prefer using them*/
    }
}

//Function to Delete Note
function deleteNote(index){
    console.log("Deleting Note at index "+index);
    let notes=localStorage.getItem("notes");
    if(notes==null){
        //notes will be stored in an array
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);//Parsing the string to get the array
    }

    notesObj.splice(index,1);//Starting index,Number of Elements to delete-Parameter of splice function
    //Update Local Storage
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}

let search=document.getElementById("searchTxt");
//Input Event Listener-When we type something,it fires
search.addEventListener("input",function(){
    let inputVal=search.value;
    console.log("Input event fired!,Input=",inputVal);
    /*If Note-Does not matches with the Search-We do display=None/Hidden */
    //Going through each Note
    let noteCards=document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element){
        let cardTxt=element.getElementsByTagName("p")[0].innerText;
        //console.log(cardTxt);
        if(cardTxt.includes(inputVal)){//If Card includes the text searched
            element.style.display="block";
        }
        else{
            element.style.display="None";
        }
    })
})

/*Additional Features-
Add Custom Title for Servers
Separate Notes according to User
Mark Notes Important
Filter according to Notes Title
Sync and Host from a Web Server
Including Database in the Web Application*/
