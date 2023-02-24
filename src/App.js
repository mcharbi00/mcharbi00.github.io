import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import MovieComponent from './components/MovieComponent'
import MovieInfoComponent from './components/MovieInfoComponent'
import Axios from 'axios'

export const API_KEY = "7872d860"
const Container = styled.div`
 display: flex;
 flex-direction: column;
 `
const Header = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
background-color : blue;
color: white;
padding: 15px;
align-items: center;
font-size: 22px;
font-weight: bold;
`

const AppName = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`

const Search = styled.div`
display:flex;
flex-direction: row;
padding:10px;
background-color:white;
border-radius: 7px;
margin-left: 30px;
width: 50%;
align-items: center;
`

const SearchIcon = styled.img`
width:30px;
height:30px;
`

const Input = styled.input`
border: none;
font-size: 16px;
font-weight: bold;
outline: none;
color: black;
margin-left: 10px;
`;

const MovieList = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
padding: 20px;
justify-content: space-evenly;
`;
function App() {
  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updatemovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();
  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    updatemovieList(response.data.Search)
  }
  const onTextChange = (event) => {
    clearTimeout(timeoutId)
    updateSearchQuery();
    const timeout = setTimeout(() => fetchData(event.target.value), 500)
    updateTimeoutId(timeout)
  };
  return (
    <Container>
      <Header>
        <AppName>
          Movies.fr
        </AppName>
        <Search>
          <SearchIcon src='/search.png' />
          <Input placeholder='Quel film recherchez vous ?'
            value={searchQuery}
            onChange={onTextChange} />
        </Search>

      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} />}
      <MovieList>
        {movieList?.length ?
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
          : "Rechechez un film dans la barre de recherche"}

      </MovieList>
    </Container>
  );
}

export default App;
