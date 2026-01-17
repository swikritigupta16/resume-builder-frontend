function TwoColumnModernTemplate({ resume, sections = [] }) {

  const SectionHeader = ({ title }) => (
    <div className="section-header mt-4 mb-2">
      <strong className="text-primary">{title}</strong>
    </div>
  );

  const renderSection = (section) => {
    switch (section) {

      case "summary":
        return resume.summary && (
          <div className="resume-section">
            <SectionHeader title="Professional Summary" />
            <p>{resume.summary}</p>
          </div>
        );

      case "education":
        return resume.education?.some(
          edu => edu.degree || edu.institute || edu.year || edu.grade
        ) && (
          <div className="resume-section">
            <SectionHeader title="Education" />
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
          </div>
        );

      case "experience":
        return resume.experience?.some(
          exp => exp.company || exp.role || exp.duration || exp.description
        ) && (
          <div className="resume-section">
            <SectionHeader title="Experience" />
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
          </div>
        );

      case "skills":
        return resume.skills?.length > 0 && (
          <div className="resume-section">
            <SectionHeader title="Skills" />
            <p className="mb-0">{resume.skills.join(", ")}</p>
          </div>
        );

      case "projects":
        return resume.projects?.some(
          proj => proj.title || proj.technology || proj.description
        ) && (
          <div className="resume-section">
            <SectionHeader title="Projects" />
            {resume.projects.map((proj, index) => (
              (proj.title || proj.technology || proj.description) && (
                <div key={index} className="mb-3">
                  <strong>{proj.title}</strong>
                  {proj.technology && <> – {proj.technology}</>}
                  <p className="mb-0">{proj.description}</p>
                </div>
              )
            ))}
          </div>
        );

      case "certifications":
        return resume.certifications?.some(
          cert => cert.name || cert.organization || cert.year
        ) && (
          <div className="resume-section">
            <SectionHeader title="Certifications" />
            {resume.certifications.map((cert, index) => (
              (cert.name || cert.organization || cert.year) && (
                <div key={index} className="mb-2">
                  <strong>{cert.name}</strong>
                  {cert.organization && <> – {cert.organization}</>}
                  {cert.year && <> ({cert.year})</>}
                </div>
              )
            ))}
          </div>
        );

      case "custom":
        return resume.customSections?.some(
          sec => sec.title || sec.content
        ) && (
          <div className="resume-section">
            {resume.customSections.map(sec => (
              <div key={sec.id}>
                <SectionHeader title={sec.title} />
                <p>{sec.content}</p>
              </div>
            ))}
          </div>
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
          <span className="text-break">{resume.profiles.github}</span>
        </p>
      )}

      {resume.profiles.linkedin && (
        <p className="mb-3">
          <strong>LinkedIn:</strong>{" "}
          <span className="text-break">{resume.profiles.linkedin}</span>
        </p>
      )}

      {/* ================= TWO COLUMNS ================= */}
      <div className="row">

        {/* LEFT COLUMN */}
        <div className="col-5">
          {sections
            .filter(sec => ["skills", "certifications", "custom"].includes(sec))
            .map(section => (
              <div key={section}>
                {renderSection(section)}
              </div>
            ))}
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-7">
          {sections
            .filter(sec =>
              ["summary", "experience", "education", "projects"].includes(sec)
            )
            .map(section => (
              <div key={section}>
                {renderSection(section)}
              </div>
            ))}
        </div>

      </div>
    </div>
  );
}

export default TwoColumnModernTemplate;
