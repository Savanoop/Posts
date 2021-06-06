import axios from "axios"

export const getMovies = () => {
  return new Promise((resolve, reject) => {
    axios.get("http://www.omdbapi.com/?&apikey=ab8e3a90&s=joker&page=1")
    .then((success) => resolve(success.data))
    .then((movies) => { console.log(movies) } )
    .catch(err => reject(err))
  })

}

export const getSearchedMovies = (query,page) => {
  return new Promise((resolve, reject) => {
    axios.get(`http://www.omdbapi.com/?&apikey=ab8e3a90&s=${query}&page=${page}`)
    .then((success) => resolve(success.data))
    .then((movies) => { console.log(movies) } )
    .catch(err => reject(err))
  })
}