"use strict";
const expect = require("chai").expect;
const index = require("../dist/index.js");
const renderHook = require("@testing-library/react-hooks").renderHook;

describe("Hook and Insert function tests", () => {
  it("should default to empty on the default key", async () => {
    // setup on default key
    const h = renderHook(() => index.default());
    expect(h.result.current).to.eql([]);
  });

  it("should default to empty on the specified key", async () => {
    // setup on specified key
    const h = renderHook(() => index.default("test"));
    expect(h.result.current).to.eql([]);
  });

  it("should insert an item", async () => {
    // setup on default key
    const h = renderHook(() => index.default());
    index.insert("Hello, World!");
    expect(h.result.current).to.eql(["Hello, World!"]);
  });

  it("should insert an item on specified key only", async () => {
    // setup on default key
    const h = renderHook(() => index.default());
    // setup on specified key
    const s = renderHook(() => index.default("test"));

    index.insert("Hello, World!", null, "test");
    expect(h.result.current).to.eql([]);
    expect(s.result.current).to.eql(["Hello, World!"]);
  });

  it("should remove item after default lifetime (5s)", (done) => {
    const h = renderHook(() => index.default("default timeline"));
    index.insert("Hello, World!", null, "default timeline");

    expect(h.result.current).to.eql(["Hello, World!"]);

    setTimeout(() => {
      expect(h.result.current).to.eql([]);
      done();
    }, 5001);
  });

  it("should remove item after specified lifetime (2s)", (done) => {
    const h = renderHook(() => index.default("default timeline 2s"));
    index.insert("Hello, World!", 2000, "default timeline 2s");
    expect(h.result.current).to.eql(["Hello, World!"]);

    setTimeout(() => {
      expect(h.result.current).to.eql([]);
      done();
    }, 2001);
  });

  it("should remove item after specified lifetime (9s)", (done) => {
    const h = renderHook(() => index.default("default timeline 9s"));
    index.insert("Hello, World!", 9000, "default timeline 9s");
    expect(h.result.current).to.eql(["Hello, World!"]);

    setTimeout(() => {
      expect(h.result.current).to.eql([]);
      done();
    }, 9001);
  });
});
