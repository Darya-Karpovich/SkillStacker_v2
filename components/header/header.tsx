'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '../ui/button';

import { ThemeToggle } from './theme-toggle';

export const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div className="flex items-center justify-between py-4">
      <Link href="/">Skill-Stacker</Link>
      <div className="flex items-center gap-2">
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{session.user?.name}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onClick={() => router.push(`/profile/${session.user?.id}`)}
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => signIn()}>Sign In</Button>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
};
