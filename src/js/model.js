import { saveToStore,getFromStore } from "./storage";

let toDoList = [];
let completedList = [];

export const addToList = (task) =>{
    toDoList.push({
        id: `${parseInt(Math.random() * 500000)}`,
        task,
        priority: 'normal',
    }); 

    saveToStore(toDoList,completedList);
};

export const setPriority = (id,priority) => {
   
    toDoList = toDoList.map(item => {
        if(item.id === id){
            return {
                ...item,
                priority,
            };
        }
        
        return item;
    });
    saveToStore(toDoList,completedList);
};

export const removeItem = (id) => {
 
    toDoList = toDoList.filter(el => el.id !== id);
    saveToStore(toDoList,completedList);
}

export const addtoCompletedList = (id) => {
    completedList.push(toDoList.find(el => el.id === id));
    toDoList = toDoList.filter(el => el.id !== id);
    saveToStore(toDoList,completedList);
}

export const clearCompleted = () => {
    completedList = []
    saveToStore(toDoList,completedList);
};
export const getList = () => toDoList;
export const getCompletedList = () => completedList;

export const bootUp = () => {
    const {active, completed} = getFromStore();
    console.log(active);
    console.log(completed);
    toDoList = active;
    completedList = completed;
};