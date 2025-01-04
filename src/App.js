// import './App.css';
// import Home from "./Home/Home";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import axios from "./lib/axios";
// import { useEffect, useState } from "react";
// import { useMediaQuery } from "react-responsive";


// // mobile pc
// export const Mobile = ({ children }) => {
//   const isMobile = useMediaQuery({
//     query: "(max-width:768px)",
//   });

//   return <>{isMobile && children}</>;
// };

// export const PC = ({ children }) => {
//   const isPc = useMediaQuery({
//     query: "(min-width:769px)",
//   });

//   return <>{isPc && children}</>;
// };

// function App() {
//   const [hello, setHello] = useState("");
//   useEffect(() => {
//     axios
//       .get("http://34.64.202.47/api/test")
//       .then((res) => {
//         console.log(res);
//         setHello(res.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   return (
//     <>
//       <Mobile>
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/Gaon" element={<Gaon />} />
//             <Route path="/EUM" element={<EUM />} />
//             <Route path="/ON" element={<ON />} />
//           </Routes>
//         </BrowserRouter>
//       </Mobile>

//       <PC>
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/Gaon" element={<Gaon />} />
//             <Route path="/EUM" element={<EUM />} />
//             <Route path="/ON" element={<ON />} />
//           </Routes>
//         </BrowserRouter>
//       </PC>
//     </>



//   );
// }


import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header.js';
import MainSection from './Components/MainSection/MainSection.js';
import Footer from './Components/Footer/Footer.js';
import ImageUploader from './Components/Services/ImageUploader.js';




function App() {
  return (
    <Router>
      <div className="root">
        <Header />
        <Routes>
          {/* Main page */}
          <Route path="/" element={<MainSection />} />
          {/* Image Uploader page */}
          <Route path="/upload" element={<ImageUploader />} />
        </Routes>
        <Footer />
      </div>
    </Router>

  );
}

export default App;
