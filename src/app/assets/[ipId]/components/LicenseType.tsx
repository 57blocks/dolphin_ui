import { Address } from "viem";
import useLicense from "../hooks/useLicense";

export default function LicenseType({ ipId }: { ipId?: Address }) {
    if (!ipId) return null;
    const { data } = useLicense(ipId);
    return data?.map(d => d.licenseTemplate);
}