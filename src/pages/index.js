import Head from "next/head";

import Layout from "@components/Layout";
import Section from "@components/Section";
import Container from "@components/Container";
import Map from "@components/Map";
import styles from "@styles/Home.module.scss";
const DEFAULT_CENTER = [57.64221734, 11.77564598];
const DEFAULT_ZOOM = 14;

export default function Home() {
  const fetchWeatherData = async (lat, lon) => {
    const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
    const data = await response.json();
    return data;
  };
  console.log(fetchWeatherData(DEFAULT_CENTER[0], DEFAULT_CENTER[1]));

  return (
    <Layout>
      <Head>
        <title>Brännö Surf Spots</title>
        <meta
          name="description"
          content="Create mapping apps with Next.js Leaflet Starter"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Section>
        <Container>
          <h1 className={styles.title}>Wind map</h1>

          <Map
            className={styles.homeMap}
            width="380"
            height="240"
            center={DEFAULT_CENTER}
            zoom={DEFAULT_ZOOM}
          >
            {({ TileLayer, Marker, Popup }) => (
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={DEFAULT_CENTER}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </>
            )}
          </Map>
        </Container>
      </Section>
    </Layout>
  );
}
