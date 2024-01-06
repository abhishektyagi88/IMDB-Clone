// import logo from './logo.svg';

import Header from "./Projects/IMDB/Header";
import Banner from "./Projects/IMDB/Banner";
import Movies from "./Projects/IMDB/Movies";
import WatchList from "./Projects/IMDB/WatchList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
 
import './App.css';

function App(){
    return (
        
     <div>
   <BrowserRouter>
     <Header />
  <Routes>
    <Route path="/" element={
    <>
      <Banner />
      <Movies />
    </>
  }/>
    <Route path="/List" element={<WatchList />} />
  </Routes>
   </BrowserRouter>
</div> 
    )}

export default App;


//-LAZY--------
//dynamic lazy loading------
// import { About } from './Components/Lazy-Loading/LAZY/About';
// import { Products } from './Components/Lazy-Loading/LAZY/Products';
// import { Home } from './Components/Lazy-Loading/LAZY/Home';
// import { Testimonial } from './Components/Lazy-Loading/LAZY/Testimonial';

// USING LAZY LOADING
// import React ,{ lazy,Suspense } from 'react';
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Navbar } from './Components/Lazy-Loading/LAZY/Navbar';
// const Home = lazy(() => import("./Components/Lazy-Loading/LAZY/Home"));
// const About = lazy(() => import("./Components/Lazy-Loading/LAZY/About"));
// const Products = lazy(() => import("./Components/Lazy-Loading/LAZY/Products"));
// const Testimonial = lazy(() => import("./Components/Lazy-Loading/LAZY/Testimonial"));
// <Suspense fallback = {<h2>Loading...</h2>}>
//         <BrowserRouter>
//         <Navbar/>
//         <Routes>
//             <Route path = "/" element = {<Home/>}/>
//             <Route path = "/about" element = {<About/>}/>
//             <Route path = "/products" element = {<Products/>}/>
//             <Route path = "/testimonial" element = {<Testimonial/>}/>
//             <Route path = "*" element = {<Home/>}/>
        
//         </Routes>
//         </BrowserRouter>
//         </Suspense>/


// --LAZY ENDS-------------

// ---Context API-------


// import Family from './Components/Context API/family';
// import { FamilyContext } from './Components/Context API/familycontext';
// const state = {
// name : "Scaler",
// onlyForParent : () => {
//   return(
//   "Info for Parent"
//   )
// },
// onlyForChildren : () => {
//   console.log("Info for Children")
// }
// };
// return(
// <div>  
// <FamilyContext.Provider value = {state}>
//   <Family />
// </FamilyContext.Provider>
// </div>

// ------END CONTEXT API ----------

//------prop-drilling-------

// import Family from './Components/Prop-Drilling/family';
// const state = {
//   name : "Scaler",
//   onlyForParent : () => {
//     console.log("Info for Parent");
//   },
//   onlyForChildren : () => {
//     console.log("Info for Children")
//   }
// };
// return (
//  <div>
//   <Family familyInfo = {state} />
//  </div>

//------END prop-drilling-------

//---------E-COMMERCE--------

// import Home from './Projects/E-Commerce/Home';
// import Cart from './Projects/E-Commerce/Cart';
// import Navbar from './Projects/E-Commerce/Navbar';
// import { BrowserRouter, Route, Routes } from "react-router-dom";
 // <div>
    //   <BrowserRouter>
    //     <Navbar />
    //     <Routes>
    //       <Route path='/' element={<Home />} />
    //       <Route path='/Cart' element={<Cart />} />
    //     </Routes>
    //   </BrowserRouter>
    // </div>
    
//---------END E-COMMERCE--------


//IMDB CLONE

// import Header from "./Projects/IMDB/Header";
// import Banner from "./Projects/IMDB/Banner";
// import Movies from "./Projects/IMDB/Movies";
// import WatchList from "./Projects/IMDB/WatchList";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// {/* <div>
// <BrowserRouter>
//   <Header />
//   <Routes>
//     <Route path="/" element={
//     <>
//       <Banner />
//       <Movies />
//     </>
//   }/>
//     <Route path="/List" element={<WatchList />} />
//   </Routes>
// </BrowserRouter>
// </div> */}

//----END IMDB --------

//--REACT ORIGINAL----------

// return (
// {/* <div className="App">
// <header className="App-header">
//   <img src={logo} className="App-logo" alt="logo" />
//   <p>
//     Edit <code>src/App.js</code> and save to reload.
//   </p>
//   <a
//     className="App-link"
//     href="https://reactjs.org"
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     Learn React
//   </a>
// </header>
// </div> */}

//--END REACT ORIGINAL----------