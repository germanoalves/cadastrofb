import React, {useEffect, useState} from "react";
import LinkForm from './LinkForm';
import {toast} from 'react-toastify'

import { db } from '../firebase';


const Links = () => {

    const [links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState('')

    const addOrEditLink = async (linkObject) => {
        try {
            if (currentId === '') {
                await db.collection('links').doc().set(linkObject);
                toast('Novo Link Adicionado com sucesso!',{
                    type: "success",
                });   
            } else {
            await  db.collection('links').doc(currentId).update(linkObject);
            toast('Link Atualizado com sucesso!',{
                type: "info"
            });
            setCurrentId('');   
          }
        } catch (error) {
            console.error(error);
        }
      
    };

    const onDeleteLink = async (id)  => {
       if (window.confirm('Tem certeza disso?')) {
          await  db.collection('links').doc(id).delete();
          toast('Link Deletado!',{
            type: "error"
        }) 
       }
    };


    const getLinks = async () => {
       db.collection('links').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({...doc.data(), id:doc.id })
            });
            setLinks(docs);
       });
    };

    useEffect(() => {
     getLinks();
    }, []);

    return (
       <div>
           <div>
            <LinkForm {...{addOrEditLink, currentId, links}}/>
            </div> 
            <div>
                {links.map(link => (
                    <div key={link.id} className="flex justify-center items-center   lg: w-full">
                        <div className=" bg-indigo-900 mt-3 border-b-4 border-solid border-indigo-600  p-2 rounded-md text-white lg: w-full">
                            <div className="flex justify-between">
                                <h4><strong className=" text-blue-200">Nome: </strong>{link.name}</h4>
                                <div className="flex">
                                    <i onClick={() => onDeleteLink(link.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    </i>
                                    <i onClick={() => setCurrentId(link.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer ml-2 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    </i>
                                </div>  
                            </div>
                            <p><strong className=" text-blue-200">Descrição: </strong>{link.description}</p>
                            <div className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                                <a href={link.url} target="_blank" rel="noopener noreferrer">
                                    <strong> Ir para o site</strong>
                                </a>
                            </div>
                            
                        </div>
                    </div>
                ))}
            </div>
       </div>
        
    )
   
};

export default Links;
