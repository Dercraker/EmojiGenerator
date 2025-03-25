import { EmojiForm } from '@/src/components/EmojiForm';
import { Hero } from '@/src/components/hero';

export default function Home() {
  return (
    <main className="container mx-auto">
      <Hero />
      <EmojiForm />
    </main>
  );
}
