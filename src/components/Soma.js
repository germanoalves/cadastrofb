/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState, useEffect} from "react";
import Links from "./Links";
import LinkForm from "./LinkForm";

import { db } from '../firebase';


const Links1 = () => {

    const [links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState('')

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

    function total() {
        let x = 0
        links.map((i,index) => {
           
              x += parseInt(i.number)
           })
        return x
      }

      



    return (
        <div className=" w-1/5 px-36 py-5 my-6 bg-yellow-400 text-gray-800 text-center">
            
            <div >TOTAL: {total()}</div>


           

            
        </div>

    )
}

export default Links1;