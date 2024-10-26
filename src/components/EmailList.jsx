import React, { useState, useEffect } from "react";
import EmailListItem from "./EmailListItem";

const EmailList = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/emails")
      .then((response) => response.json())
      .then((data) => {
        setEmails(data.msgs);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading emails...</div>;

  return (
    <div
      style={{
        overflowY: "scroll",
        height: "100vh",
        overflowX: "clip",
      }}
    >
      {emails.map((element) => {
        return <EmailListItem element={element} />;
      })}
    </div>
  );
};

export default EmailList;
