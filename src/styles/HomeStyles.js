import styled from 'styled-components';

export const Container = styled.main`
    display:grid;
    grid-template-rows: 2.5fr 4fr;
    width: 100vw;
    height: 100vh;
`;

export const SearchSection = styled.header`
    width: 100%;
    height: 100%;
    background: url('/pattern-bg.png') no-repeat center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    position: relative;

    h2{
        font-size: 2.5rem;
        color: #fff;
        font-weight: 500;
        margin-top: ${props => props.results ? '3rem' : '0'};
        margin-bottom: 3rem;
    }

    div {
        display: flex;
        align-items: center;
        transition: .5s;
        margin-bottom: ${props => props.results ? '-3rem' : '0'};

        input{
            border: none;
            padding: 1.3rem;
            font-size: 1.3rem;
            width: 35rem;
            border-radius: 1rem 0 0 1rem;
            color: var(--gray900);
            outline: none;

            &::placeholder {
                color: var(--gray700);
            }
        }

        button {
            background-color: #000;
            border: none;
            height: 100%;
            width: 4rem;
            border-radius: 0 1rem 1rem 0;
            cursor: pointer;
 
            display:flex;
            align-items: center;
            justify-content: center;

            transition: .5s;

            &:hover {
                background: var(--gray900);
            }

            &:disabled {
                background: var(--gray700);
            }
        }
    }
`;

export const SearchInfos = styled.section`
   
   background: #fff;
   bottom: -98px;
   border-radius: 1rem;
   z-index: 10;
   -webkit-box-shadow: 0px 7px 17px 0px rgba(0,0,0,0.2);
   box-shadow: 0px 7px 17px 0px rgba(0,0,0,0.2);
   padding: 1rem;

    @keyframes fadeUp{
        from{
            transform: translateY(0px);
            opacity: 0; 
        }
        to{
            transform: translateY(110px);
            opacity: 1;
        }
    }

    animation: fadeUp .5s ease-in-out forwards;

   ul{
       display: flex;
       padding: 2.5rem 4rem;
       justify-content: center;
       list-style: none;
       width: 80vw;

       strong{
           text-transform: uppercase;
           font-weight: 700;
           color: var(--gray700);
           font-size: .9rem;
           display: block;
           margin-bottom: .5rem;
       }

       p{
           font-size: 2rem;
           font-weight: 500;
           color: var(--gray900);
       }
    
       li + li {
           margin-left: 3rem;
           position: relative;

           div{
               padding-left: 3rem;
           }

           &:before{
               content:'';
               display: inline-block;
               width: 2px;
               height: 75px;
               background: #cfcfcf;
               position: absolute;

               top:50%;
               transform: translate(-50%, -50%);
           }
       }
   }
`;

export const MapContainer = styled.section`
   width: 100%;
   background: #ccc;

   pointer-events: ${props => props.loading ? 'none' : 'auto'};

`;