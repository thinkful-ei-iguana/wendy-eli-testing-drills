/* eslint-disable quotes */
const { expect } = require("chai");
const supertest = require("supertest");
const express = require("express");
const app = express();

app.get("/frequency", (req, res) => {
  const { s } = req.query;

  if (!s) {
    return res.status(400).send("Invalid request");
  }

  const counts = s
    .toLowerCase()
    .split("")
    .reduce((acc, curr) => {
      if (acc[curr]) {
        acc[curr]++;
      } else {
        acc[curr] = 1;
      }
      return acc;
    }, {});

  const unique = Object.keys(counts).length;
  const average = s.length / unique;
  let highest = "";
  let highestVal = 0;

  Object.keys(counts).forEach(k => {
    if (counts[k] > highestVal) {
      highestVal = counts[k];
      highest = k;
    }
  });

  counts.unique = unique;
  counts.average = average;
  counts.highest = highest;
  res.json(counts);
});

const string = "aabbbbaaa";
describe("Test string object", () => {
  it('should return an object with keys "unique", "average", "highest"', () => {
    return supertest(app)
      .get("/frequency")
      .query({ s: string })
      .then(r => {
        console.log(r.body);
        expect(r.body).to.include.all.keys("unique", "average", "highest");
      });
  });
  it("should throw an error if string is undefined", () => {
    return supertest(app)
      .get("/frequency")
      .expect(400, "Invalid request");
  });
});
