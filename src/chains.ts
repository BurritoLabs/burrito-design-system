export type BurritoChainSlug = "lunc" | "luna";

export type BurritoChain = {
  slug: BurritoChainSlug;
  name: string;
  symbol: "LUNC" | "LUNA";
  chainId: "columbus-5" | "phoenix-1";
  accent: string;
  accessibleAccentLight: string;
};

export const BURRITO_CHAINS: readonly BurritoChain[] = [
  {
    slug: "lunc",
    name: "Terra Classic",
    symbol: "LUNC",
    chainId: "columbus-5",
    accent: "#38BDF8",
    accessibleAccentLight: "#0277B5",
  },
  {
    slug: "luna",
    name: "Terra",
    symbol: "LUNA",
    chainId: "phoenix-1",
    accent: "#F97316",
    accessibleAccentLight: "#B94700",
  },
] as const;

export function getBurritoChain(slug: BurritoChainSlug) {
  return BURRITO_CHAINS.find((chain) => chain.slug === slug) ?? BURRITO_CHAINS[0];
}
