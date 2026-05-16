import { useState } from "react";

/**
 * <img> with a beautiful warm fallback for when the source can't load
 * (offline, hotlink-blocked CDN, slow network, etc).
 *
 * The fallback paints a gold-on-void gradient with the alt text in serif
 * so the page never shows a broken-image icon. It also fades the real
 * image in once it has actually loaded — no flash of incomplete cards.
 *
 *   <SmartImage src={...} alt="Meroë" className="..." />
 */
export default function SmartImage({
  src,
  alt = "",
  className = "",
  loading = "lazy",
  decoding = "async",
  ...rest
}) {
  const [state, setState] = useState("loading"); // loading | loaded | error

  return (
    <div className={`relative overflow-hidden bg-ink ${className}`}>
      {/* warm fallback painted underneath; visible until image loads or if it fails */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(140% 100% at 30% 80%, rgba(217,164,65,0.35), transparent 55%), radial-gradient(120% 100% at 80% 20%, rgba(14,90,122,0.3), transparent 60%), linear-gradient(160deg, #1a1208 0%, #08070A 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-end justify-start p-6"
      >
        <span
          className={
            "font-display text-2xl italic tracking-tight text-bone/40 transition-opacity duration-700 " +
            (state === "loaded" ? "opacity-0" : "opacity-100")
          }
        >
          {alt || "Visit Sudan"}
        </span>
      </div>

      {src && state !== "error" && (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding={decoding}
          onLoad={() => setState("loaded")}
          onError={() => setState("error")}
          className={
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 " +
            (state === "loaded" ? "opacity-100" : "opacity-0")
          }
          {...rest}
        />
      )}
    </div>
  );
}
