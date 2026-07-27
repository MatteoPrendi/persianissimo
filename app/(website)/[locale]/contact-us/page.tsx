import { getPayloadGlobal } from "@/utils/payload";
import ContactForm from "@/components/contact-us/form";

export default async function ContactUsPage() {
  const contactData = await getPayloadGlobal("contact-us");
  const { heading, subtitle, fields } = contactData;

  return (
    <main className="min-h-[80vh] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="mx-auto max-w-2xl space-y-4 mt-15 text-center">
          <h1 className="text-foreground font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {heading}
          </h1>
          <p className="text-foreground/75 font-sans text-lg leading-relaxed sm:text-xl">
            {subtitle}
          </p>
        </div>

        <ContactForm fields={fields} />
      </div>
    </main>
  );
}
