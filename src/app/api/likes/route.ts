import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { propertyId } = body;

    if (!propertyId) {
      return NextResponse.json({ success: false, error: "Property ID required" }, { status: 400 });
    }

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_propertyId: {
          userId: session.user.id,
          propertyId,
        },
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      return NextResponse.json({ success: true, liked: false });
    }

    await prisma.like.create({
      data: {
        userId: session.user.id,
        propertyId,
      },
    });

    return NextResponse.json({ success: true, liked: true });
  } catch (error: unknown) {
    console.error("LIKE_TOGGLE_ERROR:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to toggle like" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get("propertyId");

    if (propertyId) {
      const like = await prisma.like.findUnique({
        where: {
          userId_propertyId: {
            userId: session.user.id,
            propertyId,
          },
        },
      });
      return NextResponse.json({ success: true, liked: !!like });
    }

    const likes = await prisma.like.findMany({
      where: { userId: session.user.id },
      include: {
        property: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const data = likes.map((like) => {
      const p = like.property as Record<string, unknown>;
      return {
        ...like,
        property: {
          ...p,
          _id: p.id,
        },
      };
    });

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    console.error("LIKE_FETCH_ERROR:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to fetch likes" },
      { status: 500 }
    );
  }
}
