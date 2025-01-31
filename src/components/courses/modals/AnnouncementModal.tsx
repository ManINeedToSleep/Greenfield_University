import { FaTimes } from "react-icons/fa";
import { FormEvent } from "react";

interface AnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; content: string }) => void;
}

export default function AnnouncementModal({ isOpen, onClose, onSubmit }: AnnouncementModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      title: formData.get('title') as string,
      content: formData.get('content') as string,
    });
  };

  return (
    <div className="fixed top-5 right-5 bottom-5 w-[600px] bg-white rounded-lg shadow-xl z-50">
      <div className="flex flex-col h-full">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800">New Announcement</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes size={24} />
            </button>
          </div>
        </div>
        <div className="p-6 flex-grow overflow-y-auto">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-800">Title</label>
              <input
                name="title"
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-slate-800"
                placeholder="Announcement title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-800">Content</label>
              <textarea
                name="content"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-slate-800"
                rows={4}
                placeholder="Announcement content"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700"
              >
                Post Announcement
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 