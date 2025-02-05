import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const RecipeForm = () => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      axios.get(`http://localhost:8080/?id=${id}`)
        .then(response => {
          const recipe = response.data;
          setName(recipe.name);
          setIngredients(recipe.ingredients);
          setInstructions(recipe.instructions);
        })
        .catch(error => console.error(error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const recipeData = { name, ingredients, instructions };

    if (isEdit) {
      axios.put(`http://localhost:8080/?id=${id}`, recipeData)
        .then(() => history.push('/'))
        .catch(error => console.error(error));
    } else {
      axios.post('http://localhost:8080', recipeData)
        .then(() => history.push('/'))
        .catch(error => console.error(error));
    }
  };

  return (
    <div>
      <h2>{isEdit ? 'Modifier' : 'Ajouter'} une Recette</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Ingredients</label>
          <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
        </div>
        <div>
          <label>Instructions</label>
          <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
        </div>
        <button type="submit">{isEdit ? 'Mettre à jour' : 'Ajouter'}</button>
      </form>
    </div>
  );
};

export default RecipeForm;
