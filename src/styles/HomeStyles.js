import styled from 'styled-compenents';

export const Container = styled.main`
    display:grid;
    grid-template-rows: 2.5fr, 4fr;
    width: 100vw;
    height: 100vh;
`;

export const SearchSection = styled.header`
    width: 100%;
    height: 100%;
    background: url ('/patter-bg.png') no-repeat center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    position: relative;
`;

export const SearchInfos = styled.section`
   
`;

export const MapContainer = styled.section`
   width: 100%;
   background: #ccc;
`;