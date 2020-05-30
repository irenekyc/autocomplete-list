import React, {Fragment, useState} from 'react';
import Spinner from './Spinner'
import {debounce} from 'lodash'
import axios from 'axios'
import './App.css';

function App() {
  const [countries, setCountries] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const changeHandler = debounce((query)=>{
    setError(false)
    setLoading(true)
    fetchData(query)
    setCountries(null)
  }, 500)

  const fetchData = async (query)=>{
    let response
    try{
      if(query.length>=1){
        response = await axios.get(`https://restcountries.eu/rest/v2/name/${query}`)
        setCountries(response.data)
      } else if (query === ""){
          setCountries(null)}
    }
    catch(err){
      setError(true)
    }
    setLoading(false)      
    }
  

  return (
  <Fragment>
    <h1> Autocomplete List</h1>
    <div className="inputContainer">
      <input type="text" onChange = {(e)=>changeHandler(e.target.value)} className="inputField"/>
      {loading && (<div className="loadingContainer">
        <Spinner />
        </div>)}
      {countries!==null && countries.length>=1 && (
        <div className="listContainer">
      {countries.map(e=>{
       return <li key={e.name}> {e.name}</li>
      })}
    </div>)}
    {error && (
      <div className="listContainer">
        <li> No result found.</li>
      </div>
    )}
    </div>
  </Fragment>
  );
}

export default App;
