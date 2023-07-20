"use client"
import Link from "next/link"

export default function Start() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h2 className="text-5xl text-center">Start page lyrigator</h2>
      <Link href="/home">Home</Link>
    </main>
  )
}
