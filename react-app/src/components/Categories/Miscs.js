import { useSelector, useDispatch } from 'react-redux'
import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { allTasks, createTask } from '../../store/tasks';

const Miscs = () => {
    const tasksObj = useSelector(state => state.tasks)
    const dispatch = useDispatch();
    const signedInUser = useSelector(state => state.session.user)

    const [animal, setAnimal] = useState('')
    const [name,setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('Misc')
    const [pictures, setPictures] = useState('')


    useEffect(() => {
        dispatch(allTasks())
    }, [dispatch])

    const resetForm = () => {
        setAnimal('Any')
        setName('')
        setDescription('')
        setPrice('')
        setCategory('Misc')
        setPictures('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTraining = {
            animal,
            name,
            description,
            price,
            category,
            pictures,
            userId: signedInUser.id
        }
        await dispatch(createTask(newTraining))
        resetForm()
    }


    const tasks = Object.values(tasksObj)
    const miscs = tasks.filter((task) => task.category === 'Misc')

    return (
        <div>
            {miscs.map((misc) => (
                <div>
                    {misc?.animal} {misc?.name} ${misc?.price}
                    <div>
                        <NavLink to={`/tasks/${misc?.id}`}>
                            <img src={misc.pictures} />
                        </NavLink>
                    </div>

                </div>
            ))}
            {signedInUser !== null &&
                <form onSubmit={handleSubmit}>
                    <label> Animal: </label>
                    <select
                        value={animal}
                        onChange={(e) => setAnimal(e.target.value)}
                    >
                        <option value='Any'> Any </option>
                        <option value='Dog'> Dog </option>
                        <option value='Cat'> Cat </option>
                        <option value='Bird'> Bird </option>
                        <option value='Reptile'> Reptile </option>
                        <option value='Misc'> Misc </option>
                    </select>
                    <label> Name: </label>
                    <input
                        type='text'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <textarea
                        placeholder='Add a description of your task'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <label> Price: </label>
                    <input
                        type='text'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    <label> Pictures: </label>
                    <input
                        type='text'
                        value={pictures}
                        onChange={e => setPictures(e.target.value)}
                    />
                    <button>
                        Submit
                    </button>
                </form>
            }
        </div>
    )
}

export default Miscs
