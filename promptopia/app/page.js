import Feed from "@/components/Feed";
import Image from "next/image";

export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center text-black">
        Discover and share 
      </h1>
      <br className="max-md:hidden" />
      <span className="orange_gradient text-center text-3xl font-bold">AI powered prompts</span>
      <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci voluptates ea dicta id, hic vero minus ex tenetur. Vero, impedit.</p>
      <Feed/>
    </section>
  );
}
