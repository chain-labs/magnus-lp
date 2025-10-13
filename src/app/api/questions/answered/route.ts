import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { questionsTable } from "@/lib/airtable";

export async function GET() {
  try {
    // Query Airtable for answered questions
    const records = await questionsTable
      .select({
        filterByFormula:
          "AND({Question Status} = 'Answered', {Answer Text} != '')",
      })
      .all();

    // Transform records to a cleaner format
    const questions = records.map((record) => ({
      id: record.id,
      questionText: record.fields["Question Text"],
      userName: record.fields["User Name"] || "Anonymous",
      answerText: record.fields["Answer Text"],
      answeredBy: record.fields["Answered By"],
      answerDate: record.fields["Answer Timestamp"],
      display: record.fields["Show on Website"],
    }));

    return NextResponse.json({ questions }, { status: 200 });
  } catch (error) {
    console.error("Error fetching questions:", error);

    // Capture error with Sentry
    Sentry.captureException(error, {
      tags: {
        section: "api",
        endpoint: "questions/answered",
      },
      extra: {
        operation: "fetch_answered_questions",
      },
    });

    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}
