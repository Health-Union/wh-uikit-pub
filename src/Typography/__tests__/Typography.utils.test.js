import {
  splitVariantString,
  isValidVariantConfig,
  variantPropSplit,
  variantPropCheck
} from "../Typography.utils";

describe("Typography.utils", () => {
  describe("splitVariantString", () => {
    it("works", () => {
      expect(splitVariantString("")).toEqual({
        muiVariant: "",
        colorKeyword: null
      });
      expect(splitVariantString("body1")).toEqual({
        muiVariant: "body1",
        colorKeyword: null
      });
      expect(splitVariantString("body1/")).toEqual({
        muiVariant: "body1",
        colorKeyword: ""
      });
      expect(splitVariantString("body1/black")).toEqual({
        muiVariant: "body1",
        colorKeyword: "black"
      });
      expect(splitVariantString("body1/black/high-emphasis")).toEqual({
        muiVariant: "body1",
        colorKeyword: "black/high-emphasis"
      });
      expect(
        splitVariantString("body1/black/high-emphasis/something-else")
      ).toEqual({
        muiVariant: "body1",
        colorKeyword: "black/high-emphasis/something-else"
      });
    });
  });

  describe("isValidVariantConfig", () => {
    it("works", () => {
      expect(
        isValidVariantConfig({ muiVariant: null, colorKeyword: null })
      ).toEqual(true);
      expect(
        isValidVariantConfig({ muiVariant: "body1", colorKeyword: null })
      ).toEqual(true);
      expect(
        isValidVariantConfig({ muiVariant: "body1", colorKeyword: "black" })
      ).toEqual(true);
      expect(
        isValidVariantConfig({
          muiVariant: "body1",
          colorKeyword: "black/medium-emphasis"
        })
      ).toEqual(true);

      expect(
        isValidVariantConfig({ muiVariant: "", colorKeyword: null })
      ).toEqual(false);
      expect(
        isValidVariantConfig({ muiVariant: "/black", colorKeyword: null })
      ).toEqual(false);
      expect(
        isValidVariantConfig({ muiVariant: null, colorKeyword: "black" })
      ).toEqual(false);
      expect(
        isValidVariantConfig({ muiVariant: "menu1", colorKeyword: null })
      ).toEqual(false);
      expect(
        isValidVariantConfig({ muiVariant: "body1", colorKeyword: "yellow" })
      ).toEqual(false);
      expect(
        isValidVariantConfig({
          muiVariant: "body1",
          colorKeyword: "black/unknown-emphasis"
        })
      ).toEqual(false);
    });
  });

  describe("variantPropSplit", () => {
    it("splits null into empty variant config", () => {
      expect(variantPropSplit(null)).toEqual({
        muiVariant: null,
        colorKeyword: null
      });
    });

    it("splits empty string into empty variant config", () => {
      expect(variantPropSplit("")).toEqual({
        muiVariant: null,
        colorKeyword: null
      });
    });

    it("splits valid variant-only string", () => {
      expect(variantPropSplit("body1")).toEqual({
        muiVariant: "body1",
        colorKeyword: null
      });
    });

    it("splits valid variant/color string", () => {
      expect(variantPropSplit("body1/black")).toEqual({
        muiVariant: "body1",
        colorKeyword: "black"
      });
    });

    it("splits valid variant/color/emphasis string", () => {
      expect(variantPropSplit("body1/black/high-emphasis")).toEqual({
        muiVariant: "body1",
        colorKeyword: "black/high-emphasis"
      });
    });

    it("returns empty variant config when there is at least one invalid part", () => {
      expect(variantPropSplit("unknown1/black/high-emphasis")).toEqual({
        muiVariant: null,
        colorKeyword: null
      });
      expect(variantPropSplit("body1/yellow/high-emphasis")).toEqual({
        muiVariant: null,
        colorKeyword: null
      });
      expect(variantPropSplit("body1/black/unknown-emphasis")).toEqual({
        muiVariant: null,
        colorKeyword: null
      });
    });

    it("returns empty config when there are any additional parts", () => {
      expect(
        variantPropSplit("body1/black/high-emphasis/break-parser")
      ).toEqual({ muiVariant: null, colorKeyword: null });
    });
  });

  describe("variantPropCheck", () => {
    it("returns null for an empty variant", () => {
      expect(variantPropCheck({})).toEqual(null);
      expect(variantPropCheck({ variant: null })).toEqual(null);
    });

    it("returns null for valid major-only variant", () => {
      expect(variantPropCheck({ variant: "body1" })).toEqual(null);
    });

    it("returns an Error for an empty string variant", () => {
      expect(variantPropCheck({ variant: "" })).toBeInstanceOf(Error);
    });

    it("returns an Error for invalid major-only variant", () => {
      expect(variantPropCheck({ variant: "menu1" })).toBeInstanceOf(Error);
    });

    it("returns null for valid major/color variant", () => {
      expect(variantPropCheck({ variant: "body1/black" })).toEqual(null);
    });

    it("returns an Error for invalid major/color variant", () => {
      expect(variantPropCheck({ variant: "body1/yellow" })).toBeInstanceOf(
        Error
      );
    });

    it("returns null for valid major/color/emph variant", () => {
      expect(variantPropCheck({ variant: "body1/black/disabled" })).toEqual(
        null
      );
    });

    it("returns an Error for invalid major/color/emph variant", () => {
      expect(
        variantPropCheck({ variant: "body1/black/ultra-high-emphasis" })
      ).toBeInstanceOf(Error);
    });

    it("returns an Error when there are additional parts", () => {
      expect(
        variantPropCheck({
          variant: "body1/black/ultra-high-emphasis/break-check"
        })
      ).toBeInstanceOf(Error);
    });
  });
});
