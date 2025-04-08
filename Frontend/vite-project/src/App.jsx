import "./App.css";
import { Container} from '@mui/material';
import { Header } from "./components/Header";
import { Downloader } from "./components/Downloader";

function App() {
  return (
    <>
    {/* Header */}
    <Header />
    {/* Main Container */}
    <Container maxWidth="md" className="py-10 flex flex-col items-center space-y-10">
      {/* Downloader Box */}
      <Downloader/>
      {/* Description Section */}
      {/* <Description/> */}
      </Container>
  </>
  );
}

export default App;
