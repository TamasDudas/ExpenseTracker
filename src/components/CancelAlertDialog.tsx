import {
 AlertDialog,
 AlertDialogAction,
 AlertDialogCancel,
 AlertDialogContent,
 AlertDialogDescription,
 AlertDialogFooter,
 AlertDialogHeader,
 AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface CancelAlertDialogProps {
 open: boolean;
 onOpenChange: (open: boolean) => void;
 onDelete: () => void;
}

export function CancelAlertDialog({
 open,
 onOpenChange,
 onDelete,
}: CancelAlertDialogProps) {
 return (
  <AlertDialog open={open} onOpenChange={onOpenChange}>
   <AlertDialogContent>
    <AlertDialogHeader>
     <AlertDialogTitle>Biztosan törölni szeretnéd?</AlertDialogTitle>
     <AlertDialogDescription>
      Ez a művelet nem vonható vissza.
     </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
     <AlertDialogCancel>Mégsem</AlertDialogCancel>
     <AlertDialogAction onClick={onDelete} className="bg-red-500">
      Törlés
     </AlertDialogAction>
    </AlertDialogFooter>
   </AlertDialogContent>
  </AlertDialog>
 );
}
