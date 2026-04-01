import { useState } from "react";
import LogoHelen from "./Helen_of_Troy_logo.svg";
import {
 BarChart, Bar, XAxis, YAxis, Tooltip,
 ResponsiveContainer, CartesianGrid,
 PieChart, Pie, Cell, ComposedChart, Area
} from "recharts";
const monthlyData = [
 { month: "Jan", valid: 45000, invalid: 18000, reversed: 12000 },
 { month: "Feb", valid: 52000, invalid: 22000, reversed: 15000 },
 { month: "Mar", valid: 78000, invalid: 35000, reversed: 20000 },
 { month: "Apr", valid: 120000, invalid: 55000, reversed: 28000 },
 { month: "May", valid: 195000, invalid: 80000, reversed: 42000 },
 { month: "Jun", valid: 210000, invalid: 75000, reversed: 55000 },
 { month: "Jul", valid: 160000, invalid: 60000, reversed: 38000 },
 { month: "Aug", valid: 130000, invalid: 48000, reversed: 30000 },
 { month: "Sep", valid: 95000, invalid: 32000, reversed: 22000 },
 { month: "Oct", valid: 80000, invalid: 28000, reversed: 18000 },
 { month: "Nov", valid: 65000, invalid: 20000, reversed: 14000 },
 { month: "Dec", valid: 50000, invalid: 15000, reversed: 10000 }
];
const costByCategory = [
 { name: "Carton Shortage", cost: 620000 },
 { name: "Substitution", cost: 270000 },
 { name: "No Notes Provided", cost: 105000 },
 { name: "FRO - Fill Rate", cost: 52000 },
 { name: "R03 - Carrier Error", cost: 34000 },
 { name: "R07 Collect Consol.", cost: 28000 }
];
const donutData = [
 { name: "Carton Shortage", value: 558000 },
 { name: "FRO - Fill Rate", value: 312000 },
 { name: "No Notes Provided", value: 145000 },
 { name: "Damage-Related", value: 82000 },
 { name: "Supporting Docs", value: 62000 },
 { name: "Other", value: 49000 }
];
const reversalTrend = [
 { month: "Jan", received: 63000, reversed: 12000 },
 { month: "Feb", received: 89000, reversed: 15000 },
 { month: "Mar", received: 133000, reversed: 20000 },
 { month: "Apr", received: 203000, reversed: 28000 },
 { month: "May", received: 317000, reversed: 42000 },
 { month: "Jun", received: 340000, reversed: 55000 },
 { month: "Jul", received: 258000, reversed: 38000 },
 { month: "Aug", received: 208000, reversed: 30000 },
 { month: "Sep", received: 149000, reversed: 22000 },
 { month: "Oct", received: 126000, reversed: 18000 },
 { month: "Nov", received: 99000, reversed: 14000 },
 { month: "Dec", received: 75000, reversed: 10000 }
];
var DONUT_COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#a855f7", "#ec4899", "#94a3b8"];
function fmt(n) {
 if (n >= 1000000) return "$" + (n / 1000000).toFixed(2) + "M";
 if (n >= 1000) return "$" + (n / 1000).toFixed(0) + "K";
 return "$" + n.toLocaleString();
}
function Tip(props) {
 if (!props.active || !props.payload) return null;
 return (
 <div style={{
 background: "#fff",
 border: "1px solid #e5e7eb",
 borderRadius: 6,
 padding: "8px 12px",
 boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
 }}>
 <div style={{ color: "#6b7280", fontSize: 11, marginBottom: 4, fontWeight: 500 }}>{props.label}</div>
 {props.payload.map(function(p, i) {
 return (
 <div key={i} style={{ color: p.color, fontSize: 12, fontWeight: 600 }}>
 {p.name}: {p.value >= 1000 ? fmt(p.value) : p.value}
 </div>
 );
 })}
 </div>
 );
}
function Select(props) {
 return (
 <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
 <label style={{ fontSize: 10, color: "#6b7280", fontWeight: 500 }}>{props.label}</label>
 <select
 value={props.value}
 onChange={function(e) { props.onChange(e.target.value); }}
 style={{
 background: "#fff",
 border: "1px solid #d1d5db",
 borderRadius: 4,
 padding: "5px 24px 5px 8px",
 fontSize: 12,
 color: "#111827",
 fontWeight: 500,
 cursor: "pointer",
 outline: "none",
 minWidth: 100,
 appearance: "auto"
 }}
 >
 {props.options.map(function(o) {
 return <option key={o} value={o}>{o}</option>;
 })}
 </select>
 </div>
 );
}
export default function Dashboard() {
 var _s1 = useState("All");
 var bu = _s1[0]; var setBu = _s1[1];
 var _s2 = useState("All");
 var vendor = _s2[0]; var setVendor = _s2[1];
 var _s3 = useState("2025");
 var year = _s3[0]; var setYear = _s3[1];
 var card = {
 background: "#fff",
 borderRadius: 6,
 padding: "14px 18px",
 border: "1px solid #e5e7eb"
 };
 var chartCard = {
 background: "#fff",
 borderRadius: 6,
 border: "1px solid #e5e7eb",
 padding: "14px 16px 8px",
 display: "flex",
 flexDirection: "column"
 };
 return (
 <div style={{
 width: "100%",
 maxWidth: 1280,
 aspectRatio: "16/9",
 margin: "0 auto",
 background: "#f9fafb",
 fontFamily: "system-ui, -apple-system, sans-serif",
 display: "flex",
 flexDirection: "column",
 overflow: "hidden"
 }}>
 <div style={{
 background: "#fff",
 borderBottom: "1px solid #e5e7eb",
 padding: "10px 24px",
 display: "flex",
 alignItems: "flex-end",
 justifyContent: "space-between",
 flexShrink: 0,
 gap: 16
 }}>
 <div style={{ display: "flex", alignItems: "center", gap: 25 }}>
 <img 
  src={LogoHelen} 
  alt="Logo Helen of Troy" 
  style={{
    height: 35, 
    width: "auto",
    display: "block"
  }}
/>
<div>
  <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", lineHeight: 1 }}>
    Vendor Compliance Monitoring Dashboard
  </div>
  
  {/* Aquí controlamos la alineación del subtítulo */}
  <div style={{ fontSize: 11, color: "#6b7280", marginTop: 4, textAlign: "left" }}>
    Target Corporation
  </div>
</div>
 </div>
 <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
 <Select label="Year" value={year} onChange={setYear} options={["2023", "2024", "2025", "2026"]} />
 <Select label="BU" value={bu} onChange={setBu} options={["All", "Beauty", "Drybar", "Hydroflask", "KAZ", "OXO"]} />
 <Select label="Vendor" value={vendor} onChange={setVendor} options={["All"]} />
 </div>
 </div>
 <div style={{ display: "flex", gap: 10, padding: "12px 24px 0", flexShrink: 0 }}>
 <div style={Object.assign({}, card, { flex: 1 })}>
 <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 500, marginBottom: 4 }}>Total Claim Amount</div>
 <div style={{ fontSize: 24, fontWeight: 700, color: "#111827" }}>$1,557,086</div>
 </div>
 <div style={Object.assign({}, card, { flex: 1 })}>
 <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 500, marginBottom: 4 }}>Total Reversed</div>
 <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
 <span style={{ fontSize: 24, fontWeight: 700, color: "#111827" }}>$349,027</span>
 <span style={{ fontSize: 11, fontWeight: 600, color: "#16a34a" }}>22.4%</span>
 </div>
 </div>
 <div style={Object.assign({}, card, { flex: 1 })}>
 <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 500, marginBottom: 4 }}>Valid / Not Disputed</div>
 <div style={{ fontSize: 24, fontWeight: 700, color: "#111827" }}>$1,208,059</div>
 </div>
 <div style={Object.assign({}, card, { flex: 1 })}>
 <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 500, marginBottom: 4 }}>Settled Reversed</div>
 <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
 <span style={{ fontSize: 24, fontWeight: 700, color: "#16a34a" }}>$202,713</span>
 <span style={{ fontSize: 11, fontWeight: 500, color: "#6b7280" }}>58.1%</span>
 </div>
 </div>
 <div style={Object.assign({}, card, { flex: 1 })}>
 <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 500, marginBottom: 4 }}>In Progress Reversed</div>
 <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
 <span style={{ fontSize: 24, fontWeight: 700, color: "#f59e0b" }}>$146,314</span>
 <span style={{ fontSize: 11, fontWeight: 500, color: "#6b7280" }}>41.9%</span>
 </div>
 </div>
 </div>
 <div style={{ display: "flex", gap: 10, padding: "10px 24px 0", flex: 1, minHeight: 0 }}>
 <div style={Object.assign({}, chartCard, { flex: 6 })}>
 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
 <span style={{ fontSize: 12, fontWeight: 600, color: "#111827" }}>Charge Status</span>
 <div style={{ display: "flex", gap: 14 }}>
 {[["Valid", "#3b82f6"], ["Invalid", "#f59e0b"], ["Reversed", "#22c55e"]].map(function(item) {
 return (
 <div key={item[0]} style={{ display: "flex", alignItems: "center", gap: 4 }}>
 <div style={{ width: 8, height: 8, borderRadius: 2, background: item[1] }} />
 <span style={{ fontSize: 10, color: "#6b7280" }}>{item[0]}</span>
 </div>
 );
 })}
 </div>
 </div>
 <div style={{ flex: 1, minHeight: 0 }}>
 <ResponsiveContainer width="100%" height="100%">
 <ComposedChart data={monthlyData} barGap={2} barCategoryGap="20%">
 <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f3f4f6" />
 <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
 <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={fmt} width={50} />
 <Tooltip content={Tip} />
 <Bar dataKey="valid" name="Valid" fill="#3b82f6" radius={[2, 2, 0, 0]} />
 <Bar dataKey="invalid" name="Invalid" fill="#f59e0b" radius={[2, 2, 0, 0]} />
 <Bar dataKey="reversed" name="Reversed" fill="#22c55e" radius={[2, 2, 0, 0]} />
 </ComposedChart>
 </ResponsiveContainer>
 </div>
 </div>
 <div style={Object.assign({}, chartCard, { flex: 4 })}>
 <span style={{ fontSize: 12, fontWeight: 600, color: "#111827", marginBottom: 4 }}>Cost by Category</span>
 <div style={{ flex: 1, minHeight: 0 }}>
 <ResponsiveContainer width="100%" height="100%">
 <BarChart data={costByCategory} layout="vertical" barSize={16}>
 <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="#f3f4f6" />
 <XAxis type="number" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={fmt} />
 <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: "#6b7280" }} axisLine={false} tickLine={false} width={105} />
 <Tooltip content={Tip} />
 <Bar dataKey="cost" name="Cost" fill="#3b82f6" radius={[0, 3, 3, 0]} />
 </BarChart>
 </ResponsiveContainer>
 </div>
 </div>
 </div>
 <div style={{ display: "flex", gap: 10, padding: "10px 24px 12px", flex: 1, minHeight: 0 }}>
 <div style={Object.assign({}, chartCard, { flex: 4 })}>
 <span style={{ fontSize: 12, fontWeight: 600, color: "#111827", marginBottom: 2 }}>Valid Claims by Category ($)</span>
 <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center" }}>
 <div style={{ flex: 1, height: "100%" }}>
 <ResponsiveContainer width="100%" height="100%">
 <PieChart>
 <Pie data={donutData} innerRadius="48%" outerRadius="78%" paddingAngle={2} dataKey="value" stroke="none">
 {donutData.map(function(entry, i) {
 return <Cell key={i} fill={DONUT_COLORS[i]} />;
 })}
 </Pie>
 <Tooltip content={Tip} />
 </PieChart>
 </ResponsiveContainer>
 </div>
 <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingRight: 8 }}>
 {donutData.map(function(d, i) {
 var total = 1208000;
 var pct = Math.round(d.value / total * 100);
 return (
 <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
 <div style={{ width: 8, height: 8, borderRadius: 2, background: DONUT_COLORS[i], flexShrink: 0 }} />
 <span style={{ fontSize: 10, color: "#6b7280", whiteSpace: "nowrap" }}>{d.name}</span>
 <span style={{ fontSize: 10, fontWeight: 600, color: "#374151", marginLeft: "auto" }}>{pct}%</span>
 </div>
 );
 })}
 </div>
 </div>
 </div>
 <div style={Object.assign({}, chartCard, { flex: 6 })}>
 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
 <span style={{ fontSize: 12, fontWeight: 600, color: "#111827" }}>Received vs Reversed Amount</span>
 <div style={{ display: "flex", gap: 14 }}>
 {[["Received", "#3b82f6"], ["Reversed", "#22c55e"]].map(function(item) {
 return (
 <div key={item[0]} style={{ display: "flex", alignItems: "center", gap: 4 }}>
 <div style={{ width: 8, height: 8, borderRadius: 2, background: item[1] }} />
 <span style={{ fontSize: 10, color: "#6b7280" }}>{item[0]}</span>
 </div>
 );
 })}
 </div>
 </div>
 <div style={{ flex: 1, minHeight: 0 }}>
 <ResponsiveContainer width="100%" height="100%">
 <ComposedChart data={reversalTrend} barGap={2} barCategoryGap="20%">
 <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f3f4f6" />
 <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
 <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={fmt} width={50} />
 <Tooltip content={Tip} />
 <Bar dataKey="received" name="Received" fill="#3b82f6" radius={[2, 2, 0, 0]} />
 <Bar dataKey="reversed" name="Reversed" fill="#22c55e" radius={[2, 2, 0, 0]} />
 </ComposedChart>
 </ResponsiveContainer>
 </div>
 </div>
 </div>
 </div>
 );
}