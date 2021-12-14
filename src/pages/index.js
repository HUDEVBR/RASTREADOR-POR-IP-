import { useEffect, useState } from 'react';
import Arrow from '../assets/icon-arrow.svg';
import { Container, SearchSection, SearchInfos, MapContainer } from '../styles/HomeStyles';

export default function Home() {
  const teste = true;
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({});

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    async function getInitialData() {
      try{
        setLoading(true);

        const response = await fetch(`https://geo.ipify.org/api/v2/country?apiKey=${apiKey}`);
        const data = await response.json();

        if (response.status != 200) throw new Error() ;

        setResults(data);

      }catch (err) {
        console.log(err);
      }finally {
        setLoading(false);
      }
    }
    getInitialData();
  }, [])
  console.log(results)

  return (
      <Container>
        <SearchSection results={results.location}>
          <h2> IP Address Tracker</h2>

          <div>
          <input type='text' placeholder='Search for any IP address or domain'></input>
          <button><Arrow/></button>
          </div>
      
          {results?.location && (
            <SearchInfos>
            <ul>
              <li>
                <div>
                  <strong>IP Address</strong>
                  <p>192.199.0.100</p>
                </div>
              </li>
              <li>
                <div>
                  <strong>Location</strong>
                  <p>{`${results.location.city}, ${results.location.country}`}<br/> {results.location.region}</p>
                </div>
              </li>
              <li>
                <div>
                  <strong>Timezone</strong>
                  <p>UTC -05:00</p>
                </div>
              </li>
              <li>
                <div>
                  <strong>ISP</strong>
                  <p>SpaceX Starlink</p>
                </div>
              </li>  
            </ul>
          </SearchInfos> 
          )}
        
        </SearchSection>

        <MapContainer>
          
        </MapContainer>
      </Container>
    )
}
