export async function UPDATE(apollo,mutation,variables,query) {
    await apollo.mutate({
        mutation,        variables,
        update: (cache, { data: { mutation } }) => {
            try {
                const data = cache.readQuery({                    query                });
                // console.log('xxxxxxxxxxxxxxxxx', data[model],mutation);
                // const oneAddress = data[model].find(
                //     m => m.id === mutation.id
                // )
                cache.writeQuery({                    query,                    data                });
            } catch (e) {
                console.error(e);
            }
        }
    })
}
export async function GET(apollo,query,variables,model) {
    // this.$store.commit('busy', true)
    try {
        // this.$store.commit('clearErr')
        return (
            await apollo.query({
                query,
                variables
            })
        ).data[model]
    } catch (e) {
        // this.$store.commit('setErr', e)
    } finally {
        // this.$store.commit('busy', false)
    }
}