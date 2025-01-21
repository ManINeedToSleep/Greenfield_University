export default function EventCard({ title, date }: { title: string; date: string }) {
    return (
      <div className="p-4 bg-white shadow-md rounded-md">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-gray-600">{date}</p>
      </div>
    );
  }
  