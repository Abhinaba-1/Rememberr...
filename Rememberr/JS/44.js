console.log("1");
showNotes();
let addBtn = document.getElementById('addNoteBtn');
addBtn.addEventListener("click", function  ff() {
    let txt = document.getElementById('floatingTextarea2');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = (JSON.parse(notes));
    }
    notesObj.push(txt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    // console.log(txt.value);
    txt.value = "";
    console.log(notesObj);

    //console.log("j");
    //Add title
    let Titletxt = document.getElementById('addTtl');
    //console.log(Titletxt);
    let Tnotes = localStorage.getItem('Tnotes');
    if (Tnotes == null) {
        TnotesObj = [];
    }
    else {
        TnotesObj = (JSON.parse(Tnotes));
    }
    if(Titletxt.value!="")
    {TnotesObj.push(Titletxt.value);}
    else
    {
        TnotesObj.push("Untitled");
    }
    localStorage.setItem("Tnotes", JSON.stringify(TnotesObj));
    // console.log(txt.value);
    Titletxt.value = "";


    //show Notes

    showNotes();

})

let input=document.getElementById('floatingTextarea2');
input.addEventListener("keypress", function (event){
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById('addNoteBtn').click();}
})


// add title by enter
// let inputTtl=document.getElementById('addTtl');
// inputTtl.addEventListener("keypress", function (event){
//     if (event.key === "Enter") 
//     {
        

//     }
// })

function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = (JSON.parse(notes));
    }

    //title
    let Tnotes = localStorage.getItem('Tnotes');
    if (Tnotes == null) {
        TnotesObj = [];
    }
    else {
        TnotesObj = (JSON.parse(Tnotes));
    }

    let html = "";
    for (let i = 0; i < notesObj.length; i++) {

        html += `
        <div class="card my-3 mx-3" style="width: 18rem;">

        <div id="card-body" class="card-body">
            <h5 class="card-title"> ${TnotesObj[i]}</h5>
            <p class="card-text">${notesObj[i]}</p>
            <button id="${i}" onclick="deleteNote(this.id)" class="befor btn btn-primary">Delete Node</button>
            <button id="${'a' + i}" onclick="markImpo(this.id)" class="befor btn btn-warning my-3">IMPORTANT</button>
        </div>
    </div>
     `;
    }

    let notesElem = document.getElementById('showNotes');
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    }
    else {
        notesElem.innerHTML = "Nothing to show";
    }

     let ntoC=localStorage.getItem('ntoC');
    if(ntoC==null)
        ntoColor = [];
    else
    {
        ntoColor=JSON.parse(ntoC);
    }
    for(let i=0;i<ntoColor.length;i++)
    {
        if(ntoColor[i]!=null)
        {
            let parentElem = document.getElementById(ntoColor[i]);
            if (parentElem != null) {
                parentElem = parentElem.parentElement.parentElement;
                parentElem.style.backgroundColor = "#b3b3cc";
            }
        }
    }

    
}


//function to delete a node

function deleteNote(index) {
    //console.log('de');
    let notes = localStorage.getItem('notes');

    notesObj = (JSON.parse(notes));


    if (notesObj.length == 1) { notesObj = []; }

    else {
        notesObj.splice(index, 1);
    }

    let Tnotes = localStorage.getItem('Tnotes');

    TnotesObj = (JSON.parse(Tnotes));


    if (TnotesObj.length == 1) { TnotesObj = []; }

    else {
        TnotesObj.splice(index, 1);
    }

    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("Tnotes", JSON.stringify(TnotesObj));

    let parentElem = document.getElementById(index);
    if (parentElem != null) {
        parentElem = parentElem.parentElement;
      //   console.log(parentElem);
        let ntoC = localStorage.getItem('ntoC');
        if (ntoC == null)
            ntoColor = [];
        else {
            ntoColor = JSON.parse(ntoC);
        }
       // 
        for(let i=0;i<ntoColor.length;i++)
        {
            let str=ntoColor[i];
            let nombor=parseInt(str.substring(1,2));
            let nombor2=parseInt(index);
            if(nombor>nombor2)
            {
               // console.log(typeof nombor2);
                let x=nombor-1;
                ntoColor[i]="a"+x;
            }
            else if(nombor==nombor2)
            {
                    i=i-1;   
                    ntoColor.splice("a"+index,1);
            }
           
        }
        // console.log(typeof ntoColor[0]);
       
        localStorage.setItem("ntoC", JSON.stringify(ntoColor));
    }


    showNotes();

}


let searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener("input", function () {

    let inpuVal = searchBtn.value;
    //console.log(inpuVal);

    let notecards = document.getElementsByClassName('card');

    Array.from(notecards).forEach(function (element) {
        let ht = element.getElementsByTagName('p')[0];
        if (ht != undefined) {
            // {console.log(ht.innerText);
            if (ht.innerText.includes(inpuVal)) {
                element.style.display = "block";
            }
            else {
                element.style.display = "none";
            }
        }
    })


})


//


//mark important

function markImpo(index) {
    //console.log(index);
    let parentElem = document.getElementById(index);
    if (parentElem != null) {
        parentElem = parentElem.parentElement.parentElement;
     //console.log(parentElem.parentElement);
        let ntoC = localStorage.getItem('ntoC');
        if (ntoC == null)
            ntoColor = [];
        else {
            ntoColor = JSON.parse(ntoC);
        }
        let y=true;
        for(let i=0;i<ntoColor.length;i++)
        {
            // console.log(index);
            // console.log(ntoColor[i]);
            if(index==ntoColor[i])
            {
               // console.log("s");
                y=false;
                ntoColor.splice(i,1);
                parentElem.style.backgroundColor="100";
                break;
            }
        }
      //  console.log(y);
        if(y==true)
        {
        ntoColor.push(index);
        parentElem.style.backgroundColor = "#b3b3cc";
        }
        else
        {
           // delete ntoColor.index;
           // console.log('sexy');
            parentElem.style.backgroundColor = "#FFFFFF";
          //  console.log('sexy');
        }


        localStorage.setItem("ntoC", JSON.stringify(ntoColor));
    }
}
