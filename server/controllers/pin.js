'use strict';

const pinInteractor = require('../interactors/pin');

exports.create = async (req, res) => {
  if (!req.user || !req.user.id) {
    console.log('req.user is null', req.user);
    res.sendStatus(403);
  } if (!req.body.sourceUrl) {
    console.log('req.body.sourceUrl missing');
    // TODO: Validate URL format
    // TODO: Should we validate URL existence?
    res.sendStatus(400); // Bad request
  } else {
    try {
      const pin = await pinInteractor.create(req.user.id, req.body.sourceUrl);
      res.json({pin});
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
};

exports.delete = async (req, res) => {
  if (!req.user || !req.user.id) {
    console.log('req.user is null', req.user);
    res.sendStatus(403);
  } if (!req.params.id) {
    res.sendStatus(400); // Bad request
  } else {
    try {
      const result = await pinInteractor.delete(req.user.id, req.params.id);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err });
    }
  }
};

exports.resolveTinyUrl = async (req, res) => {
  const hash = req.params.hash;
  const url = await pinInteractor.resolveTinyUrl(hash);
  res.redirect(url);
};
