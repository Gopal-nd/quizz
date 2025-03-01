'use client'
import { Button } from "@/components/ui/button"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import {ArrowBigLeft} from "lucide-react"
import { GoogleIcon } from "@/components/how-it-works"
export default function Component() {
  const router = useRouter()
  return (
    
  
    <div className="mx-auto max-w-sm space-y-6 flex justify-center flex-col gap-2 items-center h-screen ">
      <div className="flex items-center w-full">
        <Button className="flex" onClick={() => router.back()}>
          <ArrowBigLeft className="h-6 w-6 mr-2" />
        </Button>

        <h1 className=" flex-1 text-center text-3xl font-bold">Welcome To Quizz</h1>
      </div>
      <div className=" text-center">
        <p className="text-muted-foreground">Sign in to your account to continue</p>
      </div>
      <div>
        <div className="space-y-4">
          <Button onClick={async() => await signIn("google")} variant="outline" className="w-full">
            <GoogleIcon className="mr-2 h-5 w-5" />
            Sign in with Google
          </Button>
        </div>
        <p className="text-sm text-muted-foreground text-center mt-4">By creating account you agree to the <span className=" underline"> Terms and Conditions</span> of Quizz</p>
      </div>
    </div>

  )
}



