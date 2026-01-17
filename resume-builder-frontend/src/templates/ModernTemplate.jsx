function ModernTemplate({ resume, sections = [] }) {

  const SectionHeader = ({ title }) => (
    <div className="section-header mt-4 mb-2">
      <strong className="text-primary">{title}</strong>
      <hr className="mt-1 mb-2 text-primary opacity-100" />
    </div>
  );

  const renderSection = (section) => {
    switch (section) {

      case "summary":
        return resume.summary && (
          <div className="resume-section">
            <SectionHeader title="Professional Summary" />
            <p align="justify">{resume.summary}</p>
          </div>
        );

      case "education":
        return resume.education?.some(
          edu => edu.degree || edu.institute || edu.year || edu.grade
        ) && (
          <div className="resume-section">
            <SectionHeader title="Education" />
            {resume.education.map((edu, index) => (
              <div key={index} className="mb-2">
                <strong>{edu.degree}</strong>
                {edu.grade && <> – Grade: {edu.grade}</>}
                <br />
                {edu.institute}
                {edu.year && <> , {edu.year}</>}
              </div>
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
              <div key={index} className="mb-3">
                <strong>{exp.role}</strong>
                {exp.company && <> – {exp.company}</>}
                <br />
                {exp.duration && <small>{exp.duration}</small>}
                {exp.description && <p>{exp.description}</p>}
              </div>
            ))}
          </div>
        );

      case "skills":
        return resume.skills?.length > 0 && (
          <div className="resume-section">
            <SectionHeader title="Skills" />
            <div className="d-flex flex-wrap gap-2">
              {resume.skills.map((skill, index) => (
                <span key={index} className="badge bg-primary">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        );

      case "projects":
        return resume.projects?.some(
          proj => proj.title || proj.technology || proj.description
        ) && (
          <div className="resume-section">
            <SectionHeader title="Projects" />
            {resume.projects.map((proj, index) => (
              <div key={index} className="mb-3">
                <strong>{proj.title}</strong>
                {proj.technology && <> – {proj.technology}</>}
                <p>{proj.description}</p>
              </div>
            ))}
          </div>
        );

      case "certifications":
        return resume.certifications?.some(
          cert => cert.name || cert.organization || cert.year
        ) && (
          <div className="resume-section">
            <SectionHeader title="Certifications & Achievements" />
            {resume.certifications.map((cert, index) => (
              <div key={index} className="mb-2">
                <strong>{cert.name}</strong>
                {cert.organization && <> – {cert.organization}</>}
                {cert.year && <> ({cert.year})</>}
              </div>
            ))}
          </div>
        );

      case "custom":
  return resume.customSections.some(
    sec => sec.title?.trim() || sec.content?.trim()
  ) && (
    <div className="resume-section">
      {resume.customSections
        .filter(sec => sec.title?.trim() || sec.content?.trim())
        .map(sec => (
          <div key={sec.id} className="mb-2">
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

      {/* PROFILES */}
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

      {/* SECTIONS */}
      {sections.map(section => (
        <div key={section}>
          {renderSection(section)}
        </div>
      ))}

    </div>
  );
}

export default ModernTemplate;
