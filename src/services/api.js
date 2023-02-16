import axios from 'axios';
const COHERE_API_KEY = '22rvLkOyFW2AtKp6z7FqMO88TDWKMScogxjz0vLO';
const COHERE_API_URL = 'https://api.cohere.ai/generate';



export async function data(inp) {
    const prompt = {
      model: '583e7acb-eefe-4f99-b59a-04a4c5e5f7cb-ft',
      prompt: `This program generates a recipe with the input ingredientes separated by a comma.
  
      Recipe: Whit those ingredients you can make: Milanesa
      --  
      Ingredients: meat, garlic, herbs  
      Recipe: Whit those ingredients you can make: Asado
      --  
      Ingredients: chorizo, skillet, chimichurri  
      Recipe: Whit those ingredients you can make: Choripan
      --  
      Ingredients: provolone cheese, garlic, oi
      Recipe: Whit those ingredients you can make: Provoleta
      --  
      Ingredients: flour, eggs, sugar 
      Recipe: Whit those ingredients you can make: Panettone
      --  
      Ingredients: lentils, meat, onion 
      Recipe: Whit those ingredients you can make: Lentil
      --  
      Ingredients: rye flour, yeast, water 
      Recipe: Whit those ingredients you can make: Rye bread
      --  
      Ingredients: flour, water, oil 
      Recipe: Whit those ingredients you can make: Churros
      --  
      Ingredients: meat, potato, carrot 
      Recipe: Whit those ingredients you can make: Puchero
      --  
      Ingredients: meat, chimichurri, salad
      Recipe: Whit those ingredients you can make: Carne a la Parrilla
      --  
      Ingredients: corn, meat, chorizo 
      Recipe: Whit those ingredients you can make: Locro
      --  
      Ingredients: potato, eggs, flour 
      Recipe: Whit those ingredients you can make: Gnocchis
      --  
      Ingredients: dough, humita, cheese 
      Recipe: Whit those ingredients you can make: Empanada de Humita
      --  
      Ingredients: meat, potato, carrot
      Recipe: Whit those ingredients you can make: Bife a la criolla
      --  
      Ingredients: rice, milk, sugar 
      Recipe: Whit those ingredients you can make: Arroz con leche
      --
      Ingredients: ${inp}
      Recipe:`,
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