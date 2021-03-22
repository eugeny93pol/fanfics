const Rate = require('../models/Rate')
const Publication = require('../models/Publication')
const errorHandler = require('../utils/errorHandler')

const ratePublication = async (req, res) => {
    try {
        const { id, user, value } = req.body
        const publication = await Publication.findById(id).populate('rates')
        const count = publication.rates.length
        let rate = await Rate.findOne({ publication: id, user })
        if (rate) {
            publication.averageRating = (publication.averageRating*count - rate.value + value)/count
            rate.value = value
        } else {
            rate = new Rate({ publication: id, user, value })
            publication.averageRating = (publication.averageRating*count + value)/(count + 1)
            publication.rates.push(rate)
        }

        await rate.save()
        await publication.save()
        res.status(200).json({ rate, average: publication.averageRating })
    } catch (e) {
        errorHandler(res, e)
    }
}

const deleteRates = async (rates) => {
    const result = await Rate.deleteMany({_id: {$in: rates}})
    return result.n
}

module.exports = { ratePublication, deleteRates }