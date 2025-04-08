export function projectCelestialObject(object, lst, latitudeNullIsland, longitudeNullIsland) {
    const raDegrees = object.ra * 15;
    const ha = lst - raDegrees;
    const altRad = Math.asin(Math.sin(object.dec * Math.PI / 180) * Math.sin(latitudeNullIsland * Math.PI / 180) + Math.cos(object.dec * Math.PI / 180) * Math.cos(latitudeNullIsland * Math.PI / 180) * Math.cos(ha * Math.PI / 180));
    const azRad = Math.acos((Math.sin(object.dec * Math.PI / 180) - Math.sin(altRad) * Math.sin(latitudeNullIsland * Math.PI / 180)) / (Math.cos(altRad) * Math.cos(latitudeNullIsland * Math.PI / 180)));
    const latitude = Math.asin(Math.sin(object.dec * Math.PI / 180) * Math.cos(ha * Math.PI / 180));
    const longitude = longitudeNullIsland + Math.acos(Math.cos(object.dec * Math.PI / 180) * Math.sin(ha * Math.PI / 180) / Math.cos(latitude));
    return { latitude, longitude };
}