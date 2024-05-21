"use server";
import { redirect } from "next/navigation";

export async function getUsers() {
//   throw new Error("This is an Error");
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    let data = await response.json();
    return data;
  } catch (e: any) {
    redirect("/Error");
  }
}
