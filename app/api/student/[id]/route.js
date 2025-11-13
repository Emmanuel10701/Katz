import { NextResponse } from "next/server";
import { prisma } from "../../../../libs/prisma";

// 🔹 GET single student
export async function GET(req, { params }) {
  const { id } = params;
  try {
    const student = await prisma.student.findUnique({
      where: { id: Number(id) },
    });
    if (!student) {
      return NextResponse.json(
        { success: false, error: "Student not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, student });
  } catch (error) {
    console.error("❌ GET Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// 🔹 PUT — update student
export async function PUT(req, { params }) {
  const { id } = params;
  try {
    const data = await req.json();

    const updatedStudent = await prisma.student.update({
      where: { id: Number(id) },
      data: {
        admissionNumber: data.admissionNumber,
        name: data.name,
        form: data.form,
        stream: data.stream,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        enrollmentDate: data.enrollmentDate
          ? new Date(data.enrollmentDate)
          : undefined,
        kcpeMarks: data.kcpeMarks,
        previousSchool: data.previousSchool,
        parentName: data.parentName,
        parentEmail: data.parentEmail,
        parentPhone: data.parentPhone,
        emergencyContact: data.emergencyContact,
        address: data.address,
        medicalInfo: data.medicalInfo,
        hobbies: data.hobbies,
        academicPerformance: data.academicPerformance,
        attendance: data.attendance,
        disciplineRecord: data.disciplineRecord,
        status: data.status,
      },
    });

    return NextResponse.json({ success: true, student: updatedStudent });
  } catch (error) {
    console.error("❌ PUT Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// 🔹 DELETE student
export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await prisma.student.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("❌ DELETE Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
