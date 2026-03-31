import { ContactForm } from "../Models/form.js";
import { Properties } from "../Models/properties.js";
import { User } from "../Models/user.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const year = new Date().getFullYear();

    const [userStats, propertyStats, contactFormStats , verifiedPropertyStats] = await Promise.all([
      User.aggregate([
        {
          $facet: {
            total: [{ $count: "count" }],
            monthly: [
              {
                $match: {
                  createdAt: {
                    $gte: new Date(year, 0, 1),
                    $lt: new Date(year + 1, 0, 1),
                  },
                },
              },
              {
                $group: {
                  _id: { $month: "$createdAt" },
                  total: { $sum: 1 },
                },
              },
              { $sort: { _id: 1 } },
            ],
          },
        },
      ]),

      Properties.aggregate([
        {
          $facet: {
            total: [{ $count: "count" }],
            monthly: [
              {
                $match: {
                  createdAt: {
                    $gte: new Date(year, 0, 1),
                    $lt: new Date(year + 1, 0, 1),
                  },
                },
              },
              {
                $group: {
                  _id: { $month: "$createdAt" },
                  total: { $sum: 1 },
                },
              },
              { $sort: { _id: 1 } },
            ],
          },
        },
      ]),

      ContactForm.aggregate([
        {
          $facet: {
            total: [{ $count: "count" }],
            monthly: [
              {
                $match: {
                  createdAt: {
                    $gte: new Date(year, 0, 1),
                    $lt: new Date(year + 1, 0, 1),
                  },
                },
              },
              {
                $group: {
                  _id: { $month: "$createdAt" },
                  total: { $sum: 1 },
                },
              },
              { $sort: { _id: 1 } },
            ],
          },
        },
      ]),

      Properties.aggregate([
        
        {
          $match: { isverifed: true },
        },
        {
          $group: {
            _id: "$propertyType",
            count: { $sum: 1 },
          },
        },
      ]),


    ]);

    const userResult = userStats[0];
    const propertyResult = propertyStats[0];
    const contactFormResult = contactFormStats[0];
 const verifiedPropertyResult = verifiedPropertyStats.reduce(
  (acc, curr) => {
    acc.byType[curr._id] = curr.count;
    acc.total += curr.count;
    return acc;
  },
  { total: 0, byType: {} }
);

    return res.status(200).json({
      totalUser: userResult.total[0]?.count || 0,
      monthlyUser: userResult.monthly,
      totalProperty: propertyResult.total[0]?.count || 0,
      monthlyProperty: propertyResult.monthly,
      totalContactForm: contactFormResult.total[0]?.count || 0,
      monthlyContactForm: contactFormResult.monthly,
     totalVerifiedProperties: verifiedPropertyResult.total,
  verifiedPropertiesByType: verifiedPropertyResult.byType
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message, stack: error.stack});
  }
};
