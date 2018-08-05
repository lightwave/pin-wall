const Mongoose = require('mongoose');
const Pin = require('../models/pin');

class PinRepository {

  async getUserPins(userId) {
    const pins = await Pin.find({ user: userId }, null, { sort: { updatedAt: -1 } });
    return pins;
  }

  async getUserWallInfo() {
    return await Pin.aggregate()
      .group({
        _id: "$user",
        coverImageUrl: {$last: "$sourceUrl"},
        count: {$sum: 1}
      })
      .lookup({ from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "userInfo" })
      .replaceRoot({
        $mergeObjects: [
          { $arrayElemAt: [ "$userInfo", 0 ] },
          "$$ROOT"
        ],
      })
      .project("_id name coverImageUrl count")
      .exec();
  }

  async create(userId, sourceUrl) {
    const result = await Pin.create({ user: userId, sourceUrl });
    console.log('Mongoose create result', result);
    return result;
  }

  async delete(userId, pinId) {
    const result = await Pin.deleteOne({ _id: pinId, user: userId });
    const { n, ok } = result;
    if (n !== 1) {
      console.error('Failed to delete ', pinId, 'for', userId);
      throw new Error(`Failed to delete pin ${pinId} for user ${userId}`);
    } else {
      return {
        pin: { _id: pinId },
      };
    }
  }
}

module.exports = PinRepository;
