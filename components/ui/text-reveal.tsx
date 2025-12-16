"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "motion/react";

import { cn } from "@/lib/utils";

interface TextRevealByWordProps {
  text: string;
  className?: string;
}

const TextRevealByWord: FC<TextRevealByWordProps> = ({ text, className }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const words = text.split(" ");

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[200vh]", className)}>
      <div
        className={
          "sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-[1rem] py-[5rem]"
        }
      >
        <p
          className={
            "flex flex-wrap p-5 text-2xl font-bold text-white/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl"
          }
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-2.5">
      <span className={"absolute opacity-30"}>{children}</span>
      <motion.span style={{ opacity: opacity }} className={"text-white"}>
        {children}
      </motion.span>
    </span>
  );
};

// Paragraph-based reveal for story sections
interface TextRevealParagraphProps {
  paragraphs: string[];
  className?: string;
}

const TextRevealParagraph: FC<TextRevealParagraphProps> = ({
  paragraphs,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.35"],
  });

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {paragraphs.map((paragraph, index) => {
        const words = paragraph.split(" ");
        const totalWords = paragraphs.reduce(
          (acc, p) => acc + p.split(" ").length,
          0
        );
        const wordsBeforeThis = paragraphs
          .slice(0, index)
          .reduce((acc, p) => acc + p.split(" ").length, 0);

        return (
          <p
            key={`story-${index}`}
            className="flex flex-wrap text-[20px] md:text-[24px] leading-[32px] mb-[24px] last:mb-0"
          >
            {words.map((word, wordIndex) => {
              const globalWordIndex = wordsBeforeThis + wordIndex;
              const start = globalWordIndex / totalWords;
              const end = start + 1 / totalWords;
              return (
                <RevealWord
                  key={wordIndex}
                  progress={scrollYProgress}
                  range={[start, end]}
                >
                  {word}
                </RevealWord>
              );
            })}
          </p>
        );
      })}
    </div>
  );
};

interface RevealWordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const RevealWord: FC<RevealWordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.3, 1]);
  const color = useTransform(
    progress,
    range,
    ["rgb(104, 110, 125)", "rgb(255, 255, 255)"]
  );

  return (
    <motion.span
      style={{ opacity, color }}
      className="mr-[0.25em] inline-block"
    >
      {children}
    </motion.span>
  );
};

export { TextRevealByWord, TextRevealParagraph };
