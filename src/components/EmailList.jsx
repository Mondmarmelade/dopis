import React, { useState, useEffect } from "react";
import PostalMime from "postal-mime";
import DOMPurify from "dompurify";

const EmailList = () => {
  const [email, setEmail] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/emails")
      .then((response) => response.json())
      .then((data) => PostalMime.parse(data.content))
      .then((email) => DOMPurify.sanitize(email.html))
      .then((cleanEmailHTML) => {
        console.log(cleanEmailHTML);

        setEmail(cleanEmailHTML);
        setLoading(false);
      });

    //   Error handling!!
  }, []);

  if (loading) return <div>Loading emails...</div>;

  return <div dangerouslySetInnerHTML={{ __html: email }} />;
};

export default EmailList;
