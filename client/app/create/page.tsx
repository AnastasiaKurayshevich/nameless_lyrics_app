"use client"
import { type } from 'os'
import React, { use, useState } from 'react'


type FormData = {
    genre?: string;
    mood?: string;
    description?: string;
}


export default function Create() {

    const [formData, setFormData] = useState<FormData>({
        genre: '',
        mood: '',
        description: '',
    });

    const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, genre: event.target.value });
    };

    const handleMoodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, mood: event.target.value });
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, description: event.target.value });
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        fetch('http://localhost:8080/api/new-song', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ formData })
        })
            .then(response => response.text())
            .then(text => console.log(text))
            .catch(error => console.log(error));

        console.log(formData)
    }






    return (

        <div>
            <h2>Create</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Genre:
                    <select value={formData.genre} onChange={handleGenreChange}>
                        <option value=""></option>
                        <option value="Pop">Pop</option>
                        <option value="Rock">Rock</option>
                        <option value="Blues">Blues</option>
                    </select>
                </label>
                <br />
                <label>
                    Mood:
                    <select value={formData.mood} onChange={handleMoodChange}>
                        <option value=""></option>
                        <option value="Sad">Sad</option>
                        <option value="Happy">Happy</option>
                        <option value="Angsty">Angsty</option>
                    </select>
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>


    )
}
