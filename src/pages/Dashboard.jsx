import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import Filters from "../components/Filters";
import LeadTable from "../components/LeadTable";
import { loadLeads, saveLeads, emptyLead } from "../data";

function todayLabel() {
  const d = new Date();
  return d.toLocaleDateString(undefined, { year:"numeric", month:"long", day:"numeric" });
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("active");
  const [q, setQ] = useState("");
  const [interest, setInterest] = useState("");
  const [assignee, setAssignee] = useState("");

  const leads = loadLeads();

  const filtered = useMemo(() => {
    return leads.filter(l => {
      const hit = `${l.firstName} ${l.lastName} ${l.email}`.toLowerCase().includes(q.toLowerCase());
      const okI = !interest || l.interest === interest;
      const okA = !assignee || l.assignedTo === assignee;
      const okArchive = tab === "active" ? l.followUpStatus !== "Archived" : l.followUpStatus === "Archived";
      return hit && okI && okA && okArchive;
    });
  }, [q, interest, assignee, tab, leads]);

  const onAdd = () => {
    const id = String(Date.now());
    const next = emptyLead(id);
    next.firstName = "New";
    next.lastName = "Lead";
    next.assignedTo = "Ram Mohan";
    next.lastInteraction = new Date().toLocaleDateString();
    saveLeads([next, ...leads]);
    navigate(`/lead/${id}`);
  };

  return (
    <>
      {/* Header strip */}
      <TopBar lastInteraction={todayLabel()} onAdd={onAdd} />

      {/* Tabs BELOW the header (Active / Archived) */}
      <div className="subtabs">
        <button className={`tab ${tab==="active"?"is-active":""}`} onClick={()=>setTab("active")}>Active</button>
        <button className={`tab ${tab==="archived"?"is-active":""}`} onClick={()=>setTab("archived")}>Archived</button>
      </div>

      {/* Page content */}
      <div className="page">
        <Filters
          q={q} setQ={setQ}
          interest={interest} setInterest={setInterest}
          assignee={assignee} setAssignee={setAssignee}
        />
        <LeadTable leads={filtered}/>
      </div>
    </>
  );
}
