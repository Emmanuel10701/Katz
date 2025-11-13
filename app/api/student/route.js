import { NextResponse } from "next/server";
import { prisma } from "../../../libs/prisma";

// 🔹 GET all students
export async function GET() {
  try {
    const students = await prisma.student.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, students });
  } catch (error) {
    console.error("❌ GET Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}

// 🔹 POST new student
export async function POST(req) {
  try {
    const data = await req.json();

    const newStudent = await prisma.student.create({
      data: {
        admissionNumber: data.admissionNumber,
        name: data.name,
        form: data.form,
        stream: data.stream,
        gender: data.gender,
        dateOfBirth: new Date(data.dateOfBirth),
        enrollmentDate: new Date(data.enrollmentDate),
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
        status: data.status || "Active",
      },
    });

    return NextResponse.json({ success: true, student: newStudent });
  } catch (error) {
    console.error("❌ POST Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
