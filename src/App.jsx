import React, { useEffect, useState } from "react";
import First from "./pages/First";
import Second from "./pages/Second";

function App() {
  const [route, setRoute] = useState("first");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.electron.on("initial-data", (event, data) => {
      setLoading(true);
      console.log("Received data from main process:", data);
      if (data.route === "second") {
        setRoute("second");
      }
      setLoading(false);
    });

    return () => {
      window.electron.on("initial-data", () => {}); // Отписываемся от события
    };
  }, []);

  if (loading) {
    return <div>...loading</div>;
  }

  return <>{route === "first" ? <First /> : <Second />}</>;
}

export default App;
