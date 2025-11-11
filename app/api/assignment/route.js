import { NextResponse } from "next/server";
import { prisma } from "../../../libs/prisma";
import path from "path";
import fs from "fs";
import { writeFile } from "fs/promises";

// Helpers
const ensureUploadDir = (uploadDir) => {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
};

const uploadFiles = async (files, uploadDir) => {
  const uploadedFiles = [];
  
  for (const file of files) {
    if (file && file.name) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      const filePath = path.join(uploadDir, fileName);
      await writeFile(filePath, buffer);
      uploadedFiles.push(`/assignments/${fileName}`);
    }
  }
  
  return uploadedFiles;
};

// 🔹 POST — Create a new assignment
export async function POST(request) {
  try {
    const formData = await request.formData();

    // Extract all fields from FormData
    const title = formData.get("title") || "";
    const subject = formData.get("subject") || "";
    const className = formData.get("className") || "";
    const teacher = formData.get("teacher") || "";
    const dueDate = formData.get("dueDate") || "";
    const dateAssigned = formData.get("dateAssigned") || new Date().toISOString();
    const status = formData.get("status") || "assigned";
    const description = formData.get("description") || "";
    const instructions = formData.get("instructions") || "";
    const priority = formData.get("priority") || "medium";
    const estimatedTime = formData.get("estimatedTime") || "";
    const additionalWork = formData.get("additionalWork") || "";
    const teacherRemarks = formData.get("teacherRemarks") || "";
    const learningObjectives = formData.get("learningObjectives") || "[]";

    // Validate required fields
    if (!title || !subject || !className || !teacher || !dueDate) {
      return NextResponse.json(
        { success: false, error: "Title, subject, class, teacher, and due date are required" },
        { status: 400 }
      );
    }

    // Handle file uploads
    const uploadDir = path.join(process.cwd(), "public/assignments");
    ensureUploadDir(uploadDir);

    // Upload assignment files
    const assignmentFiles = await uploadFiles(formData.getAll("assignmentFiles"), uploadDir);
    
    // Upload attachment files
    const attachments = await uploadFiles(formData.getAll("attachments"), uploadDir);

    // Parse learning objectives
    let learningObjectivesArray = [];
    try {
      learningObjectivesArray = JSON.parse(learningObjectives);
    } catch (error) {
      console.error("Error parsing learning objectives:", error);
    }

    // Create assignment in database
    const assignment = await prisma.assignment.create({
      data: {
        title,
        subject,
        className,
        teacher,
        dueDate: new Date(dueDate),
        dateAssigned: new Date(dateAssigned),
        status,
        description,
        instructions,
        priority,
        estimatedTime,
        additionalWork,
        teacherRemarks,
        assignmentFiles: assignmentFiles,
        attachments: attachments,
        learningObjectives: learningObjectivesArray,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Assignment created successfully",
        assignment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error creating assignment:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// 🔹 GET — Fetch all assignments with filtering
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get query parameters
    const className = searchParams.get("class");
    const subject = searchParams.get("subject");
    const status = searchParams.get("status");
    const teacher = searchParams.get("teacher");
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    const skip = (page - 1) * limit;

    // Build where clause for filtering
    const where = {
      AND: [
        className && className !== "all" ? { className } : {},
        subject && subject !== "all" ? { subject } : {},
        status && status !== "all" ? { status } : {},
        teacher && teacher !== "all" ? { teacher } : {},
        search ? {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
            { teacher: { contains: search, mode: "insensitive" } },
          ],
        } : {},
      ].filter(condition => Object.keys(condition).length > 0),
    };

    // Get assignments with pagination
    const [assignments, total] = await Promise.all([
      prisma.assignment.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.assignment.count({ where }),
    ]);

    return NextResponse.json(
      {
        success: true,
        assignments,
        pagination: {
          current: page,
          totalPages: Math.ceil(total / limit),
          totalAssignments: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error fetching assignments:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}