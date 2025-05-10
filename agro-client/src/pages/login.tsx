import { Leaf } from "lucide-react"
import LoginForm from "@/comp/auth_components/loginForm"
export default function Login () {
    return (
        <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <a href="/" className="flex items-center gap-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-800">AgroMat</span>
            </a>
          </div>
          <h1 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Or{" "}
            <a href="/signup" className="font-medium text-green-600 hover:text-green-500">
              create a new account
            </a>
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <LoginForm />

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white px-6 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                >
                  <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                      fill="#EA4335"
                    />
                    <path
                      d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                      fill="#34A853"
                    />
                  </svg>
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                >
                  <svg className="h-5 w-5 text-black" viewBox="0 0 384 512" fill="currentColor" aria-hidden="true">
                    <path d="M318.7 268.6c-.4-41.3 18-72.4 56.4-95.7-21.1-30.6-53.7-47.9-97.3-52.4-40.9-4.2-85.5 24.1-100.5 24.1-15.2 0-52.6-23.5-81.7-23-42 0-80.9 24.4-102.5 62.2-43.8 75.9-11.2 187.9 31.5 249.5 21.1 30.8 46.2 65.2 79.4 63.9 31.5-1.2 43.5-20.5 81.6-20.5 38 0 48.3 20.5 81.8 20 33.8-.5 55.2-31.2 75.9-62.3 13-19.1 18.2-29 28.5-50.8-74.7-28.6-87.2-137.4-12.9-179zM255.9 68.6c17.6-21.4 29.5-51.5 26.2-81.6-25.3 1-56.4 17.2-74.5 38.6-16.4 19-30.8 49.8-26.9 78.9 28.7 2.2 57.7-14.5 75.2-35.9z"/>
                  </svg>
                  <span>Apple</span>
                </button>
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            By signing in, you agree to our{" "}
            <a href="#" className="font-semibold leading-6 text-green-600 hover:text-green-500">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="font-semibold leading-6 text-green-600 hover:text-green-500">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
    )
}