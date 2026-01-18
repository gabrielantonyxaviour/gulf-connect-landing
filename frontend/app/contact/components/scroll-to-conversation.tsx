"use client";

import { useEffect } from "react";

export function scrollToConversation() {
  const element = document.getElementById("conversation");
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function ScrollToConversation() {
  useEffect(() => {
    if (window.location.hash === "#conversation") {
      // Delay to ensure the page is fully rendered
      setTimeout(() => {
        scrollToConversation();
      }, 200);
    }
  }, []);

  return null;
}
