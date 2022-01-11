import { useContext} from "react";
import { BandAdd } from "./components/BandAdd";
import { BandChart } from "./components/BandChart";
import { BandList } from "./components/BandList";
import { SocketContext } from "./context/SocketContext";

function HomePage() {
  const {online} = useContext(SocketContext)

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:
          {
            online 
            ? <span className="text-success"> Online</span>
            : <span className="text-danger"> Offline</span>
          }
        </p>
      </div>

      <div>
        <BandChart/>
      </div>

      <h1>BandApp</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <BandList />
        </div>
        <div className="col-4">
          <BandAdd />
        </div>
      </div>
    </div>
  );
}

export default HomePage;