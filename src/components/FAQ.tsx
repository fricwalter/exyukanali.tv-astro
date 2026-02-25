import { useState } from 'react';

const faqs = [
  {
    question: "Kolika mi je minimalna brzina interneta potrebna?",
    answer: "Za normalno gledanje preporučujemo minimalnu brzinu od 10 Mbps. Za 4K sadržaj potrebno je najmanje 25 Mbps. Kvaliteta slike automatski se prilagođava vašoj brzini interneta kako bi se izbjeglo bufferiranje."
  },
  {
    question: "Da li IPTV radi u Njemačkoj, Austriji, Švicarskoj ili USA?",
    answer: "Da! Naši serveri su locirani u Njemačkoj i Holandiji, što garantuje nisku latenciju i stabilnu konekciju za korisnike širom Evrope i svijeta. Možete gledati bilo gdje u svijetu gdje imate internet konekciju."
  },
  {
    question: "Da li mogu dobiti besplatan test na 24 sata?",
    answer: "Da! Nudimo besplatan test od 24 sata kako biste mogli isprobati našu uslugu prije nego što se pretplatite. Naručite test putem stranice za narudžbu i dobit ćete pristupne podatke u roku od par minuta."
  },
  {
    question: "Na koliko uređaja mogu gledati istovremeno?",
    answer: "Ovisno o paketu koji odaberete. Standard paket omogućuje 1 konekciju (1 uređaj), dok Premium paket također nudi 1 konekciju. Ako vam treba više konekcija, kontaktirajte nas za prilagođenu ponudu."
  },
  {
    question: "Kako mogu platiti uslugu?",
    answer: "Prihvaćamo sigurna plaćanja putem PayPal-a i bankovnog transfera. Također radimo na dodavanju drugih opcija plaćanja uskoro. Sva plaćanja su sigurna i enkriptirana."
  },
  {
    question: "Šta ako mi se usluga ne svidi ili imam problem?",
    answer: "Nudimo garanciju zadovoljstva! Ako niste zadovoljni našom uslugom, kontaktirajte nas u roku od 7 dana za povrat novca. Naš tim je dostupan putem WhatsApp-a za sva tehnička pitanja."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Često <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Postavljana Pitanja</span>
            </h2>
            <p className="text-lg text-gray-600">
              Imate pitanja? Mi imamo odgovore.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="font-semibold text-gray-900 text-lg">
                    {faq.question}
                  </span>
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 ${
                    openIndex === index
                      ? 'bg-blue-600 text-white rotate-180'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                <div className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}>
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schema.org FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
