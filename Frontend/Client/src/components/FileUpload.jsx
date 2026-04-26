import React from "react";

function FileUpload({ setText }) {
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target.result);
      };
      reader.readAsText(file);
    } else {
      alert("Only .txt supported for now");
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <input type="file" onChange={handleFile} />
    </div>
  );
}

export default FileUpload;