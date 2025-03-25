'use client';

import Link from 'next/link';

export function NavBar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">EmojiGenerator</span>
        </Link>
      </div>
    </nav>
  );
}
