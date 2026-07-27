import { getPayloadGlobal } from "@/utils/payload";
import ContactUsClient from "@/components/contact-us/ContactUsClient";

export default async function ContactUsPage() {
  const contactData = await getPayloadGlobal("contact-us");
  const { heading, subtitle, fields } = contactData;

  return (
    <ContactUsClient
      heading={heading}
      subtitle={subtitle}
      fields={fields}
    />
  );
}
