import React from "react";

const Input = ({
  id,
  label,
  labelAfterStr,
  wrprClsName = "",
  onChange,
  ComponentBelowInput, //usefull if we wanna place some text
  ...rest
}) => {
  return (
    <div className={`mb-3 ${wrprClsName}`}>
      <label
        htmlFor={id}
        className="label-grey d-inline-block mb-1"
        style={{ letterSpacing: 0.45, fontSize: "0.75rem" }}
      >
        {label}
        <span className="text-secondary"> (*)</span>
        {labelAfterStr}
      </label>
      <input
        id={id}
        className="d-block py-1 px-3"
        style={{ borderRadius: "3px" }}
        required
        onChange={onChange}
        {...rest}
      />
      {ComponentBelowInput}
    </div>
  );
};

export default Input;
