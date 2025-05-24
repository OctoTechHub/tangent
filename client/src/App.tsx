import './App.css'
import Card from './components/Card'
import CardBack from './components/CardBack'
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
      <CardBack
        name="John Doe"
        number='1234 5678 9012 3456'
        issued='01/2023'
        valid='12/2025'
        alignment='slanting2'
        type='credit'
      />
    </>
  )
}

export default App
