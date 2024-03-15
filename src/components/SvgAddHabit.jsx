import * as React from "react";
import Svg, { Path, G, Circle } from "react-native-svg";

function SvgAddHabit(props) {
  return (
    <Svg
      viewBox="0 0 360 410"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      width={40}
      height={40}
    >
      <G data-name="Layer 2">
        <G data-name="Layer 1">
          <Path
            d="M287 399l9-6a13 13 0 01-13 13H19a13 13 0 01-13-13V21A13 13 0 0119 8h-6l22.5 355.5a13 13 0 0013 13z"
            fill="#c5c6ef"
            className="fill-c5c6ef"
          />
          <Path
            d="M66.28 72.42H151v14.03H66.28zm0 74.46h84.73v14.03H66.28zm0-38.51h136.07v14.03H66.28zm0 129.05H151v14.03H66.28zm0 74.46h84.73v14.03H66.28zm0-38.51h136.07v14.03H66.28z"
            fill="#7f27ff"
            className="fill-385868"
          />
          <Path
            d="M283 410H19a19 19 0 01-19-19V19A19 19 0 0119 0h264a19 19 0 0119 19v372a19 19 0 01-19 19zM19 12a7 7 0 00-7 7v372a7 7 0 007 7h264a7 7 0 007-7V19a7 7 0 00-7-7z"
            fill="#7f27ff"
            className="fill-426572"
          />
          <Circle
            cx={295.5}
            cy={229.5}
            r={58.5}
            fill="#ff8911"
            className="fill-6ae184"
          />
          <Path
            d="M347 226.5a58.52 58.52 0 01-65 58.14 58.5 58.5 0 000-116.28 58.52 58.52 0 0165 58.14z"
            fill="#fdbf60"
            className="fill-a8ff8c"
          />
          <Path
            d="M306 284.52a58.5 58.5 0 110-116 58.5 58.5 0 000 116z"
            fill="#9f70fd"
            className="fill-389d9c"
          />
          <Path
            d="M295.5 291a64.5 64.5 0 1164.5-64.5 64.57 64.57 0 01-64.5 64.5zm0-117a52.5 52.5 0 1052.5 52.5 52.56 52.56 0 00-52.5-52.5z"
            fill="#7f27ff"
            className="fill-426572"
          />
          <Path
            d="M284.63 211v37.75c0 9.65 15 9.67 15 0V211c0-9.65-15-9.67-15 0z"
            fill="#7f27ff"
            className="fill-426572"
          />
          <Path
            d="M311 222.38h-37.75c-9.65 0-9.67 15 0 15H311c9.65 0 9.67-15 0-15z"
            fill="#7f27ff"
            className="fill-426572"
          />
        </G>
      </G>
    </Svg>
  );
}

export default SvgAddHabit;
