import { useState } from "react";
import { Card } from "@/components/ui/card";
import { FileIcon, ImageIcon, VideoIcon } from "lucide-react";

export default function MediaViewer({ src }) {
  const [fileType, setFileType] = useState(getFileType(src));

  function getFileType(url) {
    if (!url) return "unknown";
    const ext = url.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "image";
    if (["mp4", "webm", "ogg"].includes(ext)) return "video";
    return "file";
  }

  return (
    <Card className="p-4 flex items-center justify-center border rounded-lg w-full max-w-md">
      {fileType === "image" ? (
        <img src={src} alt="Media" className="max-w-full max-h-60 rounded-lg" />
      ) : fileType === "video" ? (
        <video controls className="max-w-full max-h-60 rounded-lg">
          <source src={src} type="video/mp4" />
          Trình duyệt không hỗ trợ video.
        </video>
      ) : (
        <div className="flex flex-col items-center">
          <FileIcon className="w-12 h-12 text-gray-500" />
          <p className="text-sm mt-2 text-gray-700">Tệp tin không hiển thị được</p>
        </div>
      )}
    </Card>
  );
}
