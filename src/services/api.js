import axios from 'axios';
const COHERE_API_KEY = '22rvLkOyFW2AtKp6z7FqMO88TDWKMScogxjz0vLO';
const COHERE_API_URL = 'https://api.cohere.ai/generate';



export async function data(inp) {
    const prompt = {
      model: 'xlarge',
      prompt: `This program generates a recipe with the input ingredientes separated by a comma.

      Ingredients: dough, meat, onion  
      Recipe: Whit those ingredients yo can make: Empanadas
      --
      Ingredients: meat, garlic, sal  
      Recipe: Whit those ingredients yo can make: Asado
      --
      Ingredients: meat, egg, breadcrumbs  
      Recipe: Whit those ingredients yo can make: Milanesa
      --  
      Ingredients: meat, garlic, herbs  
      Recipe: Whit those ingredients yo can make: Asado
      --  
      Ingredients: chorizo, skillet, chimichurri  
      Recipe: Whit those ingredients yo can make: Choripan
      --  
      Ingredients: provolone cheese, garlic, oi
      Recipe: Whit those ingredients yo can make: Provoleta
      --  
      Ingredients: flour, eggs, sugar 
      Recipe: Whit those ingredients yo can make: Panettone
      --  
      Ingredients: lentils, meat, onion 
      Recipe: Whit those ingredients yo can make: Lentil
      --  
      Ingredients: rye flour, yeast, water 
      Recipe: Whit those ingredients yo can make: Rye bread
      --  
      Ingredients: flour, water, oil 
      Recipe: Whit those ingredients yo can make: Churros
      --  
      Ingredients: meat, potato, carrot 
      Recipe: Whit those ingredients yo can make: Puchero
      --  
      Ingredients: meat, chimichurri, salad
      Recipe: Whit those ingredients yo can make: Carne a la Parrilla
      --  
      Ingredients: corn, meat, chorizo 
      Recipe: Whit those ingredients yo can make: Locro
      --  
      Ingredients: potato, eggs, flour 
      Recipe: Whit those ingredients yo can make: Gnocchis
      --  
      Ingredients: dough, humita, cheese 
      Recipe: Whit those ingredients yo can make: Empanada de Humita
      --  
      Ingredients: meat, potato, carrot
      Recipe: Whit those ingredients yo can make: Bife a la criolla
      --  
      Ingredients: rice, milk, sugar 
      Recipe: Whit those ingredients yo can make: Arroz con leche
      --  
      Ingredients: noodles, meat, vegetables 
      Recipe: Whit those ingredients yo can make: Sopa de fideos
      --  
      Ingredients: chicken, garlic, white winer 
      Recipe: Whit those ingredients yo can make: Pollo al horno
      --  
      Ingredients:  flour, yeast, water, salt 
      Recipe: Whit those ingredients yo can make: Pan de campo
      --  
      Ingredients: dough, chicken, onion 
      Recipe: Whit those ingredients yo can make: Empanadas de pollo
      --  
      Ingredients: crum bread, ham, cheese 
      Recipe: Whit those ingredients yo can make: Sandwich de miga
      --  
      Ingredients: flour, cheese, tomatoe 
      Recipe: Whit those ingredients yo can make: Pizza
      --  
      Ingredients: oil, eggs, flor 
      Recipe: Whit those ingredients yo can make: Omelette
      --  
      Ingredients: ${inp}
      Recipe: Whit those ingredients yo can make`,
      max_tokens: 40,
      temperature: 0.3,
      k: 0,
      p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop_sequences: ['--'],
      return_likelihoods: 'NONE'
    }
  
    const response = await fetch(COHERE_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `BEARER ${COHERE_API_KEY}`,
        "Content-Type": 'application/json',
        "Cohere-Version": '2022-12-06'
      },
      body: JSON.stringify(prompt)
    }).then(res => res.json())
    return response


  }