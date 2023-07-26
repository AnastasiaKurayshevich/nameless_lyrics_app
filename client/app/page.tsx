"use client";
import Link from "next/link";

export default function Start() {
  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content flex-col lg:flex-row-reverse items-center">
        <img
          src="/Lyrigator_image_1-modified.png"
          className="lyrigator-image "
        />
        <div className="welcome-message">
          <h2 className="text-warning-focus">
            Lyrigator
          </h2>
          <p>AI powered lyric generator</p>
          <div className="button-dev mt-10">
            <Link href="/home">
              <button className="btn btn-secondary mr-5 shadow-lg shadow-gray-700/50">Your Lyrics</button>
            </Link>
            <Link href="/create">
              <button className="btn btn-primary shadow-lg shadow-gray-700/50">New lyrics</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
