export async function fetchAPI() {
   let fetchObj = await fetch('https://rickandmortyapi.com/api/character')
    .then((result) =>{
       return result.json()
    })
    .then((result) => {
        return result.results
    })
    return fetchObj
}