import ClassicTemplate from "../templates/ClassicTemplate";
import ModernTemplate from "../templates/ModernTemplate";
import TwoColumnTemplate from "../templates/TwoColumnTemplate";

function ResumePreview({ resume, template, sections }) {
  return (
    <div className="resume-preview light-resume">
      {template === "classic" && (
        <ClassicTemplate resume={resume} sections={sections} />
      )}

      {template === "modern" && (
        <ModernTemplate resume={resume} sections={sections} />
      )}

      {template === "two-column" && (
        <TwoColumnTemplate resume={resume} sections={sections} />
      )}
    </div> 
  );
}

export default ResumePreview;

