import React, { Component } from "react";
// import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookList from "./BookList";
import BookEdit from "./BookEdit";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          {/* <Route path="/" exact element={<Home />} /> */}
          <Route path="/" exact element={<BookList />} />
          <Route path="/booklists/:id" element={<BookEdit />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
