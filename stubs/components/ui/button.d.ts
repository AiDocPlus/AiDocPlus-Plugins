/**
 * Stub: @/components/ui/button
 */
import type { ComponentPropsWithoutRef } from 'react';

export declare const Button: React.ForwardRefExoticComponent<
  ComponentPropsWithoutRef<'button'> & {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    asChild?: boolean;
  } & React.RefAttributes<HTMLButtonElement>
>;
