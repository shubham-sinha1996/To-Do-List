import { getList,getCompletedList } from "./model"
import Item from "./Item";

const toDoList = document.querySelector('.do-list');
const completedDiv = document.querySelector('.completed');

export const renderList = () => {
    const dom = getList().map(({task,priority,id}) => {
        return Item(task,priority,id);
    });

    toDoList.innerHTML = dom.join('');
};

export const renderCompletedList = () => {
    const dom = getCompletedList().map(({task,priority,id}) => {
        return Item(task,priority,id);
    });

    completedDiv.innerHTML = dom.join('');
}