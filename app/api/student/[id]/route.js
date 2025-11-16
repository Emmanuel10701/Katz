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

// 🔹 PUT — update student (with admission number change support)
export async function PUT(req, { params }) {
  const { id } = params;
  try {
    const data = await req.json();

    // Check if student exists
    const existingStudent = await prisma.student.findUnique({
      where: { id: Number(id) }
    });

    if (!existingStudent) {
      return NextResponse.json(
        { success: false, error: "Student not found" },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData = {};

    // Handle admission number change with duplicate check
    if (data.admissionNumber !== undefined) {
      // If admission number is being changed, check for duplicates
      if (data.admissionNumber !== existingStudent.admissionNumber) {
        const duplicateStudent = await prisma.student.findFirst({
          where: {
            admissionNumber: data.admissionNumber,
            id: { not: Number(id) } // Exclude current student
          }
        });

        if (duplicateStudent) {
          return NextResponse.json(
            { 
              success: false, 
              error: `Admission number ${data.admissionNumber} already exists for student: ${duplicateStudent.name}. Please use a different admission number or update the other student first.` 
            }, 
            { status: 400 }
          );
        }
      }
      updateData.admissionNumber = data.admissionNumber;
    }

    // Handle other fields
    if (data.name !== undefined) updateData.name = data.name;
    if (data.form !== undefined) updateData.form = data.form;
    if (data.stream !== undefined) updateData.stream = data.stream;
    if (data.gender !== undefined) updateData.gender = data.gender;
    if (data.dateOfBirth !== undefined) updateData.dateOfBirth = data.dateOfBirth ? new Date(data.dateOfBirth) : undefined;
    if (data.enrollmentDate !== undefined) updateData.enrollmentDate = data.enrollmentDate ? new Date(data.enrollmentDate) : undefined;
    if (data.kcpeMarks !== undefined) updateData.kcpeMarks = data.kcpeMarks ? parseInt(data.kcpeMarks) : null;
    if (data.previousSchool !== undefined) updateData.previousSchool = data.previousSchool;
    if (data.parentName !== undefined) updateData.parentName = data.parentName;
    if (data.parentEmail !== undefined) updateData.parentEmail = data.parentEmail;
    if (data.parentPhone !== undefined) updateData.parentPhone = data.parentPhone;
    if (data.emergencyContact !== undefined) updateData.emergencyContact = data.emergencyContact;
    if (data.address !== undefined) updateData.address = data.address;
    if (data.medicalInfo !== undefined) updateData.medicalInfo = data.medicalInfo;
    if (data.hobbies !== undefined) updateData.hobbies = data.hobbies;
    if (data.academicPerformance !== undefined) updateData.academicPerformance = data.academicPerformance;
    if (data.attendance !== undefined) updateData.attendance = data.attendance;
    if (data.disciplineRecord !== undefined) updateData.disciplineRecord = data.disciplineRecord;
    if (data.status !== undefined) updateData.status = data.status;

    const updatedStudent = await prisma.student.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return NextResponse.json({ 
      success: true, 
      student: updatedStudent,
      message: "Student updated successfully" 
    });

  } catch (error) {
    console.error("❌ PUT Error:", error);
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { 
          success: false, 
          error: "This admission number already exists for another student." 
        }, 
        { status: 400 }
      );
    }
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, error: "Student not found" },
        { status: 404 }
      );
    }
    
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
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, error: "Student not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}