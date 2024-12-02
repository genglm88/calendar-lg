import {nylas, nylasConfig} from "@/libs/nylas";
import {session} from "@/libs/session";
import {ProfileModel} from "@/models/Profile";
import mongoose from "mongoose";
import {redirect} from "next/navigation";
import {NextRequest} from "next/server";

export async function GET(req: NextRequest) {
  console.log("Received callback from Nylas");
  const url = new URL(req.url as string);
  const code = url.searchParams.get('code');

  if (!code) {
    return Response.json("No authorization code returned from Nylas", {status: 400});
  }

  const codeExchangePayload = {
    clientSecret: nylasConfig.apiKey,
    clientId: nylasConfig.clientId as string,
    redirectUri: nylasConfig.callbackUri,
    code,
  };

  const response = await nylas.auth.exchangeCodeForToken(codeExchangePayload);
  const { grantId, email } = response;

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

  const profileDoc = await ProfileModel.findOne({email});
  if (profileDoc) {
    profileDoc.grantId = grantId;
    await profileDoc.save();
  } else {
    await ProfileModel.create({email, grantId});
  }

  await session().set('email', email);

  redirect('/');
}
