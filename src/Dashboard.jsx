import KPICards from './KPICards'
import DurationChart from './DurationChart'
import CostChart from './CostChart'
import ActivityChart from './ActivityChart'
import CityChart from './CityChart'
import CallLogsTable from './CallLogsTable'

function Dashboard({ data }) {
  return (
    <div style={{
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      padding: '8px',
      gap: '6px',
      boxSizing: 'border-box',
    }}>

      {/* Header */}
      <h1 style={{ color: 'white', textAlign: 'center', fontSize: 'clamp(0.9rem, 1.5vw, 1.4rem)', fontWeight: 'bold', flexShrink: 0, margin: 0 }}>
        Call Analytics Dashboard
      </h1>

      {/* KPI Cards */}
      <div style={{ flexShrink: 0 }}>
        <KPICards data={data} />
      </div>

      {/* Row 1 — Duration (left) + Cost (right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', flex: '1.8', minHeight: 0 }}>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl" style={{ minHeight: 0 }}>
          <DurationChart data={data} />
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl" style={{ minHeight: 0 }}>
          <CostChart data={data} />
        </div>
      </div>

      {/* Row 2 — Activity (left) + Table (right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', flex: '1.8', minHeight: 0 }}>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl" style={{ minHeight: 0 }}>
          <ActivityChart data={data} />
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl" style={{ minHeight: 0, overflow: 'hidden' }}>
          <CallLogsTable data={data} />
        </div>
      </div>

      {/* City chart — full width at bottom */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl" style={{ flex: '1.2', minHeight: 0 }}>
        <CityChart data={data} />
      </div>

    </div>
  )
}

export default Dashboard