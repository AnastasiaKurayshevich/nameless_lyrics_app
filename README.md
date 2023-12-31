# <img src="https://github.com/AnastasiaKurayshevich/nameless_lyrics_app/assets/125829513/d3451597-980f-42a5-8451-c0326cd5994f" alt="Lyrigator_image_1-modified" width="100" style="vertical-align: middle; margin-bottom: -5px;"> Lyrigator - Lyrics Generator App  
<br/><br/>

**Welcome to Lyrigator - a powerful AI-driven song lyrics generator application.**

[Lyrigator](https://www.lyrigator.com/) is your creative companion in the world of music and lyrics. Whether you're a songwriter looking for inspiration or just want to have fun generating unique lyrics, our app has you covered. With Lyrigator, you can explore various musical styles, moods, and artists to craft lyrics that resonate with your vision.

<br/><br/>
## Project Overview
Lyrigator was created as a final graduation project idea by the ***nameless_team*** in just two weeks sprint at School of Applied Technology SALT, Stockholm. This mobile-first app harnesses the capabilities of OpenAI to generate song lyrics based on user inputs, offering a unique creative experience. Users can specify the style, mood, and song structure, or even input specific lyrics for the song. Once satisfied, the app generates lyrics accordingly.  


### Core Features
- **Lyrics Customization**: Modify song components like verses, pre-choruses, choruses, bridges, and more. Drag and drop sections to change the song's structure, edit, delete, or regenerate selected parts, or even the entire song.
- **Song Management**: Save your generated songs to a songs list, allowing you to access, search, edit, or delete specific songs at any time.

Please note that Lyrigator generates text lyrics and does not provide music composition.

![version](https://img.shields.io/badge/version-1.0.0-blue) ![example workflow](https://github.com/AnastasiaKurayshevich/nameless_lyrics_app/actions/workflows/azure-webapps-java-jar.yml/badge.svg)

### Additional Features we are planning to implement in future
- **Authentication**: Sign-up and log-in pages for multiple users to access their personal accounts.
- **Social Connections**: Interact with other users' profiles, such as upvoting songs or saving them as favorites.
- **Filtering**: Easily filter your song list based on various categories.
- **Multiple Lyric Options**: Get multiple song options generated based on the same input, allowing you to choose your preferred version.
- **Export as PDF**: Save lyrics in PDF format.
- **Social Sharing**: Share your songs on social media platforms with a single click.

We continually aim to enhance the user experience and provide a comprehensive song lyrics generation platform.

## Application's Layout 

Below, you can view the mobile device interface of the application:

<img width="741" alt="Screenshot 2023-09-15 at 15 13 13" src="https://github.com/AnastasiaKurayshevich/nameless_lyrics_app/assets/125829513/94ca0a64-b349-4603-9ddc-69bd69ad5a36">

Check out a video demo of the app in action [here](https://youtu.be/N-W-yzOP5M4).

## Application's Architecture 
<img width="1269" alt="Lyrigator App Architecture" src="https://github.com/AnastasiaKurayshevich/nameless_lyrics_app/assets/125829513/7a5350c4-2b93-47d0-a7ba-938abd0e0af4">

See detailed veiw: [Lyrigator App Architecture.pdf](https://github.com/AnastasiaKurayshevich/nameless_lyrics_app/files/12048292/Lyrigator.App.Architecture.pdf)


## Tech Stack
Lyrigator is built with the following technologies:

- **Backend**: Java Spring
- **Frontend**: TypeScript React Next.js
- **Database**: PostgreSQL
- **Deployment**: Microsoft Azure

## Getting Started / Installation
Follow these steps to get the application up and running in your local environment:

1. Clone this repository repo using SSH option. Run in terminal
`git clone` ``` git@github.com:AnastasiaKurayshevich/nameless_lyrics_app.git ```
2. Configure your PostgreSQL database.

| Steps                            | Front-end                 | Back-end                  |
| ---------------------------------| ------------------------- | ------------------------- |
| 3. Navigate into repo            | `cd client`               | `cd server`               |
| 4. Install Dependencies          | `npm install`             | `mvn clean install`       |
| 5. Run the project               | `npm run dev`             | `mvn start`               |

#

## Developers
|Creators          | Socials |
| ----------------------- | ------- |
| Nate Arafayne           | [![Github-Nate](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/NateAra) [![LinkedIn-Nate](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nate-tklay-arafayne-20898925a/) |
| Anastasia Kurayshevich  | [![Github-Anastasia](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AnastasiaKurayshevich) [![LinkedIn-Anastasia](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/anastasia-kurayshevich/) |
| Edward Arvinius         | [![Github-Edward](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/EdwardArvinius) [![LinkedIn-Edward](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/edward-arvinius-248819117/) |


---

Thank you for choosing [Lyrigator](https://www.lyrigator.com/). Create unique song lyrics and let your creativity flow!
