import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      nomineeName,
      degree,
      yearOfPassing,
      branch,
      category,
      dateOfBirth,
      addressResidence,
      addressWork,
      mobile,
      otherPhone,
      email,
      proposerName,
      proposerDegreeYear,
      proposerEmail,
      proposerMobile,
      proposerAddress,
      seconderName,
      seconderDegreeYear,
      seconderEmail,
      seconderMobile,
      seconderAddress,
      declarationAccepted,
      photoName,
      photoBase64,
      annexures,
      additionalEvidence,
    } = body;

    // Validate required fields
    if (
      !nomineeName ||
      !degree ||
      !yearOfPassing ||
      !branch ||
      !category ||
      !dateOfBirth ||
      !mobile ||
      !email ||
      !addressResidence ||
      !addressWork ||
      !proposerName ||
      !proposerDegreeYear ||
      !proposerEmail ||
      !proposerMobile ||
      !proposerAddress ||
      !seconderName ||
      !seconderDegreeYear ||
      !seconderEmail ||
      !seconderMobile ||
      !seconderAddress ||
      !declarationAccepted
    ) {
      return NextResponse.json(
        { error: "Mandatory fields are missing. Please complete all required sections in Nominee, Proposer, and Seconder details." },
        { status: 400 }
      );
    }

    const id = `AAA-${yearOfPassing}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

    const sheetPayload = {
      submissionId: id,
      formType: "ACE Accolade Nomination",
      timestamp: new Date().toISOString(),
      nomineeName,
      category,
      degree,
      yearOfPassing,
      branch,
      dateOfBirth: dateOfBirth || "",
      mobile,
      otherPhone: otherPhone || "",
      email,
      addressResidence: addressResidence || "",
      addressWork: addressWork || "",
      photoName: photoName || "",
      photoBase64: photoBase64 || "",
      proposerName,
      proposerDegreeYear: proposerDegreeYear || "",
      proposerEmail,
      proposerMobile: proposerMobile || "",
      proposerAddress: proposerAddress || "",
      seconderName,
      seconderDegreeYear: seconderDegreeYear || "",
      seconderEmail,
      seconderMobile: seconderMobile || "",
      seconderAddress: seconderAddress || "",
      annexure1: annexures?.annexure1 || "",
      annexure2: annexures?.annexure2 || "",
      annexure3: annexures?.annexure3 || "",
      annexure4: annexures?.annexure4 || "",
      annexure5: annexures?.annexure5 || "",
      annexure6: annexures?.annexure6 || "",
      annexure7: annexures?.annexure7 || "",
      annexure8: Array.isArray(additionalEvidence) ? additionalEvidence.join(", ") : "",
      declarationAccepted: declarationAccepted ? "Yes" : "No",
      status: "Submitted",
    };

    // Forward to Google Apps Script Web App (Connected to the Google Sheet)
    const googleSheetUrl = process.env.GOOGLE_SHEET_WEBAPP_URL || process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;

    if (googleSheetUrl) {
      try {
        await fetch(googleSheetUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sheetPayload),
        });
      } catch (sheetError) {
        console.error("Failed to forward submission to Google Sheet webhook:", sheetError);
      }
    }

    return NextResponse.json({
      success: true,
      id,
      message: `Nomination for ${nomineeName} has been successfully recorded.`,
    });
  } catch (error: any) {
    console.error("Error submitting nomination:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit nomination. Please try again." },
      { status: 500 }
    );
  }
}
