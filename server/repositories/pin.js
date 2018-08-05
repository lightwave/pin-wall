const Mongoose = require('mongoose');
const Pin = require('../models/pin');

class PinRepository {

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

}

module.exports = PinRepository;
