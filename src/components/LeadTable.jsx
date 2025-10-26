// src/components/LeadTable.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

const Chip = ({ value }) => <span className={"chip " + (value || "").toLowerCase()}>{value}</span>;
const Follow = ({ value }) => <span className="follow">{value || "Need Follow Up"}</span>;

const WA = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
    <path fill="#25D366" d="M12 2a10 10 0 0 0-8.94 14.5L2 22l5.7-1.99A10 10 0 1 0 12 2z"/>
    <path fill="#fff" d="M8.7 7.7c-.2-.5-.4-.5-.7-.5h-.6c-.2 0-.6.1-.9.5s-1.1 1.1-1.1 2.7 1.1 3.1 1.2 3.3c.1.2 2.1 3.4 5.2 4.6 2.6 1 3.1.8 3.7.8.6 0 1.8-.7 2-1.4.2-.7.2-1.3.1-1.4-.1-.1-.2-.2-.5-.3s-1.8-.9-2.1-1c-.3-.1-.5-.2-.7.2-.2.4-.8 1-1 1.2-.2.2-.4.2-.7.1-1.9-.8-3.2-2.9-3.3-3.1-.2-.2-.1-.5.1-.7.1-.2.4-.5.5-.7.2-.2.2-.4.3-.6.1-.2 0-.5 0-.6 0-.1-.6-1.5-.8-2.1z"/>
  </svg>
);
const Cube = () => (
  <svg viewBox="0 0 24 24" width="18" height="18"><path fill="#a78bfa" d="M12 2l9 5v10l-9 5-9-5V7l9-5zm0 2.2L6 7l6 3.3L18 7l-6-2.8zM5 8.3v7.4l6 3.3v-7.4L5 8.3zm14 0-6 3.3v7.4l6-3.3V8.3z"/></svg>
);
const Refresh = () => (
  <svg viewBox="0 0 24 24" width="18" height="18"><path fill="#64748b" d="M17.65 6.35A7.95 7.95 0 0 0 12 4V1L7 6l5 5V8a5 5 0 1 1-4.9 6h-2.1A7 7 0 1 0 12 5c1.93 0 3.68.78 4.95 2.05L19 5v6h-6l2.65-2.65z"/></svg>
);

/* Generic avatar icon (person) inside a circle */
const AvatarIcon = () => (
  <div className="avatar-circle" aria-hidden>
    <svg viewBox="0 0 24 24">
      <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5z"/>
    </svg>
  </div>
);

const Row = ({ lead }) => (
  <tr>
    <td>
      <div className="person">
        <AvatarIcon />
        <Link className="name" to={`/lead/${lead.id}`}>{lead.firstName} {lead.lastName}</Link>
      </div>
    </td>
    <td><Chip value={lead.interest}/></td>
    <td>{lead.assignedTo || "-"}</td>
    {/* ✅ Unified date formatting */}
    <td>{lead.lastInteraction ? formatDate(lead.lastInteraction) : "-"}</td>
    <td><Follow value={lead.followUpStatus} /></td>
    <td className="actions">
      <button className="icon-btn" title="WhatsApp"><WA/></button>
      <button className="icon-btn" title="Package"><Cube/></button>
      <button className="icon-btn" title="Reassign/Refresh"><Refresh/></button>
    </td>
  </tr>
);

export default function LeadTable({ leads = [] }) {
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);

  // reset to page 1 whenever the filtered leads change
  useEffect(() => { setPage(1); }, [leads]);

  const total = leads.length;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, total);

  const current = useMemo(() => leads.slice(start, end), [leads, start, end]);

  const pages = useMemo(() => {
    // simple 1 … n with compact middle
    const arr = [];
    for (let i=1;i<=pageCount;i++){
      if (i===1 || i===pageCount || Math.abs(i-page)<=1) arr.push(i);
      else if (arr[arr.length-1] !== '…') arr.push('…');
    }
    return arr;
  }, [pageCount, page]);

  return (
    <div className="card">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Interest Level</th>
            <th>Assigned to</th>
            <th>Last Interaction</th>
            <th>Follow Up</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{current.map(l => <Row key={l.id} lead={l} />)}</tbody>
      </table>

      <div className="table-foot">
        <div>Showing {total === 0 ? 0 : start + 1} to {end} of {total} entries</div>
        <div className="pagination">
          <button className="page-btn" disabled={page===1} onClick={()=>setPage(p=>p-1)}>‹</button>
          {pages.map((p,i)=> p==='…'
            ? <span key={i} style={{padding:"0 4px"}}>…</span>
            : <button key={i} className={"page-btn"+(p===page?" active":"")} onClick={()=>setPage(p)}>{p}</button>
          )}
          <button className="page-btn" disabled={page===pageCount} onClick={()=>setPage(p=>p+1)}>›</button>
        </div>
      </div>
    </div>
  );
}
