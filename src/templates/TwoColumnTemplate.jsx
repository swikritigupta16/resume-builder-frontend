function TwoColumnModernTemplate({ resume, sections = [] }) {

  const renderSection = (section) => {
    switch (section) {

      case "summary":
        return resume.summary && (
          <>
            <strong className="mt-3 text-primary">Professional Summary</strong>
            <p>{resume.summary}</p>
          </>
        );

      case "education":
        return resume.education?.some(
          edu => edu.degree || edu.institute || edu.year || edu.grade
        ) && (
          <>
            <strong className="mt-3 text-primary">Education</strong>
            {resume.education.map((edu, index) => (
              (edu.degree || edu.institute || edu.year || edu.grade) && (
                <div key={index} className="mb-2">
                  <strong>{edu.degree}</strong>
                  {edu.grade && <> – Grade: {edu.grade}</>}
                  <br />
                  {edu.institute}
                  {edu.year && <> , {edu.year}</>}
                </div>
              )
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
              (exp.company || exp.role || exp.duration || exp.description) && (
                <div key={index} className="mb-3">
                  <strong>{exp.role}</strong>
                  {exp.company && <> – {exp.company}</>}
                  <br />
                  {exp.duration && <small>{exp.duration}</small>}
                  {exp.description && <p className="mb-0">{exp.description}</p>}
                </div>
              )
            ))}
          </>
        );

      case "skills":
        return resume.skills?.length > 0 && (
          <>
            <strong className="mt-3 text-primary">Skills</strong>
            <p className="mb-2">
              {resume.skills.join(", ")}
            </p>
          </>
        );

      case "projects":
        return resume.projects?.some(
          proj => proj.title || proj.technology || proj.description
        ) && (
          <>
            <strong className="mt-3 text-primary">Projects</strong>
            {resume.projects.map((proj, index) => (
              (proj.title || proj.technology || proj.description) && (
                <div key={index} className="mb-3">
                  <strong>{proj.title}</strong>
                  {proj.technology && <> – {proj.technology}</>}
                  <p className="mb-0">{proj.description}</p>
                </div>
              )
            ))}
          </>
        );

      case "certifications":
        return resume.certifications?.some(
          cert => cert.name || cert.organization || cert.year
        ) && (
          <>
            <strong className="mt-3 text-primary">Certifications</strong>
            {resume.certifications.map((cert, index) => (
              (cert.name || cert.organization || cert.year) && (
                <div key={index} className="mb-2">
                  <strong>{cert.name}</strong>
                  {cert.organization && <> – {cert.organization}</>}
                  {cert.year && <> ({cert.year})</>}
                </div>
              )
            ))}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="border rounded p-4" style={{ fontFamily: "Arial" }}>

      {/* ================= HEADER ================= */}
      <h2 className="text-primary mb-1">
        {resume.name || "Your Name"}
      </h2>

      <span className="mb-2 text-break">
        {resume.email}
        {resume.phone && <> | {resume.phone}</>}
        {resume.address && <> | {resume.address}</>}
      </span>

      {/* ================= PROFILES ================= */}
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

      {/* ================= TWO COLUMNS ================= */}
      <div className="row">

  {/* LEFT COLUMN */}
  <div className="col-5 col-md-5">
    {sections
      .filter(sec => ["skills", "certifications"].includes(sec))
      .map(section => (
        <div key={section} className="mb-3">
          {renderSection(section)}
        </div>
      ))}
  </div>

  {/* RIGHT COLUMN */}
  <div className="col-7 col-md-7">
    {sections
      .filter(sec =>
        ["summary", "experience", "education", "projects"].includes(sec)
      )
      .map(section => (
        <div key={section} className="mb-3">
          {renderSection(section)}
        </div>
      ))}
  </div>

</div>

    </div>
  );
}

export default TwoColumnModernTemplate;
