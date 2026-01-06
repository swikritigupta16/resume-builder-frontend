function ModernTemplate({ resume, sections = [] }) {
  const renderSection = (section) => {
  switch (section) {

    case "summary":
      return resume.summary && (
        <>
          <strong className="mt-4 text-primary">Professional Summary</strong>
          <p align="justify" className="mt-2">{resume.summary}</p>
        </>
      );

    case "education":
      return resume.education?.some(
        edu => edu.degree || edu.institute || edu.year || edu.grade
      ) && (
        <>
          <strong className="mt-3 text-primary">Education</strong>
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
          <strong className="mt-3 text-primary">Experience</strong>
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
          <strong className="mt-4 text-primary">Skills</strong>
          <div className="d-flex flex-wrap gap-2">
            {resume.skills.map((skill, index) => (
              <span key={index} className="badge bg-primary mb-3">
                {skill}
              </span>
            ))}
          </div>
        </>
      );

    case "projects":
      return resume.projects?.some(
        proj => proj.title || proj.technology || proj.description
      ) && (
        <>
          <strong className="mt-3 text-primary">Projects</strong>
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
        cert => cert.name || cert.organization || cert.year
      ) && (
        <>
          <strong className="mt-3 text-primary">Certifications & Achievements</strong>
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
     <h2 className="text-primary mb-2 fw-bold">
        {resume.name || "Your Name"}
      </h2>

    <span className="contact-info">
      {resume.email}
      {resume.phone && <> | {resume.phone}</>}
      {resume.address && <> | {resume.address}</>}
    </span>

    {/* PROFILES (ALWAYS ON TOP, NOT REORDERED) */}
    
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


    {/* REORDERABLE SECTIONS */}
    {sections.map((section) => (
      <div key={section}>
        {renderSection(section)}
      </div>
    ))}

  </div>
);

}

export default ModernTemplate;
