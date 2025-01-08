import React from "react";

const JobItem = ({ job }) => {
  return (
    <div className="job-item p-3 mb-3 border rounded">
      <div className="d-flex justify-content-between align-items-center">
        <h5>{job.title}</h5>
        <span>{job.salary}</span>
      </div>
      <p>
        {job.company} — {job.location}
      </p>
      <div>
        {job.tags.map((tag, index) => (
          <span key={index} className="badge bg-secondary mx-1">
            {tag}
          </span>
        ))}
      </div>
      <small>{job.posted}</small>
    </div>
  );
};

export default JobItem;
