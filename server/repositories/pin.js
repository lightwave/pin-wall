const Mongoose = require('mongoose');
const Pin = require('../models/pin');

class PinRepository {

  async getUserPins(userId, pageSize, startCursor) {
    const conditions = {
      user: userId
    };

    if (startCursor) {
      conditions._id = { $lte: startCursor }; // Resume from after the cursor 'startCursor'
    }

    let query = Pin.find(conditions).sort({ _id: -1 });
    if (pageSize) {
      query = query.limit(pageSize + 1);
    };

    const pins = await query.exec();
    const result = {};

    if (pageSize && pins.length > pageSize) {
      result.nextCursor = pins[pins.length-1]._id;
      pins.pop();
    }

    result.pins = pins;

    return result;
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
    return await Pin.create({ user: userId, sourceUrl });
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

  async findById(id) {
    return await Pin.findById(id);
  }
}

module.exports = PinRepository;
