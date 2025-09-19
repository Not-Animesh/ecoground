import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";

export async function POST(req: NextRequest) {
  const { name, email, password, role } = await req.json();

  // Check if email exists
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ error: "Email already registered" }, { status: 400 });

  const hashed = await hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashed, role }
  });
  return NextResponse.json({ id: user.id, email: user.email, role: user.role });
}