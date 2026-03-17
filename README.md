# Call Analytics Dashboard

A professional, real-time Call Data Record (CDR) analytics dashboard built with React, TailwindCSS, shadcn/ui, and Recharts. Visualises telecom call data across multiple interactive charts and a call logs table within a single, scroll-free screen. Built as part of the **London Success Academy** Software Development Internship Assignment.

---

## Live Demo

[View Deployed Dashboard](#)

---

## Screenshots

Screenshots here

---

## Technology Stack

- React + Vite
- TailwindCSS
- shadcn/ui
- Recharts
- MockAPI

---

## Dashboard Features

### KPI Summary Cards
Five measures displayed using shadcn `Card` components:
- **Total Calls** — total number of call records
- **Total Cost** — sum of all call costs in £
- **Average Duration** — mean call duration in seconds
- **Successful Calls** — count of calls with `callStatus: true`
- **Failed Calls** — count of calls with `callStatus: false`

### Call Duration Chart
Bar chart of all 100 calls sorted shortest to longest. Special bars highlight the shortest, average, and longest calls in a purple colour scale. Hover reveals caller name and duration.

### Call Cost Chart
Bar chart of all 100 calls sorted highest to lowest cost. Special bars highlight highest, average, and lowest cost calls in a navy blue colour scale. Hover reveals caller name, city, and cost.

### Call Activity Timeline
Line chart showing number of calls per hour across all 24 hours of the day. Built by parsing `callStartTime` timestamps and grouping by hour.

### Calls by City
Bar chart showing one bar per city, sorted alphabetically. All 100 unique cities displayed on the X axis. Hover reveals city, caller name, and cost.

### Recent Call Logs Table
A live table built with shadcn `Table` components showing the 6 most recent calls, sorted by `callStartTime`. Columns: Caller Name, Caller Number, Receiver Number, City, Duration, Cost, Start Time.

---

## API

Data is fetched from a mock API endpoint:

[https://69b30b45e224ec066bdb55a0.mockapi.io/api/v1/cdr](https://69b30b45e224ec066bdb55a0.mockapi.io/api/v1/cdr)

### Example Record
```json
{
  "callerName": "Felipe Conroy",
  "callerNumber": "999.986.4609",
  "receiverNumber": "1-796-718-3810 x621",
  "city": "Kayleyboro",
  "callDirection": false,
  "callStatus": false,
  "callDuration": 18,
  "callCost": "140.38",
  "callStartTime": "2026-03-12T00:43:40.022Z",
  "callEndTime": "2026-03-12T18:30:18.577Z",
  "id": "1"
}
```

---

## Project Structure

```
src/
├── App.jsx              # Root component, fetches API data
├── Dashboard.jsx        # Layout — arranges all components
├── KPICards.jsx         # 5 summary metric cards
├── DurationChart.jsx    # Call duration bar chart
├── CostChart.jsx        # Call cost bar chart
├── ActivityChart.jsx    # Calls per hour line chart
├── CityChart.jsx        # Calls by city bar chart
└── CallLogsTable.jsx    # Recent call logs table
```