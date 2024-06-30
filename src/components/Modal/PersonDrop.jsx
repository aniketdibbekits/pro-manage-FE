import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./PersonDrop.css"

function PersonDrop({ onSelectPerson }) {
  const [persons, setPersons] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:8000/person/persons', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          // Modify response data to include initials
          const personsWithInitials = response.data.map(person => ({
            ...person,
            initial: person.email.substring(0, 2).toUpperCase() // Get first two letters and convert to uppercase
          }));
          setPersons(personsWithInitials);
          console.log('API response data:', personsWithInitials);
        })
        .catch(error => {
          console.error('There was an error fetching the persons!', error);
        });
    } else {
      console.error('No token found in local storage!');
    }
  }, [token]);

  const handlePersonSelect = (e) => {
    const selectedValue = e.target.value;
    setSelectedPerson(selectedValue);
    onSelectPerson(selectedValue); // Pass selected person to parent component
  };

  return (
    <div className='person-drop'>
      <p className='assign-to'>Assign to</p>
      <select className='dropdown' name="persons" id="persons" onChange={handlePersonSelect}>
        <option value="">Add a assignee</option>
        {persons.map(person => (
       
          <option className='person-opt' key={person.id} value={person.email}>
            {/* {`${person.email} (${person.initial})`}  */}
            {`${person.initial}  ${person.email}`} 
          </option>
        ))}
      </select>
    </div>
  );
}

export default PersonDrop;

