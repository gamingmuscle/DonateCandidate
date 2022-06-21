//import logo from './logo.svg';
import './App.css';
import {store} from "./actions/store";
import {Provider} from "react-redux";
import {DCandidates, DCAndidateForm, Home, Navigation, Footer} from './components/';
import {Container} from "@material-ui/core";
import {ToastProvider} from "react-toast-notifications";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navigation />
        <ToastProvider autoDismiss={true}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Submit" element={<DCAndidateForm />} />
          <Route path="/Submit/:id" element={<DCAndidateForm />} />
          <Route path="/View" element={<DCandidates />} />
        </Routes>
        </ToastProvider>
        <Footer />
      </Router>
    </Provider>
  );
}
//<Container maxWidth="lg">

export default App;
