import { About } from "./pages/About";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { Store } from "./pages/Store";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
