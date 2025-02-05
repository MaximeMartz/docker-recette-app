import React from 'react';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <h1>Recette App</h1>
        <Routes>
          <Route path="/" element={<RecipeList/>} />
          <Route path="/create" element={<RecipeForm/>} />
          <Route path="/update/:id" element={<RecipeForm/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

