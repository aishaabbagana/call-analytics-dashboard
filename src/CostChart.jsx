import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useCallback } from 'react'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const e = payload[0].payload
    return (
      <div style={{ backgroundColor: 'rgba(15,32,39,0.95)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '8px 12px', color: 'white', fontSize: '12px', pointerEvents: 'none' }}>
        <p style={{ fontWeight: 'bold', marginBottom: 3 }}>{e.callerName}</p>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 3, fontSize: 10 }}>{e.city}</p>
        <p>Cost: <span style={{ color: '#93c5fd' }}>£{e.cost.toFixed(2)}</span></p>
        {e.label && <p style={{ marginTop: 3, color: '#93c5fd', fontWeight: 'bold', fontSize: 10 }}>{e.label}</p>}
      </div>
    )
  }
  return null
}

const NavyCursor = ({ x, y, width, height }) => (
  <rect x={x} y={y} width={width} height={height} rx={6} ry={6} fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.35)" strokeWidth={1} />
)

const COLORS = {
  highest: { base: '#1e3a8a', hover: '#172554' },
  average: { base: '#2563eb', hover: '#1d4ed8' },
  lowest:  { base: '#93c5fd', hover: '#60a5fa' },
  default: { base: '#3b82f6', hover: '#2563eb' },
}

function CostChart({ data }) {
  const costs   = data.map(c => parseFloat(c.callCost))
  const highest = Math.max(...costs)
  const lowest  = Math.min(...costs)
  const avgCost = costs.reduce((s, c) => s + c, 0) / costs.length

  const sorted   = [...data].sort((a, b) => parseFloat(b.callCost) - parseFloat(a.callCost))
  const avgIndex = sorted.reduce((cl, c, i) => Math.abs(parseFloat(c.callCost) - avgCost) < Math.abs(parseFloat(sorted[cl].callCost) - avgCost) ? i : cl, 0)

  const chartData = sorted.map((call, i) => {
    const cost = parseFloat(call.callCost)
    let label = null, specialType = null
    if (cost === highest)     { label = '▲ Highest'; specialType = 'highest' }
    else if (cost === lowest) { label = '▼ Lowest';  specialType = 'lowest'  }
    else if (i === avgIndex)  { label = '◆ Average'; specialType = 'average' }
    return { name: i + 1, cost, callerName: call.callerName, city: call.city, label, specialType }
  })

  const handleMouseEnter = useCallback((_, index) => {
    const bars = document.querySelectorAll('.cost-bar rect')
    if (bars[index]) { const t = chartData[index]?.specialType || 'default'; bars[index].style.fill = COLORS[t].hover }
  }, [chartData])

  const handleMouseLeave = useCallback((_, index) => {
    const bars = document.querySelectorAll('.cost-bar rect')
    if (bars[index]) { const t = chartData[index]?.specialType || 'default'; bars[index].style.fill = COLORS[t].base }
  }, [chartData])

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '6px 8px' }}>
      <h2 style={{ color: 'white', fontSize: 'clamp(10px, 1.1vw, 14px)', fontWeight: '600', textAlign: 'center', margin: '0 0 2px 0', flexShrink: 0 }}>Call Cost</h2>
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 4, right: 8, left: 4, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" hide />
            <YAxis stroke="rgba(255,255,255,0.7)" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 9 }} tickFormatter={v => `£${v}`} width={40} />
            <Tooltip content={<CustomTooltip />} cursor={<NavyCursor />} />
            <Bar dataKey="cost" radius={[2,2,0,0]} className="cost-bar" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              {chartData.map((e, i) => <Cell key={i} fill={COLORS[e.specialType || 'default'].base} style={{ transition: 'fill 0.15s ease' }} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexShrink: 0, marginTop: '2px' }}>
        <span style={{ color: '#1e3a8a', fontSize: '9px' }}>● Highest (£{highest.toFixed(2)})</span>
        <span style={{ color: '#2563eb', fontSize: '9px' }}>── Average (£{avgCost.toFixed(2)})</span>
        <span style={{ color: '#93c5fd', fontSize: '9px' }}>● Lowest (£{lowest.toFixed(2)})</span>
      </div>
    </div>
  )
}

export default CostChart