import { useState } from “react”;
import {
BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
PieChart, Pie, Cell, CartesianGrid, AreaChart, Area, Legend
} from “recharts”;

const BRANDS = [“All”, “Beauty”, “Drybar”, “Hydroflask”, “KAZ”, “OXO”];
const YEARS = [“2023”, “2024”, “2025”, “2026”];

const monthlyData = [
{ month: “Jan”, valid: 45000, invalid: 28000, reversed: 12000 },
{ month: “Feb”, valid: 52000, invalid: 35000, reversed: 18000 },
{ month: “Mar”, valid: 68000, invalid: 42000, reversed: 22000 },
{ month: “Apr”, valid: 95000, invalid: 55000, reversed: 30000 },
{ month: “May”, valid: 120000, invalid: 78000, reversed: 45000 },
{ month: “Jun”, valid: 85000, invalid: 48000, reversed: 28000 },
{ month: “Jul”, valid: 72000, invalid: 38000, reversed: 20000 },
{ month: “Aug”, valid: 110000, invalid: 65000, reversed: 35000 },
{ month: “Sep”, valid: 145000, invalid: 95000, reversed: 55000 },
{ month: “Oct”, valid: 200000, invalid: 120000, reversed: 68000 },
{ month: “Nov”, valid: 180000, invalid: 105000, reversed: 60000 },
{ month: “Dec”, valid: 220000, invalid: 130000, reversed: 72000 },
];

const chargesByType = [
{ name: “Carton Shortage”, count: 1147 },
{ name: “FRO - Fill Rate Original”, count: 864 },
{ name: “No Notes Provided”, count: 694 },
{ name: “Damage-Related”, count: 332 },
{ name: “Supporting Docs”, count: 84 },
{ name: “R07 Consolidator”, count: 52 },
{ name: “PO Pickup Violation”, count: 41 },
{ name: “D08 - Missing Docs”, count: 16 },
{ name: “Partial Payment”, count: 5 },
{ name: “Case & Receipt Ref”, count: 4 },
{ name: “Missing DR Copy”, count: 2 },
];

