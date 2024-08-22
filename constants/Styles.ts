import { ImageStyle, StyleSheet, ViewStyle } from "react-native";
// import { Typography } from "./constants"
// import { dark200, dark500, light, primary700 } from "./Colors"

const styles = StyleSheet.create({
    test: {
        fontWeight: "bold",
    },
});

// layouts
export const columns: ViewStyle = {
    width: "100%",
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    gap: 10,
};
export const spaceBetween = {
    justifyContent: "space-between",
};

export const rows = {
    display: "flex",
    flexDirection: "row",
    gap: 10,
};
export const colummhalf = { flex: 0.5 };
export const columm10 = { flex: 0.1 };
export const columm25 = { flex: 0.25 };
export const columm35 = { flex: 0.35 };
export const flex1 = { flex: 1 };

// Typography styles

export const fullSize: ViewStyle = {
    width: "100%",
    flex: 1,
    // height: "100%",
};
export const fullcenterItems: ViewStyle = {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
};
export const centerItems: ViewStyle = {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
};
export const alignCenter: ViewStyle = {
    flexDirection: "column",
    // justifyContent:"center",
    alignItems: "center",
};

export const alignTopRight = {
    position: "absolute",
    right: 0,
    top: 0,
};
export const alignCenterRight = {
    position: "absolute",
    right: 0,
    top: "50%",
};
export const alignbottomLeft = {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    bottom: 0,
};
export const alignTopLeft: ViewStyle | ImageStyle = {
    position: "absolute",
    left: 0,
    top: 0,
};
export const alignBottomCenter = {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
};

// components

// effects
export const shadowProps = {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
};
