import React, {useState, useEffect} from "react";
import { db } from "../firebase";


const LinkForm = (props) => {

    const initialStateValues = {
        url: '',
        name: '',
        description: '',
    };

    const [values, setValues] = useState(initialStateValues);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues({...values, [name]: value})
        
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.addOrEditLink(values);
        setValues({...initialStateValues})
    }

    const getLinkById = async (id) => {
     const doc =   await db.collection('links').doc(id).get();
     setValues({...doc.data()})
    }

    useEffect(() => {
      if (props.currentId === '') {
          setValues({...initialStateValues});
      }  else {
         getLinkById(props.currentId);
      }
      
    }, [props.currentId]);
    return (
        <div className="">
            <h1 className=" text-center text-white my-8 text-2xl">Meus Sites Favoritos</h1>
            <div className="flex justify-center text-center w-screen px-4 lg:w-96 lg:p-0">
                <form className=" bg-gray-500 rounded-md p-3 w-screen " onSubmit={handleSubmit} >
                    <div className=" flex bg-gray-200 p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-1.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        <input type="text" className=" w-full text-sm pl-1 text-gray-500 shadow-none " placeholder="URL do site aqui ..." name="url" onChange={handleInputChange} value={values.url}/></div>    
                    
                    <div className="flex bg-gray-200 p-1  mt-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-1.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <input type="text" className=" w-full text-sm pl-1 text-gray-500 shadow-none " placeholder="Nome do site aqui ..." name="name" onChange={handleInputChange} value={values.name}/> 
                    </div>

                    <div className="flex bg-gray-200 p-1  mt-4">
                        <textarea name="description" row="3" className="w-full" placeholder="Escreva uma descrição aqui ..." onChange={handleInputChange} value={values.description}></textarea>
                    </div>

                  
                    <button className={`${props.currentId === '' ? ' bg-blue-900 w-1/2 rounded px-3 py-2 m-3 border-b-4 border-indigo-900 shadow-lg text-white ' : ' bg-yellow-500 w-1/2 rounded px-3 py-2 m-3 border-b-4 border-yellow-600 shadow-lg text-white '} `}>
                        {props.currentId === '' ?  "Salvar"  : "Editar"}
                    </button>
                </form>
            </div>
         </div>
  )
}

export default LinkForm;