const topCategories = [
{ name: “Carton Shortage”, value: 33, color: “#3b82f6” },
{ name: “FRO - Fill Rate”, value: 25, color: “#f59e0b” },
{ name: “No Notes Provided”, value: 20, color: “#6366f1” },
{ name: “Damage-Related”, value: 10, color: “#10b981” },
{ name: “Substitution”, value: 5, color: “#ef4444” },
{ name: “Other”, value: 7, color: “#d1d5db” },
];

const costByCategory = [
{ name: “Carton Shortage”, cost: 620000 },
{ name: “No Notes”, cost: 145000 },
{ name: “Substitution”, cost: 280000 },
{ name: “FRO - Fill Rate”, cost: 480000 },
{ name: “R03 - Carrier”, cost: 35000 },
{ name: “R07 Consolidator”, cost: 85000 },
];

const fmt = (v) => {
if (v >= 1000000) return `$${(v / 1000000).toFixed(1)}M`;
if (v >= 1000) return `$${(v / 1000).toFixed(0)}K`;
return `$${v}`;
};

const fmtFull = (v) => `$${v.toLocaleString()}`;

const FONT = “‘Segoe UI’, -apple-system, sans-serif”;

const CustomTooltip = ({ active, payload, label }) => {
if (!active || !payload?.length) return null;
return (
<div style={{
background: “#1e293b”, color: “#fff”, padding: “10px 14px”,
borderRadius: 6, fontSize: 12, fontFamily: FONT,
boxShadow: “0 4px 12px rgba(0,0,0,0.15)”,
}}>
<div style={{ fontWeight: 600, marginBottom: 4, color: “#e2e8f0” }}>{label}</div>
{payload.map((p, i) => (
<div key={i} style={{ display: “flex”, alignItems: “center”, gap: 6, marginTop: 3 }}>
<span style={{ width: 8, height: 8, borderRadius: 2, background: p.color, display: “inline-block” }} />
<span style={{ color: “#cbd5e1” }}>{p.name}:</span>
<span style={{ fontWeight: 600 }}>{typeof p.value === “number” && p.value > 100 ? fmtFull(p.value) : p.value}</span>
</div>
))}
</div>
);
};

const RADIAN = Math.PI / 180;
const renderDonutLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
if (percent < 0.07) return null;
const r = innerRadius + (outerRadius - innerRadius) * 0.5;
const x = cx + r * Math.cos(-midAngle * RADIAN);
const y = cy + r * Math.sin(-midAngle * RADIAN);
return (
<text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central"
fontSize={11} fontWeight={700} fontFamily={FONT}>
{`${(percent * 100).toFixed(0)}%`}
</text>
);
};

function KPI({ label, value, sub, accent }) {
return (
<div style={{
display: “flex”, flexDirection: “column”, gap: 2,
padding: “12px 16px”, background: “#fff”, borderRadius: 6,
border: “1px solid #e5e7eb”,
borderTop: `3px solid ${accent || "#e5e7eb"}`,
}}>
<span style={{ fontSize: 10.5, color: “#6b7280”, fontWeight: 600, textTransform: “uppercase”, letterSpacing: “0.05em” }}>{label}</span>
<span style={{ fontSize: 24, fontWeight: 700, color: “#111827”, letterSpacing: “-0.02em”, lineHeight: 1.15 }}>{value}</span>
{sub && <span style={{ fontSize: 10.5, color: “#9ca3af”, fontWeight: 500 }}>{sub}</span>}
</div>
);
}

function Card({ title, children, style: s }) {
return (
<div style={{
background: “#fff”, borderRadius: 6, border: “1px solid #e5e7eb”,
padding: “12px 14px”, display: “flex”, flexDirection: “column”, …s,
}}>
<div style={{
fontSize: 11, fontWeight: 600, color: “#374151”, marginBottom: 8,
textTransform: “uppercase”, letterSpacing: “0.04em”,
}}>{title}</div>
<div style={{ flex: 1, minHeight: 0 }}>{children}</div>
</div>
);
}

export default function Dashboard() {
const [brand, setBrand] = useState(“All”);
const [year, setYear] = useState(“2025”);

return (
<div style={{
width: “100%”, maxWidth: 1440, aspectRatio: “16/9”,
margin: “0 auto”, background: “#f9fafb”, fontFamily: FONT,
display: “flex”, flexDirection: “column”, overflow: “hidden”,
}}>
{/* ── HEADER ── */}
<div style={{
display: “flex”, alignItems: “center”, justifyContent: “space-between”,
padding: “10px 24px”, borderBottom: “1px solid #e5e7eb”,
background: “#fff”, flexShrink: 0,
}}>
<div style={{ display: “flex”, alignItems: “baseline”, gap: 10 }}>
<h1 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: “#111827” }}>
Vendor Compliance Monitoring
</h1>
<span style={{ fontSize: 11, color: “#9ca3af”, fontWeight: 500 }}>Helen of Troy</span>
</div>

```
    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 10, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Brand</span>
        <div style={{ display: "flex", gap: 1, background: "#f3f4f6", borderRadius: 5, padding: 2 }}>
          {BRANDS.map(b => (
            <button key={b} onClick={() => setBrand(b)} style={{
              padding: "4px 10px", borderRadius: 4, border: "none", cursor: "pointer",
              fontSize: 11, fontWeight: 600, fontFamily: FONT, transition: "all 0.15s",
              background: brand === b ? "#111827" : "transparent",
              color: brand === b ? "#fff" : "#6b7280",
            }}>{b}</button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 10, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Year</span>
        <div style={{ display: "flex", gap: 1, background: "#f3f4f6", borderRadius: 5, padding: 2 }}>
          {YEARS.map(y => (
            <button key={y} onClick={() => setYear(y)} style={{
              padding: "4px 10px", borderRadius: 4, border: "none", cursor: "pointer",
              fontSize: 11, fontWeight: 600, fontFamily: FONT, transition: "all 0.15s",
              background: year === y ? "#111827" : "transparent",
              color: year === y ? "#fff" : "#6b7280",
            }}>{y}</button>
          ))}
        </div>
      </div>
    </div>
  </div>

  {/* ── BODY ── */}
  <div style={{ flex: 1, padding: "12px 20px 14px", display: "flex", flexDirection: "column", gap: 10, minHeight: 0 }}>

    {/* KPI ROW */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8, flexShrink: 0 }}>
      <KPI label="Total Amount" value="$1,557,086" accent="#3b82f6" />
      <KPI label="Total Reversed" value="$349,027" sub="22.4% of Disputed" accent="#ef4444" />
      <KPI label="Valid / Not Disputed" value="$1,208,059" accent="#f59e0b" />
      <KPI label="Total Charges" value="3,727" accent="#6366f1" />
      <KPI label="In Progress" value="$1,928" accent="#8b5cf6" />
      <KPI label="Settled Reversed" value="$202,713" sub="In Progress: $146,314" accent="#10b981" />
    </div>

    {/* MIDDLE ROW: Area + Donut */}
    <div style={{ flex: 1, display: "grid", gridTemplateColumns: "3fr 1.5fr", gap: 8, minHeight: 0 }}>
      <Card title="Charge Status by Month">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyData} margin={{ top: 5, right: 15, left: -5, bottom: 0 }}>
            <defs>
              <linearGradient id="gV" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gI" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gR" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} tickFormatter={fmt} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 11, color: "#6b7280", fontFamily: FONT }} />
            <Area type="monotone" dataKey="valid" name="Valid" stroke="#3b82f6" strokeWidth={2} fill="url(#gV)" dot={false} />
            <Area type="monotone" dataKey="invalid" name="Invalid" stroke="#f59e0b" strokeWidth={2} fill="url(#gI)" dot={false} />
            <Area type="monotone" dataKey="reversed" name="Reversed" stroke="#10b981" strokeWidth={2} fill="url(#gR)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Valid Claim Categories">
        <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center" }}>
          <div style={{ flex: "0 0 auto" }}>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={topCategories} cx="50%" cy="50%" innerRadius="40%" outerRadius="78%"
                  dataKey="value" labelLine={false} label={renderDonutLabel} strokeWidth={2} stroke="#fff">
                  {topCategories.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip formatter={(v, n) => [`${v}%`, n]}
                  contentStyle={{ background: "#1e293b", color: "#fff", border: "none", borderRadius: 6, fontSize: 11, fontFamily: FONT }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 4, padding: "0 8px" }}>
            {topCategories.map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 10.5 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: c.color, flexShrink: 0 }} />
                <span style={{ color: "#4b5563", fontWeight: 500, flex: 1 }}>{c.name}</span>
                <span style={{ color: "#111827", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>

    {/* BOTTOM ROW: Horizontal bars + Vertical bars */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, flexShrink: 0, height: 195 }}>
      <Card title="Valid Charges per Type">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chargesByType} layout="vertical" margin={{ top: 0, right: 25, left: 5, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name"
              tick={{ fontSize: 9.5, fill: "#4b5563", fontWeight: 500 }}
              axisLine={false} tickLine={false} width={120} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" name="Count" radius={[0, 3, 3, 0]} barSize={12}>
              {chargesByType.map((_, i) => (
                <Cell key={i} fill={i === 0 ? "#1d4ed8" : i < 3 ? "#3b82f6" : "#93c5fd"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Cost by Category">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={costByCategory} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 9.5, fill: "#4b5563", fontWeight: 500 }} axisLine={false} tickLine={false} interval={0} />
            <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} tickFormatter={fmt} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="cost" name="Cost" radius={[3, 3, 0, 0]} barSize={32}>
              {costByCategory.map((_, i) => (
                <Cell key={i} fill={["#1d4ed8", "#6366f1", "#f59e0b", "#3b82f6", "#10b981", "#ef4444"][i]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  </div>
</div>
```

);
}