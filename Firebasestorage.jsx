import React, { useState } from 'react';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { app } from './Firebase';

const db = getFirestore(app);

export default function Firestore() {

  const [users, setUsers] = useState([]);

  async function addData() {
    try {

      const docRef = await addDoc(collection(db, 'users'), {


        first: 'Lana',
        last: 'Vretence',
        born: 1215,

      });

      console.log('Document written with ID:', docRef.id);

    } catch (error) {

      console.error('Error adding document:', error);
      alert('Failed to add document. Please try again.');

    }
  }

  async function fetchData() {
    try {

      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersList = querySnapshot.docs.map((doc) => ({
        id: doc.id, 
        ...doc.data(), 

      }));
      setUsers(usersList); 

    } catch (error) {

      console.error('Error fetching documents:', error);
      alert('Failed to fetch documents. Please try again.');

    }
  }

  return (
    <div>
      <button onClick={addData}>Add</button>
      <button onClick={fetchData}>Fetch</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.first} {user.last} (Born: {user.born})
          </li>
        ))}
      </ul>
    </div>
  );
}