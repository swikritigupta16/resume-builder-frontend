function ClassicTemplate({ resume, sections }) {
  const renderSection = (section) => {
  switch (section) {
    case "summary":
      return resume.summary && (
        <>
           <strong className="mt-3">Professional Summary  </strong>
          <p align="justify" className="mb-3 mt-2">{resume.summary}</p>
        </>
      );

    case "education":
      return resume.education?.some(
        edu => edu.degree || edu.institute || edu.year || edu.grade
      ) && (
        <>
          <strong className="mt-3">Education</strong>
          {resume.education.map((edu, index) => (
            <div key={index} className="mb-2">
              <strong>{edu.degree}</strong>
              {edu.grade && <> – Grade: {edu.grade}</>}
              <br />
              {edu.institute}
              {edu.year && <> , {edu.year}</>}
            </div>
          ))}
        </>
      );

    case "experience":
      return resume.experience?.some(
        exp => exp.company || exp.role || exp.duration || exp.description
      ) && (
        <>
          <strong className="mt-3">Experience</strong>
          {resume.experience.map((exp, index) => (
            <div key={index} className="mb-3">
              <strong>{exp.role}</strong>
              {exp.company && <> – {exp.company}</>}
              <br />
              {exp.duration && <small>{exp.duration}</small>}
              {exp.description && <p>{exp.description}</p>}
            </div>
          ))}
        </>
      );

    case "skills":
      return resume.skills?.length > 0 && (
        <>
          <strong className="mt-3">Skills</strong>
          <ul>
            {resume.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </>
      );

    case "projects":
      return resume.projects?.some(
        p => p.title || p.technology || p.description
      ) && (
        <>
          <strong className="mt-3">Projects</strong>
          {resume.projects.map((proj, index) => (
            <div key={index} className="mb-3">
              <strong>{proj.title}</strong>
              {proj.technology && <> – {proj.technology}</>}
              <p>{proj.description}</p>
            </div>
          ))}
        </>
      );

    case "certifications":
      return resume.certifications?.some(
        c => c.name || c.organization || c.year
      ) && (
        <>
          <strong className="mt-3">Certifications & Achievements</strong>
          {resume.certifications.map((cert, index) => (
            <div key={index} className="mb-3">
              <strong>{cert.name}</strong>
              {cert.organization && <> – {cert.organization}</>}
              {cert.year && <> ({cert.year})</>}
            </div>
          ))}
        </>
      );

    default:
      return null;
  }
};


      return (
  <div className="border p-4 rounded" style={{ fontFamily: "Arial" }}>

    {/* HEADER */}
    <h2 className="mb-1">{resume.name || "Your Name"}</h2>
    <p className="mb-1">{resume.email}</p>
    <p className="mb-1">{resume.phone}</p>
    <p className="mb-3">{resume.address}</p>
   
    {/* Profiles (ALWAYS ON TOP) */}
 {resume.profiles.github && (
  <p className="mb-1">
    <strong>GitHub:</strong>{" "}
    <span className="text-break">
      {resume.profiles.github}
    </span>
  </p>
)}

{resume.profiles.linkedin && (
  <p className="mb-3">
    <strong>LinkedIn:</strong>{" "}
    <span className="text-break">
      {resume.profiles.linkedin}
    </span>
  </p>
)}


    {/* SECTION REORDER RENDER */}
    {sections.map((section) => (
      <div key={section}>
        {renderSection(section)}
      </div>
    ))}

  </div>
);
}

export default ClassicTemplate;
