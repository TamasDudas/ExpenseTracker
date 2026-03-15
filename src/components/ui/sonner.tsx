import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';
import {
 CircleCheckIcon,
 InfoIcon,
 TriangleAlertIcon,
 OctagonXIcon,
 Loader2Icon,
} from 'lucide-react';

const Toaster = ({ ...props }: ToasterProps) => {
 const { theme = 'system' } = useTheme();

 return (
  <Sonner
   theme={theme as ToasterProps['theme']}
   className="toaster group"
   richColors
   icons={{
    success: <CircleCheckIcon className="size-4" />,
    info: <InfoIcon className="size-4" />,
    warning: <TriangleAlertIcon className="size-4" />,
    error: <OctagonXIcon className="size-4" />,
    loading: <Loader2Icon className="size-4 animate-spin" />,
   }}
   style={
    {
     '--normal-bg': 'var(--popover)',
     '--normal-text': 'var(--popover-foreground)',
     '--normal-border': 'var(--border)',
     '--border-radius': 'var(--radius)',
     '--success-bg': 'oklch(0.485 0.147 142.5)',
     '--success-text': 'oklch(1 0 0)',
     '--success-border': 'oklch(0.485 0.147 142.5)',
     '--error-bg': 'oklch(0.58 0.22 27)',
     '--error-text': 'oklch(1 0 0)',
     '--error-border': 'oklch(0.58 0.22 27)',
    } as React.CSSProperties
   }
   toastOptions={{
    classNames: {
     toast: 'cn-toast',
    },
   }}
   {...props}
  />
 );
};

export { Toaster };
