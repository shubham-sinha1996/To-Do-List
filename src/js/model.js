const toDoList = [];

export const addToList = (task) =>{
    toDoList.push({
        id: parseInt(Math.random() * 500000),
        task,
        priority: 'normal',
    }); 
};

export const getList = () => toDoList;
