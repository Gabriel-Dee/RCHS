import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const { user_id, username, email, password, first_name, middle_name, last_name, occupation } =
    await request.json();

  try {
    const res = await fetch('http://rchsbackend:8800/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id,
        username,
        email,
        password,
        first_name,
        middle_name,
        last_name,
        occupation,
      }),
    });

    if (res.ok) {
      return new NextResponse("User is registered", { status: 200 });
    }

    const errorData = await res.json();
    return new NextResponse(errorData.message || "Registration failed", { status: res.status });
  } catch (err) {
    if (err instanceof Error) {
      return new NextResponse(err.message || "Error during registration", { status: 500 });
    } else {
      return new NextResponse("Error during registration", { status: 500 });
    }
  }
};
