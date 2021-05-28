import React, { useState } from 'react';

export default function SearchBox(props){

    const [name, setName] = useState('');

    const submitHandler = (e)=> {
        e.preventDefault();
        props.history.push(`/search/name/${name}`);  //NOTE: 'search' is not performed in this component, rather user is directed to the Search Page
    }

    return (
      <form className="search" onSubmit={submitHandler}>
        <div>
          <input
            type="text"
            id="q"
            name="q"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <button type="submit" className="primary"><i className="fa fa-search"></i></button>
        </div>
      </form>
    );
}