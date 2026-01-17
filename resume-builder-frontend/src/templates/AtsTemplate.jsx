function AtsTemplate({ resume, sections = [] }) {

  const SectionHeader = ({ title }) => (
    <div className="section-header mt-4 mb-1">
      <h5 className="text-primary fw-bold mb-1">{title}</h5>
      <hr className="mt-0 mb-1 text-primary border-1 opacity-100 " />
    </div>
  );

  const renderSection = (section) => {
    switch (section) {

      /* SUMMARY */
      case "summary":
        return resume.summary && (
          <div className="resume-section">
            <SectionHeader title="Summary" />
            <p align="justify">{resume.summary}</p>
          </div>
        );

      /* EXPERIENCE */
      case "experience":
        return resume.experience?.some(
          exp => exp.company || exp.role || exp.duration || exp.description
        ) && (
          <div className="resume-section">
            <SectionHeader title="Work Experience" />
            {resume.experience.map((exp, i) => (
              <div key={i} className="mb-3">

                <div className="d-flex justify-content-between fw-semibold">
                  <span>{exp.company}</span>
                  <span>{exp.duration}</span>
                </div>

                <div className="fst-italic mb-1">
                  {exp.role}
                </div>

                {exp.description && (
                  <ul className="mb-1">
                    <li>{exp.description}</li>
                  </ul>
                )}
              </div>
            ))}
          </div>
        );

      /* EDUCATION */
      case "education":
        return resume.education?.some(
          edu => edu.degree || edu.institute || edu.year || edu.grade
        ) && (
          <div className="resume-section">
            <SectionHeader title="Education" />
            {resume.education.map((edu, i) => (
              <div key={i} className="mb-2">

                <div className="d-flex justify-content-between fw-semibold">
                  <span>{edu.degree}</span>
                  <span>{edu.year}</span>
                </div>

                <div>{edu.institute}</div>

                {edu.grade && (
                  <div className="small">
                    Grade: {edu.grade}
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      /* SKILLS */
case "skills":
  return resume.skills?.length > 0 && (
    <div className="resume-section">
      <SectionHeader title="Key Skills" />

      <div className="row">
        {resume.skills.map((skill, index) => (
          <div
            key={index}
            className="col-4 col-md-3 mb-2"
          >
            • {skill}
          </div>
        ))}
      </div>
    </div>
  );


      /* PROJECTS */
      case "projects":
        return resume.projects?.some(
          proj => proj.title || proj.description
        ) && (
          <div className="resume-section">
            <SectionHeader title="Projects" />
            {resume.projects.map((proj, i) => (
              <div key={i} className="mb-2">
                <strong>{proj.title}</strong>
                {proj.technology && <> – {proj.technology}</>}
                <p className="mb-1">{proj.description}</p>
              </div>
            ))}
          </div>
        );

      /* CERTIFICATIONS */
      case "certifications":
        return resume.certifications?.some(
          cert => cert.name || cert.organization
        ) && (
          <div className="resume-section">
            <SectionHeader title="Certifications & Achievements" />
            {resume.certifications.map((cert, i) => (
              <div key={i} className="mb-2">
                <strong>{cert.name}</strong>
                {cert.organization && <> – {cert.organization}</>}
                {cert.year && <> ({cert.year})</>}
              </div>
            ))}
          </div>
        );

      /* CUSTOM SECTIONS */
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
      className="border p-4"
      style={{
     fontFamily: "Arial, Helvetica, sans-serif",
     fontSize: "14px",
     lineHeight: "1.6"
}}

    >

      {/* HEADER */}
      <div className="text-center mb-3">

        <h2 className="fw-bold text-primary mb-1" style={{ letterSpacing: "1px" }}>
          {resume.name || "YOUR NAME"}
        </h2>

        {resume.title && (
          <div className="fst-arial mb-2">
            {resume.title}
          </div>
        )}

        <>
          {resume.address}
          {resume.phone && <> | {resume.phone}</>}
          {resume.email && <> | {resume.email}</>}
        </>

        <div className="medium">
          {resume.profiles?.linkedin && <> {resume.profiles.linkedin} | </>}
          {resume.profiles?.github && <> {resume.profiles.github}</>}
        </div>

      </div>

      {/* REORDERABLE SECTIONS */}
      {sections.map(section => (
        <div key={section} >
          {renderSection(section)}
        </div>
      ))}

    </div>
  );
}

export default AtsTemplate;
