import { NextRequest, NextResponse } from "next/server";
import { questionsTable } from "@/lib/airtable";

interface SubmitQuestionBody {
  questionText: string;
}

export async function POST(request: NextRequest) {
  let body: SubmitQuestionBody;
  try {
    body = await request.json();

    // Validate required fields
    if (!body.questionText || body.questionText.trim() === "") {
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
          "User Name": "",
          "User Email": "",
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

    return NextResponse.json(
      { error: "Failed to submit question" },
      { status: 500 }
    );
  }
}
