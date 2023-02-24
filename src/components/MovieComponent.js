
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_KEY } from "../App";
import styled from "styled-components";

const Movie = styled.div`
display:flex;
flex-direction: column;
padding: 10px;
width:280px;
cursor: pointer;
`;

const Name = styled.span`
font-size: 18px;
font-weight: 600;
color:black;
margin: 15px 0; 
`;
const Cover = styled.img`
object-fit: cover;
height:362;
`;
const InfoColumn = styled.span`
display:flex;
flex-direction:row;
justify-content: space-between;
color:black;
`;
const MovieInfo = styled.span`
font-size:16px;
font-weight: 500;
color:black;
text-transform: capitalize;
`;
const MovieComponent = (props) => {
    const { Title, Year, Type, Poster, imdbID } = props.movie;
    return (
        <Movie onClick={() => props.onMovieSelect(imdbID)}>
            <Cover src={Poster} />
            <Name>{Title}</Name>
            <InfoColumn>
                <MovieInfo> Year: {Year}</MovieInfo>
                <MovieInfo> Type: {Type} </MovieInfo>

            </InfoColumn>
        </Movie>)
}

export default MovieComponent