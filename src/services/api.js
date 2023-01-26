import axios from 'axios';
const COHERE_API_KEY = '22rvLkOyFW2AtKp6z7FqMO88TDWKMScogxjz0vLO';
const COHERE_API_URL = 'https://api.cohere.ai/generate';



export async function data(inp) {
    const data = {
      model: 'xlarge',
      prompt: `This program can translate from Spanish slang to Argentinian slang
      Spanish: ostia tio
      Response: Sarpado amigo
      --
      Spanish: flipo en colores
      Argentinian: Esta re piola
      --
      Spanish:  Vale
      Argentinian: De una
      --
      Spanish: Currar
      Argentinian: Laburar
      --
      Spanish: Te la has liado
      Argentinian: Te la re mandaste
      --
      Spanish: Te la has liado
      Argentinian: Te la re mandaste
      --
      --
      Spanish: "${inp}
      Argentinian: `,
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
      body: JSON.stringify(data)
    }).then(res => res.json())
  
    const { text } = response.generations[0]
    return text
      .replace('--', '')
      .replaceAll('"', '')
      .trim()
  }



// export async function data(promt){
    
//     const options = {
//     method: 'POST',
//     url: COHERE_API_URL,
//     headers: {
//       accept: 'application/json',
//       'Cohere-Version': '2022-12-06',
//       'content-type': 'application/json',
//       authorization: `Bearer ${COHERE_API_KEY}`	
//     },
//     data: {
//       max_tokens: 20,
//       return_likelihoods: 'NONE',
//       truncate: 'END',
//       prompt:
//       `--
//       Spanish: ${promt}
//       Argentinian:
//       --`
//     }
//   };
    
//     axios
//     .request(options)
//     .then(res => response.json()) 
//     .catch(function (error) {     
//       console.error(error);
//     })
    
//     const response = await data();

//     return response[0].text;
// }