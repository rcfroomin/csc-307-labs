import Table from "./Table";
import Form from "./Form";
import React, {useState, useEffect} from 'react';

const characters = [
    {
      name: "Charlie",
      job: "Janitor"
    },
    {
      name: "Mac",
      job: "Bouncer"
    },
    {
      name: "Dee",
      job: "Aspring actress"
    },
    {
      name: "Dennis",
      job: "Bartender"
    }
  ];
  
  function MyApp() {
    const [characters, setCharacters] = useState([]);

    function removeOneCharacter(index) {
        const characterId = characters[index]._id;
        const url = `http://localhost:8000/users/${characterId}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then((res) => {
                if (res.status === 204) {
                    const updated = characters.filter((character, i) => i !== index);
                    setCharacters(updated);
                } else if (res.status === 404) {
                    throw new Error('Resource not found');
                } else {
                    throw new Error('Failed to delete');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

    function postUser(person) {
        const promise = fetch("Http://localhost:8000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
    
        return promise;
      }

    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => { console.log(error); });
      }, [] );

    function updateList(person) { 
        postUser(person)
        .then((res) => {
            if (res.status != 201)
                throw new Error("Failed to add.");
            return res.json();
        })
        .then((json) => setCharacters([...characters, json])) 
        .catch((error) => { 
            console.log(error);
        });
    }
  
      return (
        <div className="container">
          <Table
            characterData={characters}
            removeCharacter={removeOneCharacter}
          />
          <Form handleSubmit={updateList} />
        </div>
      );
  }


export default MyApp;