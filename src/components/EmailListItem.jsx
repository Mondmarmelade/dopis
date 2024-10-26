import React, { useState, useEffect } from "react";
import "../styles/EmailListItem.css";

const EmailListItem = ({ element }) => {
  return (
    <div className="email-list-item" style={{ width: "100%" }}>
      <img
        src={`https://logo.clearbit.com/${
          element.envelope.from[0].address.split("@")[1]
        }`}
      />
      {/* <input type="checkbox"></input> */}
      <p className="address">
        {element.envelope.from[0].name !== ""
          ? element.envelope.from[0].name
          : element.envelope.from[0].address}
      </p>
      <p>{element.envelope.subject}</p>
    </div>
  );
};

export default EmailListItem;
