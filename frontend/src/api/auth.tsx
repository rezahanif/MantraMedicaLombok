"use server";

import { z } from "zod";
import { cookies } from "next/headers";

// ── Validation Schemas ──
const SignInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInInput = z.infer<typeof SignInSchema>;

// ── Auth Actions ──

/**
 * Sign in user with email and password
 */
export async function signIn(data: SignInInput) {
  try {
    const validatedData = SignInSchema.parse(data);
    
    // Call your backend API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
      throw new Error("Sign in failed");
    }

    const { token, user } = await response.json();
    
    // Store token in cookie
    const cookieStore = await cookies();
    cookieStore.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return { success: true, user };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An error occurred" 
    };
  }
}

/**
 * Sign out user and clear session
 */
export async function signOut() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("authToken");
    
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An error occurred" 
    };
  }
}

/**
 * Get current user session
 */
export async function getSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;

    if (!token) {
      return { user: null, authenticated: false };
    }

    // Verify token with backend
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      method: "GET",
      headers: { 
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json" 
      },
    });

    if (!response.ok) {
      cookieStore.delete("authToken");
      return { user: null, authenticated: false };
    }

    const user = await response.json();
    return { user, authenticated: true };
  } catch (error) {
    return { user: null, authenticated: false };
  }
}

/**
 * Validate user session
 */
export async function validateSession() {
  const { user, authenticated } = await getSession();
  return authenticated && user ? user : null;
}
