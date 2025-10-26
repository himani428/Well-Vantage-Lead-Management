import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { emptyLead, loadLeads, upsertLead } from "../data";
import { toISODate } from "../utils/formatDate";

export default function LeadDetail() {
  const { id } = useParams();
  const [tab, setTab] = useState("basic");
  const [lead, setLead] = useState(emptyLead(id));

  useEffect(() => {
    const found = loadLeads().find((x) => x.id === id);
    if (found) setLead(found);
  }, [id]);

  const onChange = (e) => setLead({ ...lead, [e.target.name]: e.target.value });

  // Normalize date fields to ISO just before saving
  const save = () => {
    const normalized = { ...lead };
    normalized.inquiryDate = toISODate(lead.inquiryDate);
    normalized.dob = toISODate(lead.dob);
    if (Array.isArray(lead.statusNotes)) {
      normalized.statusNotes = lead.statusNotes.map((r) => ({
        ...r,
        date: toISODate(r.date),
      }));
    }
    upsertLead(normalized);
    setLead(normalized);
  };

  // helpers for notes rows
  const addNoteRow = () => {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");
    const row = { date: `${y}-${m}-${d}`, text: "" }; // already ISO
    setLead((l) => ({ ...l, statusNotes: [ ...(l.statusNotes || []), row ] }));
  };

  const updateNoteRow = (i, key, val) => {
    const next = (lead.statusNotes || []).map((r, idx) =>
      idx === i ? { ...r, [key]: key === "date" ? toISODate(val) : val } : r
    );
    setLead({ ...lead, statusNotes: next });
  };

  return (
    <>
      {/* Title-only dark header */}
      <header className="header">
        <div className="header-inner">
          <h1 className="h-title">Lead Management</h1>
          <div className="h-right" />
        </div>
      </header>

      {/* Big tabs under the header */}
      <div className="subtabs">
        <button className={`tab ${tab==="basic"?"is-active":""}`} onClick={()=>setTab("basic")}>Basic</button>
        <button className={`tab ${tab==="preferences"?"is-active":""}`} onClick={()=>setTab("preferences")}>Preferences</button>
        <button className={`tab ${tab==="status"?"is-active":""}`} onClick={()=>setTab("status")}>Status</button>
      </div>

      {/* Full-width white canvas (NO BOXES) */}
      <div className="page form-page">
        {tab==="basic" && (
          <>
            <h3 className="form-heading">Basic Details</h3>
            <div className="form-grid">
              <input name="firstName" placeholder="First Name*" value={lead.firstName || ""} onChange={onChange}/>
              <input name="lastName"  placeholder="Last Name*"  value={lead.lastName  || ""} onChange={onChange}/>
              <input name="phone"     placeholder="Phone"       value={lead.phone     || ""} onChange={onChange}/>
              <input name="email"     placeholder="Email"       value={lead.email     || ""} onChange={onChange}/>
              <select name="gender" value={lead.gender || ""} onChange={onChange}>
                <option value="">Gender</option>
                <option>Male</option><option>Female</option><option>Non binary/Other</option>
              </select>
              <input
                type="date"
                name="dob"
                value={toISODate(lead.dob)}
                onChange={onChange}
              />
              <div className="with-unit">
                <input name="height" placeholder="Height" value={lead.height || ""} onChange={onChange}/>
                <span>cm</span>
              </div>
              <div className="with-unit">
                <input name="weight" placeholder="Weight" value={lead.weight || ""} onChange={onChange}/>
                <span>kg</span>
              </div>
            </div>
          </>
        )}

        {tab==="preferences" && (
          <>
            <h3 className="form-heading">Preference</h3>
            <div className="form-grid">
              <select name="activityLevel" value={lead.activityLevel || ""} onChange={onChange}>
                <option value="">Activity Level</option>
                <option>Sedentary</option><option>Lightly active</option>
                <option>Moderately active</option><option>very active</option>
              </select>
              <select name="wellnessGoals" value={lead.wellnessGoals || ""} onChange={onChange}>
                <option value="">Wellness Goals</option>
                <option>lose weight</option><option>Gain weight</option><option>Build muscle</option>
                <option>Modify My Diet</option><option>Manage Stress</option>
                <option>Improve Step Count</option><option>General wellness</option>
              </select>
              <select name="primaryFocus" value={lead.primaryFocus || ""} onChange={onChange}>
                <option value="">Primary Fitness Focus</option>
                <option>Gym workout</option><option>Yoga</option><option>Meditation</option>
                <option>Nutrition</option><option>Recovery</option>
              </select>
              <select name="preferredTime" value={lead.preferredTime || ""} onChange={onChange}>
                <option value="">Preferred Gym Time</option>
                <option>Morning</option><option>Afternoon</option>
                <option>Evening</option><option>late evening</option>
              </select>
              <select name="workoutIntensity" value={lead.workoutIntensity || ""} onChange={onChange}>
                <option value="">Preferred Workout Intensity</option>
                <option>Light</option><option>Moderate</option><option>High</option>
              </select>
              <select name="medicalConcerns" value={lead.medicalConcerns || ""} onChange={onChange}>
                <option value="">Medical Concerns</option>
                <option>None</option><option>Diabetes</option><option>Hypertension</option>
                <option>Asthma</option><option>Others</option>
              </select>
              <select name="hasGymExp" value={lead.hasGymExp || ""} onChange={onChange}>
                <option value="">Previous Gym Experience</option><option>yes</option><option>no</option>
              </select>
              <div />
            </div>
          </>
        )}

        {tab==="status" && (
          <>
            <h3 className="form-heading">Status</h3>
            <div className="form-grid">
              {/* TOP ROW */}
              <input
                type="date"
                name="inquiryDate"
                value={toISODate(lead.inquiryDate)}
                onChange={onChange}
              />
              <select name="assignedTo" value={lead.assignedTo || ""} onChange={onChange}>
                <option value="">Assigned To Admin/Receptionist</option>
                <option>Ram Mohan</option><option>Ratna Pathak</option>
              </select>

              {/* SECOND ROW */}
              <select name="interest" value={lead.interest || "Warm"} onChange={onChange}>
                <option>Hot</option><option>Warm</option><option>Cold</option>
              </select>
              <select name="followUpStatus" value={lead.followUpStatus || "Needs Follow Up"} onChange={onChange}>
                <option>Needs Follow Up</option><option>Engaged</option>
                <option>Converted</option><option>Archived</option>
              </select>

              {/* THIRD ROW */}
              <select name="prefPackage" value={lead.prefPackage || ""} onChange={onChange}>
                <option value="">Package</option>
                <option>Silver</option><option>Gold</option><option>Platinum</option>
              </select>
              <select name="prefPTPackage" value={lead.prefPTPackage || ""} onChange={onChange}>
                <option value="">Preferred PT Package (If Any)</option>
                <option>None</option><option>5 Sessions</option><option>10 Sessions</option>
              </select>

              {/* FOURTH ROW */}
              <select name="source" value={lead.source || ""} onChange={onChange}>
                <option value="">How They Heard About The Gym</option>
                <option>Social Media</option><option>Word of Mouth</option>
                <option>Walk-in</option><option>WellVantage B2C App</option>
              </select>
              <div />
            </div>

            {/* CUSTOM NOTES block with date + text rows and '+' add button */}
            <div className="notes-head" style={{marginTop:14}}>
              <div style={{fontWeight:700}}>Custom notes</div>
              <button className="notes-add" type="button" onClick={addNoteRow}>+</button>
            </div>
            <div className="notes-grid">
              {(lead.statusNotes||[]).map((row, i)=>(
                <React.Fragment key={i}>
                  <div className="note-date">
                    <input
                      type="date"
                      value={toISODate(row.date)}
                      onChange={(e)=>updateNoteRow(i,"date",e.target.value)}
                    />
                  </div>
                  <div className="note-text">
                    <input
                      placeholder={i===0 ? "Called the customer again." : i===1 ? "Customer walked in, offered 10% discount." : "Lead created."}
                      value={row.text || ""}
                      onChange={(e)=>updateNoteRow(i,"text",e.target.value)}
                    />
                  </div>
                </React.Fragment>
              ))}
            </div>
          </>
        )}

        <div className="save-bar">
          <button className="primary wide" onClick={save}>
            Save
          </button>
        </div>
      </div>
    </>
  );
}
