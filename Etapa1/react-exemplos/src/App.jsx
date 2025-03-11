import { useState, useEffect } from 'react';
import './App.css';

import Counter from './components/Counter';
import Photo from './components/Photo';

function App() {
  const [count, setCount] = useState(0);
  const [photos, setPhotos] = useState([]);

  const fetchPhotos = async () => {
    try {
      const url = 'https://jsonplaceholder.typicode.com/albums/1/photos';
      const response = await fetch(url);
      if (response.status === 200) {
        const data = await response.json();
        const updatePhotos = data.map((photo) => ({
          ...photo,
          thumbnailUrl: `https://picsum.photos/150?random=${photo.id}`,
        }));
        setPhotos(updatePhotos);
      }
    } catch (error) {
      console.error('Erro ao buscar fotos', error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []); // U

  const updateCount = () => setCount(count + 1); 

  return (
    <>
      <Counter title="Contando..." />
      <Counter initial="100" />
      <article>
        <h1>Álbum da API</h1>
        {photos.length > 0 ? (
          photos.map((photo) => (
           // <article key={photo.id}>
             // <h2>ID #{photo.id} - {photo.title}</h2>
             // <img src={photo.thumbnailUrl} alt={photo.title} />
           // </article>
           <Photo photo={photo} />
          ))
        ) : (
          <p>Carregando fotos...</p>
        )}
      </article>
    </>
  );
}

export default App;
