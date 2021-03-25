import algoliasearch from 'algoliasearch/lite'

const algoliaClient = algoliasearch(
    'TENFJKMODS',
    '1a471ff79d0baf729684de259db0dabf')

export default {
    search(requests) {
        if (requests.every(({ params }) => !params.query)) {
            return Promise.resolve({
                results: requests.map(() => ({
                    hits: [],
                    nbHits: 0,
                    nbPages: 0
                }))
            })
        }
        return algoliaClient.search(requests)
    }
}