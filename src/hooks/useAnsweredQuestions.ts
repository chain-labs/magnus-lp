import { useCallback, useEffect, useRef, useState } from "react";
import * as Sentry from "@sentry/nextjs";

interface Question {
  id: string;
  questionText: string;
  userName: string;
  answerText: string;
  answeredBy: string;
  answerTimestamp: string;
  display: boolean;
}

interface UseAnsweredQuestionReturn {
  questions: Question[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  isPolling: boolean;
}

export function useAnsweredQuestion(
  intervalMs: number = 30000
): UseAnsweredQuestionReturn {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchQuestions = useCallback(async () => {
    try {
      setError(null);

      const response = await fetch("/api/questions/answered");

      if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log({ data });

      // Filter
      const displayableQuestions = data.questions
        .filter((q: Question) => q.display)
        .slice(0, 10);

      setQuestions(displayableQuestions);
      setLoading(false);
      setIsPolling(true);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch questions";
      setError(errorMessage);
      setLoading(false);
      console.error("Error fetching questions:", err);

      // Capture error with Sentry
      Sentry.captureException(err, {
        tags: {
          section: "client",
          hook: "useAnsweredQuestions",
        },
        extra: {
          operation: "fetch_questions",
          intervalMs,
        },
      });

      // Don't stop polling on error - retry on next interval
    }
  }, []);

  useEffect(() => {
    // Initial Fetch
    fetchQuestions();

    // polling interval
    intervalRef.current = setInterval(fetchQuestions, intervalMs);

    // Cleanup function for interval
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsPolling(false);
    };
  }, [fetchQuestions, intervalMs]);

  return {
    questions,
    loading,
    error,
    refetch: fetchQuestions,
    isPolling,
  };
}
