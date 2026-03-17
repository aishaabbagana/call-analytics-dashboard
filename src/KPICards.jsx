import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function KPICards({ data }) {
  const totalCalls   = data.length
  const totalCost    = data.reduce((sum, c) => sum + parseFloat(c.callCost), 0)
  const avgDuration  = data.length > 0 ? Math.round(data.reduce((sum, c) => sum + c.callDuration, 0) / data.length) : 0
  const successCalls = data.filter(c => c.callStatus === true).length
  const failedCalls  = data.filter(c => c.callStatus === false).length

  const cards = [
    { title: 'Total Calls',      value: totalCalls },
    { title: 'Total Cost',       value: `£${totalCost.toFixed(2)}` },
    { title: 'Avg Duration',     value: `${avgDuration}s` },
    { title: 'Successful Calls', value: successCalls },
    { title: 'Failed Calls',     value: failedCalls },
  ]

  return (
    <div className="grid grid-cols-5 gap-2">
      {cards.map(({ title, value }) => (
        <Card
          key={title}
          tabIndex={-1}
          className="bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 select-none"
          style={{ outline: 'none', boxShadow: 'none' }}
        >
          <CardHeader className="p-2 pb-0 text-center">
            <CardTitle style={{ fontSize: 'clamp(9px, 1vw, 12px)' }} className="font-semibold text-white/70 leading-tight">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 pt-1 text-center">
            <p style={{ fontSize: 'clamp(14px, 1.5vw, 20px)' }} className="font-bold leading-tight">
              {value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default KPICards