export const LS_KEY = "wv_leads";

export const emptyLead = (id) => ({
  id,
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  gender: "",
  dob: "",
  height: "",
  weight: "",
  // preferences
  activityLevel: "",
  wellnessGoals: "",
  primaryFocus: "",
  preferredTime: "",
  workoutIntensity: "",
  medicalConcerns: "",
  hasGymExp: "",
  // status
  inquiryDate: "",
  assignedTo: "",
  interest: "Warm",
  followUpStatus: "Needs Follow Up",
  prefPackage: "",
  prefPTPackage: "",
  source: "",
  notes: [],
  lastInteraction: "",
});

export const seedIfEmpty = () => {
  const exists = localStorage.getItem(LS_KEY);
  if (exists) return;
  const today = "26 July 2025";
  const mk = (i, name, interest, follow) => ({
    ...emptyLead(String(i)),
    firstName: name.split(" ")[0],
    lastName: name.split(" ")[1] || "",
    assignedTo: "Ratna Pathak",
    interest,
    followUpStatus: follow,
    lastInteraction: today,
    email: `${name.replace(" ", ".").toLowerCase()}@mail.com`,
  });
  const leads = [
    mk(1, "Jeo Yadav", "Hot", "Need Follow Up"),
    mk(2, "Jeo Yadav", "Cold", "Need Follow Up"),
    mk(3, "Jeo Yadav", "Warm", "Need Follow Up"),
    mk(4, "Jeo Yadav", "Hot", "Need Follow Up"),
    mk(5, "Jeo Yadav", "Cold", "Need Follow Up"),
    mk(6, "Jeo Yadav", "Warm", "Need Follow Up"),
    mk(7, "Jeo Yadav", "Hot", "Need Follow Up"),
    mk(8, "Jeo Yadav", "Cold", "Need Follow Up"),
    mk(9, "Jeo Yadav", "Warm", "Need Follow Up"),
    mk(10, "Jeo Yadav", "Hot", "Need Follow Up"),
  ];
  localStorage.setItem(LS_KEY, JSON.stringify(leads));
};

export const loadLeads = () => JSON.parse(localStorage.getItem(LS_KEY) || "[]");
export const saveLeads = (arr) => localStorage.setItem(LS_KEY, JSON.stringify(arr));
export const upsertLead = (lead) => {
  const all = loadLeads();
  const idx = all.findIndex((l) => l.id === lead.id);
  if (idx >= 0) all[idx] = lead; else all.push(lead);
  saveLeads(all);
};
