import { useRef, useState } from "react";

export default function UploadZone({ onUpload, isLoading }) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    onUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleChange = (e) => {
    handleFile(e.target.files[0]);
  };

  return (
    <div
      className={`
        border-4 border-dashed rounded-2xl p-12 text-center cursor-pointer
        transition-colors duration-200
        ${
          isDragging
            ? "border-stardew-green bg-green-50"
            : "border-stardew-brown bg-stardew-card hover:bg-yellow-50"
        }
        ${isLoading ? "opacity-50 pointer-events-none" : ""}
      `}
      onClick={() => inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleChange}
      />

      {isLoading ? (
        <div className="flex flex-col items-center gap-3">
          <div className="text-4xl animate-bounce">🌱</div>
          <p className="text-stardew-brown font-semibold">분석 중입니다...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <div className="text-5xl">📁</div>
          <p className="text-stardew-brown font-bold text-lg">
            세이브 파일을 여기에 드래그하거나 클릭해서 선택해줘
          </p>
          <p className="text-sm text-gray-500">
            세이브 파일 위치:{" "}
            <code className="bg-gray-100 px-1 rounded">
              %AppData%\StardewValley\Saves\[플레이어명]\
            </code>
          </p>
          <p className="text-xs text-gray-400">확장자 없는 파일 (XML 형식)</p>
        </div>
      )}
    </div>
  );
}
