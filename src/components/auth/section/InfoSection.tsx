import Image from "next/image";

export default function InfoSection() {
  return (
    <section className="w-full lg:w-5/12 p-0 lg:p-5 z-0">
      <div className="relative w-full h-full pb-8 lg:rounded-l-2xl rounded-none overflow-hidden after:bg-black/30 after:absolute after:inset-0">
       
        <div className="absolute inset-0 z-0">
          <Image
            height={100}
            width={100}
            src="/assets/gif/login-show.gif"
            className="h-full w-full object-cover"
            alt="Login show gif"
          />
        </div>
        
        <div className="flex flex-col justify-between h-full relative z-10">
        
          <div className="m-4 sm:m-8">
            <Image
              alt="Logo CC"
              className="w-[120px]"
              height={100}
              width={100}
              src={"/assets/image/logo-full-cc.png"}
            />
          </div>
          <div className="m-4 sm:m-8">
            <h3 className="font-bold sm:text-2xl text-xl ">What is CC Weekly Report?</h3>
            <p className="font-normal sm:text-base text-sm mt-4">
              Candidate College Weekly Report is a web app where you can fill out
              your weekly reports, see feedback, and view your working statistics.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
