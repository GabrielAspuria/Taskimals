const GET_ALL_TASKS = 'tasks/GET_ALL_TASKS';
const ADD_TASK = 'tasks/ADD_TASK'
const EDIT_TASK = 'tasks/EDIT_TASK'

const getAllTasks = (tasks) => ({
    type: GET_ALL_TASKS,
    tasks
})

const addTask = task => ({
    type: ADD_TASK,
    task
})

const updateTask = task => ({
    type: EDIT_TASK,
    task
})

export const allTasks = () => async (dispatch) => {
    const response = await fetch("/api/tasks/");
    const data = await response.json();
    dispatch(getAllTasks(data));
    return data;
}

export const createTask = (task) => async (dispatch) => {
    const res = await fetch('/api/tasks/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(task)
    });
    if (res.ok) {
        const data = await res.json()
        dispatch(addTask(data))
        return data
    }
}

export const editTask = (task, id) => async(dispatch) => {
    const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(updateTask(data))
        return data
    }
}


const tasksReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_TASKS:
            newState = { ...state };
            action.tasks.tasks.forEach((task) => {
                newState[task.id] = task;
            });
            return newState;

        case ADD_TASK:
            return { ...state, [action.task.id]: action.task }

        case EDIT_TASK:
            newState = { ...state }
            newState[action.task.id] = action.task

        default:
            return state;
    }
}

export default tasksReducer