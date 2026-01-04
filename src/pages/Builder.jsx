import { useState } from "react";
import ResumePreview from "../components/ResumePreview";
import "../App.css";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import SectionReorder from "../components/SectionReorder";


 function Builder({ darkMode, setDarkMode }) {
  const resumeRef = useRef();

  const [template, setTemplate] = useState("classic"); // ✅ FIXED

  const [resume, setResume] = useState({
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
    { name: "", organization: "", year: "" }
]
  });

{/* DND kit - Drag and drop state  */}
const [sections, setSections] = useState([
  "summary",
  "education",
  "experience",
  "skills",
  "projects",
  "certifications"
]);



  {/* PDF Download */}
 
  const downloadPDF = async () => {
  const element = resumeRef.current;
  const appRoot = document.querySelector(".dark-mode");

  // 1️⃣ Temporarily disable dark mode (UI)
  if (appRoot) {
    appRoot.classList.remove("dark-mode");
  }

  // 2️⃣ Force light styles only for resume
  element.classList.add("force-light");

  // Give browser time to apply styles
  await new Promise((resolve) => setTimeout(resolve, 200));

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgHeight = (canvas.height * pageWidth) / canvas.width;
  let heightLeft = imgHeight;
  let position = 0;

  // 3️⃣ First page
  pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
  heightLeft -= pageHeight;

  // 4️⃣ Extra pages (if resume is long)
  while (heightLeft > 0) {
    position -= pageHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save("Resume.pdf");

  // 5️⃣ Restore UI state
  element.classList.remove("force-light");
  if (appRoot) {
    appRoot.classList.add("dark-mode");
  }
};




{/* UI Rendering */}
  return (
    
    <div className="container mt-4">

 {/* DARK MODE TOGGLE  */}
    <div className="d-flex justify-content-end mb-3">
      <button
        className="btn btn-sm btn-outline-secondary"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
      </button>
    </div>
        
      <div className="row">

 {/* FORM SECTION */}

       <div
  className="col-md-6 overflow-auto"
  style={{ height: "100vh" }}
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

 <h5 className="mt-4">Skills</h5>

{/* ADD SKILL */}
<input
  className="form-control mb-3"
  placeholder="Add skill & press Enter / Done"
  enterKeyHint="done"
  onKeyDown={(e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      setResume({
        ...resume,
        skills: [...resume.skills, e.target.value.trim()],
      });
      e.target.value = "";
    }
  }}
  onBlur={(e) => {
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
      className="badge bg-primary d-flex align-items-center gap-2"
    >
      <input
        className="border-0 bg-transparent text-white"
        style={{ width: "auto", minWidth: "40px" }}
        value={skill}
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

<h5 className="mt-3">Reorder Sections</h5>

<SectionReorder
  sections={sections}
  setSections={setSections}
/>

        </div>

 

  {/* PREVIEW SECTION */}
        <div className="col-md-6">
      <div className="preview-sticky">

  {/* ✅ HEADING */}
    <h5 className="fw-semibold mb-1 text-dark">
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

  </select>

  <div ref={resumeRef}>
    <ResumePreview resume={resume} template={template} sections={sections}/>
  </div>

  <button
    className="btn btn-success mt-3 w-100"
    onClick={downloadPDF}
  >
    Download Resume as PDF
  </button>

</div>
</div>
</div>
</div>
  );
}

export default Builder;
