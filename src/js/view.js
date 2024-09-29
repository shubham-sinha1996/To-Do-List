import { getList } from "./model"
import Item from "./Item";

const toDoList = document.querySelector('.do-list');

export const renderList = () => {
    const dom = getList().map(({task,priority,id}) => {
        return Item(task,priority,id);
    });

    toDoList.innerHTML = dom.join('');
};