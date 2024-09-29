import Item from "./Item";

let toDoList = [];
let completedList = [];

export const addToList = (task) =>{
    toDoList.push({
        id: `${parseInt(Math.random() * 500000)}`,
        task,
        priority: 'normal',
    }); 
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
    
};

export const removeItem = (id) => {
 
    toDoList = toDoList.filter(el => el.id !== id);
}

export const addtoCompletedList = (id) => {
    completedList.push(toDoList.find(el => el.id === id));
    toDoList = toDoList.filter(el => el.id !== id);
}

export const clearCompleted = () => (completedList = []);
export const getList = () => toDoList;
export const getCompletedList = () => completedList;
