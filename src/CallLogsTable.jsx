import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const formatTime = (iso) =>
  new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

const stripExtension = (num) => num.replace(/\s*x\d+/gi, '').trim()

const colDivider = '1px solid rgba(255,255,255,0.12)'
const fs = 'clamp(8px, 0.8vw, 10.5px)'

const COLS = [
  { label: 'Caller Name',     align: 'left'   },
  { label: 'Caller Number',   align: 'left'   },
  { label: 'Receiver Number', align: 'left'   },
  { label: 'City',            align: 'left'   },
  { label: 'Duration',        align: 'center' },
  { label: 'Cost',            align: 'right'  },
  { label: 'Start Time',      align: 'center' },
]

function CallLogsTable({ data }) {
  const recent = [...data]
    .sort((a, b) => new Date(b.callStartTime) - new Date(a.callStartTime))
    .slice(0, 6)

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '4px 6px' }}>

      <h2 style={{ color: 'white', fontSize: 'clamp(9px, 1vw, 13px)', fontWeight: '600', textAlign: 'center', margin: '0 0 3px 0', flexShrink: 0 }}>
        Recent Call Logs
      </h2>

      <div style={{ flex: 1, minHeight: 0, borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)', overflow: 'hidden', cursor: 'default', display: 'flex', flexDirection: 'column' }}>
        <Table style={{ width: '100%', tableLayout: 'auto', borderCollapse: 'collapse', cursor: 'default', userSelect: 'none', flex: 1 }}>

          <TableHeader>
            <TableRow
              style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.2)' }}
              className="hover:bg-transparent"
            >
              {COLS.map((c, i) => (
                <TableHead
                  key={c.label}
                  style={{
                    fontSize: fs,
                    padding: '3px 8px',
                    color: 'rgba(255,255,255,0.75)',
                    fontWeight: '700',
                    textAlign: c.align,
                    borderRight: i < COLS.length - 1 ? colDivider : 'none',
                    borderBottom: 'none',
                    whiteSpace: 'nowrap',
                    cursor: 'default',
                  }}
                >
                  {c.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {recent.map((call) => {
              const cells = [
                call.callerName,
                stripExtension(call.callerNumber),
                stripExtension(call.receiverNumber),
                call.city,
                `${call.callDuration}s`,
                `£${parseFloat(call.callCost).toFixed(2)}`,
                formatTime(call.callStartTime),
              ]

              return (
                <TableRow
                  key={call.id}
                  style={{ border: 'none', cursor: 'default' }}
                  className="hover:bg-white/10 transition-colors"
                >
                  {cells.map((val, i) => (
                    <TableCell
                      key={i}
                      style={{
                        fontSize: fs,
                        padding: '0px 8px',
                        height: 'calc((100% - 28px) / 5)',
                        textAlign: COLS[i].align,
                        borderRight: i < COLS.length - 1 ? colDivider : 'none',
                        borderBottom: 'none',
                        whiteSpace: 'nowrap',
                        cursor: 'default',
                        color: i === 5 ? 'white'
                             : i === 0 ? 'rgba(255,255,255,0.95)'
                             :           'rgba(255,255,255,0.65)',
                        fontWeight: i === 5 ? '600' : i === 0 ? '500' : '400',
                      }}
                    >
                      {val}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default CallLogsTable