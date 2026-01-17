import { useState } from "react";
import ResumePreview from "../components/ResumePreview";
import "../App.css";
import { useRef } from "react";
import SectionReorder from "../components/SectionReorder";
import { useEffect } from "react";  //after render it works, not during ui drawing
import html2pdf from "html2pdf.js";

import { rewriteResumeAI } from "../services/aiService";
import { buildAIPayload } from "../utils/aiPayload";
import AIRewriteModal from "../components/AIRewriteModal";


//Local Storage Key
const STORAGE_KEY = "resume_builder_data";
const TEMPLATE_KEY = "resume_template";
const SECTION_KEY = "resume_sections";

const initialResume = {
   name: "",  
    email: "",
    phone: "",
    address : "",
    profiles: {
      github: "",
      linkedin: ""
    },    
    summary: "",
    education: [
     { degree: "", institute: "", year: "", grade: ""}
    ],
    experience: [
     { company: "", role: "", duration: "", description: "" }
    ],
    skills: [],
    projects: [
      {title: "", technology: "", description: "" }
    ],
    certifications: [
    { name: "", organization: "", year: "" },
    ],
    customSections: []
};


 function Builder({ darkMode, setDarkMode }) {
  
  const resumeRef = useRef();

  const [template, setTemplate] = useState(() => {
    return localStorage.getItem(TEMPLATE_KEY) || "classic";   //saved template or default
  });

  useEffect(() => {
  localStorage.setItem(TEMPLATE_KEY, template);
}, [template]);

//resume state
   const [resume, setResume] = useState(() =>{   
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialResume        //lazy initializer for useState
   
  });

//ai state
  const [aiPreview, setAiPreview] = useState(null);  //rewritten version
  const [aiLoading, setAiLoading] = useState(false); //loader controler

  // AI handlers
  const applyAIRewrite = () => {
  setResume(prev => ({
    ...prev,
    ...aiPreview   // only AI-generated fields overwrite
  }));

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ ...resume, ...aiPreview })
  );

  setAiPreview(null);
};



  useEffect(() => {                                             //saving data if any
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
}, [resume]);


// DND kit - Drag and drop state 
const [sections, setSections] = useState(() => {
  const saved = localStorage.getItem(SECTION_KEY);
  return saved
    ? JSON.parse(saved)
    :  [
  "summary",
  "education",
  "experience",
  "skills",
  "projects",
  "certifications",
  "custom"
];
 });

 useEffect(() => {
  localStorage.setItem(SECTION_KEY, JSON.stringify(sections));
}, [sections]);


//clear data
const clearResume = () => {
  if (!window.confirm("Are you sure you want to clear the resume?")) return;

  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(SECTION_KEY);
  localStorage.removeItem(TEMPLATE_KEY);
  window.location.reload();
};


  // PDF Download 
const downloadPDF = async () => {
  const element = resumeRef.current;
  const appRoot = document.querySelector(".dark-mode");

  // Disable dark mode UI
  if (appRoot) {
    appRoot.classList.remove("dark-mode");
  }

  // Force light resume styles
  element.classList.add("force-light");

  // Allow styles to apply
  await new Promise((resolve) => setTimeout(resolve, 200));

  await html2pdf()
    .set({       //configure pdf settings
      margin: [20, 15], // top/bottom , left/right
      filename: "Resume.pdf",
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff"
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait"
      },
      pagebreak: {
        mode: ["css", "legacy"]
      }
    })
    .from(element)
    .save();

  // Restore UI
  element.classList.remove("force-light");
  if (appRoot) {
    appRoot.classList.add("dark-mode");
  }
};

//ai rewrite function
const handleAIRewrite = async () => {
  try {
    setAiLoading(true);

    const payload = buildAIPayload(resume);
  

    const data = await rewriteResumeAI(payload);

    setAiPreview(data.preview); // backend response IS the resume
  } catch (err) {
    console.error(err);
    alert("AI rewrite failed");
  } finally {
    setAiLoading(false);
  }
};


