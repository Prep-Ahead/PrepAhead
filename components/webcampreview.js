"use client"; // Ensure this is a Client Component

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function WebcamPreview() {
  const videoRef = useRef(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    let stream = null;

    async function startWebcam() {
      try {
        // Request webcam access
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        // Assign the stream to the video element
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    }

    startWebcam();

    // Clean up: Stop the webcam stream when the component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="flex-center">
      {permissionDenied ? (
        <Image
          src="/user-avatar.png"
          alt="Webcam permission denied"
          width={65}
          height={54}
        />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="relative w-[70%] object-cover rounded-lg"
          //style={{ width: "100%", maxWidth: "420px" }}
        />
      )}
    </div>
  );
}
