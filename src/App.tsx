import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { routes } from './helpers/routes'
import { UserProvider } from './contexts/UserContext'
import { CurrencyProvider } from './contexts/CurrencyContext'
function App() {

  return (
    
    <UserProvider>
      <CurrencyProvider>
    <Router>
      <Routes>
        {routes.map((route) => (
            <Route
            key={route.path}
            path={route.path}
            element={route.element}
            />
          ))}
      </Routes>
    </Router>
    </CurrencyProvider>
    </UserProvider>
    
  )
}

export default App
