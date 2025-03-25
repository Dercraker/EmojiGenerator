'use client';

import { Button } from '@/src/components/ui/button';

export function Hero() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
        Générez des{' '}
        <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Emojis Uniques
        </span>
      </h1>
      <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
        Transformez vos idées en emojis personnalisés grâce à l&apos;IA. Créez
        des emojis uniques et expressifs en quelques secondes.
      </p>
      <div className="flex gap-4">
        <Button variant="outline" size="lg">
          Voir la galerie
        </Button>
      </div>
    </div>
  );
}
