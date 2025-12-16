import { NextRequest, NextResponse } from "next/server";
import { questionsTable, saveUserToAirtable } from "@/lib/airtable";

interface SubmitQuestionBody {
  questionText: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
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

    // Save user to Users table (don't block on failure)
    try {
      await saveUserToAirtable({
        name: body.userName,
        email: body.userEmail,
        phone: body.userPhone,
        source: "Question",
      });
    } catch (userError) {
      console.error("Error saving user to Users table:", userError);
      // Continue even if user save fails - don't block the question submission
    }

    // Create record in Airtable
    const record = await questionsTable.create([
      {
        fields: {
          "Question Text": body.questionText,
          "User Name":  body.userName,
          "User Email": body.userEmail,
          "User Phone": body.userPhone ?? "",
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
