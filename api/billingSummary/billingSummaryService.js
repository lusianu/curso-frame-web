const _ = require('lodash')
const BillingCycle = require('../billingCycle/billingCycle')

function getSummary(req, res){
    BillingCycle.aggregate([{
        $project: { credit: { $sum: "$credits.value" }, debt: { $sum: "$debts.value" } }},
        {$group: { _id: null, credit: { $sum: "$credit" }, debt: { $sum: "$debt" } }},
        {$project: { _id: 0, credit: 1, debt: 1 }
    }]).exec(function (error, result) {
        if (error) {
            res.status(500).json({ errors: [error] });
        } else {
            //resultGroup(result);
            res.json(_.defaults(result[0], {credits: 0, debts: 0}))
        }
    });
}

module.exports = {getSummary}
