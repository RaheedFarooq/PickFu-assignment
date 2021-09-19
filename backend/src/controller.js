const database = require("./database");
const mongo = require("mongodb");
const Joi = require("joi");
const { reformatURL } = require("./utls");

const db_name = "pickfu";
const collection = "url";
const urlRegex =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

/**
 * Connection Instance of a DB Collection
@returns Collection Instance
*/
const fromCollection = (col) => database.client.db(db_name).collection(col);

/**
 * Extract and Redirect to the actual URL
 */
exports.getPopularLinks = async (req, res) => {
  try {
    let data = await fromCollection(collection)
      .find({}, { sort: { hit_rate: -1 } })
      .limit(100)
      .toArray();
    res.status(200);
    res.json(data);
  } catch (e) {
    res.status(400).json({ message: "Opps, Something went wrong" });
  }
};

/**
 * Extract and Redirect to the actual URL
 */
exports.redirectToURL = async (req, res) => {
  {
    let response = await fromCollection(collection)
      .find({ _id: mongo.ObjectId(req.params.id) })
      .toArray();
    if (response.length) {
      response = response[0];
      await fromCollection(collection).updateOne(
        { _id: mongo.ObjectId(response._id) },
        {
          $set: {
            hit_rate: response.hit_rate + 1,
          },
        }
      );
      res.redirect(response.url);
    } else {
      res.status(404).json({ message: "Invalid URL" });
      res.end();
    }
  }
};

/**
 * Create a new shortened-URL
 */
exports.createURL = async (req, res) => {
  let body = req.body;
  try {
    // Validating Schema
    try {
      const schema = Joi.object({
        url: Joi.string().pattern(urlRegex).required(),
      });
      body = await schema.validateAsync(body);
    } catch (e) {
      throw { type: "invalid_params", message: e.message };
    }

    let request = { url: reformatURL(body.url), hit_rate: 0 };

    // Throw Error if URL does not contain top Level Domains i.e .com / .info / .org
    if (!request.url.includes("."))
      throw {
        type: "invalid_params",
        message: "URL does not contain a top level domain",
      };

    const exists = await fromCollection(collection)
      .find({ url: request.url })
      .toArray();
    if (exists.length) request = exists.shift();
    else {
      request = (await fromCollection(collection).insertOne(request)).ops[0];
    }

    res.status(201).json({ shortened_url: request._id });
    res.end();
  } catch (e) {
    if (e.type === "invalid_params") {
      res.status(412).json({ message: e.message });
    } else res.status(400);

    res.end();
  }
};
