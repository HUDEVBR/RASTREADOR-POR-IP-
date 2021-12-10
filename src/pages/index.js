import Arrow from '../assets/icon-arrow.svg';
import { Container, SearchSection, SearchInfos, MapContainer } from '../styles/HomeStyles';

export default function Home() {
  return (
      <Container>
        <SearchSection>
          <h2> IP Address Tracker</h2>

          <div>
          <input type='text' placeholder='Search for any IP address or domain'></input>
          <button><Arrow/></button>
          </div>
      

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
                <p>Brooklyn, NY<br/> 10001</p>
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
        </SearchSection>

        <MapContainer>
          
        </MapContainer>
      </Container>
    )
}
