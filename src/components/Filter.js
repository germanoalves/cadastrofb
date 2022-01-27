/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState, useEffect} from "react";
import { db } from '../firebase';

const Lista = () => {

    const [select, setSelect] = useState( "receitas");

    function useLinks() {
      const [links, setLinks] = useState([]);
  
      useEffect(() => {
        db.collection("links")
          .where("select", "==", select)
          .get()
          .then((snapshot) => {
            let data = [];
            snapshot.forEach((doc) => {
              data.push({
                ...doc.data(),
                id: doc.id,
              });
              return data;
            });
  
            setLinks(data);
          })
          .catch((e) => {
            console.log(e);
          });
      }, [select]);
  
      return links;
    }
  
    const links = useLinks();
  

    return (
        <div className="flex justify-center items-center">
            <button
          className=" bg-red-600 py-6 px-12 text-white m-2 hover:bg-red-900"
          onClick={() => setSelect("receitas")}
          
        >
          Receitas
        </button>
        <button
          className=" bg-green-600 py-6 px-12 text-white m-2 hover:bg-green-900"
          onClick={() => setSelect("despesas")}
          
        >
          Despesas
        </button>
        </div>
    )
}
export default Lista;

