import {
  draw,
  drawPolysides,
  drawRectangle,
  EdgeFinder,
  assembleWire,
  genericSweep,
  makeFace,
  makeSolid,
} from "replicad";
import { honeycombClone } from "./honeycombClone";
import { HoneycombStructure } from "./HoneycombStructure";
import {
  INNER_RADIUS,
  HEIGHT,
  THICKNESS,
  INNER_THICKNESS,
  OUTER_RADIUS,
  CHAMFER_WIDTH,
  CHAMFER_HEIGHT,
  THIN_HEIGHT,
  THINNING_HEIGHT,
} from "./constants";

export const defaultParams = {
  columns: 5,
  rows: 7,
};

const range = (n) => [...Array(n).keys()];

const shellExtrude = (base, height) => {
  return genericSweep(
    base.sketchOnPlane().wire,
    draw().vLine(height).done().sketchOnPlane("XZ").wire,
    { forceProfileSpineOthogonality: true },
    true
  );
};

const drawOusideRectangle = (
  width,
  height,
  {
    disableLeft = false,
    disableRight = false,
    disableTop = false,
    disableBottom = false,
    roundedCorners = true,
  } = {}
) => {
  const radius = 5;
  const pen = draw([-(width / 2), -height / 2]).hLine(width);
  if (disableBottom && disableRight && roundedCorners) {
    pen.customCorner(radius);
  }
  pen.vLine(height);
  if (disableTop && disableRight && roundedCorners) {
    pen.customCorner(radius);
  }
  pen.hLine(-width);
  if (disableTop && disableLeft && roundedCorners) {
    pen.customCorner(radius);
  }
  if (disableBottom && disableLeft && roundedCorners) {
    return pen.closeWithCustomCorner(radius);
  }
  return pen.close();
};

export const exteriorProfile = (
  radius,
  cutout,
  nRows,
  nColumns,
  {
    disableLeft = false,
    disableRight = false,
    disableTop = false,
    disableBottom = false,
    roundedCorners = true,
  } = {}
) => {
  const structure = new HoneycombStructure(radius);

  let base = drawOusideRectangle(
    structure.totalWidth(nColumns),
    structure.totalHeight(nRows),
    { disableBottom, disableLeft, disableRight, disableTop, roundedCorners }
  );

  // Always create edge cutouts (unless edges are disabled)
  const columnCutouts = range(nRows + 2)
    .map((i) => cutout.clone().translate(0, i * structure.hexInnerLength))
    .map((cell) => cell.translate(0, -structure.totalHeight(nRows + 1) / 2))
    .flatMap((cell) => {
      const xDisplacement =
        structure.totalWidth(nColumns - 1) / 2 -
        structure.hexSideLength / 4 +
        structure.displacement;

      const cutouts = [];
      if (!disableLeft) {
        const leftCut = cell
          .clone()
          .translate(-xDisplacement, -structure.hexInnerLength / 2);
        cutouts.push(leftCut);
      }
      if (!disableRight) {
        const rightCut = cell
          .clone()
          .translate(
            xDisplacement,
            nColumns % 2 ? structure.hexInnerLength / 2 : 0
          );
        cutouts.push(rightCut);
      }

      return cutouts;
    });
  columnCutouts.forEach((cutout) => {
    base = base.cut(cutout);
  });

  const rowCutouts = range(nColumns + 1)
    .map((i) => cutout.clone().translate(2 * i * structure.displacement))
    .map((cell) =>
      cell.translate(
        -structure.totalWidth(nColumns - 1) / 2 + structure.hexSideLength / 4,
        0
      )
    )
    .flatMap((cell) => {
      const cutouts = [];
      if (!disableBottom) {
        const bottomCut = cell.translate(
          -structure.displacement,
          -structure.totalHeight(nRows) / 2
        );
        cutouts.push(bottomCut);
      }

      if (!disableTop) {
        const topCut = cell.translate(0, structure.totalHeight(nRows) / 2);
        cutouts.push(topCut);
      }

      return cutouts;
    });

  rowCutouts.forEach((cutout) => {
    base = base.cut(cutout);
  });

  return base;
};

export const honeycombProfile = (nRows, nColumns, profileConfig) => {
  return exteriorProfile(
    OUTER_RADIUS,
    drawPolysides(OUTER_RADIUS, 6, 0).rotate(30),
    nRows,
    nColumns,
    profileConfig
  );
};

export function preview({ columns, rows, profileConfig }, { width, height }) {
  // Use default values if profileConfig is undefined
  const config = profileConfig || {
    disableLeft: false,
    disableRight: false,
    disableTop: false,
    disableBottom: false,
    roundedCorners: true,
    fillFlatFaces: true,
  };

  return [
    honeycombProfile(rows, columns, config),
    drawRectangle(width, height),
  ];
}

export default function honeycomb({ rows, columns, profileConfig }) {
  const { fillFlatFaces = true, enableBase = false, baseThickness = 0.8 } = profileConfig;

  const outsideProfile = exteriorProfile(
    OUTER_RADIUS,
    drawPolysides(OUTER_RADIUS, 6, 0).rotate(30),
    rows,
    columns,
    profileConfig
  );

  const [outside, outsideBottom, outsideTop] = shellExtrude(
    outsideProfile,
    HEIGHT
  );
  outsideTop.wrapped.Reverse();

  const profile = draw([CHAMFER_WIDTH, 0])
    .line(-CHAMFER_WIDTH, CHAMFER_HEIGHT)
    .vLineTo(HEIGHT - THIN_HEIGHT - THINNING_HEIGHT)
    .line(THICKNESS - INNER_THICKNESS, THINNING_HEIGHT)
    .vLine(THIN_HEIGHT)
    .done();

  const cell = drawPolysides(INNER_RADIUS, 6, 0)
    .rotate(30)
    .sketchOnPlane()
    .sweepSketch((plane) => profile.sketchOnPlane(plane));

  const inside = honeycombClone(cell, rows, columns, OUTER_RADIUS);

  let mainStructure;
  if (fillFlatFaces) {
    // Create large top/bottom faces that fill spaces between hexagons
    const topFinder = new EdgeFinder().inPlane("XY", HEIGHT);
    const top = makeFace(
      outsideTop,
      inside.map((copy) => assembleWire(topFinder.find(copy)))
    );

    const bottomFinder = new EdgeFinder().inPlane("XY");
    const bottom = makeFace(
      outsideBottom,
      inside.map((copy) => assembleWire(bottomFinder.find(copy)))
    );

    mainStructure = makeSolid([outside, top, bottom, ...inside]);
  } else {
    // Don't fill spaces - only build outer wall, hexagons keep their own caps
    mainStructure = makeSolid([outside, outsideBottom, outsideTop, ...inside]);
  }

  if (enableBase && baseThickness > 0) {
    // Use the same profile as the main structure to match edges and corners
    const basePlate = outsideProfile
      .sketchOnPlane()
      .extrude(-baseThickness);

    return mainStructure.fuse(basePlate);
  }

  return mainStructure;
}
