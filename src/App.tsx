import { useEffect, useState } from "react";
import "./App.css";

const cellStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "center",
};

function App() {
  const [posts, setPosts] = useState([]);
  const [location, setLocation] = useState<GeolocationPosition>();
  const [timezone, setTimezone] =
    useState<Intl.ResolvedDateTimeFormatOptions>();
  const [status, setStatus] = useState<string>("");
  const [showPosts, setShowPosts] = useState(false);

  const date = new Date();
  const getLocation = () => {
    try {
      if (!("geolocation" in navigator)) {
        setStatus("Geolocation not supported");
        return;
      }

      navigator?.geolocation?.getCurrentPosition(
        (position) => {
          setLocation({ ...position, timestamp: Date.now() });
        },
        (error) => {
          setStatus("failed location:---" + error.message);
        },
        {
          enableHighAccuracy: true, // use GPS if possible
          maximumAge: 0, // don’t use cached location
          timeout: 10000, // 10 seconds max
        }
      );
    } catch (error: any) {
      setStatus("failed location catch :---" + error?.message);
    }
  };

  const getTimezone = () => {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions();
      setTimezone(timezone);
    } catch (error: any) {
      setStatus("failed timezone :---" + error?.message);
    }
  };

  // useEffect(() => {
  //   navigator.permissions.query({ name: "geolocation" }).then((result) => {
  //     console.log("Permission:", result.state);
  //   });
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      setPosts(data);
    };

    fetchData();
  }, []);

  return (
    <>
      {/* API Fetch */}
      <h2 style={{ color: "red" }}>Post API Fetch (online/offline)</h2>
      <button onClick={() => setShowPosts(!showPosts)}>
        {showPosts ? "Hide Posts" : "Show Posts"}
      </button>
      {showPosts && (
        <ul>
          {posts.map((post: { id: number; title: string }) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}

      {/* Location */}
      <h2 style={{ color: "red" }}>Location API (online/offline)</h2>
      <button onClick={getLocation}>Get Location</button>
      <p>{status}</p>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          marginBottom: "20px",
          fontFamily: "Arial, sans-serif",
          fontSize: "14px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#000000" }}>
            <th style={cellStyle}>Latitude</th>
            <th style={cellStyle}>Longitude</th>
            <th style={cellStyle}>Accuracy</th>
            <th style={cellStyle}>Altitude</th>
            <th style={cellStyle}>Altitude Accuracy</th>
            <th style={cellStyle}>Heading</th>
            <th style={cellStyle}>Speed</th>
            <th style={cellStyle}>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={cellStyle}>{location?.coords?.latitude || "-"}</td>
            <td style={cellStyle}>{location?.coords?.longitude || "-"}</td>
            <td style={cellStyle}>{location?.coords?.accuracy || "-"}</td>
            <td style={cellStyle}>{location?.coords?.altitude || "-"}</td>
            <td style={cellStyle}>
              {location?.coords?.altitudeAccuracy || "-"}
            </td>
            <td style={cellStyle}>{location?.coords?.heading || "-"}</td>
            <td style={cellStyle}>{location?.coords?.speed || "-"}</td>
            <td style={cellStyle}>{location?.timestamp || "-"}</td>
          </tr>
        </tbody>
      </table>

      {/* Timezone */}
      <h2 style={{ color: "red" }}>Timezone (online/offline)</h2>
      <button onClick={getTimezone}>Get Timezone</button>
      <p>{status}</p>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          marginBottom: "20px",
          fontFamily: "Arial, sans-serif",
          fontSize: "14px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#000000" }}>
            <th style={cellStyle}>Locale</th>
            <th style={cellStyle}>Calendar</th>
            <th style={cellStyle}>Numbering System</th>
            <th style={cellStyle}>Time Zone</th>
            <th style={cellStyle}>Year</th>
            <th style={cellStyle}>Month</th>
            <th style={cellStyle}>Day</th>
            <th style={cellStyle}>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={cellStyle}>{timezone?.locale || "-"}</td>
            <td style={cellStyle}>{timezone?.calendar || "-"}</td>
            <td style={cellStyle}>{timezone?.numberingSystem || "-"}</td>
            <td style={cellStyle}>{timezone?.timeZone || "-"}</td>
            <td style={cellStyle}>{timezone?.year || "-"}</td>
            <td style={cellStyle}>{timezone?.month || "-"}</td>
            <td style={cellStyle}>{timezone?.day || "-"}</td>
            <td style={cellStyle}>{date?.toLocaleString() || "-"}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default App;
