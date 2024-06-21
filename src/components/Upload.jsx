import { useState } from "react";
import axios from "axios";
import { Circles } from "react-loader-spinner";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isClearEnabled, setIsClearEnabled] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    console.log("Upload button clicked");
    if (!selectedFile) {
      setUploadMessage("Please select a file to upload.");
      // console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setIsLoading(true);
    setUploadMessage("");

    try {
      const response = await axios.post(
        "/api/sheetmetadata/UploadExcel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadMessage(`File uploaded successfully: ${response.data.fileName}`);
      // console.log("Upload successful:", response.data.fileName);
      setIsClearEnabled(true);
    } catch (error) {
      setUploadMessage(`Error uploading file: ${error.message}`);
      // console.error("Upload error:", error.message);
    } finally {
      setIsLoading(false);
      // console.log("Upload finished");
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setUploadMessage("");
    setIsClearEnabled(false);
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center gap-4">
      <form onSubmit={handleUpload} className="flex flex-col items-center">
        <input
          type="file"
          onChange={handleFileChange}
          className="border-2 border-gray-300 p-2 mb-4"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="border-2 bg-blue-500 text-white p-2"
          disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Upload File"}
        </button>
      </form>
      {isLoading && (
        <div className="mt-4 ">
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
      {uploadMessage && <p className="mt-4 text-green-500">{uploadMessage}</p>}

      <button
        onClick={handleClear}
        className={`border-2 text-white p-2 mt-4 ${isClearEnabled ? "bg-red-500" : "bg-gray-500"}`}
        disabled={!isClearEnabled}
      >
        Clear
      </button>
    </div>
  );
};

export default Upload;