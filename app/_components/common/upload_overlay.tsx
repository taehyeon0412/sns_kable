import { useFormStatus } from "react-dom";

export default function UploadLayout() {
  const { pending } = useFormStatus();

  if (!pending) {
    return null;
  }

  return (
    <div className="fixed flex inset-0 items-center justify-center bg-black opacity-50 z-[99]">
      <span className="text-white">업로드 중...</span>
    </div>
  );
}
