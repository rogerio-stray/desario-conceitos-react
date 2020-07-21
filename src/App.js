import React from "react";

import "./styles.css";
import { useEffect, useState } from "react";
import api from 'services/api';

function App() {
 const [repositories, setRepository] = useState([]);

 useEffect(() => {
  api.get('repositories').then(response => {
    setRepository(response.data);
    //console.log(response.data);
  })
 }, []);

  async function handleAddRepository() {
    
    const response = await api.post('repositories', {
      url: "https://github.com/rogerio-stray/conceitos-nodejs",
      title: "Repositorio de conceitos-nodejs",
      techs: ["JavaScript", "NodeJS"]
    });
    const repository = response.data;
    setRepository([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepository(repositories.filter(repository => repository.id !== id));
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
            {repositories.map(repository => <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
            </button>
              </li>)}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
