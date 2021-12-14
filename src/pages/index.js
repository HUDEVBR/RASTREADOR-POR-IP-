import { useEffect, useState } from 'react';
import Arrow from '../assets/icon-arrow.svg';
import { Container, SearchSection, SearchInfos, MapContainer } from '../styles/HomeStyles';

export default function Home() {
  
  const [ipAddress, setIpAddress] = useState('');
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

  async function handleSubmit() {
    if (!ipAddress) return; 

    try {
      setLoading(true)

      if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipAddress)) {

        const response = await fetch(`https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipAddress}`);
        const data = await response.json();

        if(response.status != 200) throw new Error();

        setResults(data);
      } else {
        const response = await fetch(`https://geo.ipify.org/api/v1?apiKey=${apiKey}&domain=${ipAddress}`);
        const data = await response.json();

        if(response.status != 200) throw new Error();

        setResults(data);
      }

    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false);
    }
  }
  console.log(ipAddress);
  return (
      <Container>
        <SearchSection results={results.location}>
          <h2> Localizador de IP </h2>

          <div>
          <input type='text' placeholder='Search for any IP address or domain' value={ipAddress} onChange={({target}) => setIpAddress(target.value)}/>
          <button onClick={handleSubmit}> <Arrow/> </button>
          </div>
      
          {results?.location && (
            <SearchInfos>
            <ul>
              <li>
                <div>
                  <strong>IP Address</strong>

                  <p>{results.ip}</p>
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
                  <p>UTC {results.location.timezone}</p>
                </div>
              </li>
              <li>
                <div>
                  <strong>ISP</strong>
                  <p>{results.isp}</p>
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
