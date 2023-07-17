import Image from 'next/image'

const getInfo = async () => {
  const response = await fetch('https://lyrigator.azurewebsites.net/api');
  const json = await response.text();
  return json;
  
}

export default async function Home() {

  const testString = await getInfo();
  return (
    <main >
      <h1>Hello!</h1>
      <p>{testString}</p>
      
    </main>
  )
}
