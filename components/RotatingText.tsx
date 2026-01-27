'use client';

import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Transition } from 'motion/react';

function cn(...classes: any[]): string {
  return classes.filter(Boolean).join(' ');
}

interface RotatingTextProps {
  texts: string[];
  transition?: Transition;
  initial?: any;
  animate?: any;
  exit?: any;
  animatePresenceMode?: string;
  animatePresenceInitial?: boolean;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: string;
  loop?: boolean;
  auto?: boolean;
  splitBy?: string;
  onNext?: () => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

const RotatingText = forwardRef<any, RotatingTextProps>((props, ref) => {
  const {
    texts,
    transition = { type: 'spring', damping: 25, stiffness: 300 } as Transition,
    initial = { y: '100%', opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit = { y: '-120%', opacity: 0 },
    animatePresenceMode = 'wait',
    animatePresenceInitial = false,
    rotationInterval = 2000,
    staggerDuration = 0,
    staggerFrom = 'first',
    loop = true,
    auto = true,
    splitBy = 'characters',
    onNext,
    mainClassName,
    splitLevelClassName,
    elementLevelClassName,
    ...rest
  } = props;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const splitIntoCharacters = (text: string): string[] => {
    if (typeof Intl !== 'undefined' && (Intl as any).Segmenter) {
      const segmenter = new ((Intl as any).Segmenter)('en', { granularity: 'grapheme' });
      return Array.from(segmenter.segment(text), (segment: any) => segment.segment);
    }
    return Array.from(text);
  };

  const elements = useMemo(() => {
    const currentText = texts[currentTextIndex];
    if (splitBy === 'characters') {
      const words = currentText.split(' ');
      return words.map((word, i) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== words.length - 1
      }));
    }
    return [{ characters: [currentText], needsSpace: false }];
  }, [texts, currentTextIndex, splitBy]);

  useEffect(() => {
    if (!auto) return;

    const interval = setInterval(() => {
      setCurrentTextIndex(prev => {
        const nextIndex = (prev + 1) % texts.length;
        onNext?.();
        return nextIndex;
      });
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [texts.length, rotationInterval, auto, onNext]);

  useImperativeHandle(ref, () => ({
    next: () => {
      setCurrentTextIndex(prev => (prev + 1) % texts.length);
      onNext?.();
    },
    prev: () => {
      setCurrentTextIndex(prev => (prev - 1 + texts.length) % texts.length);
    },
    goTo: (index: number) => {
      if (index >= 0 && index < texts.length) {
        setCurrentTextIndex(index);
      }
    }
  }), [texts.length, onNext]);

  return (
    <span className={cn(mainClassName)} {...rest}>
      <AnimatePresence mode={animatePresenceMode as any} initial={animatePresenceInitial}>
        <motion.span key={currentTextIndex}>
          {elements.map((element, i) => (
            <span key={i} className={cn(splitLevelClassName)}>
              <AnimatePresence mode={animatePresenceMode as any} initial={animatePresenceInitial}>
                {element.characters.map((character, j) => (
                  <motion.span
                    key={j}
                    transition={{
                      ...transition,
                      delay: (staggerFrom === 'first' ? j : element.characters.length - j - 1) * staggerDuration
                    } as Transition}
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    className={cn(elementLevelClassName)}
                  >
                    {character}
                  </motion.span>
                ))}
              </AnimatePresence>
              {element.needsSpace && ' '}
            </span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
});

RotatingText.displayName = 'RotatingText';

export default RotatingText;
