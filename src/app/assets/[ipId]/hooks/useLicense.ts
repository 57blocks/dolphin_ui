import { getResource, listResource } from "@/story/storyApi";
import { Term, RESOURCE_TYPE, LicenseWithTerms } from "@/story/types";
import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";

export default function useLicense(ipId: Address) {
    const fetchLicenseTermsByIpId = async (id: string) => {
        const { data } = await listResource(RESOURCE_TYPE.LICENSE_IP_TERMS, {
            pagination: { limit: 0, offset: 0 },
            where: { ipId: id }
        });
        if (data.length) {
            const promises = data.map(async (term: Term) => {
                const licenses = await getResource(
                    RESOURCE_TYPE.LICENSE_TERMS,
                    term.licenseTermsId
                )
                return licenses
            })
            const licenses = await Promise.allSettled(promises).then((res) => {
                const result = res.map(({ value }: any) => {
                    return {
                        data: value.data,
                    }
                })
                return result.filter(r => r.data).map(d => ({
                    ...d,
                    ipId
                })) as any[]
            });
            return licenses as LicenseWithTerms[];
        }
    }

    const { isLoading, data } = useQuery({
        queryKey: ['licenses', ipId],
        queryFn: () => fetchLicenseTermsByIpId(ipId),
    })

    return {
        isLoading,
        data
    }
}