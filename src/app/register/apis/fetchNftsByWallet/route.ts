export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'X-API-KEY': process.env.SIMPLE_HASH_API_KEY
        }
    };
    const chains = searchParams.get('chains');
    const address = searchParams.get('address');
    try {
        const data = await fetch(
            `https://api.simplehash.com/api/v0/nfts/owners?chains=${chains}&wallet_addresses=${address}&limit=1000`,
            options as any
        ).then(res => res.json())
        return Response.json({ data });
    } catch (err) {
        return Response.json({ err })
    }
}