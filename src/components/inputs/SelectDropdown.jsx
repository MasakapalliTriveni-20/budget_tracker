import React from "react";

const SelectDropdown = ({ label, options, ...props }) => (
  <div>
    <label>{label}</label>
    <select {...props}>
      {options.map((opt, idx) => (
        <option key={idx} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export default SelectDropdown;
