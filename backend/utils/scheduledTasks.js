const Job = require('../models/jobModel');
const MonthlyTotal = require('../models/monthlyTotalModel');

async function updateMonthlyTotals() {
    const date = new Date();
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const totals = await Job.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: firstDayOfMonth,
                    $lt: lastDayOfMonth,
                },
            },
        },
        {
            $group: {
                _id: null,
                total: {
                    $sum: '$applications',
                },
            },
        },
    ]);

    const monthlyTotal = new MonthlyTotal({
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        totalApplications: totals[0] ? totals[0].total : 0,
    });

    await monthlyTotal.save();
}
module.exports = updateMonthlyTotals;
