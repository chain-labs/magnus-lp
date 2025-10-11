"use client";

import { useState } from "react";

export default function TestAPIPage() {
  const [submitResult, setSubmitResult] = useState<any>(null);
  const [fetchResult, setFetchResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

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
      setSubmitResult({ error: String(error) });
    } finally {
      setLoading(false);
    }
  };

  // Test fetching answered questions
  const testFetch = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/questions/answered");
      const data = await response.json();
      setFetchResult({ status: response.status, data });
    } catch (error) {
      setFetchResult({ error: String(error) });
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

      {/* Test Fetch */}
      <div
        style={{
          marginBottom: "40px",
          padding: "20px",
          border: "1px solid #ddd",
        }}
      >
        <h2>Test GET /api/questions/answered</h2>
        <button
          onClick={testFetch}
          disabled={loading}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Fetch Answered Questions
        </button>

        {fetchResult && (
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              background: "#f5f5f5",
            }}
          >
            <h3>Result:</h3>
            <pre>{JSON.stringify(fetchResult, null, 2)}</pre>
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
            Click "Fetch Answered Questions" - should return your answered
            question
          </li>
        </ol>
      </div>
    </div>
  );
}
