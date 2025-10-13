"use client";

import { useState } from "react";
import * as Sentry from "@sentry/nextjs";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useAnsweredQuestion } from "@/hooks/useAnsweredQuestions";

function TestAPIContent() {
  const [submitResult, setSubmitResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Use the hook to fetch answered questions
  const {
    questions,
    loading: questionsLoading,
    error,
    refetch,
    isPolling,
  } = useAnsweredQuestion();

  // Test submitting a question
  const testSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/questions/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionText: "This is a test question from the API test page",
          userName: "Test User",
          userEmail: "test@example.com",
        }),
      });

      const data = await response.json();
      setSubmitResult({ status: response.status, data });
    } catch (error) {
      const errorMessage = String(error);
      setSubmitResult({ error: errorMessage });

      // Capture error with Sentry
      Sentry.captureException(error, {
        tags: {
          section: "client",
          page: "test-api",
        },
        extra: {
          operation: "test_submit_question",
          requestData: {
            questionText: "This is a test question from the API test page",
            userName: "Test User",
            userEmail: "test@example.com",
          },
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>API Route Testing</h1>

      {/* Test Submit */}
      <div
        style={{
          marginBottom: "40px",
          padding: "20px",
          border: "1px solid #ddd",
        }}
      >
        <h2>Test POST /api/questions/submit</h2>
        <button
          onClick={testSubmit}
          disabled={loading}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Submit Test Question
        </button>

        {submitResult && (
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              background: "#f5f5f5",
            }}
          >
            <h3>Result:</h3>
            <pre>{JSON.stringify(submitResult, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Answered Questions Display */}
      <div
        style={{
          marginBottom: "40px",
          padding: "20px",
          border: "1px solid #ddd",
        }}
      >
        <h2>Answered Questions {isPolling && "🔄"}</h2>

        <button
          onClick={refetch}
          disabled={questionsLoading}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          {questionsLoading ? "Loading..." : "Refresh Questions"}
        </button>

        {error && (
          <div
            style={{
              marginBottom: "20px",
              padding: "10px",
              background: "#ffe6e6",
              border: "1px solid #ff9999",
              color: "#cc0000",
            }}
          >
            <strong>Error:</strong> {error}
          </div>
        )}

        {questionsLoading && questions.length === 0 ? (
          <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
            Loading questions...
          </div>
        ) : questions.length === 0 ? (
          <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
            No answered questions found.
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            {questions.map((question) => (
              <div
                key={question.id}
                style={{
                  padding: "15px",
                  background: "#f9f9f9",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                }}
              >
                <div style={{ marginBottom: "10px" }}>
                  <strong>Question:</strong> {question.questionText}
                </div>
                <div style={{ marginBottom: "8px", color: "#666" }}>
                  <strong>Asked by:</strong> {question.userName}
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Answer:</strong> {question.answerText}
                </div>
                <div style={{ fontSize: "12px", color: "#888" }}>
                  <strong>Answered by:</strong> {question.answeredBy} |{" "}
                  <strong>Date:</strong>{" "}
                  {new Date(question.answerTimestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        style={{
          padding: "20px",
          background: "#fffbea",
          border: "1px solid #f0e68c",
        }}
      >
        <h3>📝 Testing Checklist:</h3>
        <ol>
          <li>
            Click "Submit Test Question" - should return success with questionId
          </li>
          <li>Go to your Airtable base and verify the question appears</li>
          <li>
            In Airtable, change the Status to "Answered" and add an answer
          </li>
          <li>
            Watch the "Answered Questions" section - it should automatically
            update every 3 seconds and show your answered question
          </li>
          <li>
            Use the "Refresh Questions" button to manually trigger a fetch
          </li>
        </ol>
      </div>
    </div>
  );
}

export default function TestAPIPage() {
  return (
    <ErrorBoundary
      fallback={({ error, resetError }) => (
        <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
          <h1>API Route Testing</h1>
          <div
            style={{
              padding: "20px",
              border: "1px solid #ff6b6b",
              borderRadius: "8px",
              backgroundColor: "#ffe0e0",
              color: "#d63031",
            }}
          >
            <h2>Error in Test API Page</h2>
            <p>Something went wrong while testing the API. Please try again.</p>
            <button
              onClick={resetError}
              style={{
                padding: "10px 20px",
                backgroundColor: "#d63031",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Reset and Try Again
            </button>
          </div>
        </div>
      )}
    >
      <TestAPIContent />
    </ErrorBoundary>
  );
}
