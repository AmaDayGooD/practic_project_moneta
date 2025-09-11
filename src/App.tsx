import "./App.css";
import Footer from "./components/footer/Footer.tsx";
import Header from "./components/header/Header.tsx";
import Main from "./components/main/Main.tsx";
import SentCvDialog from "@general_components/dialogs/sent-cv-dialog/SentCvDialog.tsx";
import SendCvDialog from "@general_components/dialogs/send-cv-dialog/SendCvDialog.tsx";

function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
      <SendCvDialog />
      <SentCvDialog />
    </>
  );
}

export default App;
