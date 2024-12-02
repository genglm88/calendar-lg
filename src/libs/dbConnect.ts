import mongoose from "mongoose";
import { session } from "./session";
import { nylas, nylasConfig } from "./nylas";
import { redirect } from "next/navigation";

export default async function dbConnect() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
  }

  // Connect to MongoDB if not already connected
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
      throw new Error("Database connection failed");
    }
  }

  // Get email from session
  const email = await session().get("email");
  if (!email) {
    // Ensure Nylas config is set up correctly
    if (!nylasConfig.clientId || !nylasConfig.callbackUri) {
      throw new Error("Nylas configuration is missing clientId or callbackUri");
    }

    const authUrl = nylas.auth.urlForOAuth2({
      clientId: nylasConfig.clientId,  // Make sure to use valid clientId
      redirectUri: nylasConfig.callbackUri,  // Proper callback URI
    });

    console.log("Redirecting to Nylas OAuth2 authentication");
    return redirect(authUrl);  // Redirect user to Nylas authentication
  } else {
    return email;  // Return the email if the session exists
  }
}
