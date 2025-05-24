import './App.css'
import Card from './components/Card'
import CardTapScreen from './components/CardTapScreen'
import NewCard from './pages/NewCard'
function App() {
  return (
    <>
      {/* <CardTapScreen /> */}
      {/* <NewCard /> */}
      <Card
        name="John Doe"
        alignment="slanting"
        number='1234 5678 9012 3456'
      />
    </>
  )
}

export default App
