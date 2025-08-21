// components/Footer.tsx
"use client";

export default function Footer() {
  return (
    <footer className="bg-surface py-13 text-center text-sm text-white">
      <div className="container mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} Ngodingin. All rights reserved.</p>
      </div>
    </footer>
  );
}
