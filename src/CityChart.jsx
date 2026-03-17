import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const e = payload[0].payload
    return (
      <div style={{ backgroundColor: 'rgba(15,32,39,0.95)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '8px 12px', color: 'white', fontSize: '12px', pointerEvents: 'none' }}>
        <p style={{ fontWeight: 'bold', marginBottom: 3 }}>{e.city}</p>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 3 }}>{e.callerName}</p>
        <p>Calls: <span style={{ color: '#fca5a5' }}>1</span></p>
        <p>Cost: <span style={{ color: '#fca5a5' }}>£{e.cost.toFixed(2)}</span></p>
      </div>
    )
  }
  return null
}

const RedCursor = ({ x, y, width, height }) => (
  <rect x={x} y={y} width={width} height={height} rx={4} ry={4} fill="rgba(239,68,68,0.15)" stroke="rgba(239,68,68,0.35)" strokeWidth={1} />
)

function CityChart({ data }) {
  const chartData = data
    .map(call => ({ city: call.city, callerName: call.callerName, calls: 1, cost: parseFloat(call.callCost) }))
    .sort((a, b) => a.city.localeCompare(b.city))

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '6px 8px' }}>
      <h2 style={{ color: 'white', fontSize: 'clamp(10px, 1.1vw, 14px)', fontWeight: '600', textAlign: 'center', margin: '0 0 2px 0', flexShrink: 0 }}>Calls by City</h2>
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 4, right: 10, left: 4, bottom: 48 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="city"
              stroke="rgba(255,255,255,0.7)"
              tick={{ fill: 'rgba(255,255,255,0.75)', fontSize: 7 }}
              angle={-45}
              textAnchor="end"
              interval={0}
            />
            <YAxis
              stroke="rgba(255,255,255,0.7)"
              tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 9 }}
              allowDecimals={false}
              domain={[0, 2]}
              ticks={[0, 1, 2]}
              width={24}
            />
            <Tooltip content={<CustomTooltip />} cursor={<RedCursor />} />
            <Bar dataKey="calls" radius={[2,2,0,0]}>
              {chartData.map((_, i) => <Cell key={i} fill="#ef4444" />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default CityChart