import type { IExtraDivider, IExtraTextAlign } from "~/types/link";
import { BUTTON_TYPE } from "~/types/theme";

export const getDividerStyle = (extra: IExtraDivider) => {
  let style = {
    borderStyle: "solid",
  } as React.CSSProperties;

  if (extra.divider_type == "DASHED") {
    style = {
      ...style,
      borderStyle: "dashed",
    };
  } else if (extra.divider_type == "DOTTED") {
    style = {
      ...style,
      borderStyle: "dotted",
    };
  } else if (extra.divider_type == "BLANK") {
    style = {
      ...style,
      borderStyle: "none",
    };
  }

  return style;
};

export const headerTextAlign = (extra: IExtraTextAlign) => {
  const textAlign = extra.text_align ?? "LEFT";

  return textAlign == "RIGHT"
    ? "text-right"
    : textAlign == "CENTER"
    ? "text-center"
    : "text-left";
};

export const getThumbnailStyle = (buttonType: BUTTON_TYPE) => {
  const thumbnailStyle = {
    borderRadius: "0px",
  } as React.CSSProperties;

  if (
    [
      BUTTON_TYPE.FILLROUNDED,
      BUTTON_TYPE.HARDSHADOWROUNDED,
      BUTTON_TYPE.OUTLINEROUNDED,
      BUTTON_TYPE.SOFTSHADOWROUNDED,
    ].includes(buttonType)
  ) {
    thumbnailStyle.borderRadius = "8px";
  }

  if (
    [
      BUTTON_TYPE.FILLCIRCULAR,
      BUTTON_TYPE.HARDSHADOWCIRCULAR,
      BUTTON_TYPE.OUTLINECIRCULAR,
      BUTTON_TYPE.SOFTSHADOWCIRCULAR,
    ].includes(buttonType)
  ) {
    thumbnailStyle.borderRadius = "999px";
  }
  return thumbnailStyle;
};
