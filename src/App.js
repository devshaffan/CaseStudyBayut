
import styled from 'styled-components'
import ErrorPage from './components/ErrorPage';
import GistList from './components/GistList';
import Header from "./components/Header";
import ErrorProvider from './contexts/Error/Provider';
import GlobalStyles from "./GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {

  return (
    <Wrapper className="App" data-testid="app">
      <ErrorProvider >
        <BrowserRouter>
          <Header />
          <ErrorPage>
            <Routes>
              <Route path="/" element={<GistList />} />
            </Routes>
          </ErrorPage>
        </BrowserRouter>
        <GlobalStyles />
      </ErrorProvider>
    </Wrapper >
  );
}

const Wrapper = styled.div`
  font-size: 14px;
  line-height: 1.5;
`;

export default App;
