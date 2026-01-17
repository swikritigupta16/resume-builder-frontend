function ClassicTemplate({ resume, sections }) {

  const SectionHeader = ({ title }) => (
    <div className="section-header mt-3 mb-1">
      <strong>{title}</strong>
      <hr className="mt-1 mb-2" />
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
            <ul>
              {resume.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        );

      case "projects":
        return resume.projects?.some(
          p => p.title || p.technology || p.description
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
          c => c.name || c.organization || c.year
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
    <div
      className="border p-4 rounded"
      style={{ fontFamily: "Arial" }}
    >

      {/* HEADER */}
      <h2 className="mb-2">{resume.name || "Your Name"}</h2>
      <h6 className="mb-1">{resume.email}</h6>
      <h6 className="mb-1">{resume.phone}</h6>
      <h6 className="mb-3">{resume.address}</h6>

      {/* Profiles */}
      {resume.profiles.github && (
        <p className="mb-1">
          <strong>GitHub:</strong> <span className="text-break">{resume.profiles.github}</span>
        </p>
      )}

      {resume.profiles.linkedin && (
        <p className="mb-3">
          <strong>LinkedIn:</strong> <span className="text-break">{resume.profiles.linkedin}</span>
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

export default ClassicTemplate;
