const NewsFilter = (article, ignoredCategories, ignoredTags) => {
    return article.filter(item => {
        let notIgnored = true
        const articleCategory = item.category
        ignoredCategories.every(ignoredCategory => {
            if (ignoredCategory.toLowerCase() === articleCategory.toLowerCase()) {
                notIgnored = false
                return false
            }
            return true
        })
        const articleTags = item.tags
        ignoredTags.every(ignoredTag => {
            articleTags.every(articleTag => {
                if (ignoredTag.toLowerCase() === articleTag.toLowerCase()) {
                    notIgnored = false
                    return false
                }
                return true
            })
            return notIgnored
        })
        return notIgnored
    })
}

export default NewsFilter