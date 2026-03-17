import {useState, useEffect} from 'react'
import Dashboard from './Dashboard'

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://69b30b45e224ec066bdb55a0.mockapi.io/api/v1/cdr')
        const json = await response.json()
        setData(json)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data.length > 0 && <Dashboard data={data} />}
    </div>
  )
}
export default App