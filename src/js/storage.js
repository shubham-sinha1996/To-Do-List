
    export const saveToStore = (toDoList, completedList) => {
    window.localStorage.setItem('to_Do_List', JSON.stringify(toDoList));
    window.localStorage.setItem('completed_List', JSON.stringify(completedList));
}

export const getFromStore = () => {
    const getListStore = window.localStorage.getItem('to_Do_List');
    const getcompletedListStore = window.localStorage.getItem('completed_List');

    return {
        active: getListStore ? JSON.parse(getListStore) : [],
        completed: getcompletedListStore ? JSON.parse(getcompletedListStore) : [],
    };
};