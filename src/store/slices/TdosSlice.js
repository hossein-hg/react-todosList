import {createSlice} from '@reduxjs/toolkit'

const TodosSlice = createSlice({
    name:'todos',
    initialState:{
        list : []
    },
    reducers : {
        setTodos : (state,{payload})=>{
            console.log(payload.data)
            state.list = payload.data
        },
        addTodo : (state,{payload})=>{
            state.list.push(payload)
        },
        destroyTodo : (state,{payload})=>{
            // console.log(payload)
            state.list = state.list.filter(item => item.id !== payload)
        },
        editTodo : (state,{payload})=>{

            state.list = state.list.map(item=>{
                return item.id === payload.id ?
                     {
                    ...item,text : payload.text
                } : item
            })
        },
        doneStatus : (state,{payload})=>{
            console.log(payload)
            state.list = state.list.map(item => {
                return item.id === payload ? {
                    ...item,done : !item.done
                } : item
            })
        }
    }
})

export const {addTodo,destroyTodo,doneStatus,editTodo,setTodos} = TodosSlice.actions
export default TodosSlice.reducer