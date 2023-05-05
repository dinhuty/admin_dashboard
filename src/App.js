import './App.css';
import { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { publicRouter } from './routers';
import DefaultLayout from './Layout/DefaultLayout';

function App() {
  const isLogin = localStorage.getItem('token')
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          {
              publicRouter.map((route, index) => {
                let Layout = DefaultLayout
                if (route.layout === null) Layout = Fragment
                else if (route.layout) {
                  Layout = route.layout
                }
                const Page = route.component
                return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />
              }) 
          }
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

