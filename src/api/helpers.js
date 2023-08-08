function prepareStop(rawStop) {
  return {
    id: rawStop.ID,
    routeId: rawStop.RouteID,
    name: rawStop.Name,
    point: [rawStop.Lat, rawStop.Lon],
    forward: rawStop.Forward,
  };
}
function prepareRoute(rawRoute) {
  const rawPoints = (rawRoute.VehicleType === 3)
    ? rawRoute.Stops
    : (rawRoute.Points || rawRoute.Stops);

  return {
    id: rawRoute.ID,
    name: rawRoute.Name,
    description: rawRoute.Description,
    stopsLength: rawRoute.Stops.length,
    // points: (rawRoute.Points || rawRoute.Stops).map((point) => [point.Lat, point.Lon]),
    points: rawPoints.map((point) => [point.Lat, point.Lon]),
    stops: rawRoute.Stops.map((rawStop) => prepareStop(rawStop)),
  };
}

export {
  prepareStop,
  prepareRoute,
};
