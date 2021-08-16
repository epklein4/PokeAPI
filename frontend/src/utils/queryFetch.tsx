const queryFetch = async (query: string, variables?: any) => {
    const result = await fetch(
        'https://kny8blar39.execute-api.us-east-1.amazonaws.com/dev/graphql', 
        {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        }
    )
    return result.json();
}

export default queryFetch