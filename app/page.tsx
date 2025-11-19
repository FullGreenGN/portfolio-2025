import {GLSLHills} from "@/features/landing/hero";

export default function Home() {
  return (
      <main>
          <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden ">
              <GLSLHills/>
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <div className="text-center px-4">
                      <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                          FullStack Developer
                      </h1>
                      <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-4">
                          System Administrator
                      </p>
                      <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300">
                          DevOps Engineer
                      </p>
                  </div>
              </div>
          </div>
          <div className={"h-screen"}/>
      </main>
  );
}
