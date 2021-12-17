import { useEffect, useState } from 'react';
import Arrow from '../assets/icon-arrow.svg';
import { Container, SearchSection, SearchInfos, MapContainer } from '../styles/HomeStyles';
import Loader from '../components/Loaders';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import Head from 'next/head';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function Home() {
  
  const [ipAddress, setIpAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({});

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    async function getInitialData() {
      try{
        setLoading(true);

        const response = await fetch(`https://geo.ipify.org/api/v1?apiKey=${apiKey}`);
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
      toast.error('An error ocurred while searching for this IP or domain! Please try again.')
    } finally {
      setLoading(false);
    }
  }

  //aviso adblock

  useEffect(() => {
    toast.warn('Please disable ADBlock for the application works normally 😁 🚀', {
      autoClose: '10000', 
    })
  }, [])

  const defaultPosition = [-22.684992, -43.466560]

  //titulo de pagina

  //arquivo SEO

  console.log(ipAddress);
  return (
      <Container>
        <Head>
          <title>Geolocalizador de IP - Encontre qualquer IP ou domínio facilmente</title>
        </Head>
        <SearchSection results={results.location}>
          <h2> Localizador de IP </h2>

          <div>
          <input type='text' placeholder='Search for any IP address or domain' value={ipAddress} onChange={({target}) => setIpAddress(target.value)}/>
          <button disabled={!!loading} onClick={handleSubmit}> {loading ? <Loader /> : <Arrow />} </button>
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

          
          <MapContainer loading={loading}>
          <Map defaultPosition={defaultPosition} location={results.location ? [results.location.lat, results.location.lng] : defaultPosition}/> 
        </MapContainer>
      </Container>
    )
}
