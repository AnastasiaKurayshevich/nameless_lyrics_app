"use client";
import React, { useEffect, useState } from 'react';


export default function Home() {

  const [test, setTest] = useState('');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await fetch('http://localhost:8080/api');
        if (response.ok) {
          const text = await response.text();
          setTest(text);
        } else {
          console.error('Error:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getInfo();
  }, []);

  const handleSubmit =  async (event: React.FormEvent<HTMLFormElement> | null) => {
    if(event){
    event.preventDefault();
    }

   fetch('http://localhost:8080/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ test: inputValue })
    })
    .then(response => response.text())
    .then(text => console.log(text))
    .catch(error => console.log(error));

    console.log(inputValue)
  };

  useEffect(() => {
    handleSubmit(null);
  }, []);
  
  return (
    <>
      <h1>Hello!</h1>
      <p>{test}</p>
      <div>
        <form onSubmit={handleSubmit}> 
          <input
          type='text'
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)}/>
          <input type="submit"/>
        </form>
      </div>
    </>
  );
};
