"use client"
import Link from "next/link"

export default function Start() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse items-center">
        <img src="/Lyrigator_image_1.png" className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h2 className="text-5xl font-bold">Welcome to <span className="text-accent-focus">Lyrigator</span></h2>
          <p className="py-6">An AI powered lyric generator.</p>
          <Link href="/home">
            <button className="btn btn-primary">Your Lyrics</button>
          </Link>
          <Link href="/create">
            <button className="btn btn-secondary">New lyrics</button>
          </Link>
        </div>
      </div>
    </div>
  )
}