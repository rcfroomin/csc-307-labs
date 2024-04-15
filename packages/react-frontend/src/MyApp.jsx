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
        const updated = characters.filter((character, i) => {
          return i !== index;
        });
        setCharacters(updated);
    }

    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => { console.log(error); });
      }, [] );

    function updateList(person) {
        setCharacters([...characters, person]);
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