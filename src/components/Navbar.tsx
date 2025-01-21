import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Greenfield University</h1>
        <ul className="flex gap-4">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/visit">Visit</Link></li>
          <li><Link href="/admissions">Admissions</Link></li>
          <li><Link href="/faq">FAQ</Link></li>
          <li><Link href="/policies">Policies</Link></li>
        </ul>
      </nav>
    </header>
  );
}
