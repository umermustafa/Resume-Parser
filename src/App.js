import React from "react";
import FileUpload from "./components/FileUpload";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Search from "./components/Search";
const App = () => {
  return (
    <BrowserRouter>     {/*To include routes in our app */}
      <div>
        <h4 className="display-4 text-center mb-4">
          <i className="fab fa-react" /> Resume Parser
        </h4>
        <Routes>
          <Route path="/" element={<FileUpload />}></Route>
          <Route path="/searchResume" element={<Search />}></Route>
        </Routes>
      </div>
      <div className="container mt-4 App">
        <ul>
          <li>
            <Link to='/'>Upload Resume</Link>   {/* Link to go to uoload page */}
          </li>
          <li>
            <Link to='/searchResume'>Search Resume</Link> {/*Link to go to search page */}
          </li>
        </ul>
      </div>
    </BrowserRouter >
  )
};

export default App;