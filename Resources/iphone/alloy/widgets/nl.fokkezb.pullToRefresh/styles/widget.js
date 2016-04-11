function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "nl.fokkezb.pullToRefresh/" + s : s.substring(0, index) + "/nl.fokkezb.pullToRefresh/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isApi: true,
    priority: 1000.0001,
    key: "Window",
    style: {
        backgroundColor: "#ffffff",
        barColor: "#ffffff",
        tintColor: "#ffffff"
    }
}, {
    isClass: true,
    priority: 10000.0002,
    key: "name",
    style: {
        top: "10%",
        textAlign: "center",
        color: "black"
    }
}, {
    isClass: true,
    priority: 10000.0003,
    key: "adress",
    style: {
        top: "50%",
        textAlign: "center",
        color: "black"
    }
} ];