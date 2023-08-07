import Head from "next/head";
import { useState, useEffect } from "react";
import Layout from "@components/Layout";
import Section from "@components/Section";
import Container from "@components/Container";
import styles from "@styles/Home.module.scss";
import WindMap from "@components/WindMap";

const DEFAULT_CENTER = [57.64221734, 11.77564598];
const DEFAULT_ZOOM = 14;

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
          <WindMap
            wind_deg={wind.deg}
            center={DEFAULT_CENTER}
            zoom={DEFAULT_ZOOM}
          />
        </Container>
      </Section>
    </Layout>
  );
}
