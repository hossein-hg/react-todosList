import {useState} from "react";
import {addTodo} from './../../store/slices/TdosSlice'
import {useDispatch} from 'react-redux'
import axios from "axios";
const AddTodo = ()=>{
    const [inputTodo,setTodo] = useState('')
    const inputHandler = (e)=>{
        setTodo(e.target.value)
    }
    const dispatch = useDispatch()
    const addTodoHandler = async ()=>{


        if (inputTodo.length > 0){
            let todo = {
                text : inputTodo,
                done : true,
            }
            try {
              let res =  await axios.post('https://633dab7276028b55ae72e93f.endapi.io/todos',todo)
                if (res.status === 200){
                    console.log(res.data.data)
                    dispatch(addTodo(res.data.data))
                    setTodo('')
                }
            }catch (err){
                console.log(err.message)
            }


        }
    }
    return (
        <div className="flex mt-4">
            <input value={inputTodo} onChange={inputHandler} className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-800"
                   placeholder="Add Todo"/>
            <button onClick={addTodoHandler}
                className="p-2 border-2 rounded text-teal-500 border-teal-500  hover:text-white hover:bg-teal-500">Add
            </button>
        </div>
    )
}
export default AddTodo