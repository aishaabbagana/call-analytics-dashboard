import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const e = payload[0].payload
    return (
      <div style={{ backgroundColor: 'rgba(15,32,39,0.95)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '8px 12px', color: 'white', fontSize: '12px', pointerEvents: 'none' }}>
        <p style={{ fontWeight: 'bold', marginBottom: 3 }}>{e.label}</p>
        <p>Calls: <span style={{ color: '#86efac' }}>{e.calls}</span></p>
      </div>
    )
  }
  return null
}

function ActivityChart({ data }) {
  const hourlyCounts = Array.from({ length: 24 }, (_, hour) => ({
    hour,
    label: `${hour.toString().padStart(2, '0')}:00`,
    calls: 0,
  }))
  data.forEach(call => {
    const hour = new Date(call.callStartTime).getHours()
    hourlyCounts[hour].calls += 1
  })

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '6px 8px' }}>
      <h2 style={{ color: 'white', fontSize: 'clamp(10px, 1.1vw, 14px)', fontWeight: '600', textAlign: 'center', margin: '0 0 2px 0', flexShrink: 0 }}>Call Activity</h2>
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={hourlyCounts} margin={{ top: 4, right: 10, left: 4, bottom: 28 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="label"
              stroke="rgba(255,255,255,0.7)"
              tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 7 }}
              angle={-45}
              textAnchor="end"
              interval={0}
              label={{ value: 'Hour of Day', position: 'insideBottom', offset: -16, fill: 'rgba(255,255,255,0.5)', fontSize: 9, textAnchor: 'middle' }}
            />
            <YAxis
              stroke="rgba(255,255,255,0.7)"
              tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 9 }}
              allowDecimals={false}
              width={24}
              label={{ value: 'Calls', angle: -90, position: 'insideLeft', offset: 8, fill: 'rgba(255,255,255,0.5)', fontSize: 9, textAnchor: 'middle' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(134,239,172,0.3)', strokeWidth: 1 }} />
            <Line type="monotone" dataKey="calls" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e', r: 2, strokeWidth: 0 }} activeDot={{ fill: '#86efac', r: 4, strokeWidth: 0 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ActivityChart