const BASE_URL = import.meta.env.MODE === "development"
    ? "https://lhr-solar.github.io" // Hardcoded for dev
    : ""; // Production: relative paths

export const MANIFEST_URL = `${BASE_URL}/manifests/`;
export const ASSETS_BASE_URL = `${BASE_URL}/generated-assets/`;