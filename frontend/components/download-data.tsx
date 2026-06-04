"use client";

export default function DownloadData() {

  const downloadFile = async () => {

    const response = await fetch(
      "http://127.0.0.1:8000/api/replay"
    );

    const data = await response.json();

    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      {
        type: "application/json",
      }
    );

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "event_sequence.json";

    link.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={downloadFile}
      className="
        w-full
        rounded-xl
        border
        border-cyan-400
        bg-[#0B1117]
        p-3
        text-white
        transition
        hover:bg-cyan-950
      "
    >
      Download Sample Data
    </button>
  );
}