import * as React from 'react';
import { View, ViewProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { Text } from './text';

function cn(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

const alertVariants = cva(
  'relative w-full rounded-lg border p-4',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface AlertProps extends ViewProps, VariantProps<typeof alertVariants> {
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

const Alert = React.forwardRef<View, AlertProps>(
  ({ className, variant, icon: Icon, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {Icon && (
          <Icon size={16} className="h-4 w-4" />
        )}
        {children}
      </View>
    );
  }
);
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };