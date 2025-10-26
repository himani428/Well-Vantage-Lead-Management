import React from "react";
export default function Filters({ q, setQ, interest, setInterest, assignee, setAssignee }) {
  return (
    <div className="filters">
      <input className="search" placeholder="Search" value={q} onChange={(e)=>setQ(e.target.value)} />
      <select value={interest} onChange={(e)=>setInterest(e.target.value)}>
        <option value="">Interest Level</option><option>Hot</option><option>Warm</option><option>Cold</option>
      </select>
      <select value={assignee} onChange={(e)=>setAssignee(e.target.value)}>
        <option value="">Ratna Pathak</option><option>Ram Mohan</option>
      </select>
      <select defaultValue=""><option value="">Oldest</option><option>Newest</option></select>
      <select defaultValue=""><option value="">A-Z</option><option>Z-A</option></select>
    </div>
  );
}
