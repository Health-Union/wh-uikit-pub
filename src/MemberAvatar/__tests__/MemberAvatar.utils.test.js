import {
  getRelativeDistanceOnSegment,
  getAvailableSources,
  getPictureUrl
} from "../MemberAvatar.utils";

describe("MemberAvatar.utils", () => {
  describe("getRelativeDistanceOnSegment", () => {
    it("throws on invalid segmentStart/segmentEnd combinations", () => {
      expect(() => getRelativeDistanceOnSegment(5, 10, 10)).toThrow(
        "segmentEnd must be greater than segmentStart"
      );
      expect(() => getRelativeDistanceOnSegment(5, 20, 10)).toThrow(
        "segmentEnd must be greater than segmentStart"
      );
    });

    it("works on valid segmentStart/segmentEnd combinations", () => {
      expect(getRelativeDistanceOnSegment(5, 10, 20)).toEqual(-0.5);
      expect(getRelativeDistanceOnSegment(10, 10, 20)).toEqual(0);
      expect(getRelativeDistanceOnSegment(15, 10, 20)).toEqual(0.5);
      expect(getRelativeDistanceOnSegment(20, 10, 20)).toEqual(1);
      expect(getRelativeDistanceOnSegment(35, 10, 20)).toEqual(2.5);
    });
  });

  describe("getAvailableSources", () => {
    it("returns all 4 sources sorted by size when possible", () => {
      expect(
        getAvailableSources({
          urls: {
            micro: "//placekitten.com/40/40",
            thumb: "//placekitten.com/100/100",
            small: "//placekitten.com/256/256",
            medium: "//placekitten.com/350/350"
          }
        })
      ).toEqual([
        { size: 40, url: "//placekitten.com/40/40" },
        { size: 100, url: "//placekitten.com/100/100" },
        { size: 256, url: "//placekitten.com/256/256" },
        { size: 350, url: "//placekitten.com/350/350" }
      ]);
    });

    it("correctly omits some sources when unavailable", () => {
      expect(
        getAvailableSources({
          urls: {
            thumb: "//placekitten.com/100/100",
            medium: "//placekitten.com/350/350"
          }
        })
      ).toEqual([
        { size: 100, url: "//placekitten.com/100/100" },
        { size: 350, url: "//placekitten.com/350/350" }
      ]);
    });

    it("does not omit required sources", () => {
      expect(
        getAvailableSources({
          urls: {}
        })
      ).toEqual([{ size: 100, url: undefined }, { size: 350, url: undefined }]);
    });
  });

  describe("getPictureUrl", () => {
    const picture = {
      urls: {
        micro: "//placekitten.com/40/40",
        thumb: "//placekitten.com/100/100",
        small: "//placekitten.com/256/256",
        medium: "//placekitten.com/350/350"
      }
    };

    it("returns micro url for image size up to 55", () => {
      expect(getPictureUrl(picture, 25)).toEqual("//placekitten.com/40/40");
      expect(getPictureUrl(picture, 55)).toEqual("//placekitten.com/40/40");
      expect(getPictureUrl(picture, 56)).not.toEqual("//placekitten.com/40/40");
    });

    it("returns thumb url for image size up to 139", () => {
      expect(getPictureUrl(picture, 56)).toEqual("//placekitten.com/100/100");
      expect(getPictureUrl(picture, 139)).toEqual("//placekitten.com/100/100");
      expect(getPictureUrl(picture, 140)).not.toEqual(
        "//placekitten.com/100/100"
      );
    });

    it("returns small url for image size up to 279", () => {
      expect(getPictureUrl(picture, 140)).toEqual("//placekitten.com/256/256");
      expect(getPictureUrl(picture, 279)).toEqual("//placekitten.com/256/256");
      expect(getPictureUrl(picture, 280)).not.toEqual(
        "//placekitten.com/256/256"
      );
    });

    it("returns medium url for any image size larger than 279", () => {
      expect(getPictureUrl(picture, 280)).toEqual("//placekitten.com/350/350");
      expect(getPictureUrl(picture, 800)).toEqual("//placekitten.com/350/350");
    });

    describe("with restricted image variants available", () => {
      const restrictedPicture = {
        urls: {
          thumb: "//placekitten.com/100/100",
          medium: "//placekitten.com/350/350"
        }
      };

      it("returns thumb url for image size up to 162", () => {
        expect(getPictureUrl(restrictedPicture, 25)).toEqual(
          "//placekitten.com/100/100"
        );
        expect(getPictureUrl(restrictedPicture, 162)).toEqual(
          "//placekitten.com/100/100"
        );
        expect(getPictureUrl(restrictedPicture, 163)).not.toEqual(
          "//placekitten.com/100/100"
        );
      });

      it("returns medium url for any image size larger than 162", () => {
        expect(getPictureUrl(restrictedPicture, 163)).toEqual(
          "//placekitten.com/350/350"
        );
        expect(getPictureUrl(restrictedPicture, 800)).toEqual(
          "//placekitten.com/350/350"
        );
      });
    });
  });
});
