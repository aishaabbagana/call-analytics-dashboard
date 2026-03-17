import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useCallback } from 'react'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const e = payload[0].payload
    return (
      <div style={{ backgroundColor: 'rgba(15,32,39,0.95)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '8px 12px', color: 'white', fontSize: '12px', pointerEvents: 'none' }}>
        <p style={{ fontWeight: 'bold', marginBottom: 3 }}>{e.callerName}</p>
        <p>Duration: <span style={{ color: '#c4b5fd' }}>{e.duration}s</span></p>
        {e.label && <p style={{ marginTop: 3, color: '#c4b5fd', fontWeight: 'bold', fontSize: 10 }}>{e.label}</p>}
      </div>
    )
  }
  return null
}

const PurpleCursor = ({ x, y, width, height }) => (
  <rect x={x} y={y} width={width} height={height} rx={6} ry={6} fill="rgba(168,85,247,0.15)" stroke="rgba(168,85,247,0.3)" strokeWidth={1} />
)

const COLORS = {
  shortest: { base: '#7c3aed', hover: '#5b21b6' },
  average:  { base: '#8b5cf6', hover: '#6d28d9' },
  longest:  { base: '#6d28d9', hover: '#4c1d95' },
  default:  { base: '#a855f7', hover: '#6d28d9' },
}

function DurationChart({ data }) {
  const durations = data.map(c => c.callDuration)
  const longest   = Math.max(...durations)
  const shortest  = Math.min(...durations)
  const average   = Math.round(durations.reduce((s, d) => s + d, 0) / durations.length)

  const sortedRaw = [...data].sort((a, b) => a.callDuration - b.callDuration)
  const avgIndex  = sortedRaw.reduce((cl, c, i) => Math.abs(c.callDuration - average) < Math.abs(sortedRaw[cl].callDuration - average) ? i : cl, 0)

  const chartData = sortedRaw.map((call, i) => {
    let label = null, specialType = null
    if (call.callDuration === shortest)     { label = '▼ Shortest'; specialType = 'shortest' }
    else if (call.callDuration === longest) { label = '▲ Longest';  specialType = 'longest'  }
    else if (i === avgIndex)               { label = '◆ Average';  specialType = 'average'  }
    return { name: i + 1, duration: call.callDuration, callerName: call.callerName, label, specialType }
  })

  const handleMouseEnter = useCallback((_, index) => {
    const bars = document.querySelectorAll('.duration-bar rect')
    if (bars[index]) { const t = chartData[index]?.specialType || 'default'; bars[index].style.fill = COLORS[t].hover }
  }, [chartData])

  const handleMouseLeave = useCallback((_, index) => {
    const bars = document.querySelectorAll('.duration-bar rect')
    if (bars[index]) { const t = chartData[index]?.specialType || 'default'; bars[index].style.fill = COLORS[t].base }
  }, [chartData])

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '6px 8px' }}>
      <h2 style={{ color: 'white', fontSize: 'clamp(10px, 1.1vw, 14px)', fontWeight: '600', textAlign: 'center', margin: '0 0 2px 0', flexShrink: 0 }}>Call Duration</h2>
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" hide />
            <YAxis stroke="rgba(255,255,255,0.7)" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 9 }} unit="s" width={32} />
            <Tooltip content={<CustomTooltip />} cursor={<PurpleCursor />} />
            <Bar dataKey="duration" radius={[2,2,0,0]} className="duration-bar" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              {chartData.map((e, i) => <Cell key={i} fill={COLORS[e.specialType || 'default'].base} style={{ transition: 'fill 0.15s ease' }} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexShrink: 0, marginTop: '2px' }}>
        <span style={{ color: '#7c3aed', fontSize: '9px' }}>● Shortest ({shortest}s)</span>
        <span style={{ color: '#8b5cf6', fontSize: '9px' }}>── Average ({average}s)</span>
        <span style={{ color: '#6d28d9', fontSize: '9px' }}>● Longest ({longest}s)</span>
      </div>
    </div>
  )
}

export default DurationChart