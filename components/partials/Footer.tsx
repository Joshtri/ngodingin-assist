// components/Footer.tsx
"use client";

export default function Footer() {
  return (
    <footer className="bg-surface py-12 text-center text-lg text-white">
      <div className="container mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} Ngodingin. All rights reserved.</p>
      </div>
    </footer>
  );
}
