import * as AccordionPrimitive from '@rn-primitives/accordion';
import * as React from 'react';
import { Platform, Pressable, View } from 'react-native';
import { ChevronDown } from '../../lib/icons/ChevronDown';
import { TextClassContext } from './text';

// Simple cn utility function
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Conditionally import Reanimated only for native platforms
let Animated: any = null;
let LayoutAnimationConfig: any = null;
let LinearTransition: any = null;
let FadeIn: any = null;
let FadeOutUp: any = null;
let useAnimatedStyle: any = null;
let useDerivedValue: any = null;
let withTiming: any = null;
let interpolate: any = null;
let Extrapolation: any = null;

if (Platform.OS !== 'web') {
  const ReanimatedModule = require('react-native-reanimated');
  Animated = ReanimatedModule.default;
  LayoutAnimationConfig = ReanimatedModule.LayoutAnimationConfig;
  LinearTransition = ReanimatedModule.LinearTransition;
  FadeIn = ReanimatedModule.FadeIn;
  FadeOutUp = ReanimatedModule.FadeOutUp;
  useAnimatedStyle = ReanimatedModule.useAnimatedStyle;
  useDerivedValue = ReanimatedModule.useDerivedValue;
  withTiming = ReanimatedModule.withTiming;
  interpolate = ReanimatedModule.interpolate;
  Extrapolation = ReanimatedModule.Extrapolation;
}

function Accordion({
  children,
  ...props
}: Omit<AccordionPrimitive.RootProps, 'asChild'> & {
  ref?: React.RefObject<AccordionPrimitive.RootRef>;
}) {
  if (Platform.OS === 'web') {
    return (
      <AccordionPrimitive.Root
        {...(props as AccordionPrimitive.RootProps)}
        asChild={false}
      >
        <View>{children}</View>
      </AccordionPrimitive.Root>
    );
  }

  return (
    <LayoutAnimationConfig skipEntering>
      <AccordionPrimitive.Root
        {...(props as AccordionPrimitive.RootProps)}
        asChild={true}
      >
        <Animated.View layout={LinearTransition.duration(200)}>{children}</Animated.View>
      </AccordionPrimitive.Root>
    </LayoutAnimationConfig>
  );
}

function AccordionItem({
  className,
  value,
  ...props
}: AccordionPrimitive.ItemProps & {
  ref?: React.RefObject<AccordionPrimitive.ItemRef>;
}) {
  if (Platform.OS === 'web') {
    return (
      <View className={'overflow-hidden'}>
        <AccordionPrimitive.Item
          className={cn('border-b border-border', className)}
          value={value}
          {...props}
        />
      </View>
    );
  }

  return (
    <Animated.View className={'overflow-hidden'} layout={LinearTransition.duration(200)}>
      <AccordionPrimitive.Item
        className={cn('border-b border-border', className)}
        value={value}
        {...props}
      />
    </Animated.View>
  );
}

const Trigger = Platform.OS === 'web' ? View : Pressable;

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.TriggerProps & {
  children?: React.ReactNode;
  ref?: React.RefObject<AccordionPrimitive.TriggerRef>;
}) {
  const { isExpanded } = AccordionPrimitive.useItemContext();

  if (Platform.OS === 'web') {
    return (
      <TextClassContext.Provider value='native:text-lg font-medium web:group-hover:underline'>
        <AccordionPrimitive.Header className='flex'>
          <AccordionPrimitive.Trigger {...props} asChild>
            <Trigger
              className={cn(
                'flex flex-row web:flex-1 items-center justify-between py-4 web:transition-all group web:focus-visible:outline-none web:focus-visible:ring-1 web:focus-visible:ring-muted-foreground',
                className
              )}
            >
              {children}
              <View 
                className={cn(
                  'transition-transform duration-200',
                  isExpanded ? 'rotate-180' : 'rotate-0'
                )}
              >
                <ChevronDown size={18} className={'text-foreground shrink-0'} />
              </View>
            </Trigger>
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
      </TextClassContext.Provider>
    );
  }

  const progress = useDerivedValue(() =>
    isExpanded ? withTiming(1, { duration: 250 }) : withTiming(0, { duration: 200 })
  );
  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 180}deg` }],
    opacity: interpolate(progress.value, [0, 1], [1, 0.8], Extrapolation.CLAMP),
  }));

  return (
    <TextClassContext.Provider value='native:text-lg font-medium web:group-hover:underline'>
      <AccordionPrimitive.Header className='flex'>
        <AccordionPrimitive.Trigger {...props} asChild>
          <Trigger
            className={cn(
              'flex flex-row web:flex-1 items-center justify-between py-4 web:transition-all group web:focus-visible:outline-none web:focus-visible:ring-1 web:focus-visible:ring-muted-foreground',
              className
            )}
          >
            {children}
            <Animated.View style={chevronStyle}>
              <ChevronDown size={18} className={'text-foreground shrink-0'} />
            </Animated.View>
          </Trigger>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    </TextClassContext.Provider>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.ContentProps & {
  ref?: React.RefObject<AccordionPrimitive.ContentRef>;
}) {
  const { isExpanded } = AccordionPrimitive.useItemContext();
  return (
    <TextClassContext.Provider value='native:text-lg'>
      <AccordionPrimitive.Content
        className={cn(
          'overflow-hidden text-sm web:transition-all',
          isExpanded ? 'web:animate-accordion-down' : 'web:animate-accordion-up'
        )}
        {...props}
      >
        <InnerContent className={cn('pb-4', className)}>{children}</InnerContent>
      </AccordionPrimitive.Content>
    </TextClassContext.Provider>
  );
}

function InnerContent({ children, className }: { children: React.ReactNode; className?: string }) {
  if (Platform.OS === 'web') {
    return <View className={cn('pb-4', className)}>{children}</View>;
  }
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOutUp.duration(200)}
      className={cn('pb-4', className)}
    >
      {children}
    </Animated.View>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
