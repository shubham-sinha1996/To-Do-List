import { addToList,setPriority,removeItem,addtoCompletedList,clearCompleted,bootUp } from "./model";
import { renderList,renderCompletedList } from "./view";

const inputFld = document.querySelector('input[type ="text"]');
const toDoList = document.querySelector('.do-list');
const completedDiv = document.querySelector('.completed');
const clear = document.querySelector('#clear-completed');

inputFld.addEventListener('keyup', function(evt){
    evt.preventDefault();
    if(!(this.value === '') && evt.key === 'Enter'){
        //update toDoList
        addToList(evt.target.value);
        //render toDoList
        renderList();
        this.value ='';
    }
});

toDoList.addEventListener('click', function(evt){
    if(evt.target.parentElement.classList.contains('priority-control')){
        const priority = evt.target.classList.value;
        const id = evt.target.parentElement.parentElement.getAttribute('data-id');
     
        setPriority(id,priority);
        renderList();
    }

    if(evt.target.classList.contains('remove-btn')){
        const id = evt.target.parentElement.getAttribute('data-id');
        const confirm  = window.confirm('Are you sure?');
        if(confirm){
            removeItem(id);
            renderList();
        }
        
    }
});

toDoList.addEventListener('dragstart',function(evt){
    if(evt.target.classList.contains('item')){
        const id = evt.target.getAttribute('data-id');
        evt.dataTransfer.setData('text/plain',id);
    }
});

completedDiv.addEventListener('drop', function(evt){
    const id = evt.dataTransfer.getData('text/plain');

    addtoCompletedList(id);
    renderList();
    renderCompletedList();
});
clear.addEventListener('click',function(evt){
    evt.preventDefault();
    clearCompleted();
    renderCompletedList();
});

completedDiv.addEventListener('dragover',function(evt){
    evt.preventDefault();
});

(() => {
    bootUp();
    renderList();
    renderCompletedList();
})();