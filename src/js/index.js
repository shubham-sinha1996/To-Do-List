import { addToList } from "./model";
import { renderList } from "./view";

const inputFld = document.querySelector('input[type ="text"]');
const toDoList = document.querySelector('.do-list');


inputFld.addEventListener('keyup', function(evt){
    evt.preventDefault();
    if(evt.key === 'Enter'){
        //update toDoList
        addToList(evt.target.value);
        //render toDoList
        renderList();
        this.value ='';
    }
})