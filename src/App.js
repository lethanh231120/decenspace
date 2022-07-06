import './App.css'
import HomePage from './layouts'
import Footer from './layouts/footer'
// import { Routes, Route } from 'react-router-dom'
// import { PublicRouter } from './routers'

function App() {
  return (
    <div className='App'>
      {/* <Routes>
        <Route path='*' element={<PublicRouter component={HomePage} />} />
        <Route path='login' element={<PublicRouter component={LoginPage} />} />
      </Routes> */}
      <HomePage/>
      <Footer />
    </div>
  )
}

export default App
