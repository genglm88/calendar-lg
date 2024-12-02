import Image from "next/image"
import { Hero } from "./../components/Hero"

export default function Home() {
  return (
   <>
 
      <Hero />
      <section className="bg-indigo-50 py-12 pt-32">
        <div className="container mx-auto px-6 text-center">
          <p className="text-2xl text-indigo-800 font-bold mb-4">Trusted by these compnies</p>
          <div className="flex flex-col justify-center items-center gap-6 md:flex-row">
            <Image
              src="https://images.ctfassets.net/lh3zuq09vnm2/1FA2gEsWeu2MyGSy6Qp6ao/859833105cdd6ed5cc75eb5e4bd9cff7/HelloFresh.svg"
              width={96}
              height={96}
              alt=""
            />
            <Image
              src="https://images.ctfassets.net/lh3zuq09vnm2/7dsuPwH4V8KJvCexSZueZc/272b2ef619de8ae4b443758413a19733/Unbounce_Logo.svg"
              width={96}
              height={96}
              alt=""
            />
            <Image
              src="https://images.ctfassets.net/lh3zuq09vnm2/4Y87kRrhSPSYgUbSWYxP1z/a13177cf43f99e7a79c691c54e271a98/Hubspot.svg"
              width={96}
              height={96}
              alt=""
            />
            <Image
              src="https://images.ctfassets.net/lh3zuq09vnm2/vHHaKAaEeQuNcucdWM50V/23351da3b1ad9d7483ddf11aed64b4b7/Mixpanel.svg"
              width={96}
              height={96}
              alt=""
            />
            <Image
              src="https://images.ctfassets.net/lh3zuq09vnm2/6jZ182ywMavcqhY7WiLS5x/fb3c393066ae09dc17819472dc605d8f/15Five.svg"
              width={96}
              height={96}
              alt=""
            />
            <Image
              src="https://images.ctfassets.net/lh3zuq09vnm2/7dsuPwH4V8KJvCexSZueZc/272b2ef619de8ae4b443758413a19733/Unbounce_Logo.svg"
              width={96}
              height={96}
              alt=""
            />
          </div>
        </div>
      </section>
      </>
  )
}
