export const buildAIPayload = (resume) => ({
  summary: resume.summary?.trim(),

  experience: resume.experience?.map(exp => ({
    company: exp.company,
    role: exp.role,
    duration: exp.duration,
    description: exp.description
  })),

  projects: resume.projects?.map(proj => ({
    title: proj.title,
    technology: proj.technology,
    description: proj.description
  })),

  customSections: resume.customSections?.map(sec => ({
    title: sec.title,
    content: sec.content
  }))
});
