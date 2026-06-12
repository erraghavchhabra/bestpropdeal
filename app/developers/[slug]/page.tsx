import Image from "next/image";
import { notFound } from "next/navigation";
import { API } from "@/lib/api";
import DeveloperGallery from "@/components/DeveloperGallery";
import DeveloperProjects from "@/components/Developerprojects";

type Property = {
  id: number;
  slug: string;
  title: string;
  locality?: string;
  possession?: string;
  price?: string | number;
  price_label?: string;
  thumbnail?: string;
  status?: string[];
  bhk?: string;
  whatsapp?: string;
  phone?: string;
};

type Developer = {
  id: number;
  name: string;
  experience: string;
  image: string;
  description: string;
  slug: string;
  about: string;
  vision: string;
  gallery: string[];
  properties: Property[];
  total_projects: number;
};

export default async function DeveloperPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await fetch(API.developerBySlug(slug), {
    next: { revalidate: 3600 },
  });

  if (!res.ok) notFound();

  const developer: Developer = await res.json();

  return (
    <>
      {/* Intro Section */}
      <section className="bg-[#000] py-34">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            <div className="flex justify-center">
              <div className="relative w-full max-w-[550px] h-[250px]">
                <Image
                  src={developer.image}
                  alt={developer.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div>
              <h1 className="text-5xl mb-8">
                {developer.name}
              </h1>

              <p className="text-lg leading-9 text-white mb-10">
                {developer.about}
              </p>

              <h2 className="text-3xl mb-5">
                Vision & Commitment
              </h2>

              <p className="text-lg leading-9 text-white">
                {developer.vision}
              </p>
            </div>

          </div>
        </div>
      </section>

     

      {/* Properties assigned to this developer */}
      <DeveloperProjects properties={developer.properties ?? []} />

       {/* Gallery */}
      <DeveloperGallery images={developer.gallery} />
    </>
  );
}