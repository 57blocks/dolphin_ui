import { Address } from "viem";
import useLicense from "../hooks/useLicense";
import { LicenseTerm, LicenseWithTerms } from "@/story/types";
import { useState } from "react";
import AnimateHeightBlock from "@/components/AnimateHeightBlock";
import { ChevronDownIcon } from "@radix-ui/themes";
import clx from 'classnames';
const LicenseRules = {
    NonCommercial: {
        title: 'Non-Commercial Social Remixing',
        can: [
            '✅ Remix this work',
            '✅ Include this work in their own work(s)',
            '✅ Credit you appropriately',
            '✅ Distribute their remix anywhere'
        ],
        canNot: [
            '❌ Resell your original work',
            '❌ Commercialize the remix',
            '❌ Claim credit for the remix (as original work)'
        ]
    },
    CommercialUse: {
        title: 'Commercial Use',
        can: [
            '✅ Purchase the right to use your creation (for a price you set) and register it into Story Protocol',
            '✅ Credit you as the creator',
            '✅ Display / publish the work in any medium'
        ],
        canNot: [
            '❌ Claim your work as their own',
            '❌ Create remixes of the commercial use.',
            '❌ Resell your work'
        ]
    },
    CommercialRemix: {
        title: 'Commercial Remix',
        can: [
            '✅ Remix this work',
            '✅ Include this work in their own work(s)',
            '✅ Credit you appropriately',
            '✅ Distribute their remix anywhere'
        ],
        canNot: [
            '❌ Resell your original work',
            '❌ Commercialize the remix (paying you a %)',
            '❌ Claim credit for the remix (as original work)'
        ]
    }
}

export function checkLicenseType(licensesTerms: LicenseTerm[]) {
    const isNonCommercial = licensesTerms.find((term) => term.trait_type === 'Commercial Use' && !term.value);
    if (isNonCommercial) return 'NonCommercial';
    const commercialRevenueShare = licensesTerms.find((term) => term.trait_type === 'Commercial Revenue Share' && term.value);
    const isCommercialUse = !isNonCommercial;
    const isCommercialRemix = commercialRevenueShare && isCommercialUse;
    if (isCommercialRemix) return 'CommercialRemix';
    return 'CommercialUse';
}

function LicenseCollapse({ licenseTypeRule }: { licenseTypeRule: any }) {
    const [open, setOpen] = useState(true);
    return <div className="mb-4">
        <h3
            className="cursor-pointer mb-2 text-xl flex justify-between items-center"
            onClick={() => setOpen(!open)}
        >
            {licenseTypeRule.title}
            <ChevronDownIcon
                className={clx('transition-all', {
                    'rotate-180': open
                })}
            />
        </h3>
        <AnimateHeightBlock
            isVisible={open}
            className=" space-y-1"
        >
            <h4 className="font-bold text-lg">Others Can</h4>
            {
                licenseTypeRule.can.map((s: any) => <p key={licenseTypeRule.title + s}>{s}</p>)
            }
            <h4 className="font-bold text-lg">Others Cannot</h4>
            {
                licenseTypeRule.canNot.map((s: any) => <p key={licenseTypeRule.title + s}>{s}</p>)
            }
        </AnimateHeightBlock>
    </div >
}

export default function LicenseType({
    ipId,
    afterLoading
}: {
    ipId?: Address,
    afterLoading?: (data: LicenseWithTerms[]) => void
}) {
    if (!ipId) return null;
    const { data, isLoading } = useLicense(ipId);
    if (isLoading) return <div className="animate-pulse">
        <div className="h-16 rounded-lg bg-neutral-200"></div>
    </div>

    if (!data || data.length === 0) return <div className="text-gray-500">
        No License
    </div>

    afterLoading && afterLoading(data);

    return data.map((d, idx) => {
        const licenseType = checkLicenseType(d.licenseTerms);
        const licenseTypeRule = LicenseRules[licenseType];
        return licenseTypeRule ? <LicenseCollapse
            key={d.id + idx}
            licenseTypeRule={licenseTypeRule}
        /> : <div className="text-gray-500">
            No License
        </div>
    });
}