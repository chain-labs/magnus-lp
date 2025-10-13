import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { questionsTable } from "@/lib/airtable";

export async function POST(request: NextRequest) {
  let body: any;
  try {
    body = await request.json();

    // Validate required fields
    if (!body.questionText || body.questionText.trim() === "") {
      // Log validation error to Sentry
      Sentry.captureMessage("Question submission validation failed", {
        level: "warning",
        tags: {
          section: "api",
          endpoint: "questions/submit",
        },
        extra: {
          operation: "validate_question_submission",
          validationError: "Question text is required",
          body: body,
        },
      });

      return NextResponse.json(
        { error: "Question text is required" },
        { status: 400 }
      );
    }

    // Create record in Airtable
    const record = await questionsTable.create([
      {
        fields: {
          "Question Text": body.questionText,
          "User Name": body.userName || "",
          "User Email": body.userEmail || "",
          "Submission Date": new Date().toISOString(),
          "Question Status": "Pending",
        },
      },
    ]);

    return NextResponse.json(
      {
        success: true,
        questionId: record[0].id,
        message: "Question submitted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting question:", error);

    // Capture error with Sentry
    Sentry.captureException(error, {
      tags: {
        section: "api",
        endpoint: "questions/submit",
      },
      extra: {
        operation: "submit_question",
        requestBody: body,
      },
    });

    return NextResponse.json(
      { error: "Failed to submit question" },
      { status: 500 }
    );
  }
}
