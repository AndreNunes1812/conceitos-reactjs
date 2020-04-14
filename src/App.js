import React , { useState , useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(()=> {
    api.get('repositories').then(response => {   
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {     
      title: `Repositorio ${Date.now()}`,     
      url: `https://github.com/AndreNunes1812/repositorio${Date.now()}`,    
      techs: ["React", "NodeJs"],
    });
   
    const repository = response.data;

    setRepositories([...repositories, repository ]);

  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`)

    const reporitoryNew = repositories.filter( repo => repo.id !== id) 

    setRepositories(reporitoryNew);
    
  }

  return (
    <>
      <ul data-testid="repository-list">
        {repositories.map(rep => {       
          return (    
              <li key={rep.id}>
                {rep.title} 
                <button onClick={() => handleRemoveRepository(rep.id)}>
                  Remover
                </button>
              </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
