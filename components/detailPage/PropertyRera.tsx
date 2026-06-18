"use client";

interface PropertyReraProps {
  /** Single RERA certificate number, e.g. "P51800055792" */
  reraId?: string;
  /** Optional: multiple RERA IDs (one QR per phase/building) */
  reraIds?: string[];
}

const MAHARERA_SEARCH_BASE =
  "https://maharera.maharashtra.gov.in/projects-search-result";

/** Builds the MahaRERA verification URL for a given certificate number */
function buildReraUrl(certificateNo: string) {
  return `${MAHARERA_SEARCH_BASE}?certificate_no=${encodeURIComponent(
    certificateNo,
  )}`;
}

/** Builds a QR code image URL (via api.qrserver.com) that encodes the given URL */
function buildQrImageUrl(targetUrl: string, size = 256) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
    targetUrl,
  )}`;
}

export default function PropertyRera({ reraId, reraIds }: PropertyReraProps) {
  const ids = reraIds && reraIds.length > 0 ? reraIds : reraId ? [reraId] : [];

  if (ids.length === 0) return null;

  return (
    <section className="bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl md:text-4xl text-white font-light">
            Rera QR Codes
          </h2>
        </div>
        <div className="rounded-[2.2rem] border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 md:p-10 overflow-hidden">
          <div className="max-w-5xl">
            <p className="mt-5 text-white/65 text-sm md:text-base leading-7">
              {"Scan this RERA QR code to find out more or search ID here - "}
              <a
              
                href="https://maharera.maharashtra.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ef4800] hover:underline ml-1 break-all"
              >
                https://maharera.maharashtra.gov.in
              </a>
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-20">
            {ids.map((id) => {
              const targetUrl = buildReraUrl(id);
              const qrSrc = buildQrImageUrl(targetUrl);
              return (
                <div key={id} className="flex flex-col items-start text-left">
                  <div className="rounded-[1.5rem] border border-white/10 bg-white p-2 shadow-lg">
                    <img
                      src={qrSrc}
                      alt={id}
                      width={128}
                      height={128}
                      className="w-32 h-32 object-contain"
                    />
                  </div>
                  <p className="mt-3 text-white/60 text-xs md:text-sm tracking-wide">
                    {id}
                  </p>
                  <a
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 text-[#ef4800] hover:underline text-xs break-all"
                  >
                    View on MahaRERA
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}