import {useDispatch} from 'react-redux'
import {destroyTodo,doneStatus,editTodo} from './../../store/slices/TdosSlice'
import {useState} from "react";
import axios from "axios";

const TodoItem = ({todo})=>{
    const dispatch = useDispatch()
    const deleteHandler = async ()=>{

        try {
            const res = await axios.delete('https://633dab7276028b55ae72e93f.endapi.io/todos/'+todo.id)
            console.log(res)

            if (res.status === 200){
                dispatch(destroyTodo(todo.id))
            }
        }catch (err){
            console.log(err.message)
        }
    }
    const statusDone = async ()=>{
        try {

            const res = await axios.put('https://633dab7276028b55ae72e93f.endapi.io/todos/'+todo.id,{
                ...todo,
                done : !todo.done
            })
            console.log(res)
            dispatch(doneStatus(todo.id))
            if (res.status === 200){

            }

            setEdit(false)
        }catch (err){
            console.log(err.message)
        }
    }
    const [edit,setEdit] = useState(false)
    const [text,setText] = useState(todo.text)
    const textInputHandler = (e)=>{
        setText(e.target.value)
    }
    const updateHandler = async ()=>{
        try {

            const res = await axios.put('https://633dab7276028b55ae72e93f.endapi.io/todos/'+todo.id,{
                ...todo,
                text,
            })
            console.log(res)
            if (res.status === 200){
                dispatch(editTodo({text,id:todo.id}))
            }

            setEdit(false)
        }catch (err){
            console.log(err.message)
        }

    }
    return (

        <>
            {
                edit === false ? (
                    <div className="flex mb-4 items-center">
                        <p className={`mr-auto ${todo.done ? 'line-through text-green-600' : 'text-gray-700'}`}>{todo.text}</p>
                        <button onClick={statusDone}
                                className="p-1 px-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-600 border-green-600 hover:bg-green-600">{todo.done ? 'unDone' : 'Done'}
                        </button>
                        <button type="button"
                                className="p-1 px-2 ml-2 border-2 rounded text-yellow-600 border-yellow-600 hover:text-white hover:bg-yellow-600" onClick={()=>setEdit(true)}>Edit
                        </button>
                        <button onClick={deleteHandler}
                                className="p-1 px-2 ml-2 border-2 rounded text-red-600 border-red-600 hover:text-white hover:bg-red-600">Remove
                        </button>
                    </div>
                ) : (
                    <div className="flex mb-4 items-center">

                        <input value={text} onChange={textInputHandler} type="text" className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-800"/>
                        <button
                                className="p-1 px-2 ml-2 border-2 rounded text-red-600 border-red-600 hover:text-white hover:bg-red-600" onClick={updateHandler}>Update
                        </button>
                    </div>
                )
            }

        </>

    )
}
export default TodoItem