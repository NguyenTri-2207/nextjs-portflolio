import React from "react";
import PropTypes from "prop-types";
import Project from "components/organisms/Project";

function ProjectTemplate({ data }) {
  return (
    <div className="lg:pl-[84px]">
      <Project data={data} />
    </div>
  );
}

ProjectTemplate.propTypes = {};

export default ProjectTemplate;
