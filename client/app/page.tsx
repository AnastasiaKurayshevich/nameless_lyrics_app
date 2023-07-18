"use client";
import React, { useEffect, useState } from 'react';


export default function Home() {

  const [test, setTest] = useState('');

  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await fetch('https://lyrigator.azurewebsites.net/api');
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

  const [inputValue, setInputValue] = useState("");
  



  // const handleSubmit =  async (event: any) => {
  //   event.preventDefault();

  //  fetch('https://lyrigator.azurewebsites.net/api', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ input: inputValue })
  //   })
  //   .then(response => response.text())
  //   .then(text => console.log(text))
  //   .catch(error => console.log(error));
  // };

  // useEffect(() => {
  //   handleSubmit(event);
  // }, []);
  
  return (
    <>
      <h1>Hello!</h1>
      <p>{test}</p>
      <div>
        <form>
        {/* <form onSubmit={handleSubmit}> */}
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
