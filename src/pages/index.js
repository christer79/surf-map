import Head from "next/head";
import { useState, useEffect } from "react";
import Layout from "@components/Layout";
import Section from "@components/Section";
import Container from "@components/Container";
import Map from "@components/Map";
import styles from "@styles/Home.module.scss";

const DEFAULT_CENTER = [57.64221734, 11.77564598];
const DEFAULT_ZOOM = 14;
const bounds = [
  [57.63721734, 11.77064598],
  [57.64721734, 11.78064598],
];

export default function Home() {
  const fetchWeatherData = async (lat, lon) => {
    const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
    const data = await response.json();
    return data;
  };
  const [wind, setWind] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeatherData(DEFAULT_CENTER[0], DEFAULT_CENTER[1]).then((response) => {
      const wind_deg = response["current"]["wind_deg"];
      const wind_speed = response["current"]["wind_speed"];
      const wind_gust = response["current"]["wind_gust"];
      setWind({ speed: wind_speed, gust: wind_gust, deg: wind_deg });
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>"loading"</div>;
  }

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
          <h2 className={styles.title}>
            Speed: {wind.speed} ({wind.gust})
          </h2>

          <Map
            className={styles.homeMap}
            width="380"
            height="240"
            center={DEFAULT_CENTER}
            zoom={DEFAULT_ZOOM}
          >
            {({ TileLayer, Marker, Popup, SVGOverlay }) => (
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
                <SVGOverlay bounds={bounds}>
                  <svg
                    data-name="1-Arrow Up"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                  >
                    <g transform={`rotate(${wind.deg + 180} 16 16)`}>
                      <path d="m26.71 10.29-10-10a1 1 0 0 0-1.41 0l-10 10 1.41 1.41L15 3.41V32h2V3.41l8.29 8.29z" />
                    </g>
                  </svg>
                </SVGOverlay>
              </>
            )}
          </Map>
        </Container>
      </Section>
    </Layout>
  );
}
