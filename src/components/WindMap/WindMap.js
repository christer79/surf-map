import styles from "@styles/Home.module.scss";
import Map from "@components/Map";
const bounds = [
  [57.63721734, 11.77064598],
  [57.64721734, 11.78064598],
];
const WindMap = ({ wind_deg, center, zoom }) => {
  return (
    <Map
      className={styles.homeMap}
      width="380"
      height="240"
      center={center}
      zoom={zoom}
    >
      {({ TileLayer, Marker, Popup, SVGOverlay }) => (
        <>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={center}>
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
              <g transform={`rotate(${wind_deg + 180} 16 16)`}>
                <path d="m26.71 10.29-10-10a1 1 0 0 0-1.41 0l-10 10 1.41 1.41L15 3.41V32h2V3.41l8.29 8.29z" />
              </g>
            </svg>
          </SVGOverlay>
        </>
      )}
    </Map>
  );
};

export default WindMap;