// UI Rendering 
  return (
    
<div className="container mt-4">

 {/* DARK MODE TOGGLE */}
    <div className="d-flex justify-content-end mb-3">
      <button
        className="btn btn-sm btn-outline-secondary"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
      </button>
    </div>


  {/* FORM SECTION */} 


  <div className="row">

       <div
  className="col-md-6 overflow-auto vh-100"
>

{/* Basic Details */} 
          <input
            className="form-control mb-3"
            placeholder="Full Name"
            value={resume.name}
            onChange={(e) =>
              setResume({ ...resume, name: e.target.value })
            }
          />

          <input
            className="form-control mb-3"
            placeholder="Email"
            value={resume.email}
            onChange={(e) =>
              setResume({ ...resume, email: e.target.value })
            }
          />

          <input
          type = "tel"
            className="form-control mb-3"
            placeholder="Phone Number"
            value={resume.phone}
            onChange={(e) =>
              setResume({ ...resume, phone: e.target.value.replace(/\D/g, "") })
            }
          />

          <input
            className="form-control mb-3"
            placeholder="Address"
            value={resume.address}
            onChange={(e) =>
              setResume({ ...resume, address: e.target.value })
            }
          />

{/*Profiles */}
       <h5 className="mt-4">Profiles</h5>

<input
  className="form-control mb-2"
  placeholder="GitHub Profile URL"
  value={resume.profiles.github}
  onChange={(e) =>
    setResume({
      ...resume,
      profiles: {
        ...resume.profiles,
        github: e.target.value
      }
    })
  }
/>

<input
  className="form-control"
  placeholder="LinkedIn Profile URL"
  value={resume.profiles.linkedin}
  onChange={(e) =>
    setResume({
      ...resume,
      profiles: {
        ...resume.profiles,
        linkedin: e.target.value
      }
    })
  }
/>


{/* Summary */}
     <h5 className = "mt-5">Professional Summary</h5>
          <textarea
            className="form-control mb-3"
            placeholder="Summary"
            rows="3"
            value={resume.summary}
            onChange={(e) =>
              setResume({ ...resume, summary: e.target.value })
            }
          />

{/*Education */}
    <h5 className="mt-4">Education</h5>

    {resume.education.map((edu, index) => (
         <div key={index} className="border p-2 mb-3 rounded">

    <input
      className="form-control mb-2"
      placeholder="Degree"
      value={edu.degree}
      onChange={(e) => {
        const newEdu = [...resume.education];
        newEdu[index].degree = e.target.value;
        setResume({ ...resume, education: newEdu });
      }}
    />

    <input
      className="form-control mb-2"
      placeholder="Institute"
      value={edu.institute}
      onChange={(e) => {
        const newEdu = [...resume.education];
        newEdu[index].institute = e.target.value;
        setResume({ ...resume, education: newEdu });
      }}
    />

    <input
      className="form-control mb-2"
      placeholder="Year"
      value={edu.year}
      onChange={(e) => {
        const newEdu = [...resume.education];
        newEdu[index].year = e.target.value;
        setResume({ ...resume, education: newEdu });
      }}
    />

    <input
      className="form-control mb-2"
      placeholder="Grade"
      value={edu.grade}
      onChange={(e) => {
        const newEdu = [...resume.education];
        newEdu[index].grade = e.target.value;
        setResume({ ...resume, education: newEdu });
      }}
    />

  </div>
))}

<button
  className="btn btn-sm btn-outline-primary"
  onClick={() =>
    setResume({
      ...resume,
      education: [
        ...resume.education,
        { degree: "", institute: "", year: "" }
      ]
    })
  }
>
  + Add Education
</button>

{/* Experience */}
        <h5 className="mt-4">Experience</h5>

   {resume.experience.map((exp, index) => (
     <div key={index} className="border p-2 mb-3 rounded">
 
    <input
      className="form-control mb-2"
      placeholder="Company"
      value={exp.company}
      onChange={(e) => {
        const newExp = [...resume.experience];
        newExp[index].company = e.target.value;
        setResume({ ...resume, experience: newExp });
      }}
    />

    <input
      className="form-control mb-2"
      placeholder="Role"
      value={exp.role}
      onChange={(e) => {
        const newExp = [...resume.experience];
        newExp[index].role = e.target.value;
        setResume({ ...resume, experience: newExp });
      }}
    />

    <input
      className="form-control mb-2"
      placeholder="Duration (e.g. 2023–2024)"
      value={exp.duration}
      onChange={(e) => {
        const newExp = [...resume.experience];
        newExp[index].duration = e.target.value;
        setResume({ ...resume, experience: newExp });
      }}
    />

    <textarea
      className="form-control"
      placeholder="Description"
      value={exp.description}
      onChange={(e) => {
        const newExp = [...resume.experience];
        newExp[index].description = e.target.value;
        setResume({ ...resume, experience: newExp });
      }}
    />

  </div>
))}

<button
  className="btn btn-sm btn-outline-primary"
  onClick={() =>
    setResume({
      ...resume,
      experience: [
        ...resume.experience,
        {
          company: "",
          role: "",
          duration: "",
          description: ""
        }
      ]
    })
  }
>
  + Add Experience
</button>

{/* ADD SKILLs */}
 <h5 className="mt-4">Skills</h5>

<input
  className="form-control mb-3"
  placeholder="Add skill & press Enter / Done"
  enterKeyHint="done" //mobile 
  onKeyDown={(e) => {
    if (e.key === "Enter" && e.target.value.trim()) {        // for keyboard
      e.preventDefault();
      setResume({
        ...resume,
        skills: [...resume.skills, e.target.value.trim()],
      });
      e.target.value = "";
    }
  }}
  onBlur={(e) => {              //for mobile devices
    if (e.target.value.trim()) {
      setResume({
        ...resume,
        skills: [...resume.skills, e.target.value.trim()],
      });
      e.target.value = "";
    }
  }}
/>

{/* EDITABLE SKILLS */}

<div className="d-flex flex-wrap gap-2">
  {resume.skills.map((skill, index) => (
    <span
      key={index}
      className="badge bg-primary d-inline-flex align-items-center gap-2 w-auto"
    >
      <input
        className="border-0 bg-transparent text-white w-auto"
        value={skill}
        size={skill.length || 1}
        onChange={(e) => {
          const updated = [...resume.skills];
          updated[index] = e.target.value;
          setResume({ ...resume, skills: updated });
        }}
      />

      <button
        type="button"
        className="btn-close btn-close-white btn-sm"
        onClick={() => {
          const updated = resume.skills.filter((_, i) => i !== index);
          setResume({ ...resume, skills: updated });
        }}
      />
    </span>
  ))}
</div>


 {/* Projects */}
        <h5 className="mt-4">Projects</h5>

   {resume.projects.map((proj, index) => (
     <div key={index} className="border p-2 mb-3 rounded">
 
    <input
      className="form-control mb-2"
      placeholder="Title"
      value={proj.title}
      onChange={(e) => {
        const newProj  = [...resume.projects];
        newProj[index].title = e.target.value;
        setResume({ ...resume, projects: newProj });
      }}
    />

    <input
      className="form-control mb-2"
      placeholder="Technology Used"
      value={proj.technology}
      onChange={(e) => {
        const newProj = [...resume.projects];
        newProj[index].technology = e.target.value;
        setResume({ ...resume, projects: newProj });
      }}
    />

    <textarea
      className="form-control"
      placeholder="Description"
      rows="3"
      value={proj.description}
      onChange={(e) => {
        const newProj = [...resume.projects];
        newProj[index].description = e.target.value;
        setResume({ ...resume, projects: newProj });
      }}
    />

  </div>
))}

<button
  className="btn btn-sm btn-outline-primary"
  onClick={() =>
    setResume({
      ...resume,
      projects: [
        ...resume.projects,
        {
          title: "",
          technology: "",
          description: ""
        }
      ]
    })
  }
>
  + Add Project
</button>

{/* Certifications & Achievements*/}
<h5 className="mt-4">Certifications & Achievements</h5>

{resume.certifications.map((cert, index) => (
  <div key={index} className="border p-2 mb-3 rounded">

    <input
      className="form-control mb-2"
      placeholder="Certification Name"
      value={cert.name}
      onChange={(e) => {
        const newCerts = [...resume.certifications];
        newCerts[index].name = e.target.value;
        setResume({ ...resume, certifications: newCerts });
      }}
    />

    <input
      className="form-control mb-2"
      placeholder="Issuing Organization"
      value={cert.organization}
      onChange={(e) => {
        const newCerts = [...resume.certifications];
        newCerts[index].organization = e.target.value;
        setResume({ ...resume, certifications: newCerts });
      }}
    />

    <input
      className="form-control"
      placeholder="Year (optional)"
      value={cert.year}
      onChange={(e) => {
        const newCerts = [...resume.certifications];
        newCerts[index].year = e.target.value;
        setResume({ ...resume, certifications: newCerts });
      }}
    />

  </div>
))}

<button
  className="btn btn-sm btn-outline-primary"
  onClick={() =>
    setResume({
      ...resume,
      certifications: [
        ...resume.certifications,
        { name: "", organization: "", year: "" }
      ]
    })
  }
>
  + Add Certification
</button>

{/* Custom Section */}
<h5 className="mt-4">Custom Sections</h5>

{resume.customSections.map((section, index) => (
  <div key={section.id} className="border p-2 mb-3 rounded">

    <input
      className="form-control mb-2"
      placeholder="Section Title (e.g. Awards)"
      value={section.title}
      onChange={(e) => {
        const updated = [...resume.customSections];
        updated[index].title = e.target.value;
        setResume({ ...resume, customSections: updated });
      }}
    />

    <textarea
      className="form-control"
      placeholder="Section Content"
      rows="3"
      value={section.content}
      onChange={(e) => {
        const updated = [...resume.customSections];
        updated[index].content = e.target.value;
        setResume({ ...resume, customSections: updated });
      }}
    />

  </div>
))}

<button
  className="btn btn-sm btn-outline-primary mb-2"
  onClick={() =>
    setResume({
      ...resume,
      customSections: [
        ...resume.customSections,
        { id: Date.now(), title: "", content: "" }
      ]
    })
  }
>
  + Add Custom Section
</button>


{/*Section Reorder */}
<h5 className="mt-3">Reorder Sections</h5>

<SectionReorder
  sections={sections}
  setSections={setSections}
  darkMode={darkMode}
/>

</div>

 
{/* PREVIEW SECTION */}
    <div className="col-md-6 vh-100 overflow-auto">
    <div className="preview-sticky">

  {/* ✅ HEADING */}
    <h5 className="fw-semibold mb-1">
      Select Resume Template:
    </h5>

  <select
    className="form-select mb-4"
    value={template}
    onChange={(e) => setTemplate(e.target.value)}
  >
    
    <option value="classic">Classic Template</option>
    <option value="modern">Modern Template</option>
    <option value="two-column">Two Column Template</option>
    <option value="ats">ATS-Friendly Template</option>

  </select>

  <div ref={resumeRef}>
    <ResumePreview
  resume={aiPreview ? { ...resume, ...aiPreview } : resume}
  template={template}
  sections={sections}
/>

  </div>

{/* ai rewrite button */}
  <button
  className="btn btn-outline-primary mt-3 w-100"
  onClick={handleAIRewrite}
  disabled={aiLoading}
>
  🤖 Rewrite Resume with AI
</button>

{/* download button */}
  <button
    className="btn btn-success mt-3 w-100"
    onClick={downloadPDF}
  >
    Download Resume as PDF
  </button>


{/* Clear resume button*/}
<button
  className="btn btn-outline-danger mt-3 w-100"
  onClick={clearResume}
  disabled={JSON.stringify(resume) === JSON.stringify(initialResume)}
>
  🗑️ Clear Resume
</button>



</div>
</div>
</div>

{/*  AI MODAL HERE */}
<AIRewriteModal
  preview={aiPreview}
  onApply={applyAIRewrite}
  onClose={() => setAiPreview(null)}
/>


</div>

  );
}

export default Builder;
