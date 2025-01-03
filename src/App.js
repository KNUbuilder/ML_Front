import './App.css';
import Home from "./Home/Home";
import { useMediaQuery } from "react-responsive";


// mobile pc
export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({
    query: "(max-width:768px)",
  });

  return <>{isMobile && children}</>;
};

export const PC = ({ children }) => {
  const isPc = useMediaQuery({
    query: "(min-width:769px)",
  });

  return <>{isPc && children}</>;
};

function App() {
  return (
    <>
      <Mobile>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Gaon" element={<Gaon />} />
            <Route path="/EUM" element={<EUM />} />
            <Route path="/ON" element={<ON />} />
          </Routes>
        </BrowserRouter>
      </Mobile>

      <PC>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Gaon" element={<Gaon />} />
            <Route path="/EUM" element={<EUM />} />
            <Route path="/ON" element={<ON />} />
          </Routes>
        </BrowserRouter>
      </PC>
    </>

    

  );
}

export default App;
